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
