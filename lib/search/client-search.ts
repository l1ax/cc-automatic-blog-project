/**
 * Client-side search utilities
 * Loads and searches the pre-built search index
 */

import type { BuildTimeIndex, ClientSearchResult } from "./types";

/**
 * Client-side search index
 */
export class ClientSearchIndex {
  private index: BuildTimeIndex | null = null;
  private loadPromise: Promise<BuildTimeIndex> | null = null;

  /**
   * Load the search index from the public directory
   */
  async load(): Promise<BuildTimeIndex> {
    if (this.index) {
      return this.index;
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load search index: ${res.statusText}`);
        }
        return res.json() as Promise<BuildTimeIndex>;
      })
      .then((index) => {
        this.index = index;
        this.loadPromise = null;
        return index;
      })
      .catch((error) => {
        this.loadPromise = null;
        console.error("Error loading search index:", error);
        throw error;
      });

    return this.loadPromise;
  }

  /**
   * Tokenize search query (must match build-time tokenization)
   */
  private tokenize(query: string): string[] {
    if (!query) return [];

    const cleaned = query.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");

    const tokens = cleaned.split(/\s+/).filter((t) => t.length > 0);

    // Chinese character and bigram tokenization
    const chineseTokens: string[] = [];
    tokens.forEach((token) => {
      if (/[\u4e00-\u9fa5]/.test(token)) {
        for (let i = 0; i < token.length; i++) {
          const char = token[i];
          if (/[\u4e00-\u9fa5]/.test(char)) {
            chineseTokens.push(char);
          }
        }
        for (let i = 0; i < token.length - 1; i++) {
          if (/[\u4e00-\u9fa5]/.test(token[i]) && /[\u4e00-\u9fa5]/.test(token[i + 1])) {
            chineseTokens.push(token[i] + token[i + 1]);
          }
        }
      }
    });

    return [...tokens, ...chineseTokens];
  }

  /**
   * Search for articles matching the query
   */
  async search(query: string, limit: number = 20): Promise<ClientSearchResult[]> {
    const index = await this.load();

    if (!query.trim()) {
      return [];
    }

    const tokens = this.tokenize(query);

    // Calculate scores for each article
    const scores = new Map<string, number>();

    tokens.forEach((token) => {
      const matchingSlugs = index.indexed[token] || [];
      matchingSlugs.forEach((slug) => {
        const currentScore = scores.get(slug) || 0;
        scores.set(slug, currentScore + 1);
      });
    });

    // Sort by score and convert to results
    const results = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([slug, score]) => {
        const article = index.articles.find((a) => a.slug === slug);
        if (!article) return null;

        return {
          slug: article.slug,
          title: article.title,
          summary: article.summary,
          tags: article.tags,
          category: article.category,
          date: article.date,
          readingTime: article.readingTime,
          score,
        } as ClientSearchResult | null;
      })
      .filter((r): r is ClientSearchResult => r !== null);

    return results;
  }

  /**
   * Check if the index is loaded
   */
  isLoaded(): boolean {
    return this.index !== null;
  }

  /**
   * Get the number of articles in the index
   */
  async size(): Promise<number> {
    const index = await this.load();
    return index.articles.length;
  }
}

// Singleton instance
let clientSearchIndex: ClientSearchIndex | null = null;

/**
 * Get the singleton client search index
 */
export function getSearchIndex(): ClientSearchIndex {
  if (!clientSearchIndex) {
    clientSearchIndex = new ClientSearchIndex();
  }
  return clientSearchIndex;
}
