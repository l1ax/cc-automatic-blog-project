/**
 * Content Layer - Public API
 *
 * This module provides a clean abstraction over content providers.
 * The default implementation uses LocalMDXProvider for file-based MDX content.
 * Future: Can swap to NotionProvider, ObsidianProvider, etc. without changing consumers.
 *
 * NOTE: This module only exports async functions for server-side use.
 * For client-side use, use the components that fetch data server-side.
 */

// Re-export types
export type { Article, ArticleMetadata, ContentProvider, SearchQuery } from './providers/types';

// Export the content provider interface and implementations
export { LocalMDXProvider, contentProvider } from './providers/local-mdx';
export type { ContentProvider as IContentProvider } from './providers/types';

// Import the default provider instance
import { contentProvider } from './providers/local-mdx';

/**
 * Get all articles (metadata only)
 */
export async function getAllArticles(): Promise<import('./providers/types').ArticleMetadata[]> {
  return contentProvider.getAllArticles();
}

/**
 * Get all article slugs
 */
export async function getAllArticleSlugs(): Promise<string[]> {
  return contentProvider.getAllSlugs();
}

/**
 * Get a single article by slug (includes content)
 */
export async function getArticleBySlug(
  slug: string
): Promise<import('./providers/types').Article | null> {
  return contentProvider.getArticleBySlug(slug);
}

/**
 * Get articles filtered by tag
 */
export async function getArticlesByTag(
  tag: string
): Promise<import('./providers/types').ArticleMetadata[]> {
  return contentProvider.getArticlesByTag(tag);
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  return contentProvider.getAllTags();
}

/**
 * Search articles by query
 */
export async function searchArticles(
  query: string,
  limit?: number
): Promise<import('./providers/types').ArticleMetadata[]> {
  return contentProvider.searchArticles({ query, limit });
}

/**
 * Get related articles based on shared tags, category, and recency
 * @param currentSlug - The slug of the current article (will be excluded from results)
 * @param currentTags - Tags of the current article for finding related content
 * @param currentCategory - Category of the current article (optional)
 * @param limit - Maximum number of related articles to return (default: 3)
 */
export async function getRelatedArticles(
  currentSlug: string,
  currentTags: string[] = [],
  currentCategory?: string,
  limit: number = 3
): Promise<import('./providers/types').ArticleMetadata[]> {
  const allArticles = await contentProvider.getAllArticles();

  // Filter out the current article
  const otherArticles = allArticles.filter(article => article.slug !== currentSlug);

  // Score each article based on relevance
  const scoredArticles = otherArticles.map(article => {
    let score = 0;

    // Tag matching (highest priority)
    if (article.tags && currentTags.length > 0) {
      const sharedTags = article.tags.filter(tag => currentTags.includes(tag));
      score += sharedTags.length * 10;
    }

    // Category matching (medium priority)
    if (article.category && currentCategory && article.category === currentCategory) {
      score += 5;
    }

    // Recency bonus (lower priority, but helps as fallback)
    // More recent articles get a small bonus
    const articleDate = new Date(article.date);
    const now = new Date();
    const daysSincePublication = Math.floor((now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24));
    const recencyBonus = Math.max(0, 5 - daysSincePublication / 365); // Decreases over time, min 0
    score += recencyBonus;

    return { article, score };
  });

  // Sort by score (descending) and return top results
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
}
