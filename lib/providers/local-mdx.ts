/**
 * Local MDX Content Provider
 * Reads MDX files from the local posts/ directory.
 * Implements the ContentProvider interface for local file-based content.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ContentProvider, Article, ArticleMetadata, SearchQuery } from './types';
import { calculateReadingTime } from '../utils/reading-time';

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts');

/**
 * Extract slug from filename
 * Handles format: YYYY-MM-DD-slug.md or YYYY-MM-DD-slug.mdx
 */
function extractSlugFromFileName(fileName: string): string {
  const match = fileName.match(/^\d{4}-\d{2}-\d{2}-(.+)\.mdx?$/);
  return match ? match[1] : fileName.replace(/\.mdx?$/, '');
}

/**
 * Find the actual filename for a given slug
 */
function findFileNameBySlug(slug: string): string | null {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return null;
  }

  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  return (
    fileNames.find((fileName) => {
      const fileSlug = extractSlugFromFileName(fileName);
      return fileSlug === slug;
    }) || null
  );
}

/**
 * Parse frontmatter and content from MDX file
 */
function parseArticleFile(fileName: string, slug: string): Article | null {
  try {
    const fullPath = path.join(POSTS_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validate required fields
    if (!data.title || !data.date) {
      console.warn(`Article ${fileName} is missing required fields (title, date)`);
      return null;
    }

    return {
      title: data.title,
      date: data.date,
      summary: data.summary,
      tags: data.tags || [],
      category: data.category,
      draft: data.draft || false,
      slug,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    console.error(`Error parsing article ${fileName}:`, error);
    return null;
  }
}

/**
 * Local MDX Content Provider Implementation
 */
export class LocalMDXProvider implements ContentProvider {
  private postsDirectory: string;

  constructor(customPostsDir?: string) {
    this.postsDirectory = customPostsDir || POSTS_DIRECTORY;
  }

  /**
   * Get all article slugs
   */
  async getAllSlugs(): Promise<string[]> {
    if (!fs.existsSync(this.postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(this.postsDirectory);
    return fileNames
      .filter((fileName) => /\.mdx?$/.test(fileName))
      .map((fileName) => extractSlugFromFileName(fileName));
  }

  /**
   * Get all articles (metadata only)
   */
  async getAllArticles(): Promise<ArticleMetadata[]> {
    const slugs = await this.getAllSlugs();
    const articles: ArticleMetadata[] = [];

    for (const slug of slugs) {
      const article = await this.getArticleBySlug(slug);
      if (article && !article.draft) {
        const { content, ...metadata } = article;
        articles.push(metadata);
      }
    }

    // Sort by date (newest first)
    return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
  }

  /**
   * Get a single article by slug (includes content)
   */
  async getArticleBySlug(slug: string): Promise<Article | null> {
    const fileName = findFileNameBySlug(slug);
    if (!fileName) {
      return null;
    }

    return parseArticleFile(fileName, slug);
  }

  /**
   * Get articles filtered by tag
   */
  async getArticlesByTag(tag: string): Promise<ArticleMetadata[]> {
    const allArticles = await this.getAllArticles();
    return allArticles.filter((article) =>
      article.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  }

  /**
   * Get all unique tags across all articles
   */
  async getAllTags(): Promise<string[]> {
    const allArticles = await this.getAllArticles();
    const tags = new Set<string>();

    allArticles.forEach((article) => {
      article.tags?.forEach((tag) => tags.add(tag));
    });

    return Array.from(tags).sort();
  }

  /**
   * Search articles by query
   * Searches in title, summary, and tags
   */
  async searchArticles(searchQuery: SearchQuery): Promise<ArticleMetadata[]> {
    const { query, limit } = searchQuery;
    const allArticles = await this.getAllArticles();
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) {
      return allArticles;
    }

    const scored = allArticles
      .map((article) => {
        let score = 0;

        // Title match (highest priority)
        if (article.title.toLowerCase().includes(normalizedQuery)) {
          score += 10;
        }

        // Summary match
        if (article.summary?.toLowerCase().includes(normalizedQuery)) {
          score += 5;
        }

        // Tag match
        if (article.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery))) {
          score += 7;
        }

        // Category match
        if (article.category?.toLowerCase().includes(normalizedQuery)) {
          score += 6;
        }

        return { article, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ article }) => article);

    return limit ? scored.slice(0, limit) : scored;
  }
}

/**
 * Singleton instance for convenience
 * Can be imported directly in other modules
 */
export const contentProvider = new LocalMDXProvider();
