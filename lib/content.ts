/**
 * Content Layer - Public API
 *
 * This module provides a clean abstraction over content providers.
 * The default implementation uses LocalMDXProvider for file-based MDX content.
 * Future: Can swap to NotionProvider, ObsidianProvider, etc. without changing consumers.
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

// ============================================================================
// BACKWARD COMPATIBILITY: Sync wrappers for existing code
// ============================================================================
// These are deprecated in favor of async versions above, but kept for
// compatibility with existing components that use sync functions.
// ============================================================================

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * @deprecated Use getAllArticleSlugs() async instead
 */
export function getAllArticleSlugsSync(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => {
      const match = fileName.match(/^\d{4}-\d{2}-\d{2}-(.+)\.mdx?$/);
      return match ? match[1] : fileName.replace(/\.mdx?$/, '');
    });
}

/**
 * @deprecated Use getArticleBySlug() async instead
 */
export function getArticleBySlugSync(slug: string): import('./providers/types').Article | null {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return null;
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const matchingFile = fileNames.find((fileName) => {
      const fileSlug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '');
      return fileSlug === slug;
    });

    if (!matchingFile) {
      return null;
    }

    const fullPath = path.join(postsDirectory, matchingFile);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Calculate reading time
    const wordsPerMinute = 200;
    const plainText = content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]+`/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

    return {
      title: data.title || '',
      date: data.date || '',
      summary: data.summary,
      tags: data.tags || [],
      category: data.category,
      draft: data.draft || false,
      slug,
      content,
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

/**
 * @deprecated Use getAllArticles() async instead
 */
export function getAllArticlesSync(): import('./providers/types').ArticleMetadata[] {
  const slugs = getAllArticleSlugsSync();
  const articles = slugs
    .map((slug) => getArticleBySlugSync(slug))
    .filter(
      (article): article is import('./providers/types').Article =>
        article !== null && !article.draft
    )
    .map(({ content, ...metadata }) => metadata);

  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * @deprecated Use getArticlesByTag() async instead
 */
export function getArticlesByTagSync(tag: string): import('./providers/types').ArticleMetadata[] {
  const allArticles = getAllArticlesSync();
  return allArticles.filter((article) =>
    article.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * @deprecated Use getAllTags() async instead
 */
export function getAllTagsSync(): string[] {
  const allArticles = getAllArticlesSync();
  const tags = new Set<string>();

  allArticles.forEach((article) => {
    article.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}
