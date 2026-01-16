/**
 * Search Index Utilities
 * Generates and manages FlexSearch index for client-side search
 */

import { ArticleMetadata } from '../providers/types';
import FlexSearch from 'flexsearch';

/**
 * Document structure for FlexSearch index
 */
export interface SearchDocument {
  id: string;
  title: string;
  summary?: string;
  tags?: string[];
  category?: string;
  content?: string;
}

/**
 * Search result with metadata
 */
export interface SearchResult {
  slug: string;
  title: string;
  summary?: string;
  tags?: string[];
  category?: string;
  date: string;
  readingTime?: number;
  score?: number;
}

/**
 * FlexSearch Document type (workaround for incomplete types)
 */
interface FlexSearchDocument {
  add(document: Record<string, any>): void;
  search(
    query: string,
    limit?: number,
    options?: any
  ): Array<{ field: string; result: string[] }>;
}


/**
 * FlexSearch Index wrapper
 */
export class SearchIndex {
  private index: FlexSearchDocument;
  private documents: Map<string, SearchDocument> = new Map();

  constructor() {
    // Configure FlexSearch for Chinese and English content
    // Using Document-based index for better field handling
    this.index = new (FlexSearch as any).Document({
      document: {
        id: 'id',
        index: ['title', 'summary', 'tags', 'category', 'content'],
        store: true,
      },
      tokenize: 'full',
      threshold: 0,
      depth: 3,
    });
  }

  /**
   * Add a document to the search index
   */
  addDocument(slug: string, doc: SearchDocument): void {
    this.documents.set(slug, doc);
    this.index.add({
      id: slug,
      title: doc.title,
      summary: doc.summary || '',
      tags: doc.tags?.join(' ') || '',
      category: doc.category || '',
      content: doc.content || '',
    });
  }

  /**
   * Add multiple documents to the search index
   */
  addDocuments(docs: Array<{ slug: string; doc: SearchDocument }>): void {
    docs.forEach(({ slug, doc }) => this.addDocument(slug, doc));
  }

  /**
   * Search the index
   */
  search(query: string, limit: number = 20): SearchResult[] {
    if (!query.trim()) {
      return [];
    }

    // Search returns an array of result objects for each field
    const fieldResults = this.index.search(query, limit) as Array<{
      field: string;
      result: string[];
    }>;

    // Collect all unique slugs from all fields
    const slugSet = new Set<string>();
    fieldResults.forEach((fieldResult) => {
      if (fieldResult?.result) {
        fieldResult.result.forEach((slug) => slugSet.add(slug));
      }
    });

    // Convert to results with documents
    return Array.from(slugSet)
      .map((slug) => {
        const doc = this.documents.get(slug);
        if (!doc) return null;

        return {
          slug,
          title: doc.title,
          summary: doc.summary,
          tags: doc.tags,
          category: doc.category,
        } as SearchResult;
      })
      .filter((result): result is SearchResult => result !== null)
      .slice(0, limit);
  }

  /**
   * Get the number of documents in the index
   */
  get size(): number {
    return this.documents.size;
  }
}

/**
 * Create a search index from article metadata
 */
export function createSearchIndex(articles: ArticleMetadata[]): SearchIndex {
  const searchIndex = new SearchIndex();

  articles.forEach((article) => {
    searchIndex.addDocument(article.slug, {
      id: article.slug,
      title: article.title,
      summary: article.summary,
      tags: article.tags,
      category: article.category,
    });
  });

  return searchIndex;
}

/**
 * Generate search index data for client-side usage
 * This should be called during build time
 */
export async function generateSearchIndex(): Promise<{
  index: SearchIndex;
  metadata: ArticleMetadata[];
}> {
  // Import here to avoid circular dependency
  const { getAllArticles } = await import('../content');

  const articles = await getAllArticles();
  const index = createSearchIndex(articles);

  return {
    index,
    metadata: articles,
  };
}
