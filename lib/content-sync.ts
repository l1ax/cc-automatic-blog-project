/**
 * @deprecated This file contains sync wrappers using Node.js fs module
 * Only use this for server-side scripts or build-time utilities
 * DO NOT import this in client components
 */

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
export function getArticleBySlugSync(slug: string): any {
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
export function getAllArticlesSync(): any[] {
  const slugs = getAllArticleSlugsSync();
  const articles = slugs
    .map((slug) => getArticleBySlugSync(slug))
    .filter((article): article is any => article !== null && !article.draft)
    .map(({ content, ...metadata }) => metadata);

  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * @deprecated Use getArticlesByTag() async instead
 */
export function getArticlesByTagSync(tag: string): any[] {
  const allArticles = getAllArticlesSync();
  return allArticles.filter((article) =>
    article.tags?.some((t: string) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * @deprecated Use getAllTags() async instead
 */
export function getAllTagsSync(): string[] {
  const allArticles = getAllArticlesSync();
  const tags = new Set<string>();

  allArticles.forEach((article) => {
    article.tags?.forEach((tag: string) => tags.add(tag));
  });

  return Array.from(tags).sort();
}
