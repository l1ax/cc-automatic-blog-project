import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface ArticleMetadata {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
  slug: string;
}

export interface Article extends ArticleMetadata {
  content: string;
}

// Get all article slugs
export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => {
      // Extract slug from filename (remove date prefix and extension)
      // Format: YYYY-MM-DD-slug.md or YYYY-MM-DD-slug.mdx
      const match = fileName.match(/^\d{4}-\d{2}-\d{2}-(.+)\.mdx?$/);
      return match ? match[1] : fileName.replace(/\.mdx?$/, '');
    });
}

// Get article by slug
export function getArticleBySlug(slug: string): Article | null {
  try {
    // Find the file that matches this slug
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

    return {
      title: data.title || '',
      date: data.date || '',
      summary: data.summary,
      tags: data.tags || [],
      category: data.category,
      draft: data.draft || false,
      slug,
      content,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

// Get all articles (metadata only)
export function getAllArticles(): ArticleMetadata[] {
  const slugs = getAllArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null && !article.draft)
    .map(({ content, ...metadata }) => metadata);

  // Sort by date (newest first)
  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}

// Get articles by tag
export function getArticlesByTag(tag: string): ArticleMetadata[] {
  const allArticles = getAllArticles();
  return allArticles.filter((article) =>
    article.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

// Get all unique tags
export function getAllTags(): string[] {
  const allArticles = getAllArticles();
  const tags = new Set<string>();

  allArticles.forEach((article) => {
    article.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}
