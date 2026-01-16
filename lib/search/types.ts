/**
 * Shared types for search functionality
 * These types are used by both build-time and client-side code
 */

/**
 * Searchable article data for client-side search
 */
export interface SearchableArticle {
  slug: string;
  title: string;
  summary?: string;
  tags?: string[];
  category?: string;
  date: string;
  readingTime?: number;
  content: string; // Full content for searching
}

/**
 * Build-time index data structure
 * Uses a simple inverted index for efficient client-side search
 */
export interface BuildTimeIndex {
  articles: SearchableArticle[];
  indexed: {
    // Map from token to array of article slugs
    [token: string]: string[];
  };
}

/**
 * Search result with score
 */
export interface ClientSearchResult {
  slug: string;
  title: string;
  summary?: string;
  tags?: string[];
  category?: string;
  date: string;
  readingTime?: number;
  score: number;
}
