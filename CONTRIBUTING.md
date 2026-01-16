# Contributing Guide

> A comprehensive guide for your future self on how to contribute to this blog project.

## Table of Contents

- [Overview](#overview)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Adding Content](#adding-content)
- [Code Style](#code-style)
- [Testing](#testing)
- [Commit Conventions](#commit-conventions)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

---

## Overview

This is a **personal tech blog** designed as a knowledge management system. As a single-author project, "contributing" primarily means:

1. **Adding new articles** - The most common task
2. **Fixing bugs** - When something breaks
3. **Adding features** - When new needs arise
4. **Maintaining dependencies** - Keeping packages up to date
5. **Refactoring** - Improving code quality over time

### Design Philosophy

- **Content First**: This blog exists to store and retrieve knowledge efficiently
- **Minimal Complexity**: No unnecessary features, no user accounts, no comments
- **Static & Fast**: Pure SSG with no database or server-side logic
- **Future-Proof**: Content stored in plain Markdown, easy to migrate
- **Mobile-Friendly**: Optimized for reading on phones and tablets

---

## Development Workflow

### Setting Up After a Long Break

If you haven't worked on this project in months:

```bash
# 1. Clone or pull the repository
git clone https://github.com/yourusername/cc-automatic-blog-project.git
cd cc-automatic-blog-project

# 2. Install dependencies (npm versions may have changed)
npm install

# 3. Check if Node.js version is still supported
node --version  # Should be 18+ or 20+

# 4. Start development server
npm run dev

# 5. Run tests to ensure everything works
npm run test:run
```

### Daily Development

```bash
# 1. Start dev server
npm run dev

# 2. Make changes (add articles, fix bugs, etc.)

# 3. Type check
npm run type-check

# 4. Lint
npm run lint:fix

# 5. Run tests
npm run test:run

# 6. Build to verify
npm run build

# 7. Commit (see commit conventions below)
git add .
git commit -m "type: description"

# 8. Push (triggers Vercel deployment)
git push origin main
```

### Before Making Big Changes

1. **Check the PRD**: Read `docs/PRD.md` to understand original requirements
2. **Check PROGRESS.md**: Read `docs/PROGRESS.md` to see what's been done
3. **Create a branch**: `git checkout -b feature/my-feature`
4. **Test thoroughly**: Run tests and manual checks
5. **Build verification**: Always run `npm run build` before committing

---

## Project Structure

### Key Files to Know

```
cc-automatic-blog-project/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (header, footer, metadata)
│   ├── page.tsx                  # Homepage (article list)
│   ├── blog/[slug]/page.tsx      # Article detail page
│   └── globals.css               # Global styles and theme
│
├── components/                   # React components
│   ├── article-card.tsx          # Article card for lists
│   ├── code-block.tsx            # Code highlighting
│   ├── mdx-content.tsx           # MDX renderer (CUSTOMIZE OFTEN)
│   ├── search-box.tsx            # Search functionality
│   └── table-of-contents.tsx     # Article TOC
│
├── lib/                          # Core utilities
│   ├── content.ts                # Public API for content operations
│   ├── providers/
│   │   ├── types.ts              # ContentProvider interface
│   │   └── local-mdx.ts          # Local MDX implementation
│   ├── search/                   # Search functionality
│   └── toc.ts                    # TOC extraction
│
├── posts/                        # YOUR ARTICLES GO HERE
│   └── YYYY-MM-DD-title.md       # Article files
│
├── docs/                         # Project documentation
│   ├── PRD.md                    # Product requirements
│   ├── PROGRESS.md               # Progress tracking
│   └── DEPLOYMENT.md             # Deployment guide
│
└── public/                       # Static assets
    └── search-index.json         # Generated search index (don't edit)
```

### What to Edit Where

| Task | File(s) to Edit |
|------|----------------|
| Add article | `posts/YYYY-MM-DD-title.md` |
| Change navigation | `app/layout.tsx` |
| Change colors/theme | `tailwind.config.ts`, `app/globals.css` |
| Add page | `app/new-page/page.tsx` |
| Add component | `components/my-component.tsx` |
| Change metadata | `app/layout.tsx` |
| Customize MDX rendering | `components/mdx-content.tsx` |
| Add content source | `lib/providers/new-provider.ts` |

---

## Adding Content

### Quick Reference: Adding an Article

1. **Create file**: `posts/YYYY-MM-DD-title.md`
2. **Add frontmatter**:
   ```yaml
   ---
   title: "Article Title"
   date: "2026-01-17"
   summary: "One sentence description"
   tags: ["tag1", "tag2"]
   category: "Category"
   draft: false
   ---
   ```
3. **Write content** in Markdown
4. **Test**: `npm run dev` and visit http://localhost:3000
5. **Build**: `npm run build` (regenerates search index)
6. **Commit**: `git add posts/ && git commit -m "Add: article title"`

### Article Best Practices

1. **Naming**: Use `YYYY-MM-DD-descriptive-title.md` format
2. **Frontmatter**: Always include all fields
3. **Tags**: Lowercase, hyphenated (`web-development` not `Web Development`)
4. **Code blocks**: Always specify language
5. **Images**: Optimize before adding (use WebP/AVIF)
6. **Summaries**: Keep under 150 characters
7. **Drafts**: Use `draft: true` for work-in-progress

### Content Types Supported

- **Markdown**: Standard GFM syntax
- **Code blocks**: 40+ languages with syntax highlighting
- **Math formulas**: LaTeX syntax with KaTeX
- **Diagrams**: Mermaid (flowcharts, sequences, etc.)
- **Images**: Local or external, auto-optimized
- **Custom components**: React components in MDX

---

## Code Style

### TypeScript

- **Strict mode enabled**: All types must be defined
- **No `any` types**: Use proper TypeScript types
- **Interfaces over types**: For object shapes
- **Function return types**: Explicit where not obvious

```typescript
// Good
interface ArticleMetadata {
  title: string;
  date: string;
  tags: string[];
}

async function getArticle(slug: string): Promise<Article | null> {
  // ...
}

// Bad
function getArticle(slug: any): any {
  // ...
}
```

### React Components

```typescript
// Use function components with props interface
interface Props {
  title: string;
  onEdit?: () => void;
}

export function ArticleCard({ title, onEdit }: Props) {
  return <div>{title}</div>;
}
```

### File Naming

- **Components**: `kebab-case.tsx` (`article-card.tsx`)
- **Utilities**: `kebab-case.ts` (`reading-time.ts`)
- **Types**: `types.ts` or `*.types.ts`
- **Tests**: `*.test.ts` or `*.integration.test.ts`

### CSS/Styling

- **Tailwind-first**: Use Tailwind classes
- **Custom CSS**: Only in `app/globals.css`
- **Dark theme**: Use semantic color names (`bg-primary`, not `bg-[#1a1a1a]`)

```tsx
// Good
<div className="bg-primary text-primary border-border">

// Bad (unless absolutely necessary)
<div style={{ backgroundColor: '#1a1a1a' }}>
```

---

## Testing

### Test Structure

```
lib/
├── __tests__/
│   └── content.integration.test.ts    # Integration tests
├── search/
│   └── __tests__/
│       ├── build-index.test.ts        # Unit tests
│       └── client-search.integration.test.ts
└── utils/
    └── __tests__/
        └── reading-time.test.ts       # Unit tests
```

### Writing Tests

```typescript
// lib/utils/__tests__/my-util.test.ts
import { describe, it, expect } from 'vitest'
import { myUtil } from '../my-util'

describe('myUtil', () => {
  it('should do something specific', () => {
    expect(myUtil('input')).toBe('expected')
  })

  it('should handle edge cases', () => {
    expect(myUtil('')).toBe(null)
  })
})
```

### Running Tests

```bash
npm test              # Watch mode (development)
npm run test:run      # Run once
npm run test:coverage # With coverage report
npm run test:ui       # Interactive UI
```

### What to Test

- **Utility functions**: All edge cases
- **Content operations**: Integration tests for CRUD
- **Search**: Tokenization and scoring
- **Rendering**: Critical paths only (E2E tests are optional)

---

## Commit Conventions

### Commit Message Format

```
type(scope): description
```

### Types

- `add`: New feature or article
- `fix`: Bug fix
- `update`: Update to existing code
- `refactor`: Code refactoring (no behavior change)
- `docs`: Documentation changes
- `test`: Test updates
- `chore`: Build/config changes
- `perf`: Performance improvements

### Examples

```bash
git commit -m "add: article about Next.js static generation"
git commit -m "fix: search index not regenerating on build"
git commit -m "update: improve mobile navigation UX"
git commit -m "refactor: extract article card to separate component"
git commit -m "docs: update deployment instructions"
git commit -m "test: add tests for reading time calculation"
git commit -m "chore: upgrade Next.js to v15"
git commit -m "perf: optimize image loading"
```

### Commit Frequency

- **Small commits**: One logical change per commit
- **Atomic changes**: Each commit should build successfully
- **Descriptive**: Future you should understand what was changed

### Example Workflow

```bash
# Add article
git add posts/my-article.md
git commit -m "add: article about React hooks"

# Fix bug discovered while adding article
git add components/code-block.tsx
git commit -m "fix: code block overflow on mobile"

# Update documentation
git add README.md
git commit -m "docs: add article template to README"
```

---

## Troubleshooting

### Build Fails

```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build

# Check TypeScript errors
npx tsc --noEmit
```

### Search Not Working

```bash
# Regenerate search index
npm run build:search

# Check if index exists
cat public/search-index.json

# Rebuild completely
npm run build
```

### Port Already in Use

```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Use different port
PORT=3001 npm run dev
```

### Type Errors After Dependency Update

```bash
# Update TypeScript types
npm install --save-dev @types/node@latest @types/react@latest

# Check for breaking changes
npm outdated
```

### Vercel Deployment Fails

1. **Check build logs** in Vercel dashboard
2. **Ensure Node.js version** matches local (`node --version`)
3. **Check environment variables** in Vercel settings
4. **Try local build**: `npm run build` (should succeed)

### Article Not Showing

1. **Check frontmatter**: All fields present?
2. **Check draft status**: `draft: false`?
3. **Check filename**: In `posts/` directory?
4. **Rebuild**: `npm run build`
5. **Check file extension**: `.md` or `.mdx`?

---

## Future Enhancements

### Planned Features

See `docs/PRD.md` for the full roadmap. Key areas:

1. **E2E Tests** (Task 7.3 - Optional)
   - Set up Playwright for critical user flows
   - Tests: navigation, search, mobile responsiveness

2. **Date Formatting Utilities** (Testing)
   - Add `lib/utils/date.ts` with formatting functions
   - Unit tests for various date formats

3. **Theme Toggle** (Task 4.7 - Optional)
   - Light/dark mode toggle
   - Persist preference in localStorage

### Potential Migrations

#### Migrating to Notion

The content provider architecture makes this possible:

1. Create `lib/providers/notion.ts`
2. Implement `ContentProvider` interface
3. Update `lib/content.ts` to use NotionProvider
4. No changes needed to components

#### Migrating to CMS

Same process as Notion - implement the interface and swap providers.

### Performance Optimization

If the blog grows beyond 100 articles:

1. **Enable ISR**: Incremental Static Regeneration
2. **Pagination**: Add pagination to article list
3. **Search optimization**: Implement search result paging
4. **Image optimization**: Use next/image everywhere
5. **Bundle analysis**: Run `npm run build:analyze` regularly

---

## Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server

# Code Quality
npm run lint             # Check code quality
npm run lint:fix         # Fix lint issues
npm run format           # Format with Prettier
npm run type-check       # TypeScript type check

# Testing
npm test                 # Watch mode
npm run test:run         # Run once
npm run test:coverage    # Coverage report

# Build Analysis
npm run build:analyze    # Bundle analysis

# Search
npm run build:search     # Regenerate search index
```

---

## Resources

### Project Documentation

- `README.md` - Getting started guide
- `docs/PRD.md` - Product requirements
- `docs/PROGRESS.md` - Progress tracking
- `docs/DEPLOYMENT.md` - Deployment guide

### External Resources

- [Next.js Docs](https://nextjs.org/docs)
- [MDX Docs](https://mdxjs.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev/)
- [Vercel](https://vercel.com/docs)

### Git Workflow

```bash
# Typical workflow
git checkout -b feature/my-feature
# Make changes
npm run type-check && npm run lint && npm run test:run
npm run build
git add .
git commit -m "add: my feature"
git push origin feature/my-feature
# Create PR if working with others
git checkout main && git merge feature/my-feature
```

---

## Notes for Future Self

### Things I've Learned

1. **Content provider architecture was worth it**: Made testing easier and allows future CMS migration
2. **MDX over pure Markdown**: Being able to use React components in articles is powerful
3. **Search index at build time**: Faster than client-side indexing, better UX
4. **Mobile-first approach**: Paid off - most reading happens on phone
5. **Skip the comments**: Don't regret it, keeps maintenance low

### Things to Improve

1. **E2E tests**: Would catch visual regressions
2. **Image optimization**: Could be more aggressive
3. **Bundle size**: Some dependencies are heavy (Mermaid, KaTeX)
4. **Build time**: Will need ISR if article count grows significantly

### Design Decisions

- **No comments**: Keeps maintenance low, this is for personal knowledge
- **No RSS**: Not needed for personal use, easy to add later
- **No analytics**: Don't care about traffic, this is for me
- **Dark theme only**: Easier to maintain, looks better
- **Local MDX files**: Simpler than database, easier to backup

### Tech Debt

- Some components could be split further
- Test coverage could be higher
- Some `any` types in search code (fix when time permits)
- Mermaid rendering could be server-side (for SEO)

---

**Last Updated**: 2026-01-17

*This document is a living reference. Update it when you make significant changes or learn new things about the project.*
