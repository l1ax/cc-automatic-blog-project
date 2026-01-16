import { describe, it, expect } from "vitest";
import { calculateReadingTime, calculateReadingTimeCustom } from "../reading-time";

describe("Reading Time Utilities", () => {
  describe("calculateReadingTime", () => {
    it("should return minimum 1 minute for short content", () => {
      expect(calculateReadingTime("")).toBe(1);
      expect(calculateReadingTime("Hello")).toBe(1);
      expect(calculateReadingTime("Hello world")).toBe(1);
    });

    it("should calculate reading time for English text", () => {
      const content = "word ".repeat(200); // ~200 words
      expect(calculateReadingTime(content)).toBe(1);
    });

    it("should round up to nearest minute", () => {
      const content = "word ".repeat(250); // ~250 words = 1.25 minutes
      expect(calculateReadingTime(content)).toBe(2);
    });

    it("should handle longer content", () => {
      const content = "word ".repeat(600); // ~600 words
      expect(calculateReadingTime(content)).toBe(3);
    });

    it("should exclude code blocks from word count", () => {
      const content = `Some text here.

\`\`\`javascript
function test() {
  // This is code and should be excluded
  const variable = "value";
  return variable;
}
\`\`\`

More text here.`;

      // Only "Some text here" and "More text here" should count (~8 words)
      expect(calculateReadingTime(content)).toBe(1);
    });

    it("should exclude inline code from word count", () => {
      const content = `This is \`inline code\` and this is normal text`;

      // "This is and this is normal text" (~7 words)
      expect(calculateReadingTime(content)).toBe(1);
    });

    it("should convert markdown links to text", () => {
      const content = `Check out [this link](https://example.com) for more information`;

      // "Check out this link for more information" (~7 words)
      expect(calculateReadingTime(content)).toBe(1);
    });

    it("should handle Chinese characters as words", () => {
      const content = "技术博客文章内容"; // Chinese text
      // Each character is counted separately by \s+ split
      // This tests that the function doesn't crash on Chinese
      expect(calculateReadingTime(content)).toBeGreaterThanOrEqual(1);
    });

    it("should handle mixed content", () => {
      const content = `# Article Title

Some introduction text.

\`\`\`javascript
const code = "should be excluded";
\`\`\`

More content with [links](url) and \`inline code\`.

Conclusion paragraph.`;

      expect(calculateReadingTime(content)).toBeGreaterThanOrEqual(1);
    });

    it("should handle multiple code blocks", () => {
      const content = `Text before code.

\`\`\`javascript
// First code block
const a = 1;
\`\`\`

Text between blocks.

\`\`\`python
# Second code block
b = 2
\`\`\`

Text after code.`;

      // Only the non-code text should be counted
      expect(calculateReadingTime(content)).toBe(1);
    });

    it("should handle multiple inline code snippets", () => {
      const content = `Use \`const\` for constants, \`let\` for variables, and \`var\` is outdated`;

      // "Use for constants, for variables, and is outdated" (~9 words)
      expect(calculateReadingTime(content)).toBe(1);
    });

    it("should handle markdown links with complex text", () => {
      const content = `See [the documentation](https://docs.example.com) and [the tutorial](https://example.com/tutorial)`;

      // "See the documentation and the tutorial" (~6 words)
      expect(calculateReadingTime(content)).toBe(1);
    });

    it("should handle empty code blocks", () => {
      const content = `Text before.

\`\`\`

\`\`\`

Text after.`;

      expect(calculateReadingTime(content)).toBe(1);
    });

    it("should handle malformed code blocks", () => {
      const content = `Text before.

\`\`\`javascript
// Unclosed code block

Text after.`;

      // The unclosed block won't match, so all text counts
      expect(calculateReadingTime(content)).toBe(1);
    });

    it("should handle very long content", () => {
      const content = "word ".repeat(5000); // ~5000 words
      expect(calculateReadingTime(content)).toBe(25); // 5000 / 200 = 25
    });

    it("should handle content with multiple spaces", () => {
      const content = "word1    word2     word3"; // Multiple spaces
      expect(calculateReadingTime(content)).toBe(1);
    });

    it("should handle content with tabs and newlines", () => {
      const content = "word1\nword2\tword3\n\tword4";
      expect(calculateReadingTime(content)).toBe(1);
    });

    it("should trim leading/trailing whitespace", () => {
      const content = "   word1 word2 word3   ";
      expect(calculateReadingTime(content)).toBe(1);
    });
  });

  describe("calculateReadingTimeCustom", () => {
    it("should use custom words per minute", () => {
      const content = "word ".repeat(100); // 100 words
      expect(calculateReadingTimeCustom(content, 100)).toBe(1); // 100/100 = 1
      expect(calculateReadingTimeCustom(content, 50)).toBe(2); // 100/50 = 2
      expect(calculateReadingTimeCustom(content, 200)).toBe(1); // 100/200 = 0.5 -> 1
    });

    it("should default to 200 WPM when not specified", () => {
      const content = "word ".repeat(200);
      expect(calculateReadingTimeCustom(content)).toBe(1);
    });

    it("should handle very slow reading speeds", () => {
      const content = "word ".repeat(100);
      expect(calculateReadingTimeCustom(content, 10)).toBe(10); // 100/10 = 10
    });

    it("should handle very fast reading speeds", () => {
      const content = "word ".repeat(1000);
      expect(calculateReadingTimeCustom(content, 500)).toBe(2); // 1000/500 = 2
    });

    it("should still exclude code blocks with custom speed", () => {
      const content = `Text text text.

\`\`\`javascript
const code = "excluded";
\`\`\`

Text text text.`;

      // Regardless of WPM, code blocks should be excluded
      const result = calculateReadingTimeCustom(content, 10);
      expect(result).toBeGreaterThanOrEqual(1);
    });
  });
});
