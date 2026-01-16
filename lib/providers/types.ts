/**
 * Abstract content provider interface.
 * This allows swapping implementations (local MDX, Notion, Obsidian, etc.)
 * without changing the rest of the application.
 */

export interface ArticleMetadata {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
  slug: string;
  readingTime?: number;
}

export interface Article extends ArticleMetadata {
  content: string;
}

export interface SearchQuery {
  query: string;
  limit?: number;
}

/**
 * Abstract Content Provider Interface
 * All content providers must implement these methods.
 */
export interface ContentProvider {
  /**
   * Get all articles (metadata only, no content)
   */
  getAllArticles(): Promise<ArticleMetadata[]>;

  /**
   * Get a single article by its slug (includes content)
   */
  getArticleBySlug(slug: string): Promise<Article | null>;

  /**
   * Get all article slugs
   */
  getAllSlugs(): Promise<string[]>;

  /**
   * Get articles filtered by tag
   */
  getArticlesByTag(tag: string): Promise<ArticleMetadata[]>;

  /**
   * Get all unique tags across all articles
   */
  getAllTags(): Promise<string[]>;

  /**
   * Search articles by query (title, summary, content)
   */
  searchArticles(query: SearchQuery): Promise<ArticleMetadata[]>;
}
