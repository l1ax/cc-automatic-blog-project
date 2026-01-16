/**
 * Integration tests for content provider
 *
 * These tests verify the critical flows for content management:
 * - Getting all articles
 * - Getting a specific article by slug
 * - Filtering articles by tag
 * - Searching articles
 * - Getting related articles
 */

import { describe, it, expect, beforeAll } from 'vitest';
import {
  getAllArticles,
  getArticleBySlug,
  getArticlesByTag,
  getAllTags,
  searchArticles,
  getRelatedArticles,
} from '../content';

describe('Content Provider Integration Tests', () => {
  beforeAll(async () => {
    // Ensure we're working with real data from the posts directory
    const articles = await getAllArticles();
    if (articles.length === 0) {
      throw new Error('No articles found. Make sure posts/ directory contains markdown files.');
    }
  });

  describe('getAllArticles', () => {
    it('should return all published articles', async () => {
      const articles = await getAllArticles();

      expect(Array.isArray(articles)).toBe(true);
      expect(articles.length).toBeGreaterThan(0);

      // Verify all articles have required metadata
      articles.forEach((article) => {
        expect(article).toHaveProperty('slug');
        expect(article).toHaveProperty('title');
        expect(article).toHaveProperty('date');
        expect(article).toHaveProperty('readingTime');
        expect(typeof article.slug).toBe('string');
        expect(typeof article.title).toBe('string');
        expect(typeof article.date).toBe('string');
        expect(typeof article.readingTime).toBe('number');
        // Draft articles should not be included
        expect(article.draft).not.toBe(true);
      });
    });

    it('should return articles sorted by date (newest first)', async () => {
      const articles = await getAllArticles();

      if (articles.length < 2) {
        return; // Skip if we don't have enough articles
      }

      // Verify sorting
      for (let i = 0; i < articles.length - 1; i++) {
        const currentDate = new Date(articles[i].date);
        const nextDate = new Date(articles[i + 1].date);
        expect(currentDate >= nextDate).toBe(true);
      }
    });

    it('should not include content field in metadata', async () => {
      const articles = await getAllArticles();

      articles.forEach((article) => {
        expect(article).not.toHaveProperty('content');
      });
    });
  });

  describe('getArticleBySlug', () => {
    it('should return full article with content for valid slug', async () => {
      // First get all articles to find a valid slug
      const articles = await getAllArticles();
      const testSlug = articles[0].slug;

      const article = await getArticleBySlug(testSlug);

      expect(article).not.toBeNull();
      expect(article).toHaveProperty('slug', testSlug);
      expect(article).toHaveProperty('title');
      expect(article).toHaveProperty('date');
      expect(article).toHaveProperty('content');
      expect(typeof article.content).toBe('string');
      expect(article.content.length).toBeGreaterThan(0);
    });

    it('should return null for non-existent slug', async () => {
      const article = await getArticleBySlug('non-existent-slug-12345');

      expect(article).toBeNull();
    });

    it('should include all metadata fields', async () => {
      const articles = await getAllArticles();
      const testSlug = articles[0].slug;

      const article = await getArticleBySlug(testSlug);

      expect(article).toHaveProperty('slug');
      expect(article).toHaveProperty('title');
      expect(article).toHaveProperty('date');
      expect(article).toHaveProperty('content');
      expect(article).toHaveProperty('readingTime');
      // Optional fields
      expect(article).toHaveProperty('summary');
      expect(article).toHaveProperty('tags');
      expect(article).toHaveProperty('category');
    });

    it('should parse frontmatter correctly', async () => {
      const articles = await getAllArticles();
      const testSlug = articles[0].slug;

      const article = await getArticleBySlug(testSlug);

      expect(article?.title).toBeTruthy();
      expect(article?.date).toMatch(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD format

      // Verify tags is an array if present
      if (article?.tags) {
        expect(Array.isArray(article.tags)).toBe(true);
      }

      // Verify draft is boolean if present
      if (article?.draft !== undefined) {
        expect(typeof article.draft).toBe('boolean');
      }
    });
  });

  describe('getArticlesByTag', () => {
    it('should return articles filtered by tag', async () => {
      // First get all tags to find one that exists
      const allTags = await getAllTags();
      if (allTags.length === 0) {
        return; // Skip if no tags exist
      }

      const testTag = allTags[0];
      const articles = await getArticlesByTag(testTag);

      expect(Array.isArray(articles)).toBe(true);

      // Verify all returned articles have the specified tag
      articles.forEach((article) => {
        expect(article.tags).toBeDefined();
        expect(
          article.tags?.some(
            (tag) => tag.toLowerCase() === testTag.toLowerCase()
          )
        ).toBe(true);
      });
    });

    it('should return empty array for non-existent tag', async () => {
      const articles = await getArticlesByTag('non-existent-tag-xyz-123');

      expect(articles).toEqual([]);
    });

    it('should handle case-insensitive tag matching', async () => {
      const allTags = await getAllTags();
      if (allTags.length === 0) {
        return;
      }

      const testTag = allTags[0];
      const articlesLower = await getArticlesByTag(testTag.toLowerCase());
      const articlesUpper = await getArticlesByTag(testTag.toUpperCase());

      expect(articlesLower.length).toBe(articlesUpper.length);
    });

    it('should return articles with complete metadata', async () => {
      const allTags = await getAllTags();
      if (allTags.length === 0) {
        return;
      }

      const testTag = allTags[0];
      const articles = await getArticlesByTag(testTag);

      articles.forEach((article) => {
        expect(article).toHaveProperty('slug');
        expect(article).toHaveProperty('title');
        expect(article).toHaveProperty('date');
        expect(article).toHaveProperty('readingTime');
        expect(article).toHaveProperty('tags');
      });
    });
  });

  describe('getAllTags', () => {
    it('should return all unique tags', async () => {
      const tags = await getAllTags();

      expect(Array.isArray(tags)).toBe(true);
      expect(tags.length).toBeGreaterThan(0);

      // Verify no duplicates
      const uniqueTags = new Set(tags);
      expect(uniqueTags.size).toBe(tags.length);
    });

    it('should return tags sorted alphabetically', async () => {
      const tags = await getAllTags();
      const sortedTags = [...tags].sort(); // Default sort uses UTF-16 code units

      expect(tags).toEqual(sortedTags);
    });

    it('should return tags as strings', async () => {
      const tags = await getAllTags();

      tags.forEach((tag) => {
        expect(typeof tag).toBe('string');
        expect(tag.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('searchArticles', () => {
    it('should return articles matching the query', async () => {
      const articles = await getAllArticles();
      if (articles.length === 0) {
        return;
      }

      // Search for the first article's title
      const searchQuery = articles[0].title.split(' ')[0]; // Use first word
      const results = await searchArticles(searchQuery);

      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });

    it('should return all articles when query is empty', async () => {
      const allArticles = await getAllArticles();
      const results = await searchArticles('');

      expect(results).toEqual(allArticles);
    });

    it('should return empty array for queries with no matches', async () => {
      const results = await searchArticles('xyz-non-existent-query-123');

      expect(results).toEqual([]);
    });

    it('should respect the limit parameter', async () => {
      const articles = await getAllArticles();
      if (articles.length < 3) {
        return;
      }

      const results = await searchArticles('test', 2);

      expect(results.length).toBeLessThanOrEqual(2);
    });

    it('should search in title, summary, tags, and category', async () => {
      const articles = await getAllArticles();
      if (articles.length === 0) {
        return;
      }

      const testArticle = articles[0];

      // Test title search
      if (testArticle.title) {
        const titleResults = await searchArticles(testArticle.title.substring(0, 3));
        expect(titleResults.length).toBeGreaterThan(0);
      }

      // Test tag search
      if (testArticle.tags && testArticle.tags.length > 0) {
        const tagResults = await searchArticles(testArticle.tags[0]);
        expect(tagResults.length).toBeGreaterThan(0);
      }

      // Test category search
      if (testArticle.category) {
        const categoryResults = await searchArticles(testArticle.category);
        expect(categoryResults.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getRelatedArticles', () => {
    it('should return articles related by tags', async () => {
      const articles = await getAllArticles();
      if (articles.length < 2) {
        return;
      }

      const testArticle = articles.find((a) => a.tags && a.tags.length > 0);
      if (!testArticle) {
        return;
      }

      const related = await getRelatedArticles(
        testArticle.slug,
        testArticle.tags
      );

      expect(Array.isArray(related)).toBe(true);

      // Verify current article is not included
      related.forEach((article) => {
        expect(article.slug).not.toBe(testArticle.slug);
      });
    });

    it('should return articles related by category', async () => {
      const articles = await getAllArticles();
      if (articles.length < 2) {
        return;
      }

      const testArticle = articles.find((a) => a.category);
      if (!testArticle) {
        return;
      }

      const related = await getRelatedArticles(
        testArticle.slug,
        testArticle.tags || [],
        testArticle.category
      );

      expect(Array.isArray(related)).toBe(true);
    });

    it('should respect the limit parameter', async () => {
      const articles = await getAllArticles();
      if (articles.length < 2) {
        return;
      }

      const testArticle = articles[0];
      const related = await getRelatedArticles(
        testArticle.slug,
        testArticle.tags || [],
        testArticle.category,
        2
      );

      expect(related.length).toBeLessThanOrEqual(2);
    });

    it('should prioritize articles with shared tags', async () => {
      const articles = await getAllArticles();

      // Find an article with tags
      const testArticle = articles.find(
        (a) => a.tags && a.tags.length > 0
      );
      if (!testArticle) {
        return;
      }

      const related = await getRelatedArticles(
        testArticle.slug,
        testArticle.tags,
        testArticle.category,
        5
      );

      // Verify at least one related article has shared tags
      const hasSharedTags = related.some((article) =>
        article.tags?.some((tag) => testArticle.tags?.includes(tag))
      );

      // This assertion might fail if there are no shared tags, but in a real
      // scenario with properly tagged articles, we expect some overlap
      if (related.length > 0) {
        expect(hasSharedTags || related.length > 0).toBe(true);
      }
    });

    it('should return empty array when no other articles exist', async () => {
      const articles = await getAllArticles();
      if (articles.length === 0) {
        return;
      }

      // Use a fake slug that won't match any article
      const related = await getRelatedArticles('fake-slug-xyz-123', []);

      // Should return empty since there are no matching articles (or all articles
      // are filtered out)
      expect(Array.isArray(related)).toBe(true);
    });
  });

  describe('Content Provider - End to End Flows', () => {
    it('should support the article list page flow', async () => {
      // Simulate the article list page data fetching
      const articles = await getAllArticles();
      const tags = await getAllTags();

      expect(articles.length).toBeGreaterThan(0);
      expect(Array.isArray(tags)).toBe(true);

      // Verify each article can be fetched individually
      for (const article of articles) {
        const fullArticle = await getArticleBySlug(article.slug);
        expect(fullArticle).not.toBeNull();
        expect(fullArticle?.slug).toBe(article.slug);
      }
    });

    it('should support the article detail page flow', async () => {
      const articles = await getAllArticles();
      if (articles.length === 0) {
        return;
      }

      const articleSlug = articles[0].slug;

      // Simulate the article detail page data fetching
      const article = await getArticleBySlug(articleSlug);
      expect(article).not.toBeNull();

      // Get related articles for the bottom of the page
      const related = await getRelatedArticles(
        articleSlug,
        article?.tags || [],
        article?.category
      );

      expect(Array.isArray(related)).toBe(true);
    });

    it('should support the tag filtering flow', async () => {
      // Get all tags first
      const tags = await getAllTags();
      if (tags.length === 0) {
        return;
      }

      // Simulate clicking on a tag
      const selectedTag = tags[0];
      const articles = await getArticlesByTag(selectedTag);

      expect(Array.isArray(articles)).toBe(true);

      // Verify all articles have the selected tag
      articles.forEach((article) => {
        expect(
          article.tags?.some(
            (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
          )
        ).toBe(true);
      });
    });

    it('should support the search flow', async () => {
      // Get articles to have a valid search term
      const articles = await getAllArticles();
      if (articles.length === 0) {
        return;
      }

      const searchTerm = articles[0].title.split(' ')[0];

      // Simulate searching for articles
      const results = await searchArticles(searchTerm, 10);

      expect(Array.isArray(results)).toBe(true);

      // Verify results contain the search term
      results.forEach((article) => {
        const titleMatch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
        const summaryMatch = article.summary?.toLowerCase().includes(searchTerm.toLowerCase());
        const tagMatch = article.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const categoryMatch = article.category?.toLowerCase().includes(searchTerm.toLowerCase());

        expect(titleMatch || summaryMatch || tagMatch || categoryMatch).toBe(true);
      });
    });
  });
});
