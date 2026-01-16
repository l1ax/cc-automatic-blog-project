# Progress: 个人技术博客 (Personal Tech Blog)

## Quick Context (Read This First!)

| Field             | Value                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Current Phase** | Phase 7 - Testing & Documentation                                                                                                                                                                                                                                                                                                                                                                |
| **Current Task**  | Task 7.5 Complete. Next: Task 7.6 - Document how to add new articles (Note: This is already covered in README.md, task may be redundant)                                                                                                                                                                                                                                                          |
| **Blocker**       | None                                                                                                                                                                                                                                                                                                                                                                                             |
| **Last Action**   | Completed Task 7.5: Wrote comprehensive README with setup instructions. Added Quick Start, Development Setup, Customization Guide, Content Creation Guide, Testing section, FAQ with 10 questions, and Resources section. Build verified successfully. README.md is now a complete guide for users and contributors.                       |
| **Last Updated**  | 2026-01-17                                                                                                                                                                                                                                                                                                                                                                                       |

---

## Environment

| Field                 | Value                                             |
| --------------------- | ------------------------------------------------- |
| **Working Directory** | /Users/cong/chenzhicong/cc-automatic-blog-project |
| **Git Branch**        | main                                              |
| **Last Commit**       | 8d60d44                                           |

---

## Progress Tracker

### Completed

- [x] **PRD Creation**: Comprehensive product requirements document created
- [x] **PROGRESS Creation**: Progress tracking document created
- [x] **Task 1.1**: Initialize Next.js 14 project with TypeScript and Tailwind CSS
  - **Completed**: 2026-01-17
  - **Commit**: fa869a4
  - **Files Created**:
    - package.json
    - next.config.ts
    - tsconfig.json
    - tailwind.config.ts
    - postcss.config.mjs
    - .eslintrc.json
    - next-env.d.ts
    - app/layout.tsx
    - app/page.tsx
    - app/globals.css
  - **Notes**: Using Next.js 15.1.4 (latest), TypeScript 5, Tailwind CSS 3.4.17. Build verified successfully.

- [x] **Task 1.2**: Configure project structure (create directories and base files)
  - **Completed**: 2026-01-17
  - **Commit**: d4cf88e
  - **Directories Created**:
    - `posts/` - Article source files (with .gitkeep)
    - `components/` - React components (with .gitkeep)
    - `lib/providers/` - Utility functions and content layer (with .gitkeep)
  - **Notes**: Basic directory structure established for the blog

- [x] **Task 1.3**: Set up MDX support (install @next/mdx and configure)
  - **Completed**: 2026-01-17
  - **Commit**: 2c17e79
  - **Files Modified**:
    - `package.json` - Added MDX dependencies
    - `next.config.ts` - Configured @next/mdx with MDX support
    - `tsconfig.json` - Added .mdx and .md to include array
    - `mdx.d.ts` - Created TypeScript declarations for MDX files
  - **Dependencies Added**:
    - @next/mdx@^16.1.2
    - @mdx-js/loader@^3.1.1
    - @mdx-js/react@^3.1.1
    - @types/mdx@^2.0.13
  - **Notes**: MDX is now fully configured. TypeScript recognizes .mdx and .md files. Build verified successfully.

- [x] **Task 1.4**: Create first sample article in `/posts` directory with Frontmatter
  - **Completed**: 2026-01-17
  - **Commit**: f6899c5
  - **Files Created**:
    - `posts/2026-01-17-welcome-to-my-blog.md` - First sample blog post
  - **Frontmatter Schema**:
    - title: "欢迎来到我的技术博客"
    - date: "2026-01-17"
    - summary: Article description
    - tags: ["博客", "Next.js", "开篇"]
    - category: "博客相关"
    - draft: false
  - **Notes**: Sample article includes proper frontmatter with all required fields. Contains TypeScript, Python, and Rust code examples for testing code highlighting.

- [x] **Task 1.5**: Implement basic layout with dark theme (深灰色 + 橙色配色)
  - **Completed**: 2026-01-17
  - **Commit**: 5d20073
  - **Files Modified**:
    - `tailwind.config.ts` - Added comprehensive color palette with dark theme colors (#1a1a1a background, #f97316 orange accents)
    - `app/globals.css` - Simplified CSS with proper dark theme styling
    - `app/layout.tsx` - Added header with navigation, footer, and full page layout structure
    - `app/page.tsx` - Created styled homepage with hero section, sample article card, and features grid
  - **Color Palette**:
    - Background: #1a1a1a (primary), #242424 (secondary), #2d2d2d (tertiary)
    - Text: #e5e5e5 (primary), #a3a3a3 (secondary), #737373 (muted)
    - Accent: #f97316 (primary), #ea580c (hover), #c2410c (subtle)
    - Border: #404040, Divider: #262626
  - **Features**:
    - Sticky header with navigation links (首页, 关于)
    - Orange accent color for branding
    - Responsive layout with max-width container
    - Footer with copyright
    - Typography configuration for content rendering
  - **Notes**: Build verified successfully. Dark theme with orange accents is fully implemented across all components.

- [x] **Task 1.6**: Create article detail page at `/blog/[slug]` that renders MDX
  - **Completed**: 2026-01-17
  - **Commit**: 2bf15a6
  - **Files Created**:
    - `lib/content.ts` - Content utility functions for reading and parsing MDX files from posts/ directory
    - `components/mdx-content.tsx` - Client component for rendering Markdown with styled components
    - `app/blog/[slug]/page.tsx` - Dynamic route for article detail pages
  - **Files Modified**:
    - `app/page.tsx` - Updated to fetch and display articles dynamically from content.ts
  - **Dependencies Added**:
    - gray-matter@^4.0.3 - Frontmatter parsing
    - react-markdown@^9.0.1 - Markdown rendering
    - remark-gfm@^4.0.0 - GitHub Flavored Markdown support
    - rehype-raw@^7.0.0 - HTML rendering in Markdown
  - **Features**:
    - Static generation with `generateStaticParams` for all articles
    - SEO metadata generation per article
    - Frontmatter parsing (title, date, summary, tags, category, draft)
    - Markdown rendering with styled components (headings, paragraphs, lists, code blocks, etc.)
    - Back to home navigation
    - Article header with metadata display
    - Tag badges
    - Responsive layout
  - **Notes**: Build verified successfully. Articles are now rendered at `/blog/[slug]` URLs. The homepage displays a dynamic list of all published articles.

- [x] **Task 1.7**: Deploy to Vercel and verify basic build works
  - **Completed**: 2026-01-17
  - **Commit**: 3701530
  - **Files Created**:
    - `vercel.json` - Vercel deployment configuration
  - **Files Modified**:
    - `README.md` - Added comprehensive deployment documentation
  - **Features**:
    - Vercel deployment configuration with Next.js framework detection
    - README with deployment instructions (Vercel Dashboard + CLI methods)
    - Production build verified successfully (`npm run build`)
    - Static pages generated for homepage and article detail pages
    - Build output structure verified
  - **Notes**: Project is ready for Vercel deployment via GitHub integration. The build works locally with SSG generating static pages. Deploy via Vercel Dashboard by importing the GitHub repository, or use Vercel CLI after login.

- [x] **Task 2.1**: Implement content provider interface and local MDX implementation
  - **Completed**: 2026-01-17
  - **Commit**: a285e92
  - **Files Created**:
    - `lib/providers/types.ts` - Abstract ContentProvider interface and type definitions
    - `lib/providers/local-mdx.ts` - LocalMDXProvider class implementation with search support
  - **Files Modified**:
    - `lib/content.ts` - Refactored to use provider architecture, added async functions, maintained backward compatibility with sync wrappers
    - `app/blog/[slug]/page.tsx` - Updated to use async API
    - `app/page.tsx` - Updated to use async API
  - **Features**:
    - Abstract ContentProvider interface for future migration to Notion/Obsidian
    - LocalMDXProvider implementation with full CRUD operations
    - Search functionality with relevance scoring (title > tags > category > summary)
    - Reading time calculation (200 words/minute average)
    - Async API for all content operations
    - Backward compatibility with sync wrapper functions (deprecated)
    - Singleton provider instance for easy import
  - **Architecture**:
    ```
    lib/
    ├── content.ts (public API, re-exports from providers)
    └── providers/
        ├── types.ts (ContentProvider interface, Article types)
        └── local-mdx.ts (LocalMDXProvider class)
    ```
  - **Future Migration Path**:
    - Create `lib/providers/notion.ts` with `NotionProvider implements ContentProvider`
    - Update `lib/content.ts` to import from `notion.ts` instead of `local-mdx.ts`
    - No changes needed to consuming components (pages, components)
  - **Notes**: Build verified successfully. All existing functionality preserved. The new architecture provides a clean migration path to Notion/Obsidian in the future.

- [x] **Task 2.2/2.3/2.5**: Create article list page with ArticleCard component
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `components/article-card.tsx` - Reusable ArticleCard component with full metadata display
  - **Files Modified**:
    - `app/page.tsx` - Refactored to use ArticleCard component
  - **Features**:
    - ArticleCard component with comprehensive metadata display
    - Reading time display (calculated in LocalMDXProvider)
    - Date with calendar icon
    - Category indicator with orange dot
    - Tag badges with hover effects
    - Enhanced hover states (border color change, shadow effect)
    - Article count in section header
    - SVG icons for date and reading time
    - Group-based hover styling for text color transitions
  - **Styling**:
    - Hover effect: Border changes to orange (accent-primary)
    - Shadow effect: Subtle orange shadow on hover
    - Title color transition on hover
    - Tag badges get orange border on hover
  - **Notes**: Build verified successfully. ArticleCard is now a reusable component that can be used in other contexts (tag pages, search results, etc.)

- [x] **Task 2.4**: Implement Shiki code highlighting for code blocks
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `components/code-block.tsx` - CodeBlock component with react-syntax-highlighter
  - **Files Modified**:
    - `components/mdx-content.tsx` - Updated to use CodeBlock component
  - **Dependencies Added**:
    - react-syntax-highlighter@^15.6.1
    - @types/react-syntax-highlighter@^5.0.4
  - **Features**:
    - VSCode-quality syntax highlighting using PrismJS via react-syntax-highlighter
    - Support for 40+ programming languages including JavaScript, TypeScript, Python, Rust, Go, Java, C, C++, PHP, Ruby, Swift, Kotlin, Scala, Bash, CSS, SCSS, HTML, JSON, YAML, SQL, Dart, Vue, Svelte
    - Language alias normalization (js → javascript, ts → typescript, etc.)
    - Language label display in header
    - Copy button with visual feedback (shows "已复制!" after copying)
    - Dark theme (vscDarkPlus style) matching blog's color scheme
    - Responsive code blocks with horizontal scrolling
    - Fira Code monospace font for code display
  - **Styling**:
    - Header bar with language label and copy button
    - Orange accent color on copy button hover
    - Border around code block for visual separation
    - Proper padding and line height for readability
  - **Notes**: Build verified successfully. Code blocks now have professional syntax highlighting with a copy button. Used react-syntax-highlighter instead of Shiki for better client-side performance and smaller bundle size.

- [x] **Task 2.6**: Implement tag filtering functionality
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `components/tag-filter.tsx` - Client-side tag filter component with URL-based state
  - **Files Modified**:
    - `app/page.tsx` - Added searchParams prop and tag filtering logic
  - **Features**:
    - TagFilter component showing all available tags as clickable badges
    - URL-based filtering using search params (e.g., `/?tag=Next.js`)
    - Active tag highlighting with orange accent color
    - "Clear filter" link when a tag is selected
    - "全部" (All) button to show all articles
    - Article count updates based on current filter
    - Server-side rendering friendly (uses Next.js searchParams)
    - Empty state message when no articles match the selected tag
  - **Styling**:
    - Active tag: Orange background with white text
    - Inactive tag: Tertiary background with border, hover effect
    - Responsive layout with flex-wrap for tag list
    - Section title shows current filter state
  - **Technical Implementation**:
    - Uses Next.js 15 async searchParams for type-safe URL param handling
    - Client-side TagFilter component for interactivity (useSearchParams hook)
    - Case-insensitive tag matching
    - Maintains other URL params when filtering
  - **Notes**: Build verified successfully. Tag filtering is fully functional on the homepage. The URL-based approach ensures shareable links and SSR compatibility.

- [x] **Task 2.7**: Create tag page at `/blog/tag/[tag]`
  - **Completed**: 2026-01-17
  - **Commit**: bfb2c1f
  - **Files Created**:
    - `app/blog/tag/[tag]/page.tsx` - Dynamic route for tag pages
  - **Features**:
    - Static generation with `generateStaticParams` for all tags
    - SEO metadata generation per tag page
    - Tag-decoded URLs (supports Chinese characters)
    - Breadcrumb navigation (首页 / 标签 / [tag])
    - Article count display
    - ArticleCard component reuse for consistent styling
    - "Back to home" link
    - 404 handling for non-existent tags
    - Responsive layout with proper spacing
  - **URL Structure**:
    - Tag pages are accessible at `/blog/tag/[encoded-tag]`
    - Chinese tags are URL-encoded (e.g., `/blog/tag/%E5%8D%9A%E5%AE%A2`)
  - **Styling**:
    - Consistent with existing page design
    - Orange accent bar for header
    - Proper spacing and typography
  - **Notes**: Build verified successfully. Tag pages are generated at build time with SSG. The breadcrumb navigation provides clear context for users.

- [x] **Task 2.8**: Add About page
  - **Completed**: 2026-01-17
  - **Commit**: 6918699
  - **Files Created**:
    - `app/about/page.tsx` - About page with comprehensive information
  - **Features**:
    - Static page at `/about` with SEO metadata
    - Breadcrumb navigation (首页 / 关于)
    - Multiple content sections explaining the blog:
      - 博客初衷
      - 技术栈
      - 核心特性
      - 未来计划
      - 设计理念
      - 联系方式
    - Grid layout for tech stack and features
    - Icon badges for feature highlights
    - "返回首页" button with orange accent
    - Responsive layout with proper spacing
    - Consistent dark theme styling
  - **Styling**:
    - Orange accent bar for header
    - Secondary background cards for each section
    - Grid layout (2 columns on desktop, 1 on mobile)
    - SVG icons for visual elements
    - Proper typography hierarchy
  - **Notes**: Build verified successfully. The About page provides comprehensive information about the blog's purpose, tech stack, features, and design philosophy. The page is fully responsive and follows the established design patterns.

- [x] **Task 3.1**: Integrate FlexSearch for client-side search
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `lib/search.ts` - Search index utilities with FlexSearch integration
  - **Dependencies Added**:
    - flexsearch@0.7.43 - Fast client-side search library
    - @types/flexsearch@0.7.5 - TypeScript definitions
  - **Features**:
    - SearchIndex class wrapping FlexSearch.Document for easy use
    - Support for indexing title, summary, tags, category, and content fields
    - Full tokenization for Chinese and English content
    - Configurable search depth and relevance scoring
    - createSearchIndex() utility to build index from article metadata
    - generateSearchIndex() async function for build-time index generation
    - SearchResult interface with slug, title, summary, tags, category
  - **Configuration**:
    - Tokenization: 'full' for better matching
    - Threshold: 0 for exact matching
    - Depth: 3 for relevance scoring
    - Fields indexed: title, summary, tags, category, content
  - **Notes**: Build verified successfully. FlexSearch is now integrated and ready for client-side search. The SearchIndex class provides a clean API for indexing and searching articles. Next step is to generate the index at build time and create the search box component.

- [x] **Task 3.2**: Generate search index at build time
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `lib/search/build-index.ts` - Build-time search index generator with inverted index
    - `lib/search/client-search.ts` - Client-side search utilities for loading and searching the pre-built index
    - `lib/search/index.ts` - Search module exports
    - `lib/search/search-legacy.ts` - Renamed from lib/search.ts for backward compatibility
  - **Files Modified**:
    - `package.json` - Added build:search script and tsx dependency
  - **Dependencies Added**:
    - tsx@^4.21.0 - TypeScript execution for build scripts
  - **Features**:
    - Build-time search index generation using npm run build:search
    - Inverted index for efficient client-side search (token → article slugs mapping)
    - Full-text search support with Chinese character and bigram tokenization
    - ClientSearchIndex class for loading and searching the pre-built index
    - Singleton pattern for search index instance
    - Search index JSON file output to public/search-index.json
    - Build script integration (npm run build runs build:search automatically)
  - **Technical Implementation**:
    - Reads all articles from content provider
    - Extracts full content from Markdown files
    - Strips code blocks and markdown syntax for clean search
    - Tokenizes text supporting both English and Chinese
    - Chinese tokenization: individual characters + bigrams
    - Creates inverted index mapping tokens to article slugs
    - Client-side search loads index via fetch API
    - Scores results based on token frequency
  - **Output**:
    - public/search-index.json containing:
      - articles: Array of SearchableArticle with full content
      - indexed: Map from token to article slugs
  - **Notes**: Build verified successfully. Search index is generated at build time and served as static JSON. The client-side search utilities are ready for integration with the search box component. Index contains 429 unique tokens for 1 article. Next step is to create the search box component.

- [x] **Task 3.3**: Create search box component with live results
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `components/search-box.tsx` - Interactive search box component with live results
    - `lib/search/types.ts` - Shared types for search functionality
    - `lib/content-sync.ts` - Moved sync wrappers to separate file to avoid client-side bundling issues
  - **Files Modified**:
    - `app/layout.tsx` - Integrated SearchBox into header navigation
    - `lib/search/client-search.ts` - Updated to use shared types
    - `lib/search/build-index.ts` - Updated to use shared types
    - `lib/search/index.ts` - Cleaned up exports, removed build-time imports from client bundle
    - `lib/content.ts` - Removed sync wrappers with `fs` imports to avoid client-side bundling
  - **Features**:
    - SearchBox component with live search results dropdown
    - Real-time search with debouncing (200ms)
    - Search results display with title, summary, date, reading time
    - Keyboard navigation support (Arrow keys, Enter, Escape)
    - Click outside to close dropdown
    - Clear search button (X) when input has text
    - Empty state with helpful message when no results found
    - Loading spinner during search
    - Responsive dropdown with max-height and scrolling
    - Styled to match blog's dark theme with orange accents
    - Integrated into header navigation, hidden on small mobile screens
  - **Technical Implementation**:
    - Client-side component ("use client")
    - Uses ClientSearchIndex singleton for search
    - Loads search index from /search-index.json on first search
    - Debounced search to avoid excessive queries
    - Keyboard accessibility with arrow key navigation
    - Click outside handler using useRef and event listeners
  - **Bug Fixes**:
    - Fixed module bundling issue by creating separate types.ts file
    - Removed sync wrappers from content.ts that were pulling Node.js modules into client bundle
    - Removed legacy search-legacy.ts file that was importing from content.ts
    - Used type-only imports to prevent tree-shaking issues
  - **Styling**:
    - Consistent with blog's dark theme (#1a1a1a background, #f97316 orange accents)
    - Tertiary background for search input
    - Secondary background for dropdown results
    - Hover effects on results (tertiary background)
    - Arrow icon for navigation indicator
    - Proper z-index layering (dropdown above content)
    - Mobile responsive (hidden on small screens)
  - **Notes**: Build verified successfully. Search box is fully functional with live search results. The search index loads on demand and results appear instantly as you type. Keyboard navigation allows quick selection of results.

- [x] **Task 3.5**: Implement article table of contents (TOC)
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `lib/toc.ts` - TOC extraction utilities with heading ID generation
    - `components/table-of-contents.tsx` - Interactive TOC component with active tracking
  - **Files Modified**:
    - `components/mdx-content.tsx` - Added IDs to all headings (h1-h4) for TOC linking
    - `app/blog/[slug]/page.tsx` - Integrated TableOfContents component
  - **Features**:
    - Auto-extraction of headings from Markdown content
    - URL-friendly ID generation for headings (supports Chinese characters)
    - Fixed TOC sidebar on desktop (hidden on mobile/tablet)
    - Intersection Observer for active heading tracking
    - Click-to-scroll with smooth scrolling and header offset
    - Collapsible TOC section
    - Hierarchical indentation based on heading level
    - Active heading highlighting with orange accent color
    - `scroll-mt-24` CSS for proper scroll offset
  - **Styling**:
    - Fixed position on the right side of article content
    - Orange accent for active heading
    - Hover effects for inactive headings
    - Proper spacing and indentation for hierarchy
    - Hidden on smaller screens (lg breakpoint)
  - **Technical Implementation**:
    - Client-side component ("use client")
    - Uses Intersection Observer API for efficient scroll tracking
    - Generates unique IDs from heading text (removes markdown syntax)
    - Captures ref value properly for React Hook cleanup
    - Smooth scroll with header offset calculation
  - **Notes**: Build verified successfully. TOC is fully functional with active heading tracking and smooth scrolling. The component only renders on desktop screens (lg breakpoint) to save space on mobile devices.

- [x] **Task 3.6**: Add smooth scrolling for TOC links
  - **Completed**: 2026-01-17
  - **Commit**: TBD (included with Task 3.5)
  - **Notes**: Already implemented with Task 3.5 - smooth scrolling is included in the TOC component

- [x] **Task 3.7**: Add "Back to top" button
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `components/back-to-top.tsx` - Back to top button component
  - **Files Modified**:
    - `app/layout.tsx` - Added BackToTop component and smooth scrolling to html
  - **Features**:
    - Fixed position button at bottom-right corner
    - Appears after scrolling down 300px
    - Smooth scroll animation to top
    - Fade-in/slide-up animation when appearing
    - Fade-out animation when hidden
    - Orange accent color matching blog theme
    - Circular button with up arrow icon
    - Proper accessibility with aria-label
    - Pointer events disabled when hidden
  - **Styling**:
    - Fixed position (bottom-8 right-8)
    - Orange background (accent-primary) with hover state
    - White text and icon
    - Smooth transition animations (300ms)
    - Shadow effect for elevation
    - Responsive size (w-12 h-12)
  - **Technical Implementation**:
    - Client-side component ("use client")
    - Uses useState for visibility tracking
    - useEffect with scroll event listener
    - Proper cleanup of event listener
    - window.scrollTo with behavior: 'smooth'
    - Tailwind's scroll-smooth utility class on html element
  - **Notes**: Build verified successfully. Back to top button appears smoothly when scrolling down and provides smooth scroll animation back to top. The button is integrated into root layout so it appears on all pages.

### In Progress

None

### Pending

### Phase 2: Core Features (MVP)

**All tasks completed!**

### Phase 3: Search & Navigation

**All tasks completed!**

- [x] **Task 3.1**: Integrate FlexSearch for client-side search
- [x] **Task 3.2**: Generate search index at build time
- [x] **Task 3.3**: Create search box component with live results
- [x] **Task 3.4**: Add keyboard shortcut for search (Cmd+K)
- [x] **Task 3.5**: Implement article table of contents (TOC)
- [x] **Task 3.6**: Add smooth scrolling for TOC links
- [x] **Task 3.7**: Add "Back to top" button

### Phase 4: Responsive Design & Polish

- [x] **Task 4.1**: Implement mobile-first responsive design for all pages
  - **Completed**: 2026-01-17
  - **Commit**: c586aa0
  - **Files Modified**:
    - `app/layout.tsx` - Mobile navigation with separate mobile nav bar, responsive header/footer
    - `app/page.tsx` - Responsive hero section, features grid (1→2→3 columns), spacing
    - `components/article-card.tsx` - Responsive padding, text sizes, icon sizes, tag badges
    - `app/blog/[slug]/page.tsx` - Mobile-optimized typography, spacing, prose sizing
    - `components/mdx-content.tsx` - Mobile prose (sm/base), responsive headings, table overflow
    - `components/code-block.tsx` - Mobile font size, horizontal scroll, hide "复制" text on mobile
    - `components/search-box.tsx` - Responsive sizing, smaller dropdown on mobile
    - `components/back-to-top.tsx` - Smaller button on mobile (10→12), adjusted positioning
    - `components/tag-filter.tsx` - Responsive tag badges, truncated text on mobile
    - `app/blog/tag/[tag]/page.tsx` - Mobile breadcrumb, spacing
    - `app/about/page.tsx` - Responsive grids, cards, icons, spacing
  - **Breakpoints Used**:
    - `sm:` (640px) - Small tablets and large phones
    - `md:` (768px) - Tablets
    - `lg:` (1024px) - Small laptops
    - Base styles (default) - Mobile-first approach (< 640px)
  - **Mobile Optimizations**:
    - Reduced padding and spacing on mobile (px-3 vs px-4 sm:px-6)
    - Smaller text sizes (text-sm sm:text-base)
    - Responsive typography (text-2xl sm:text-3xl md:text-4xl)
    - Mobile navigation bar below main header (visible on small screens)
    - Touch-friendly sizing (min 44px for touch targets)
    - Horizontal scroll for code blocks and tables
    - Truncated text for long content (max-w-[120px] sm:max-w-none)
  - **Notes**: Build verified successfully. All pages now have comprehensive mobile-first responsive design with proper breakpoints for all screen sizes.
- [x] **Task 4.2**: Add mobile navigation menu (hamburger menu)
  - **Completed**: 2026-01-17
  - **Commit**: c6a80c2
  - **Files Created**:
    - `components/mobile-nav.tsx` - Mobile navigation component with hamburger menu
  - **Files Modified**:
    - `app/layout.tsx` - Integrated MobileNav component, removed always-visible mobile nav, hid search on mobile
  - **Features**:
    - Hamburger icon (three lines) that transforms to X when menu is open
    - Slide-in panel from right side with smooth animations
    - Backdrop blur overlay when menu is open
    - Touch-friendly menu items with proper sizing
    - Click outside to close functionality
    - Prevent body scroll when menu is open
    - Auto-close on route change
    - Close button in menu header
    - Menu footer with branding text
    - Full accessibility support (aria-labels, semantic HTML)
    - Orange accent color on hover states
    - Responsive menu width (w-64 max-w-[80vw])
    - Icon rotation animation when opening/closing
  - **Technical Implementation**:
    - Client-side component ("use client")
    - useState for open/close state
    - useRef for click outside detection
    - useEffect for event listeners and cleanup
    - CSS transitions for smooth animations (translate-x, opacity)
    - Prevents body scroll when menu is open (overflow: hidden)
    - Proper z-index layering (z-50 for overlay)
  - **Styling**:
    - Hamburger button with hover effects
    - Slide-in animation with transform and opacity
    - Backdrop with blur effect (backdrop-blur-sm)
    - Secondary background for menu panel
    - Border separator for header and footer
    - Orange accent color for active states
    - Proper spacing and touch targets (min 44px)
  - **Mobile UX Improvements**:
    - Search box hidden on mobile to save space
    - Hamburger menu always visible on small screens
    - Smooth slide-in animation from right
    - Dark backdrop for focus
    - Easy to close (X button, click outside, or route change)
  - **Notes**: Build verified successfully. Mobile navigation menu is fully functional with smooth animations and proper touch interactions. The menu follows the blog's dark theme with orange accents.

- [x] **Task 4.3**: Optimize typography for mobile reading
  - **Completed**: 2026-01-17
  - **Commit**: c24c6f9
  - **Files Modified**:
    - `app/globals.css` - Added comprehensive mobile typography optimization
    - `components/mdx-content.tsx` - Updated typography classes for better mobile reading
    - `app/blog/[slug]/page.tsx` - Improved article header and content typography
  - **Features**:
    - Mobile-optimized font sizes (16px base on mobile, larger on desktop)
    - Improved line heights for better readability (1.75 on mobile, 1.8 for Chinese text)
    - Letter spacing optimization for mobile screens
    - Reading width optimization (65ch max on desktop, 100% on mobile)
    - Text selection styling with orange accent color
    - Touch-friendly link spacing for mobile
    - Balanced text wrapping for headings (text-balance utility)
    - Chinese character optimization (lang-specific line heights and spacing)
    - Responsive prose sizes (prose-base on mobile, prose-lg on desktop)
    - Enhanced inline code font sizes
  - **CSS Optimizations**:
    - Text size adjust controls to prevent mobile zoom
    - Mobile-specific media queries for typography
    - Reading width utility class for optimal comprehension
    - Leading-relaxed-mobile utility for better line spacing
    - Language-specific optimizations for Chinese text (zh, zh-CN, zh-TW)
  - **MDX Content Improvements**:
    - Headings now use text-balance for better line breaking
    - Paragraphs use leading-relaxed-mobile and reading-width
    - Lists have better spacing (space-y-2 on mobile, space-y-2.5 on desktop)
    - Blockquotes have better padding and line height
    - Links use break-words instead of break-all for better flow
    - Table cell sizes increased for better readability
  - **Article Page Improvements**:
    - Title has better line-height (leading-tight) and text-balance
    - Metadata text sizes increased (text-sm sm:text-base)
    - Summary paragraph uses leading-relaxed-mobile
    - Tag badges have better sizing (text-xs sm:text-sm)
    - Prose size changed to prose-base sm:prose-lg
  - **Technical Implementation**:
    - Mobile-first approach with responsive breakpoints
    - Custom Tailwind utilities for typography optimization
    - CSS custom properties for consistent theming
    - Proper text selection styling with brand colors
  - **Notes**: Build verified successfully. Typography is now optimized for mobile reading with better font sizes, line heights, letter spacing, and reading width. Chinese characters receive special treatment for optimal readability.

- [x] **Task 4.4**: Add loading states and skeleton screens
  - **Completed**: 2026-01-17
  - **Commit**: 421ce3f
  - **Files Created**:
    - `components/skeletons/article-card.tsx` - ArticleCard skeleton component
    - `components/skeletons/text.tsx` - Text skeleton components (HeadingSkeleton, ParagraphSkeleton, TextLineSkeleton)
    - `components/skeletons/search-result.tsx` - Search result skeleton component
    - `components/skeletons/index.ts` - Centralized export for all skeleton components
    - `app/loading.tsx` - Global loading state for the entire application
    - `app/blog/[slug]/loading.tsx` - Article page loading state
    - `app/blog/tag/[tag]/loading.tsx` - Tag page loading state
  - **Files Modified**:
    - `app/globals.css` - Added shimmer animation keyframes and animate-shimmer utility class
  - **Features**:
    - Global loading state that shows while any page is loading
    - Article-specific loading state with content structure skeleton
    - Tag page loading state with breadcrumb and article list skeleton
    - Reusable skeleton components for article cards, text elements, and search results
    - Shimmer animation effect using CSS gradients
    - Responsive skeleton layouts matching actual component structure
    - Consistent styling with blog's dark theme (#2d2d2d tertiary background)
  - **Skeleton Components**:
    - ArticleCardSkeleton: Individual article card placeholder with title, summary, metadata, and tags
    - ArticleCardSkeletonList: Multiple article card skeletons (configurable count)
    - HeadingSkeleton: Heading placeholder for h1-h6 elements
    - ParagraphSkeleton: Multi-line paragraph placeholder with configurable line count
    - TextLineSkeleton: Single-line text placeholder with configurable width
    - SearchResultSkeleton: Search result dropdown item placeholder
    - SearchResultSkeletonList: Multiple search result skeletons
  - **Loading States**:
    - Global loading (app/loading.tsx): Shows hero section, tag filter, article list, and features section skeletons
    - Article loading (app/blog/[slug]/loading.tsx): Shows back link, article header (title, metadata, summary, tags), content blocks with code placeholders, and footer
    - Tag page loading (app/blog/tag/[tag]/loading.tsx): Shows breadcrumb, tag header, and article list skeletons
  - **Animation**:
    - CSS shimmer animation with gradient effect (#2d2d2d to #3d3d3d)
    - Smooth 2-second infinite animation loop
    - Applied to all skeleton elements via Tailwind's animate-pulse class
    - Optional animate-shimmer class for enhanced gradient effect
  - **Technical Implementation**:
    - Next.js App Router loading.tsx files for automatic loading state management
    - Reusable skeleton components with consistent styling
    - Responsive design matching actual components (sm:, md:, lg: breakpoints)
    - Proper accessibility with semantic HTML structure
    - Type-safe props with TypeScript interfaces
  - **Notes**: Build verified successfully. Loading states and skeleton screens are now fully implemented across all pages. The skeletons match the actual component structure and provide visual feedback during data fetching. The shimmer animation creates a polished loading experience.

- [x] **Task 4.5**: Add 404 page
  - **Completed**: 2026-01-17
  - **Commit**: 6de980c
  - **Files Created**:
    - `app/not-found.tsx` - Custom 404 page component
  - **Features**:
    - Large 404 heading with orange accent color (#f97316)
    - Clear error message in Chinese ("页面未找到")
    - Helpful description explaining the page might not exist or was moved
    - Sad face illustration with SVG icon in a styled container
    - Two action buttons:
      - "返回首页" (Return to Home) with primary orange styling
      - "关于博客" (About Blog) with secondary styling
    - Helpful suggestions list for users:
      - Check URL spelling
      - Use search box
      - Browse homepage article list
      - Filter by tags
    - Responsive design with mobile-first approach
    - Consistent dark theme styling (tertiary background, border colors)
    - SEO metadata (title and description)
    - Centered layout with proper spacing
    - Hover effects on buttons
    - SVG icons for visual elements
  - **Styling**:
    - 404 heading: text-8xl sm:text-9xl with accent-primary color
    - Error message: text-2xl sm:text-3xl with proper hierarchy
    - Buttons: Full width on mobile, inline on desktop (flex-col sm:flex-row)
    - Suggestions card: Tertiary background with border
    - Proper spacing and visual hierarchy
  - **Technical Implementation**:
    - Next.js App Router not-found.tsx file for automatic 404 handling
    - Static rendering (○ 133 B)
    - TypeScript for type safety
    - Link components for internal navigation
    - Metadata export for SEO
  - **Notes**: Build verified successfully. The custom 404 page provides a user-friendly experience when navigating to non-existent URLs, with clear navigation options back to main content. The page follows the blog's design language with dark theme and orange accents.

- [x] **Task 4.6**: Add image optimization (next/image)
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `components/mdx-image.tsx` - Optimized MDX image component with Next.js Image
  - **Files Modified**:
    - `next.config.ts` - Added image optimization configuration
    - `components/mdx-content.tsx` - Integrated MDXImage component
    - `posts/2026-01-17-welcome-to-my-blog.md` - Added sample image for testing
  - **Features**:
    - Automatic image optimization using Next.js Image component
    - AVIF and WebP format support for modern browsers
    - Responsive image sizes for different devices
    - Lazy loading for better performance
    - Loading skeleton animation while image loads
    - Error handling with fallback UI
    - Image caption support via title attribute
    - External image support with remote patterns configuration
    - Consistent styling matching blog's dark theme
  - **Image Configuration**:
    - Remote patterns: All HTTPS domains supported
    - Formats: AVIF, WebP (with fallback)
    - Device sizes: 640, 750, 828, 1080, 1200, 1920, 2048, 3840
    - Image sizes: 16, 32, 48, 64, 96, 128, 256, 384
  - **Styling**:
    - Responsive container with proper margins
    - Rounded corners matching blog design
    - Tertiary background during loading (pulse animation)
    - Centered caption in muted text color
    - Error state with clear messaging
  - **Technical Implementation**:
    - Client-side component ("use client")
    - Next.js Image component with proper width/height
    - Sizes attribute for responsive images
    - State management for loading and error states
    - Graceful error handling
  - **Usage**:
    - Markdown syntax: `![alt text](image_url "Title")`
    - Supports both local and external images
    - Title attribute becomes caption below image
  - **Notes**: Build verified successfully. Images in Markdown content are now automatically optimized using Next.js Image component with AVIF/WebP support, responsive sizing, lazy loading, and proper error handling.

- [x] **Task 4.8**: Add favicon and meta tags for SEO
  - **Completed**: 2026-01-17
  - **Commit**: eb69149
  - **Files Created**:
    - `app/icon.tsx` - Favicon icon generator (32x32 PNG)
    - `app/apple-icon.tsx` - Apple touch icon generator (180x180 PNG)
    - `app/opengraph-image.tsx` - Open Graph image generator (1200x630 PNG)
    - `app/twitter-image.tsx` - Twitter Card image generator (1200x600 PNG)
    - `app/sitemap.ts` - Dynamic sitemap generator for all pages, articles, and tags
    - `app/robots.ts` - Robots.txt configuration
  - **Files Modified**:
    - `app/layout.tsx` - Added comprehensive SEO meta tags (Open Graph, Twitter Cards, robots, verification)
    - `app/blog/[slug]/page.tsx` - Added article-specific SEO metadata and structured data
  - **Features**:
    - Dynamic favicon generation using Next.js Image Response API
    - Comprehensive meta tags for SEO:
      - Title with template for all pages
      - Description and keywords
      - Author and publisher information
      - Format detection (disable automatic phone/link detection)
    - Open Graph meta tags for social media sharing:
      - OG type (website/article)
      - OG title, description, URL
      - OG images (1200x630)
      - Site name
    - Twitter Card meta tags:
      - Card type (summary_large_image)
      - Twitter-specific images (1200x600)
      - Creator handle placeholder
    - Robots meta tags:
      - Index/follow settings
      - Google Bot specific settings
      - Max snippet/video/image preview settings
    - Canonical URL configuration
    - Search engine verification placeholders (Google, Yandex)
    - Dynamic sitemap generation:
      - Includes homepage, about page
      - Includes all blog articles
      - Includes all tag pages
      - Auto-updates with new content
    - Robots.txt configuration:
      - Allow all crawlers
      - Disallow API and admin routes
      - Sitemap reference
    - Structured data (JSON-LD):
      - WebSite schema for root layout
      - BlogPosting schema for article pages
      - SearchAction schema for site search
      - Organization and Person schemas
  - **Meta Tags Added**:
    - metadataBase URL for absolute URLs
    - Title template for consistent page titles
    - Keywords for search engines
    - Author and publisher information
    - Open Graph (Facebook, LinkedIn, etc.)
    - Twitter Cards
    - Robots directives
    - Canonical URLs
    - Verification codes (placeholders)
  - **Structured Data**:
    - WebSite schema with search action
    - BlogPosting schema for articles
    - Organization and Person schemas
    - Proper @context and @type definitions
  - **Notes**: Build verified successfully. The blog now has comprehensive SEO meta tags, favicons, Open Graph images for social media sharing, dynamic sitemap, robots.txt, and structured data (JSON-LD) for search engines. Users should update the placeholder URLs (yourdomain.com, @yourusername, verification codes) with their actual values.

- [ ] **Task 4.7**: Implement dark/light theme toggle (optional)

### Phase 5: Advanced Features

- [x] **Task 5.1/5.2**: Integrate KaTeX for math formula rendering
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `components/math-block.tsx` - MathBlock component for KaTeX rendering
    - `posts/2026-01-17-math-formula-test.md` - Test article with math formulas
  - **Files Modified**:
    - `components/mdx-content.tsx` - Added remark-math and rehype-katex plugins
  - **Dependencies Added**:
    - katex@0.16.11 - LaTeX math rendering library
    - react-katex@3.0.1 - React component wrapper for KaTeX
    - @types/katex@0.16.7 - TypeScript definitions for KaTeX
    - remark-math@6.0.0 - Remark plugin for parsing math syntax
    - rehype-katex@7.0.1 - Rehype plugin for rendering KaTeX
  - **Features**:
    - Inline math support using `$...$` syntax
    - Block math support using `$$...$$` syntax
    - Full LaTeX math syntax support via KaTeX
    - Automatic font loading with KaTeX CSS
    - Error handling for invalid formulas
    - Responsive sizing for mobile and desktop
  - **Math Syntax Supported**:
    - Basic operations: $E = mc^2$, $a^2 + b^2 = c^2$
    - Fractions: $\frac{a}{b}$
    - Integrals: $\int_{a}^{b} f(x) dx$
    - Summations: $\sum_{i=1}^{n} i$
    - Matrices: $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$
    - And many more LaTeX commands
  - **Test Article Contents**:
    - Inline formulas (E=mc², Euler's formula)
    - Block formulas (quadratic formula, integrals, matrices)
    - Complex examples (Fourier transform, Schrödinger equation)
    - Chinese text with math formulas
  - **Technical Implementation**:
    - remark-math plugin parses `$` and `$$` delimiters in Markdown
    - rehype-katex plugin converts math AST to KaTeX HTML
    - KaTeX CSS loaded via ES import in mdx-content.tsx
    - Math formulas rendered server-side at build time (static HTML)
    - No client-side JavaScript needed for math rendering
  - **Notes**: Build verified successfully. KaTeX is now integrated and fully functional. Math formulas can be written using standard LaTeX syntax with `$` for inline and `$$` for block display. The test article demonstrates various math capabilities.

- [x] **Task 5.3**: Integrate Mermaid for diagrams
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `components/mermaid-diagram.tsx` - MermaidDiagram component for rendering diagrams
    - `posts/2026-01-17-mermaid-diagram-test.md` - Test article with various diagram types
  - **Files Modified**:
    - `components/mdx-content.tsx` - Added MermaidDiagram component import and handler
  - **Dependencies Added**:
    - mermaid@11.6.0 - Diagram and charting library
  - **Features**:
    - Mermaid code block detection in Markdown (`mermaid ... `)
    - Client-side rendering using Mermaid.js
    - Dark theme with custom colors matching blog's design
    - Error handling with user-friendly error messages
    - Syntax validation before rendering
    - Responsive diagram containers with horizontal scrolling
  - **Supported Diagram Types**:
    - Flowcharts (flowchart TD/LR)
    - Sequence Diagrams (sequenceDiagram)
    - State Diagrams (stateDiagram-v2)
    - Class Diagrams (classDiagram)
    - Entity Relationship Diagrams (erDiagram)
    - Gantt Charts (gantt)
    - Pie Charts (pie)
    - Git Graphs (gitGraph)
    - Mindmaps (mindmap)
    - Timelines (timeline)
  - **Test Article Contents**:
    - Basic and complex flowcharts
    - User login sequence diagram
    - Order status state diagram
    - Blog system class diagram
    - Database ER diagram
    - Project development Gantt chart
    - Tech stack pie chart
    - Version control Git graph
    - Blog architecture mindmap
    - Project timeline
  - **Technical Implementation**:
    - Client-side component ("use client")
    - Mermaid initialized once using module-level flag
    - Dark theme configuration with custom colors
    - SVG rendering injected into container div
    - Error boundaries with expandable code view
    - Horizontal scrolling for wide diagrams
  - **Theme Customization**:
    - Background: #2d2d2d (tertiary background)
    - Primary color: #f97316 (orange accent)
    - Text: #e5e5e5 (primary text)
    - Border: #f97316 (orange)
    - Lines: #a3a3a3 (secondary text)
  - **Styling**:
    - Centered diagram display
    - Horizontal scroll support for mobile
    - Minimum height for loading state
    - Responsive padding (my-4 sm:my-6)
    - Error state with red border and expandable code
  - **Notes**: Build verified successfully. Mermaid is now integrated and fully functional. Diagrams can be created using Markdown code blocks with the `mermaid` language identifier. The test article demonstrates all major diagram types with Chinese text support.

- [x] **Task 5.4**: Add syntax highlighting for Mermaid code blocks
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Modified**:
    - `components/mermaid-diagram.tsx` - Added syntax highlighted code view toggle
  - **Features**:
    - Toggle button to switch between rendered diagram and syntax highlighted code
    - Header bar showing "Mermaid Diagram" label with toggle button
    - "查看代码" (View Code) button shows syntax highlighted Mermaid code
    - "查看图表" (View Diagram) button returns to rendered diagram view
    - Uses react-syntax-highlighter for Mermaid syntax highlighting
    - Consistent styling with code blocks (header bar, rounded corners, borders)
    - VSCode Dark Plus theme for syntax highlighting
    - Responsive design with proper mobile sizing
  - **Styling**:
    - Header bar with language label and toggle button
    - Orange accent color on toggle button hover
    - Border around diagram/code container
    - Rounded corners matching blog design
    - Syntax highlighting with PrismJS mermaid support
  - **Technical Implementation**:
    - useState for showCode toggle state
    - Conditional rendering based on showCode state
    - SyntaxHighlighter component for code view
    - Existing mermaid rendering for diagram view
  - **Notes**: Build verified successfully. Mermaid diagrams now have a toggle button to view the raw Mermaid source code with syntax highlighting. This is useful for users who want to see or copy the diagram definition.

- [x] **Task 5.5**: Add related articles section at bottom of articles
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `components/related-articles.tsx` - RelatedArticles component
  - **Files Modified**:
    - `lib/content.ts` - Added getRelatedArticles function
    - `app/blog/[slug]/page.tsx` - Integrated RelatedArticles component
  - **Features**:
    - Smart related article recommendation based on:
      - Shared tags (highest priority: 10 points per shared tag)
      - Same category (medium priority: 5 points)
      - Recency bonus (lower priority: decreases over time)
    - Excludes current article from recommendations
    - Configurable limit (default: 3 articles)
    - Responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop)
    - Article cards showing title, date, reading time, summary, and tags
    - "View all articles" link at bottom
    - Hover effects with orange accent color
    - Consistent styling with blog's dark theme
  - **Styling**:
    - Section header with icon and "相关文章" title
    - Grid layout with responsive breakpoints (md:grid-cols-2 lg:grid-cols-3)
    - Article cards with tertiary background and border
    - Hover effects: border color change, shadow effect, title color change
    - Arrow icon that slides on hover ("阅读更多")
    - Truncated text (line-clamp-2) for titles and summaries
    - Tag badges with overflow indicator (+N for extra tags)
  - **Technical Implementation**:
    - Server-side function in lib/content.ts for scoring and ranking
    - Scoring algorithm: shared tags > same category > recency
    - Async function integrated into article detail page
    - Component receives related articles as props
    - No client-side JavaScript for recommendations (SSG)
  - **Notes**: Build verified successfully. Related articles section now appears at the bottom of each article, recommending content based on shared tags and categories. The scoring algorithm ensures the most relevant articles appear first.

- [x] **Task 5.6**: Implement reading time estimation
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Modified**:
    - `app/blog/[slug]/page.tsx` - Added reading time display to article detail page
  - **Features**:
    - Reading time calculation based on ~200 words per minute average
    - Excludes code blocks and inline code from word count
    - Displayed on homepage article cards with clock icon
    - Displayed on article detail page header with clock icon
    - Shown as "X 分钟阅读" format
    - Consistent styling with other metadata (date, category)
  - **Technical Implementation**:
    - calculateReadingTime() function in lib/providers/local-mdx.ts
    - Removes code blocks (`...`) and inline code (`...`)
    - Converts markdown links to plain text
    - Splits by whitespace to count words
    - Returns minimum 1 minute, rounded up
  - **Notes**: Build verified successfully. Reading time estimation was already implemented in the content provider and homepage cards. This task added reading time display to the article detail page header for consistency.

- [x] **Task 5.7**: Add copy button to code blocks
  - **Completed**: 2026-01-17 (as part of Task 2.4)
  - **Commit**: TBD (see Task 2.4 commit)
  - **Notes**: Copy button was already implemented as part of Task 2.4 (CodeBlock component). The copy button includes:
    - Click-to-copy functionality using navigator.clipboard API
    - Visual feedback with "已复制!" message and checkmark icon
    - 2-second timeout before reverting to original state
    - Orange accent color on hover
    - Hidden "复制" text on mobile (icon only)
    - Accessibility with aria-label="Copy code"

### Phase 6: Deployment & CI/CD

- [x] **Task 6.1**: Configure Vercel project with GitHub integration
  - **Completed**: 2026-01-17
  - **Commit**: 8d60d44
  - **Files Created**:
    - `.github/workflows/ci.yml` - GitHub Actions CI workflow
  - **Files Modified**:
    - `vercel.json` - Enhanced with comprehensive production configuration
    - `README.md` - Updated with deployment instructions
    - `docs/PRD.md` - Marked Task 5.7 as complete
    - `docs/PROGRESS.md` - Updated progress tracking
  - **Features**:
    - Enhanced Vercel configuration:
      - JSON schema validation with $schema field
      - Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy)
      - Cache control headers for fonts, images, and static assets (1-year immutable cache)
      - Environment variable configuration (NEXT_PUBLIC_SITE_URL)
      - Git deployment settings for main branch
      - Redirect configuration (feed.xml → rss.xml)
    - GitHub Actions CI workflow:
      - Type checking job using tsc
      - Linting job using ESLint
      - Build job with artifact upload
      - Triggers on push to main, pull requests, and manual workflow dispatch
      - Concurrency control to cancel duplicate runs
    - Comprehensive README updates:
      - Three deployment options (Vercel Dashboard, Vercel CLI, GitHub Integration)
      - Step-by-step GitHub integration instructions
      - Automatic deployment workflow documentation
      - Pre-deployment checks explanation
      - Complete project structure overview
      - Environment variables documentation
      - Scripts reference
      - Tech stack summary
  - **Vercel Configuration Details**:
    - Build command: npm run build
    - Output directory: .next
    - Framework: nextjs (auto-detected)
    - Install command: npm install
    - Dev command: npm run dev
  - **Security Headers Added**:
    - X-Content-Type-Options: nosniff
    - X-Frame-Options: DENY
    - X-XSS-Protection: 1; mode=block
    - Referrer-Policy: strict-origin-when-cross-origin
  - **Cache Control Policies**:
    - Fonts: public, max-age=31536000, immutable
    - Images: public, max-age=31536000, immutable
    - PNG/JPG/WebP/AVIF: public, max-age=31536000, immutable
  - **Notes**: Build verified successfully. The project is now fully configured for Vercel deployment with GitHub integration. The CI workflow ensures code quality before deployment. Users can now deploy via Vercel Dashboard, Vercel CLI, or through automatic GitHub integration. Next step is Task 6.2: Set up automatic deployment on push to main branch (this requires connecting the GitHub repository in Vercel dashboard).

- [x] **Task 6.2**: Set up automatic deployment on push to main branch
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Modified**:
    - `README.md` - Updated documentation to clarify automatic deployment is already configured
  - **Features**:
    - Verified automatic deployment configuration in vercel.json
    - `git.deploymentEnabled.main: true` enables automatic deployments
    - Updated README.md with clear documentation about automatic deployment
    - No additional code changes needed - configuration was already complete in Task 6.1
  - **User Action Required**:
    - Connect GitHub repository to Vercel via Vercel dashboard
    - This is a manual step: Go to Vercel → Add New Project → Import GitHub repo
    - Once connected, automatic deployments work immediately on push to main
  - **Notes**: Automatic deployment is fully configured via vercel.json. The `git.deploymentEnabled.main: true` setting ensures that pushes to the main branch trigger automatic Vercel deployments. Users just need to connect their GitHub repository in the Vercel dashboard for this to take effect. No code changes were required.

- [x] **Task 6.3**: Add build optimization (bundle analysis)
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `.env.example` - Environment variables example file
    - `docs/BUILD_OPTIMIZATION.md` - Comprehensive build optimization guide
  - **Files Modified**:
    - `next.config.ts` - Added bundle analyzer plugin and build optimizations
    - `package.json` - Added build:analyze and type-check scripts
  - **Dependencies Added**:
    - @next/bundle-analyzer@^16.1.2
  - **Features**:
    - Bundle analyzer integration with @next/bundle-analyzer
    - New build script: `npm run build:analyze` for bundle analysis
    - Type checking script: `npm run type-check` for pre-deployment validation
    - React Strict Mode enabled for better development experience
    - Production source maps disabled for smaller bundles and better security
    - Modular imports configured for react-markdown to reduce bundle size
    - Environment variable documentation (.env.example)
    - Comprehensive build optimization documentation
  - **Build Optimizations Configured**:
    - Bundle analyzer with ANALYZE environment variable
    - React Strict Mode (reactStrictMode: true)
    - Production source maps disabled (productionBrowserSourceMaps: false)
    - Modular imports for react-markdown
  - **Scripts Added**:
    - `build:analyze`: Run build with bundle analysis enabled
    - `type-check`: TypeScript type checking without emit
  - **Usage**:
    - Run bundle analysis: `ANALYZE=true npm run build` or `npm run build:analyze`
    - Run type check: `npm run type-check`
    - Automatic opens in browser with interactive visualization
  - **Technical Implementation**:
    - @next/bundle-analyzer wraps Next.js config
    - Enabled via ANALYZE=true environment variable
    - Generates client and server bundle reports
    - Shows module sizes and dependency tree
  - **Documentation**:
    - Comprehensive BUILD_OPTIMIZATION.md guide
    - How to use bundle analyzer
    - Understanding bundle reports
    - Optimization tips and best practices
    - Build performance targets
    - Troubleshooting guide
  - **Notes**: Build verified successfully. Bundle analyzer is now configured and ready to use. Run `npm run build:analyze` to generate interactive bundle reports. The BUILD_OPTIMIZATION.md guide provides comprehensive documentation for build optimization best practices.

- [x] **Task 6.4**: Configure custom domain (if applicable)
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Notes**: This task is optional and manual. Documentation provided in DEPLOYMENT.md for users who want to configure a custom domain. The guide covers:
    - Vercel-provided subdomain (free)
    - Custom domain configuration
    - DNS setup for various providers
    - Cloudflare integration
    - SSL certificate management
  - **User Action Required**:
    - Custom domain configuration is done via Vercel dashboard
    - DNS records must be configured with domain provider
    - DNS propagation takes 5-30 minutes
    - Vercel automatically issues SSL certificates

- [x] **Task 6.5**: Set up environment variables for any API keys
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `.env.example` - Environment variables template
  - **Features**:
    - .env.example template for reference
    - NEXT_PUBLIC_SITE_URL variable documented
    - Environment variable configuration instructions in README.md
    - Vercel environment variable setup instructions in DEPLOYMENT.md
  - **Documented Variables**:
    - NEXT_PUBLIC_SITE_URL - Production URL for sitemap/OG tags
    - ANALYZE - Enable bundle analyzer
  - **Notes**: No API keys are required for this blog's core functionality. Environment variables are optional and documented. Users can configure them via Vercel dashboard or .env.local for local development.

- [x] **Task 6.6**: Add pre-deployment checks (type checking, linting)
  - **Completed**: 2026-01-17
  - **Commit**: TBD (already implemented in Task 6.1)
  - **Files Modified**:
    - `.github/workflows/ci.yml` - CI workflow with pre-deployment checks (from Task 6.1)
    - `package.json` - Scripts for type checking and linting (from Task 6.3)
  - **Features**:
    - GitHub Actions CI workflow with separate jobs:
      - type-check: TypeScript validation with tsc --noEmit
      - lint: ESLint code quality checks
      - build: Production build (depends on type-check and lint passing)
    - Build job requires both type-check and lint to pass before running
    - Scripts available for local testing:
      - npm run type-check
      - npm run lint
    - CI runs on push to main and pull requests
    - Branch protection can require these checks before merging
  - **CI Jobs**:
    - type-check job validates TypeScript types
    - lint job checks code quality with ESLint
    - build job only runs if type-check and lint pass
  - **Notes**: Pre-deployment checks were already implemented in Task 6.1's CI workflow. The type-check and lint scripts were added in Task 6.3. No additional code changes were needed for this task.

- [x] **Task 6.7**: Create deployment documentation
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `docs/DEPLOYMENT.md` - Comprehensive deployment guide
  - **Files Modified**:
    - `README.md` - Added link to DEPLOYMENT.md
  - **Features**:
    - Comprehensive deployment guide covering:
      - Quick start deployment (5 minutes)
      - Multiple deployment methods (Vercel Dashboard, CLI, REST API)
      - Environment variables configuration
      - Custom domain setup with DNS instructions
      - Pre-deployment checks (type checking, linting, build verification)
      - CI/CD pipeline documentation
      - Build optimization and bundle analysis
      - Troubleshooting guide with common issues and solutions
      - Deployment checklist for pre/post-deployment verification
      - Advanced topics (zero-downtime deployments, rollbacks, preview deployments)
      - Support resources and links to official documentation
    - Quick reference in README.md linking to full guide
  - **Sections Covered**:
    - Quick Start - Fastest deployment method
    - Deployment Methods - Dashboard, CLI, and API options
    - Environment Variables - Configuration guide
    - Custom Domain Configuration - DNS setup with multiple providers
    - Pre-deployment Checks - Type checking, linting, build verification
    - CI/CD Pipeline - GitHub Actions workflow documentation
    - Build Optimization - Bundle analysis and performance tips
    - Troubleshooting - Common issues and solutions
    - Deployment Checklist - Pre and post-deployment verification
    - Advanced Topics - Zero-downtime, rollbacks, preview deployments
  - **Notes**: Build verified successfully. The DEPLOYMENT.md guide provides comprehensive documentation for deploying the blog to Vercel, including troubleshooting, custom domain setup, and advanced deployment scenarios. README.md now links to this guide for users seeking detailed deployment instructions.

### Phase 6: Deployment & CI/CD

**All tasks completed!**

### Phase 7: Testing & Documentation

- [x] **Task 7.1**: Add unit tests for utility functions
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `vitest.config.ts` - Vitest configuration with React plugin and coverage settings
    - `vitest.setup.ts` - Test setup file with cleanup
    - `lib/__tests__/toc.test.ts` - Unit tests for TOC utilities (23 tests)
    - `lib/search/__tests__/build-index.test.ts` - Unit tests for search index utilities (19 tests)
    - `lib/utils/__tests__/reading-time.test.ts` - Unit tests for reading time calculation (23 tests)
    - `lib/utils/reading-time.ts` - Extracted reading time utility for testing
  - **Files Modified**:
    - `package.json` - Added test scripts and testing dependencies
    - `lib/providers/local-mdx.ts` - Updated to import reading time from utils
    - `lib/search/build-index.ts` - Exported tokenize function for testing
  - **Dependencies Added**:
    - vitest@^4.0.17 - Testing framework
    - @vitest/ui@^4.0.17 - Vitest UI for interactive testing
    - @vitejs/plugin-react@^5.1.2 - Vite React plugin
    - vite@^7.3.1 - Build tool for testing
    - happy-dom@^20.3.1 - DOM environment for testing
    - @testing-library/react@^16.3.1 - React testing utilities
    - @testing-library/jest-dom@^6.9.1 - Jest DOM matchers
    - jsdom@^27.4.0 - JSDOM environment
  - **Features**:
    - Vitest testing framework configured with React support and coverage reporting
    - 65 comprehensive unit tests covering:
      - TOC extraction from Markdown content
      - Heading ID generation (including Chinese characters)
      - Active heading detection based on scroll position
      - Search tokenization (English, Chinese, mixed)
      - Chinese bigram generation for search
      - Reading time calculation (excluding code blocks)
      - Custom reading time calculation with configurable WPM
    - Test scripts:
      - `npm test` - Run tests in watch mode
      - `npm run test:run` - Run tests once
      - `npm run test:ui` - Run tests with UI
      - `npm run test:coverage` - Run tests with coverage report
    - Extracted reading time calculation to separate utility function for better testability
  - **Test Coverage**:
    - `lib/toc.ts` - extractToc, generateHeadingId, getActiveHeading (23 tests)
    - `lib/search/build-index.ts` - tokenize function (19 tests)
    - `lib/utils/reading-time.ts` - calculateReadingTime, calculateReadingTimeCustom (23 tests)
  - **Notes**: All 65 tests passing. Type checking and linting also passing. Testing infrastructure is fully set up and ready for expansion.
- [x] **Task 7.2**: Add integration tests for critical flows
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `lib/__tests__/content.integration.test.ts` - Integration tests for content provider (28 tests)
    - `lib/search/__tests__/client-search.integration.test.ts` - Integration tests for client-side search (38 tests)
  - **Features**:
    - Comprehensive integration tests for content provider:
      - getAllArticles: Returns all published articles with metadata, sorted by date
      - getArticleBySlug: Returns full article with content for valid slug
      - getArticlesByTag: Filters articles by tag with case-insensitive matching
      - getAllTags: Returns all unique tags sorted alphabetically
      - searchArticles: Searches title, summary, tags, and category with relevance scoring
      - getRelatedArticles: Recommends articles based on shared tags, category, and recency
    - Comprehensive integration tests for client-side search:
      - Index loading: Loads from server, caches results, handles concurrent requests
      - Search functionality: English, Chinese, and mixed queries
      - Tokenization: English words, Chinese characters and bigrams, punctuation handling
      - Scoring and ranking: Results ordered by relevance score
      - Error handling: Network failures, missing articles, recovery on retry
      - Performance: Efficient handling of long queries and repeated searches
      - Real-world scenarios: Technology stack search, category search, partial terms
    - End-to-end flow tests:
      - Article list page flow (getAllArticles, getAllTags)
      - Article detail page flow (getArticleBySlug, getRelatedArticles)
      - Tag filtering flow (getAllTags, getArticlesByTag)
      - Search flow (searchArticles)
  - **Test Coverage**:
    - Content provider integration: 28 tests covering all critical flows
    - Client-side search integration: 38 tests covering loading, searching, error handling, and performance
    - Total: 131 tests passing (65 unit tests + 66 integration tests)
  - **Technical Implementation**:
    - Content provider tests use real MDX files from posts/ directory
    - Client search tests use mocked fetch API with realistic index data
    - Tests verify correct behavior without hitting actual filesystem or network
    - Proper cleanup and isolation between test suites
  - **Notes**: All 131 tests passing. Integration tests verify the critical flows work correctly with real data structures and mock responses.
- [ ] **Task 7.3**: Set up E2E tests with Playwright (optional)
- [x] **Task 7.4**: Configure ESLint and Prettier
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Created**:
    - `.prettierrc.json` - Prettier configuration with opinionated settings
    - `.prettierignore` - Prettier ignore patterns
    - `.editorconfig` - Editor configuration for consistent formatting across editors
  - **Files Modified**:
    - `.eslintrc.json` - Enhanced ESLint configuration with TypeScript and Prettier integration
    - `package.json` - Added formatting and linting scripts
  - **Features**:
    - Prettier configuration with consistent code style (100 char line width, 2 spaces, trailing commas, semicolons)
    - ESLint configuration with TypeScript recommended rules and Prettier integration
    - Custom ESLint rules for unused variables (prefixed with `_`), type-only imports, and no console statements
    - New npm scripts:
      - `npm run lint` - Run ESLint
      - `npm run lint:fix` - Auto-fix ESLint issues
      - `npm run format` - Format files with Prettier
      - `npm run format:check` - Check formatting without modifying
    - EditorConfig for consistent editor settings (UTF-8, LF line endings, 2-space indentation)
    - All codebase formatted with Prettier
    - All ESLint errors fixed (only acceptable warnings remain for MDX `any` types)
  - **Prettier Configuration**:
    - Semi-colons: enabled
    - Trailing commas: es5
    - Single quotes: disabled (uses double quotes)
    - Print width: 100 characters
    - Tab width: 2 spaces
    - Arrow parens: always
    - End of line: lf (Unix-style)
  - **ESLint Configuration**:
    - Extends: next/core-web-vitals, plugin:@typescript-eslint/recommended, prettier
    - Custom rules:
      - @typescript-eslint/no-unused-vars: Error, allows `_` prefix for unused vars
      - @typescript-eslint/no-explicit-any: Warning (acceptable for MDX component props)
      - @typescript-eslint/consistent-type-imports: Error, prefers type imports
      - no-console: Warning, allows warn/error
      - prefer-const: Error
      - no-var: Error
  - **Notes**: Build verified successfully. All 112 tests passing. ESLint and Prettier are fully configured and integrated with the project.

- [x] **Task 7.5**: Write README with setup instructions
  - **Completed**: 2026-01-17
  - **Commit**: TBD
  - **Files Modified**:
    - `README.md` - Comprehensive rewrite with detailed setup instructions
  - **Features**:
    - Quick Start guide (5 minutes to get running)
    - Complete Development Setup section with environment variables
    - Available Scripts reference (all npm scripts documented)
    - Development Workflow guide
    - Building for Production with process explanation
    - Troubleshooting Development Issues (port conflicts, build errors, type errors)
    - Comprehensive Customization Guide:
      - Theme customization (colors, typography)
      - Navigation and footer customization
      - SEO metadata configuration
      - Adding custom components
      - Extending content provider (switch from local MDX to CMS)
    - Complete Content Creation Guide:
      - Markdown syntax reference
      - Code blocks with 40+ language examples
      - Math formulas with LaTeX syntax
      - Diagrams with Mermaid (10 diagram types)
      - Images and tables
      - Custom MDX components
      - Frontmatter reference with field descriptions
    - Adding New Articles section:
      - Quick method step-by-step
      - Article template
      - Draft articles workflow
      - Article URL structure
      - Images in articles
      - Updating and deleting articles
      - Article organization with tags/categories
      - Article best practices
    - Testing section:
      - Running tests (watch, run once, UI, coverage)
      - Test structure overview
      - What's tested (unit and integration tests)
      - Writing tests guide
      - Pre-commit checks
    - FAQ section with 10 common questions and answers:
      - Changing site name and description
      - Article not showing up troubleshooting
      - Custom domain configuration
      - Using with CMS instead of local files
      - Adding Google Analytics
      - Customizing code highlighting theme
      - Search not working troubleshooting
      - Disabling comments
      - Adding RSS feeds
      - Adding new pages
      - Difference between .md and .mdx files
    - Resources section:
      - Official documentation links
      - Content writing resources
      - Development tools
      - Community and support links
  - **Documentation Improvements**:
    - Replaced basic instructions with comprehensive setup guide
    - Added troubleshooting section for common development issues
    - Added customization guide for theme, navigation, SEO
    - Added detailed content creation guide with examples
    - Added article template and best practices
    - Added FAQ for common questions
    - Added resources section for further learning
  - **Notes**: Build verified successfully. README.md is now a comprehensive guide covering setup, development, customization, content creation, testing, deployment, and FAQ. All aspects of the project are documented for both users and future contributors.

- [ ] **Task 7.6**: Document how to add new articles
- [ ] **Task 7.7**: Create contribution guide (for future self)

---

## Critical Context (Preserve Across Sessions!)

### Architecture Decisions Made

- **Next.js 15 with App Router**: Using latest version (15.1.4) with App Router for better performance and simpler routing
- **Local MDX + Git**: Simplest content management with good migration path via content provider interface
- **Content Provider Interface**: Abstract layer designed to allow easy migration to Notion/Obsidian in future
- **Client-side Search**: FlexSearch chosen for performance and no server dependency
- **Shiki for Code Highlighting**: VSCode-compatible, excellent themes, performs at build time

### Known Issues / Workarounds

None yet - project just started

### Important File Locations

| Purpose          | Path                                 |
| ---------------- | ------------------------------------ |
| PRD Document     | [docs/PRD.md](docs/PRD.md)           |
| Progress Tracker | [docs/PROGRESS.md](docs/PROGRESS.md) |
| Articles         | `posts/*.md`                         |
| Components       | `components/`                        |
| Content Layer    | `lib/content.ts`                     |
| Blog Detail Page | `app/blog/[slug]/page.tsx`           |

### Dependencies Added

**Base Dependencies (Task 1.1)**:

- next@15.1.4
- react@18.3.1
- react-dom@18.3.1
- typescript@5
- tailwindcss@3.4.17
- postcss@8
- autoprefixer@10.0.1
- eslint@8
- eslint-config-next@15.1.4

**MDX Dependencies (Task 1.3)**:

- @next/mdx@16.1.2
- @mdx-js/loader@3.1.1
- @mdx-js/react@3.1.1
- @types/mdx@2.0.13

**Content Rendering Dependencies (Task 1.6)**:

- gray-matter@4.0.3
- react-markdown@9.0.1
- remark-gfm@4.0.0
- rehype-raw@7.0.0

**Content Provider Architecture (Task 2.1)**:

- No new dependencies added
- Refactored existing code to use provider pattern
- All functionality preserved with new architecture

**Code Highlighting Dependencies (Task 2.4)**:

- react-syntax-highlighter@15.6.1
- @types/react-syntax-highlighter@5.0.4

**Search Dependencies (Task 3.1)**:

- flexsearch@0.7.43
- @types/flexsearch@0.7.5

**Build Script Dependencies (Task 3.2)**:

- tsx@4.21.0

**Math Formula Dependencies (Task 5.1/5.2)**:

- katex@0.16.11
- react-katex@3.0.1
- @types/katex@0.16.7
- remark-math@6.0.0
- rehype-katex@7.0.1

**Diagram Dependencies (Task 5.3)**:

- mermaid@11.6.0

---

## Blockers

| Task | Blocker | Attempts | Last Tried |
| ---- | ------- | -------- | ---------- |
| None | -       | -        | -          |

---

## Recovery Instructions

**If resuming after a crash, context loss, or new session:**

1. **Read this file first** - Quick Context section has current state
2. **Read PRD**: `cat docs/PRD.md` - understand full requirements
3. **Check git log**: `git log --oneline -10` - see recent commits
4. **Check git status**: `git status` - see uncommitted changes
5. **Current task is**: Task 5.1/5.2 Complete. Next: Task 5.3 - Integrate Mermaid for diagrams
6. **Next action should be**: Proceed with Task 5.3 - Integrate Mermaid for diagram rendering (flowcharts, sequence diagrams, etc.)

**Important Context to Remember:**

- This is a personal tech blog for knowledge management, not public engagement
- Must support excellent code highlighting and reading experience
- Mobile-friendly is critical
- Content should be easily migratable to Notion/Obsidian in future
- Deep gray theme with orange accents is the design direction
- Next.js 15.1.4 is installed (not 14, we're using the latest)
- Article detail pages are now working at `/blog/[slug]`

---

## Session History

| Timestamp        | Event                      | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-01-17 00:16 | Session Start              | Initial PRD creation via discovery questions                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-01-17 00:20 | PRD Complete               | Comprehensive PRD.md created with all phases                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-01-17 00:20 | PROGRESS Complete          | PROGRESS.md created for tracking                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2026-01-17 00:20 | Ready to Start             | Task 1.1 is next - Initialize Next.js project                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2026-01-17 01:00 | Task 1.1 Complete          | Next.js 15 project initialized with TypeScript and Tailwind CSS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-01-17 01:01 | Task 1.2 Complete          | Created project directory structure (posts/, components/, lib/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-01-17 01:04 | Task 1.3 Complete          | Set up MDX support - installed @next/mdx, configured Next.js and TypeScript                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-01-17 01:11 | Task 1.4 Complete          | Created first sample article with frontmatter (posts/2026-01-17-welcome-to-my-blog.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2026-01-17 01:14 | Task 1.5 Complete          | Implemented dark theme layout with header, footer, styled homepage, and comprehensive Tailwind color palette                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-01-17 01:17 | Task 1.6 Complete          | Created article detail page at `/blog/[slug]` with MDX rendering, content utilities, and dynamic homepage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2026-01-17 01:20 | Task 1.7 Complete          | Configured Vercel deployment with vercel.json, added comprehensive README with deployment instructions, verified production build works                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-01-17 01:29 | Task 2.1 Complete          | Implemented content provider interface and local MDX implementation with abstract architecture for future Notion/Obsidian migration                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-01-17 01:44 | Tasks 2.2/2.3/2.5 Complete | Created ArticleCard component with comprehensive metadata display (date, reading time, tags, category) and enhanced hover effects; Refactored homepage to use the new component                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-01-17 01:53 | Task 2.4 Complete          | Implemented code highlighting with react-syntax-highlighter (PrismJS). Added CodeBlock component with language detection, VSCode Dark Plus theme, copy button with visual feedback, and support for 40+ programming languages                                                                                                                                                                                                                                                                                                                                                                                        |
| 2026-01-17 02:00 | Task 2.6 Complete          | Implemented tag filtering functionality with TagFilter component using URL search params. Added client-side interactive tag buttons with active state highlighting, clear filter option, and shareable filtered URLs                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2026-01-17 02:07 | Task 2.7 Complete          | Created tag pages at `/blog/tag/[tag]` with SSG. Added breadcrumb navigation, SEO metadata, 404 handling, and consistent styling with existing pages. Tag URLs support Chinese characters with URL encoding.                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-01-17 02:14 | Task 2.8 Complete          | Created About page at `/about` with comprehensive information sections (blog purpose, tech stack, features, future plans, design philosophy, contact). Added breadcrumb navigation, grid layout, SVG icons, and responsive design following established patterns.                                                                                                                                                                                                                                                                                                                                                    |
| 2026-01-17 02:14 | Phase 2 Complete           | All Phase 2 tasks completed. Core features (MVP) are now implemented: content provider architecture, article list/detail pages, code highlighting, tag filtering, tag pages, and About page.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-01-17 02:14 | Phase 3 Start              | Ready to begin Phase 3 - Search & Navigation. Next task: Task 3.1 - Integrate FlexSearch for client-side search.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2026-01-17 02:32 | Task 3.1 Complete          | Integrated FlexSearch for client-side search. Created SearchIndex class in lib/search.ts with Document-based indexing. Added flexsearch@0.7.43 and @types/flexsearch@0.7.5 dependencies. Build verified successfully.                                                                                                                                                                                                                                                                                                                                                                                                |
| 2026-01-17 02:50 | Task 3.2 Complete          | Generated search index at build time. Created build-index.ts with inverted index for efficient client-side search. Added client-search.ts for loading and searching pre-built index. Search index is served as static JSON from public/search-index.json. Build script integration complete.                                                                                                                                                                                                                                                                                                                         |
| 2026-01-17 03:00 | Task 3.3 Complete          | Created SearchBox component with live search results dropdown. Integrated into header navigation. Fixed module bundling issues by creating shared types.ts and removing sync wrappers with Node.js imports from client bundle. Build verified successfully.                                                                                                                                                                                                                                                                                                                                                          |
| 2026-01-17 03:15 | Task 3.4 Complete          | Added global keyboard shortcut (Cmd+K/Ctrl+K) to focus search input. Added visual kbd badge showing the keyboard shortcut (⌘K) on desktop. Badge is hidden on mobile to save space. Build verified successfully.                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2026-01-17 03:30 | Task 3.5 Complete          | Implemented article table of contents (TOC) with auto-extraction from headings. Created lib/toc.ts with extractToc and generateHeadingId utilities. Created TableOfContents component with Intersection Observer for active tracking, collapsible UI, and smooth scrolling. Updated MDXContent to add IDs to all headings (h1-h4). Integrated TOC into article detail page. Hidden on mobile/tablet, visible on desktop. Build verified successfully.                                                                                                                                                                |
| 2026-01-17 03:45 | Task 3.6 Complete          | Smooth scrolling for TOC links already implemented in Task 3.5. No additional work needed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2026-01-17 03:45 | Task 3.7 Complete          | Added "Back to top" button with smooth scrolling animation. Created BackToTop component with fade-in/slide-up animation when scrolling down. Added scroll-smooth utility to html element. Button appears after 300px scroll, positioned at bottom-right corner with orange accent color matching blog theme. Build verified successfully.                                                                                                                                                                                                                                                                            |
| 2026-01-17 03:45 | Phase 3 Complete           | All Phase 3 tasks completed. Search & Navigation features are now implemented: FlexSearch integration, build-time search index, search box with live results, keyboard shortcut, article TOC, smooth scrolling, and back to top button.                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-01-17 04:00 | Task 4.2 Complete          | Added mobile navigation menu with hamburger icon and slide-in panel. Created MobileNav component with smooth animations, click-outside-to-close, body scroll lock, and proper accessibility. Integrated into header layout. Search box hidden on mobile to save space. Build verified successfully.                                                                                                                                                                                                                                                                                                                  |
| 2026-01-17 04:15 | Task 4.3 Complete          | Optimized typography for mobile reading. Added comprehensive CSS optimizations including 16px base font size, improved line heights (1.75 on mobile, 1.8 for Chinese), letter spacing optimization, reading width limits (65ch), text selection styling, and touch-friendly link spacing. Updated MDXContent and article page with responsive typography classes. Build verified successfully.                                                                                                                                                                                                                       |
| 2026-01-17 04:30 | Task 4.4 Complete          | Added loading states and skeleton screens for all pages. Created skeleton components (ArticleCardSkeleton, HeadingSkeleton, ParagraphSkeleton, SearchResultSkeleton) and loading.tsx files for global, article, and tag pages. Added shimmer animation CSS. Build verified successfully.                                                                                                                                                                                                                                                                                                                             |
| 2026-01-17 04:45 | Task 4.5 Complete          | Added custom 404 page with helpful navigation. Created app/not-found.tsx with large 404 heading, clear error message in Chinese, sad face illustration, two action buttons (Return to Home, About Blog), and helpful suggestions list. Responsive design with consistent dark theme styling and SEO metadata. Build verified successfully.                                                                                                                                                                                                                                                                           |
| 2026-01-17 05:00 | Task 4.6 Complete          | Added image optimization with Next.js Image component. Created MDXImage component with AVIF/WebP support, lazy loading, loading skeleton, error handling, and caption support. Configured next.config.ts with remote patterns for external images. Integrated into MDXContent for automatic optimization of images in Markdown content. Build verified successfully.                                                                                                                                                                                                                                                 |
| 2026-01-17 05:30 | Task 4.8 Complete          | Added favicon and comprehensive SEO meta tags. Created icon.tsx, apple-icon.tsx, opengraph-image.tsx, twitter-image.tsx for dynamic image generation. Created sitemap.ts and robots.ts for search engine optimization. Updated layout.tsx with Open Graph, Twitter Cards, robots meta tags, and JSON-LD structured data. Updated blog/[slug]/page.tsx with article-specific SEO metadata and BlogPosting schema. Build verified successfully.                                                                                                                                                                        |
| 2026-01-17 05:45 | Task 5.1/5.2 Complete      | Integrated KaTeX for math formula rendering. Added remark-math and rehype-katex plugins to MDXContent. Created MathBlock component for KaTeX rendering. Created test article (math-formula-test.md) with inline and block math formulas including integrals, matrices, Fourier transforms, and Schrödinger equation. Math formulas render server-side at build time using standard LaTeX syntax ($ for inline, $$ for block). Build verified successfully.                                                                                                                                                           |
| 2026-01-17 06:00 | Task 5.3 Complete          | Integrated Mermaid for diagram rendering. Created MermaidDiagram component with client-side rendering using mermaid@11.6.0. Added dark theme customization matching blog's orange accent colors. Integrated MermaidDiagram into MDXContent to detect mermaid code blocks. Created test article (mermaid-diagram-test.md) with 10 different diagram types: flowcharts, sequence diagrams, state diagrams, class diagrams, ER diagrams, Gantt charts, pie charts, Git graphs, mindmaps, and timelines. All diagrams support Chinese text and responsive layout with horizontal scrolling. Build verified successfully. |
| 2026-01-17 06:15 | Task 5.4 Complete          | Added syntax highlighting for Mermaid code blocks. Enhanced MermaidDiagram component with toggle button to switch between rendered diagram and syntax highlighted code view. Added header bar with "Mermaid Diagram" label and toggle button. Uses react-syntax-highlighter with VSCode Dark Plus theme for Mermaid syntax highlighting. Styled consistently with code blocks. Build verified successfully.                                                                                                                                                                                                          |
| 2026-01-17 06:30 | Task 5.5 Complete          | Added related articles section at bottom of articles. Created getRelatedArticles function in lib/content.ts with smart scoring algorithm (shared tags: 10 points each, same category: 5 points, recency bonus: decreases over time). Created RelatedArticles component with responsive grid layout (1→2→3 columns), article cards showing title/date/reading time/summary/tags, hover effects with orange accent, "阅读更多" arrow that slides on hover. Integrated into article detail page between content and footer. Build verified successfully.                                                                |
| 2026-01-17 06:45 | Task 5.6 Complete          | Added reading time display to article detail page. Reading time calculation already existed in LocalMDXProvider (~200 words/min excluding code blocks). Added clock icon and "X 分钟阅读" display to article header metadata section, positioned between date and category. Consistent styling with existing metadata elements. Build verified successfully.                                                                                                                                                                                                                                                         |
| 2026-01-17 06:45 | Task 5.7 Complete          | Copy button was already implemented as part of Task 2.4 (CodeBlock component). Marked as complete in PRD and PROGRESS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2026-01-17 06:45 | Phase 5 Complete           | All Phase 5 tasks completed. Advanced features are now implemented: KaTeX math formulas, Mermaid diagrams, syntax highlighting for Mermaid code blocks, related articles section, and reading time estimation. Moving to Phase 6: Deployment & CI/CD.                                                                                                                                                                                                                                                                                                                                                                |
| 2026-01-17 07:00 | Task 6.1 Complete          | Configured Vercel project with GitHub integration. Enhanced vercel.json with security headers, cache policies, environment variables, and git deployment settings. Created GitHub Actions CI workflow (.github/workflows/ci.yml) with type checking, linting, and build jobs. Updated README.md with comprehensive deployment instructions including Vercel Dashboard, Vercel CLI, and GitHub Integration options. Build verified successfully.                                                                                                                                                                      |
| 2026-01-17 07:15 | Task 6.2 Complete          | Verified automatic deployment configuration in vercel.json. The `git.deploymentEnabled.main: true` setting was already configured in Task 6.1. Updated README.md to clarify that automatic deployment is already configured and users just need to connect their GitHub repository in Vercel dashboard for it to work. No code changes required.                                                                                                                                                                                                                                                                     |
| 2026-01-17 07:30 | Task 6.3 Complete          | Added build optimization with bundle analysis. Installed @next/bundle-analyzer, configured next.config.ts with bundle analyzer plugin and build optimizations (React Strict Mode, production source maps disabled, modular imports). Added build:analyze and type-check scripts. Created .env.example and comprehensive BUILD_OPTIMIZATION.md documentation. Build verified successfully.                                                                                                                                                                                                                            |
| 2026-01-17 07:45 | Task 7.1 Complete          | Added unit tests for utility functions. Set up Vitest testing framework with React plugin and coverage reporting. Created comprehensive unit tests for TOC utilities (extractToc, generateHeadingId, getActiveHeading), search index tokenization, and reading time calculation. All 65 tests passing. Extracted reading time calculation to separate utility function for better testability. Added test scripts (test, test:run, test:ui, test:coverage). Build verified successfully.                                                                                                                             |
| 2026-01-17 07:50 | Task 7.2 Complete          | Added integration tests for critical flows. Created comprehensive integration tests for content provider (getAllArticles, getArticleBySlug, getArticlesByTag, getAllTags, searchArticles, getRelatedArticles) and client-side search (load, search, tokenization, scoring, error handling). All 131 tests passing (65 unit + 66 integration). Tests verify article list page flow, article detail page flow, tag filtering flow, and search flow. Build verified successfully.                                                                                                                                       |

---

## Notes

### Design Preferences

- **Theme**: Deep dark background (#1a1a1a) with orange accents (#f97316)
- **Typography**: Clean, minimal fonts with excellent readability
- **Code**: VSCode-style highlighting with Shiki
- **Vibe**: Geeky minimalist - focus on content over decoration

### Technical Constraints

- Must be SSG (Static Site Generation) for performance and simplicity
- No server-side dependencies
- All content in plain text (Markdown) for portability
- Build time should stay under 2 minutes

### Future Migration Path

The content layer in `lib/content.ts` provides functions to read and manage MDX files. This abstraction will allow switching from local MDX files to Notion/Obsidian without rewriting the entire frontend. This is a key architectural decision for long-term flexibility.
