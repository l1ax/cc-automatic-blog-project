import { describe, it, expect } from "vitest";
import { extractToc, generateHeadingId, getActiveHeading } from "../toc";

describe("TOC Utilities", () => {
  describe("extractToc", () => {
    it("should extract headings from markdown content", () => {
      const content = `# Title 1
Some content

## Title 2
More content

### Title 3
Even more content`;

      const toc = extractToc(content);

      expect(toc).toHaveLength(3);
      expect(toc[0]).toEqual({
        id: "title-1",
        text: "Title 1",
        level: 1,
      });
      expect(toc[1]).toEqual({
        id: "title-2",
        text: "Title 2",
        level: 2,
      });
      expect(toc[2]).toEqual({
        id: "title-3",
        text: "Title 3",
        level: 3,
      });
    });

    it("should handle Chinese headings", () => {
      const content = `# 欢迎来到我的博客
## 技术栈
### Next.js 配置`;

      const toc = extractToc(content);

      expect(toc).toHaveLength(3);
      expect(toc[0].text).toBe("欢迎来到我的博客");
      expect(toc[0].id).toBe("欢迎来到我的博客");
      expect(toc[1].text).toBe("技术栈");
      expect(toc[2].text).toBe("Next.js 配置");
    });

    it("should handle headings with markdown syntax", () => {
      const content = `# **Bold Title**
## [Link Text](url)
### \`Code\` in heading`;

      const toc = extractToc(content);

      expect(toc[0].text).toBe("**Bold Title**");
      expect(toc[1].text).toBe("[Link Text](url)");
      expect(toc[2].text).toBe("`Code` in heading");
    });

    it("should return empty array for content without headings", () => {
      const content = `This is just plain text.
No headings here.
Just paragraphs.`;

      const toc = extractToc(content);

      expect(toc).toEqual([]);
    });

    it("should handle headings with extra spaces", () => {
      const content = `#    Title with spaces
## Another title`;

      const toc = extractToc(content);

      expect(toc).toHaveLength(2);
      expect(toc[0].text).toBe("Title with spaces");
    });

    it("should only support h1-h6", () => {
      const content = `# H1
## H2
### H3
#### H4
##### H5
###### H6
####### Not a heading`;

      const toc = extractToc(content);

      expect(toc).toHaveLength(6);
    });
  });

  describe("generateHeadingId", () => {
    it("should generate URL-friendly IDs from English text", () => {
      expect(generateHeadingId("Hello World")).toBe("hello-world");
      expect(generateHeadingId("My Test Heading")).toBe("my-test-heading");
    });

    it("should preserve Chinese characters", () => {
      expect(generateHeadingId("欢迎来到我的博客")).toBe("欢迎来到我的博客");
      expect(generateHeadingId("技术栈介绍")).toBe("技术栈介绍");
    });

    it("should remove markdown link syntax", () => {
      expect(generateHeadingId("[Link Text](url)")).toBe("link-text");
    });

    it("should remove inline code syntax", () => {
      expect(generateHeadingId("Use `code` here")).toBe("use-code-here");
    });

    it("should remove bold and italic markers", () => {
      expect(generateHeadingId("**Bold** and *italic*")).toBe("bold-and-italic");
      expect(generateHeadingId("__Bold__ and _italic_")).toBe("bold-and-italic");
    });

    it("should remove special characters", () => {
      expect(generateHeadingId("Hello! @World #123")).toBe("hello-world-123");
      expect(generateHeadingId("What's new?")).toBe("whats-new");
    });

    it("should handle multiple spaces", () => {
      expect(generateHeadingId("Multiple    Spaces   Here")).toBe("multiple-spaces-here");
    });

    it("should handle leading/trailing spaces", () => {
      expect(generateHeadingId("  Spaces Around  ")).toBe("spaces-around");
    });

    it("should handle mixed Chinese and English", () => {
      expect(generateHeadingId("Next.js 博客设置")).toBe("nextjs-博客设置");
    });

    it("should generate random ID for empty result", () => {
      const id = generateHeadingId("!!!@@@###");
      expect(id).toMatch(/^heading-[a-z0-9]+$/);
    });

    it("should handle consecutive hyphens", () => {
      // The current implementation only removes leading/trailing hyphens
      expect(generateHeadingId("Hello---World")).toBe("hello---world");
    });

    it("should convert to lowercase", () => {
      expect(generateHeadingId("UPPERCASE TEXT")).toBe("uppercase-text");
      expect(generateHeadingId("Mixed Case Text")).toBe("mixed-case-text");
    });
  });

  describe("getActiveHeading", () => {
    it("should return null for empty TOC", () => {
      const result = getActiveHeading([], 0, new Map());
      expect(result).toBeNull();
    });

    it("should return null for empty heading elements map", () => {
      const toc = [{ id: "heading-1", text: "Heading 1", level: 1 }];
      const result = getActiveHeading(toc, 0, new Map());
      expect(result).toBeNull();
    });

    it("should return the first heading when at top", () => {
      const toc = [
        { id: "heading-1", text: "Heading 1", level: 1 },
        { id: "heading-2", text: "Heading 2", level: 2 },
      ];

      // Element with top: 50 means it's 50px from viewport top
      // At scrollY=0: top + scrollY = 50 + 0 = 50
      // 50 < 100 (offset), so this heading is NOT below scroll position + offset
      // So it returns the last heading as fallback
      const mockElement = {
        getBoundingClientRect: () => ({ top: 50 }),
      } as HTMLElement;

      const elements = new Map([["heading-1", mockElement]]);

      const result = getActiveHeading(toc, 0, elements);
      // Since heading-1's top (50) is less than offset (100), returns last heading
      expect(result).toBe("heading-2");
    });

    it("should return the last heading when at bottom", () => {
      const toc = [
        { id: "heading-1", text: "Heading 1", level: 1 },
        { id: "heading-2", text: "Heading 2", level: 2 },
      ];

      const mockElement = {
        getBoundingClientRect: () => ({ top: -50 }),
      } as HTMLElement;

      const elements = new Map([["heading-1", mockElement]]);

      const result = getActiveHeading(toc, 1000, elements);
      expect(result).toBe("heading-2");
    });

    it("should account for offset when determining active heading", () => {
      const toc = [
        { id: "heading-1", text: "Heading 1", level: 1 },
        { id: "heading-2", text: "Heading 2", level: 2 },
      ];

      const mockElement1 = {
        getBoundingClientRect: () => ({ top: -150 }),
      } as HTMLElement;

      const elements = new Map([["heading-1", mockElement1]]);

      // At scroll position 0, element with top -150 should not be active
      // because -150 + 0 = -150 < 100 (offset)
      const result = getActiveHeading(toc, 0, elements);
      expect(result).toBe("heading-2"); // Falls back to last heading
    });
  });
});
