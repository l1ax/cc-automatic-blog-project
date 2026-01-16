import { describe, it, expect, beforeEach } from 'vitest';
import { tokenize } from '../build-index';
import type { SearchableArticle, BuildTimeIndex } from '../types';

describe('Search Index Utilities', () => {
  describe('tokenize', () => {
    it('should tokenize empty string', () => {
      expect(tokenize('')).toEqual([]);
    });

    it('should tokenize English text', () => {
      const result = tokenize('Hello world this is a test');
      expect(result).toContain('hello');
      expect(result).toContain('world');
      expect(result).toContain('test');
    });

    it('should convert to lowercase', () => {
      const result = tokenize('HELLO World TeST');
      expect(result).toContain('hello');
      expect(result).toContain('world');
      expect(result).toContain('test');
    });

    it('should remove special characters', () => {
      const result = tokenize('hello@world!test#123');
      expect(result).toContain('hello');
      expect(result).toContain('world');
      expect(result).toContain('test');
      expect(result).toContain('123');
      expect(result).not.toContain('@');
      expect(result).not.toContain('!');
    });

    it('should handle Chinese text', () => {
      const result = tokenize('技术博客');
      expect(result).toContain('技术博客');
      expect(result).toContain('技');
      expect(result).toContain('术');
      expect(result).toContain('博');
      expect(result).toContain('客');
      expect(result).toContain('技术');
      expect(result).toContain('术博');
      expect(result).toContain('博客');
    });

    it('should create bigrams for Chinese text', () => {
      const result = tokenize('测试文本');
      expect(result).toContain('测');
      expect(result).toContain('试');
      expect(result).toContain('文');
      expect(result).toContain('本');
      expect(result).toContain('测试');
      expect(result).toContain('试文');
      expect(result).toContain('文本');
    });

    it('should handle mixed Chinese and English', () => {
      const result = tokenize('Next.js 博客设置');
      // Dots are removed as special characters, so "Next.js" becomes "next" and "js"
      expect(result).toContain('next');
      expect(result).toContain('js');
      expect(result).toContain('博客设置');
      expect(result).toContain('博');
      expect(result).toContain('客');
    });

    it('should handle numbers', () => {
      const result = tokenize('React 18 and Next.js 14');
      expect(result).toContain('react');
      expect(result).toContain('18');
      // "Next.js" becomes "next" and "js"
      expect(result).toContain('next');
      expect(result).toContain('js');
      expect(result).toContain('14');
    });

    it('should split by whitespace', () => {
      const result = tokenize('word1  word2   word3');
      expect(result).toContain('word1');
      expect(result).toContain('word2');
      expect(result).toContain('word3');
    });

    it('should handle multiple lines', () => {
      const result = tokenize('line1\nline2\nline3');
      expect(result).toContain('line1');
      expect(result).toContain('line2');
      expect(result).toContain('line3');
    });

    it('should handle tabs', () => {
      const result = tokenize('word1\tword2\tword3');
      expect(result).toContain('word1');
      expect(result).toContain('word2');
      expect(result).toContain('word3');
    });

    it('should filter out empty tokens', () => {
      const result = tokenize('  hello   world  ');
      expect(result).not.toContain('');
      expect(result).toContain('hello');
      expect(result).toContain('world');
    });

    it('should handle common programming terms', () => {
      const result = tokenize('JavaScript TypeScript CSS HTML');
      expect(result).toContain('javascript');
      expect(result).toContain('typescript');
      expect(result).toContain('css');
      expect(result).toContain('html');
    });

    it('should handle underscores and hyphens', () => {
      const result = tokenize('test_case some-thing');
      expect(result).toContain('test');
      expect(result).toContain('case');
      expect(result).toContain('some');
      expect(result).toContain('thing');
    });

    it('should handle URLs in text', () => {
      const result = tokenize('Visit https://example.com for more');
      expect(result).toContain('visit');
      expect(result).toContain('https');
      // Dots are removed as special characters, so "example.com" becomes "example" and "com"
      expect(result).toContain('example');
      expect(result).toContain('com');
      expect(result).toContain('for');
      expect(result).toContain('more');
    });
  });
});

describe('Search Index Integration', () => {
  let mockSearchableArticles: SearchableArticle[];

  beforeEach(() => {
    mockSearchableArticles = [
      {
        slug: 'test-article',
        title: 'Test Article',
        summary: 'This is a test article',
        tags: ['test', 'sample'],
        category: 'Testing',
        date: '2026-01-17',
        readingTime: 5,
        content: 'Test article content with some words',
      },
      {
        slug: 'another-post',
        title: 'Another Post',
        summary: 'Another sample post',
        tags: ['example'],
        category: 'Examples',
        date: '2026-01-18',
        readingTime: 3,
        content: 'Different content here',
      },
    ];
  });

  describe('BuildTimeIndex structure', () => {
    it('should have correct structure', () => {
      const index: BuildTimeIndex = {
        articles: mockSearchableArticles,
        indexed: {
          'test': ['test-article'],
          'article': ['test-article'],
          'another': ['another-post'],
          'post': ['another-post'],
        },
      };

      expect(index.articles).toHaveLength(2);
      expect(index.indexed).toHaveProperty('test');
      expect(Array.isArray(index.indexed['test'])).toBe(true);
    });

    it('should map tokens to article slugs', () => {
      const index: BuildTimeIndex = {
        articles: mockSearchableArticles,
        indexed: {
          'test': ['test-article', 'another-post'],
          'example': ['another-post'],
        },
      };

      expect(index.indexed['test']).toContain('test-article');
      expect(index.indexed['test']).toContain('another-post');
      expect(index.indexed['example']).toContain('another-post');
      expect(index.indexed['example']).not.toContain('test-article');
    });
  });

  describe('SearchableArticle structure', () => {
    it('should have all required fields', () => {
      const article: SearchableArticle = {
        slug: 'test-article',
        title: 'Test Article',
        summary: 'This is a test',
        tags: ['test'],
        category: 'Testing',
        date: '2026-01-17',
        readingTime: 5,
        content: 'Article content',
      };

      expect(article.slug).toBe('test-article');
      expect(article.title).toBe('Test Article');
      expect(article.summary).toBe('This is a test');
      expect(article.tags).toEqual(['test']);
      expect(article.category).toBe('Testing');
      expect(article.date).toBe('2026-01-17');
      expect(article.readingTime).toBe(5);
      expect(article.content).toBe('Article content');
    });

    it('should allow optional fields to be undefined', () => {
      const article: SearchableArticle = {
        slug: 'test-article',
        title: 'Test Article',
        date: '2026-01-17',
        content: 'Content',
      };

      expect(article.summary).toBeUndefined();
      expect(article.tags).toBeUndefined();
      expect(article.category).toBeUndefined();
      expect(article.readingTime).toBeUndefined();
    });
  });
});
