export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Extract headings from Markdown content and generate TOC
 */
export function extractToc(content: string): TocItem[] {
  const toc: TocItem[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    // Match Markdown headings: #, ##, ###, etc.
    const match = line.match(/^(#{1,6})\s+(.+)$/);

    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = generateHeadingId(text);

      toc.push({ id, text, level });
    }
  }

  return toc;
}

/**
 * Generate a URL-friendly ID from heading text
 */
export function generateHeadingId(text: string): string {
  // Remove common markdown syntax and clean up
  let id = text
    // Remove markdown links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove inline code `code` -> code
    .replace(/`([^`]+)`/g, '$1')
    // Remove bold/italic markers
    .replace(/[*_]+/g, '')
    // Remove special characters but keep Chinese characters
    .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  // Ensure the ID is not empty
  if (!id) {
    return `heading-${Math.random().toString(36).substr(2, 9)}`;
  }

  return id;
}

/**
 * Get the active heading ID based on scroll position
 */
export function getActiveHeading(
  toc: TocItem[],
  scrollY: number,
  headingElements: Map<string, HTMLElement>
): string | null {
  if (headingElements.size === 0) return null;

  // Find the first heading that is below the current scroll position
  for (const item of toc) {
    const element = headingElements.get(item.id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const top = rect.top + scrollY;

      // If this heading is below our scroll position, it's the active one
      if (top > scrollY + 100) {
        return item.id;
      }
    }
  }

  // If we're at the bottom, return the last heading
  return toc[toc.length - 1]?.id || null;
}
