/**
 * Generate search index at build time
 * This script is run during the build process to create a search index JSON file
 * This file is only for Node.js build scripts, not for client-side import
 */

import { writeFile, mkdir, readdir } from "fs/promises";
import { join } from "path";
import { contentProvider } from "../providers/local-mdx";
import type { SearchableArticle, BuildTimeIndex } from "./types";

/**
 * Tokenize text into searchable tokens
 * Supports both Chinese and English text
 */
export function tokenize(text: string): string[] {
  if (!text) return [];

  // Remove special characters but keep Chinese characters, letters, and numbers
  const cleaned = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");

  // Split by whitespace to get tokens
  const tokens = cleaned.split(/\s+/).filter((t) => t.length > 0);

  // For Chinese text, also extract individual characters as bigrams
  const chineseTokens: string[] = [];
  tokens.forEach((token) => {
    // Check if token contains Chinese characters
    if (/[\u4e00-\u9fa5]/.test(token)) {
      // Add individual characters for Chinese
      for (let i = 0; i < token.length; i++) {
        const char = token[i];
        if (/[\u4e00-\u9fa5]/.test(char)) {
          chineseTokens.push(char);
        }
      }
      // Add bigrams for Chinese
      for (let i = 0; i < token.length - 1; i++) {
        if (/[\u4e00-\u9fa5]/.test(token[i]) && /[\u4e00-\u9fa5]/.test(token[i + 1])) {
          chineseTokens.push(token[i] + token[i + 1]);
        }
      }
    }
  });

  return [...tokens, ...chineseTokens];
}

/**
 * Generate search index from all articles
 */
export async function generateSearchIndex(): Promise<BuildTimeIndex> {
  const articles = await contentProvider.getAllArticles();

  // Read full content for each article
  const { readFile } = await import("fs/promises");
  const { join } = await import("path");

  const searchableArticles: SearchableArticle[] = [];

  // Get the actual file names from posts directory
  const postsDir = join(process.cwd(), "posts");
  const fileNames = await readdir(postsDir);

  // Create a map from slug to actual filename
  const slugToFileName = new Map<string, string>();
  for (const fileName of fileNames) {
    if (/\.(md|mdx)$/.test(fileName)) {
      // Extract slug from filename (remove date prefix and extension)
      const match = fileName.match(/^\d{4}-\d{2}-\d{2}-(.+)\.(md|mdx)$/);
      if (match) {
        slugToFileName.set(match[1], fileName);
      }
    }
  }

  for (const article of articles) {
    try {
      // Find the actual filename for this slug
      const fileName = slugToFileName.get(article.slug);
      if (!fileName) {
        console.warn(`Could not find file for article: ${article.slug}`);
        continue;
      }

      const filePath = join(postsDir, fileName);
      const fileContent = await readFile(filePath, "utf-8");

      // Extract content without frontmatter
      const contentMatch = fileContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
      const content = contentMatch ? contentMatch[2] : fileContent;

      // Strip markdown syntax for better search results
      const plainContent = content
        .replace(/```[\s\S]*?```/g, "") // Remove code blocks
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Replace links with text
        .replace(/[#*_`~\[\]]/g, "") // Remove markdown syntax
        .replace(/\s+/g, " ") // Normalize whitespace
        .trim();

      searchableArticles.push({
        slug: article.slug,
        title: article.title,
        summary: article.summary,
        tags: article.tags,
        category: article.category,
        date: article.date,
        readingTime: article.readingTime,
        content: plainContent,
      });
    } catch (error) {
      console.warn(`Could not read content for article: ${article.slug}`, error);
    }
  }

  // Build inverted index
  const indexed: BuildTimeIndex["indexed"] = {};

  searchableArticles.forEach((article) => {
    // Combine all searchable text
    const searchableText = [
      article.title,
      article.summary,
      article.tags?.join(" "),
      article.category,
      article.content,
    ].join(" ");

    const tokens = tokenize(searchableText);

    tokens.forEach((token) => {
      if (!indexed[token]) {
        indexed[token] = [];
      }
      if (!indexed[token].includes(article.slug)) {
        indexed[token].push(article.slug);
      }
    });
  });

  return {
    articles: searchableArticles,
    indexed,
  };
}

/**
 * Write search index to JSON file
 */
export async function writeSearchIndex(
  outputPath: string = join(process.cwd(), "public", "search-index.json")
): Promise<void> {
  const index = await generateSearchIndex();

  // Ensure directory exists
  const dir = join(outputPath, "..");
  await mkdir(dir, { recursive: true });

  // Write index as JSON
  await writeFile(outputPath, JSON.stringify(index, null, 2), "utf-8");

  // eslint-disable-next-line no-console
  console.log(`Search index generated with ${index.articles.length} articles`);
  // eslint-disable-next-line no-console
  console.log(`Index contains ${Object.keys(index.indexed).length} unique tokens`);
}

// Run if executed directly
if (require.main === module) {
  writeSearchIndex()
    .then(() => {
      // eslint-disable-next-line no-console
      console.log("Search index generated successfully");
      process.exit(0);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Error generating search index:", error);
      process.exit(1);
    });
}
