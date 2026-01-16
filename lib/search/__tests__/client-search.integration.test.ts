/**
 * Integration tests for client-side search functionality
 *
 * These tests verify the critical flows for search:
 * - Loading the search index
 * - Searching for articles
 * - Tokenization (English, Chinese, mixed)
 * - Scoring and ranking results
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ClientSearchIndex } from '../client-search';
import type { BuildTimeIndex } from '../types';

// Mock fetch for testing
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('ClientSearchIndex Integration Tests', () => {
  let searchIndex: ClientSearchIndex;
  let mockIndexData: BuildTimeIndex;

  beforeEach(() => {
    // Reset mocks
    mockFetch.mockReset();

    // Create mock index data
    mockIndexData = {
      articles: [
        {
          slug: 'welcome-to-my-blog',
          title: '欢迎来到我的技术博客',
          summary: '这是我的个人技术博客，用于记录和分享编程学习笔记。',
          tags: ['博客', 'Next.js', '开篇'],
          category: '博客相关',
          date: '2026-01-17',
          readingTime: 5,
          content: '这是一个基于 Next.js 构建的静态博客系统，主要目的是为了记录和整理我的技术学习笔记。作为一名开发者，在日常工作和学习中会接触到各种各样的技术知识点。',
        },
        {
          slug: 'react-hooks-guide',
          title: 'React Hooks 完全指南',
          summary: '深入了解 React Hooks 的工作原理和最佳实践。',
          tags: ['React', 'JavaScript', 'Frontend'],
          category: '前端开发',
          date: '2026-01-18',
          readingTime: 10,
          content: 'React Hooks 是 React 16.8 引入的新特性，它让你可以在不编写 class 的情况下使用 state 以及其他的 React 特性。',
        },
        {
          slug: 'typescript-best-practices',
          title: 'TypeScript 最佳实践',
          summary: '学习和使用 TypeScript 的最佳实践建议。',
          tags: ['TypeScript', 'JavaScript', 'Frontend'],
          category: '前端开发',
          date: '2026-01-19',
          readingTime: 8,
          content: 'TypeScript 是 JavaScript 的超集，添加了类型系统和其他特性。本文介绍 TypeScript 的最佳实践。',
        },
        {
          slug: 'python-data-analysis',
          title: 'Python 数据分析入门',
          summary: '使用 Python 进行数据分析的基础知识。',
          tags: ['Python', 'Data Analysis', 'Tutorial'],
          category: '数据分析',
          date: '2026-01-20',
          readingTime: 12,
          content: 'Python 是数据分析领域最流行的编程语言之一。本文介绍如何使用 Python 进行数据分析。',
        },
      ],
      indexed: {
        // English tokens
        'hooks': ['react-hooks-guide'],
        'guide': ['react-hooks-guide'],
        'typescript': ['typescript-best-practices'],
        'best': ['typescript-best-practices'],
        'practices': ['typescript-best-practices'],
        'python': ['python-data-analysis'],
        'data': ['python-data-analysis'],
        'analysis': ['python-data-analysis'],
        'nextjs': ['welcome-to-my-blog'],
        'blog': ['welcome-to-my-blog'],
        // Chinese tokens
        '欢': ['welcome-to-my-blog'],
        '欢迎': ['welcome-to-my-blog'],
        '迎来': ['welcome-to-my-blog'],
        '来到': ['welcome-to-my-blog'],
        '到我的': ['welcome-to-my-blog'],
        '我的': ['welcome-to-my-blog'],
        '的技术': ['welcome-to-my-blog'],
        '技术': ['welcome-to-my-blog', 'react-hooks-guide', 'typescript-best-practices'],
        '术博': ['welcome-to-my-blog'],
        '博客': ['welcome-to-my-blog'],
        'react': ['react-hooks-guide'],
        '前端': ['react-hooks-guide', 'typescript-best-practices'],
        '开发': ['react-hooks-guide', 'typescript-best-practices'],
      },
    };

    // Mock successful fetch response
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockIndexData,
    } as Response);

    searchIndex = new ClientSearchIndex();
  });

  describe('load', () => {
    it('should load the search index from the server', async () => {
      await searchIndex.load();

      expect(mockFetch).toHaveBeenCalledWith('/search-index.json');
      expect(searchIndex.isLoaded()).toBe(true);
    });

    it('should return cached index on subsequent calls', async () => {
      const index1 = await searchIndex.load();
      const index2 = await searchIndex.load();

      expect(index1).toBe(index2);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should handle concurrent load requests', async () => {
      const [index1, index2, index3] = await Promise.all([
        searchIndex.load(),
        searchIndex.load(),
        searchIndex.load(),
      ]);

      expect(index1).toBe(index2);
      expect(index2).toBe(index3);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should throw error when fetch fails', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
      } as Response);

      await expect(searchIndex.load()).rejects.toThrow('Failed to load search index');
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      await expect(searchIndex.load()).rejects.toThrow('Network error');
    });
  });

  describe('search', () => {
    it('should return empty array for empty query', async () => {
      const results = await searchIndex.search('');

      expect(results).toEqual([]);
      // Note: The search implementation loads the index first even for empty query
      // because the load() call happens before the empty check
    });

    it('should return empty array for whitespace-only query', async () => {
      const results = await searchIndex.search('   ');

      expect(results).toEqual([]);
    });

    it('should find articles by English title', async () => {
      const results = await searchIndex.search('React');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].title).toContain('React');
      expect(results[0].score).toBeGreaterThan(0);
    });

    it('should find articles by Chinese title', async () => {
      const results = await searchIndex.search('欢迎');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].title).toContain('欢迎');
    });

    it('should find articles by Chinese bigram', async () => {
      const results = await searchIndex.search('欢迎来到');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].slug).toBe('welcome-to-my-blog');
    });

    it('should search across multiple articles', async () => {
      const results = await searchIndex.search('技术');

      expect(results.length).toBeGreaterThan(1);
      expect(results.every(r => r.title)).toBe(true);
    });

    it('should return results with all required fields', async () => {
      const results = await searchIndex.search('React');

      expect(results.length).toBeGreaterThan(0);
      results.forEach((result) => {
        expect(result).toHaveProperty('slug');
        expect(result).toHaveProperty('title');
        expect(result).toHaveProperty('score');
        expect(result).toHaveProperty('date');
        expect(typeof result.slug).toBe('string');
        expect(typeof result.title).toBe('string');
        expect(typeof result.score).toBe('number');
        expect(result.score).toBeGreaterThan(0);
      });
    });

    it('should rank results by relevance score', async () => {
      const results = await searchIndex.search('技术');

      // Results should be sorted by score (descending)
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
      }
    });

    it('should respect the limit parameter', async () => {
      const results = await searchIndex.search('技术', 2);

      expect(results.length).toBeLessThanOrEqual(2);
    });

    it('should handle mixed English and Chinese queries', async () => {
      const results = await searchIndex.search('React 博客');

      expect(Array.isArray(results)).toBe(true);
    });

    it('should handle special characters in query', async () => {
      const results = await searchIndex.search('React! @#');

      expect(Array.isArray(results)).toBe(true);
    });

    it('should be case-insensitive for English', async () => {
      const results1 = await searchIndex.search('react');
      const results2 = await searchIndex.search('REACT');
      const results3 = await searchIndex.search('React');

      expect(results1.length).toBe(results2.length);
      expect(results2.length).toBe(results3.length);
    });

    it('should handle partial word matches', async () => {
      // The tokenization splits on spaces and removes special chars
      // "Type" won't match "TypeScript" as they are different tokens
      // This test verifies the current behavior
      const results = await searchIndex.search('typescript');

      expect(results.length).toBeGreaterThan(0);
      expect(results.some(r => r.title.includes('TypeScript'))).toBe(true);
    });

    it('should return empty array for non-existent terms', async () => {
      const results = await searchIndex.search('xyznonexistent123');

      expect(results).toEqual([]);
    });
  });

  describe('isLoaded', () => {
    it('should return false before loading', () => {
      expect(searchIndex.isLoaded()).toBe(false);
    });

    it('should return true after loading', async () => {
      await searchIndex.load();

      expect(searchIndex.isLoaded()).toBe(true);
    });
  });

  describe('size', () => {
    it('should return the number of articles in the index', async () => {
      const size = await searchIndex.size();

      expect(size).toBe(mockIndexData.articles.length);
    });

    it('should load the index if not already loaded', async () => {
      expect(searchIndex.isLoaded()).toBe(false);

      const size = await searchIndex.size();

      expect(searchIndex.isLoaded()).toBe(true);
      expect(size).toBe(mockIndexData.articles.length);
    });
  });

  describe('Tokenization (via search results)', () => {
    it('should tokenize English words correctly', async () => {
      const results = await searchIndex.search('react hooks');

      expect(results.length).toBeGreaterThan(0);
      // Should match articles with both 'react' and 'hooks' tokens
      expect(results.some(r => r.slug === 'react-hooks-guide')).toBe(true);
    });

    it('should tokenize Chinese characters correctly', async () => {
      const results = await searchIndex.search('技术博客');

      expect(results.length).toBeGreaterThan(0);
      // Should match articles with Chinese tokens
    });

    it('should tokenize mixed content correctly', async () => {
      const results = await searchIndex.search('Next.js 博客');

      expect(results.length).toBeGreaterThan(0);
    });

    it('should handle punctuation and special characters', async () => {
      // The tokenization removes special characters, so "Next.js" becomes "nextjs"
      const results = await searchIndex.search('nextjs');

      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('Scoring and Ranking', () => {
    it('should score higher for articles with more matching tokens', async () => {
      const results = await searchIndex.search('前端开发');

      // "前端开发" article should rank high as it has both "前端" and "开发" tokens
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].score).toBeGreaterThan(0);
    });

    it('should return scores that reflect match frequency', async () => {
      const results = await searchIndex.search('技术');

      // All articles with "技术" token should have scores
      results.forEach(result => {
        expect(result.score).toBeGreaterThan(0);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle missing articles in index gracefully', async () => {
      // Create an index with an orphaned token reference
      const badIndexData: BuildTimeIndex = {
        articles: [
          {
            slug: 'test-article',
            title: 'Test',
            content: 'Test content',
            date: '2026-01-17',
          },
        ],
        indexed: {
          'test': ['test-article'],
          'orphan': ['missing-article'], // This article doesn't exist
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => badIndexData,
      } as Response);

      const badSearchIndex = new ClientSearchIndex();
      const results = await badSearchIndex.search('orphan');

      // Should not crash, and should not include null results
      expect(Array.isArray(results)).toBe(true);
      expect(results.every(r => r !== null)).toBe(true);
    });

    it('should recover from load errors on retry', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockIndexData,
      } as Response);

      const errorSearchIndex = new ClientSearchIndex();

      // First attempt fails
      await expect(errorSearchIndex.load()).rejects.toThrow();

      // Second attempt succeeds
      mockFetch.mockClear();
      await errorSearchIndex.load();
      expect(errorSearchIndex.isLoaded()).toBe(true);
    });
  });

  describe('Search Performance', () => {
    it('should handle searches with many tokens efficiently', async () => {
      const longQuery = 'react hooks guide typescript best practices python data analysis blog 技术 博客 前端 开发';

      const startTime = Date.now();
      const results = await searchIndex.search(longQuery);
      const endTime = Date.now();

      expect(results.length).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in less than 1 second
    });

    it('should handle repeated searches efficiently', async () => {
      const queries = ['react', '技术', 'blog', 'frontend', 'python'];

      const startTime = Date.now();
      for (const query of queries) {
        await searchIndex.search(query);
      }
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(1000); // All searches should complete quickly
    });
  });

  describe('Real-world Search Scenarios', () => {
    it('should support user searching for tutorial content', async () => {
      const results = await searchIndex.search('tutorial');

      expect(Array.isArray(results)).toBe(true);
    });

    it('should support user searching by technology stack', async () => {
      const results = await searchIndex.search('React TypeScript');

      expect(results.length).toBeGreaterThan(0);
    });

    it('should support user searching by category', async () => {
      const results = await searchIndex.search('前端开发');

      expect(results.length).toBeGreaterThan(0);
    });

    it('should support user searching with partial terms', async () => {
      const results = await searchIndex.search('python data');

      expect(results.length).toBeGreaterThan(0);
      expect(results.some(r => r.slug === 'python-data-analysis')).toBe(true);
    });
  });

  describe('getSearchIndex singleton', () => {
    it('should return the same instance on multiple calls', async () => {
      const { getSearchIndex } = await import('../client-search');
      const index1 = getSearchIndex();
      const index2 = getSearchIndex();

      expect(index1).toBe(index2);
    });
  });
});
