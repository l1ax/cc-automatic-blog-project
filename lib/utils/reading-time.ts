/**
 * Calculate estimated reading time for an article
 * Based on average reading speed of ~200 words per minute
 *
 * @param content - The article content (markdown or plain text)
 * @returns Reading time in minutes (minimum 1)
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;

  // Remove code blocks and count words in plain text
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Convert markdown links to text

  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Calculate reading time with custom words per minute
 *
 * @param content - The article content
 * @param wordsPerMinute - Custom reading speed (default: 200)
 * @returns Reading time in minutes (minimum 1)
 */
export function calculateReadingTimeCustom(content: string, wordsPerMinute: number = 200): number {
  const plainText = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
