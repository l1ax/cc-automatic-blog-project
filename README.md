# cc-automatic-blog-project

Personal tech blog built with Next.js 15, MDX, and Tailwind CSS. Designed as a knowledge base and memo system with excellent code highlighting and mobile-friendly reading experience.

## Features

- **Dark Theme**: Deep gray background (#1a1a1a) with orange accents (#f97316)
- **MDX Support**: Full Markdown + React components for flexible content
- **Static Site Generation**: Fast, SEO-friendly static pages
- **Code Highlighting**: VSCode-quality syntax highlighting with copy button
- **Full-Text Search**: Client-side search with < 500ms response time
- **Responsive Design**: Mobile-first approach, optimized for all screen sizes
- **Math Formulas**: KaTeX integration for LaTeX math rendering
- **Diagrams**: Mermaid support for flowcharts, sequence diagrams, and more
- **Table of Contents**: Auto-generated TOC with active heading tracking
- **Related Articles**: Smart recommendations based on tags and categories

## Getting Started

### Prerequisites

- **Node.js 18+** and **npm** (or **pnpm**/**yarn**)
- **Git** for version control
- Optional: **Vercel CLI** for deployment

### Quick Start (5 Minutes)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/cc-automatic-blog-project.git
   cd cc-automatic-blog-project
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**:

   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Setup

#### 1. Environment Variables

Create a `.env.local` file for local development (optional):

```bash
# Your production site URL (used for sitemap and canonical URLs)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### 2. Available Scripts

```bash
# Development
npm run dev              # Start development server (http://localhost:3000)
npm run build           # Build for production (includes search index)
npm run build:search    # Generate search index only
npm run start           # Start production server locally

# Code Quality
npm run lint            # Run ESLint to check code quality
npm run lint:fix        # Auto-fix ESLint issues
npm run format          # Format code with Prettier
npm run format:check    # Check formatting without modifying
npm run type-check      # Run TypeScript type checking

# Testing
npm test                # Run tests in watch mode
npm run test:run        # Run tests once
npm run test:ui         # Run tests with UI interface
npm run test:coverage   # Run tests with coverage report

# Build Analysis
npm run build:analyze   # Build with bundle analyzer
```

#### 3. Development Workflow

```bash
# 1. Create a new branch for your changes
git checkout -b feature/my-new-feature

# 2. Make your changes and test locally
npm run dev

# 3. Run type checking and linting
npm run type-check
npm run lint

# 4. Run tests
npm run test:run

# 5. Build to verify production build works
npm run build

# 6. Commit and push
git add .
git commit -m "feat: add my new feature"
git push origin feature/my-new-feature
```

### Building for Production

```bash
# Full production build (includes search index generation)
npm run build

# The build process:
# 1. Generates search index from all articles
# 2. Builds Next.js application
# 3. Optimizes assets (images, fonts, etc.)
# 4. Generates static pages for all routes

# Preview production build locally
npm run start
```

### Troubleshooting Development Issues

#### Port Already in Use

If port 3000 is already in use:

```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

#### Build Errors

```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run build

# Clear node_modules and reinstall (if dependency issues)
rm -rf node_modules package-lock.json
npm install
```

#### Type Checking Errors

```bash
# Run type check with detailed output
npx tsc --noEmit

# Update TypeScript types
npm install --save-dev @types/node@latest
```

## Deployment

> **For comprehensive deployment instructions, see [Deployment Guide](docs/DEPLOYMENT.md)**

### Option 1: Deploy via Vercel Dashboard (Recommended)

This is the easiest method for automatic deployments:

1. **Push your code to GitHub**:

   ```bash
   git remote add origin https://github.com/yourusername/cc-automatic-blog-project.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your `cc-automatic-blog-project` repository

3. **Configure the project**:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Enable automatic deployments**:
   - Vercel will automatically deploy when you push to `main`
   - Pull requests will get preview deployments

5. **Configure environment variables** (optional):
   - `NEXT_PUBLIC_SITE_URL`: Your production URL (e.g., `https://blog.example.com`)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel (requires browser authentication)
vercel login

# Deploy to production
vercel --prod

# Or deploy to preview
vercel
```

### Option 3: GitHub Integration with CI

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

- Runs TypeScript type checking
- Runs ESLint for code quality
- Builds the Next.js application
- Uploads build artifacts

This runs on every push and pull request to ensure code quality before deployment.

## GitHub Integration

### Automatic Deployments

**Automatic deployment is already configured** in `vercel.json` with:

```json
"git": {
  "deploymentEnabled": {
    "main": true
  }
}
```

When you connect Vercel to your GitHub repository:

1. **Push to `main`**: Automatically triggers production deployment
2. **Pull requests**: Creates preview deployments for testing
3. **Commit status**: Vercel updates GitHub commit statuses

**No additional configuration needed** - just connect your GitHub repo in Vercel dashboard and automatic deployments will work immediately.

### Pre-deployment Checks

The included CI workflow (`ci.yml) runs:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

You can add branch protection rules in GitHub to require these checks before merging.

### Deployment Workflow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Git Push to    │ -> │  GitHub Actions │ -> │  Vercel Deploy  │
│   GitHub main   │    │       CI        │    │   (Production)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Project Structure

```
cc-automatic-blog-project/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with header/footer
│   ├── page.tsx                  # Homepage (article list)
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Article detail page
│   │   └── tag/
│   │       └── [tag]/
│   │           └── page.tsx      # Tag page
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── loading.tsx               # Global loading state
│   ├── not-found.tsx             # 404 page
│   ├── sitemap.ts                # Dynamic sitemap
│   ├── robots.ts                 # Robots.txt
│   └── globals.css               # Global styles
├── posts/                        # Blog articles (Markdown)
├── components/                   # React components
│   ├── article-card.tsx          # Article card component
│   ├── back-to-top.tsx           # Back to top button
│   ├── code-block.tsx            # Code highlighting with copy
│   ├── mdx-content.tsx           # MDX content renderer
│   ├── mdx-image.tsx             # Optimized image component
│   ├── mobile-nav.tsx            # Mobile navigation menu
│   ├── related-articles.tsx      # Related articles section
│   ├── search-box.tsx            # Search box with live results
│   ├── table-of-contents.tsx     # Article TOC
│   ├── tag-filter.tsx            # Tag filter component
│   └── skeletons/                # Loading skeleton components
├── lib/                          # Utility functions
│   ├── content.ts                # Content provider API
│   ├── search/                   # Search functionality
│   │   ├── build-index.ts        # Build-time index generator
│   │   ├── client-search.ts      # Client-side search
│   │   └── types.ts              # Search type definitions
│   ├── toc.ts                    # TOC extraction utilities
│   └── providers/                # Content providers
│       ├── types.ts              # ContentProvider interface
│       └── local-mdx.ts          # Local MDX implementation
├── docs/                         # Project documentation
│   ├── PRD.md                    # Product Requirements Document
│   └── PROGRESS.md               # Progress tracking
├── public/                       # Static assets
│   └── search-index.json         # Generated search index
├── .github/workflows/            # GitHub Actions
│   └── ci.yml                    # CI/CD pipeline
├── vercel.json                   # Vercel configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── package.json                  # Dependencies and scripts
```

## Adding New Articles

### Quick Method

1. **Create a new Markdown file** in the `posts/` directory:

   ```bash
   # Naming convention: YYYY-MM-DD-title.md
   touch posts/2026-01-17-my-new-article.md
   ```

2. **Add frontmatter** at the top of the file:

   ```yaml
   ---
   title: "My New Article Title"
   date: "2026-01-17"
   summary: "A brief description of what this article is about"
   tags: ["tag1", "tag2", "tag3"]
   category: "Category Name"
   draft: false
   ---
   ```

3. **Write your content** in Markdown below the frontmatter

4. **Test locally**:

   ```bash
   npm run dev
   # Visit http://localhost:3000 to see your article
   ```

5. **Build to verify**:

   ```bash
   npm run build
   # This will regenerate the search index with your new article
   ```

6. **Commit and push**:

   ```bash
   git add posts/2026-01-17-my-new-article.md
   git commit -m "Add: my new article"
   git push
   ```

7. **Vercel auto-deploys** your changes

### Article Template

Copy this template for new articles:

```markdown
---
title: "Article Title Here"
date: "2026-01-17"
summary: "A one-sentence description of this article"
tags: ["tag1", "tag2"]
category: "Category"
draft: false
---

# Article Title

Introduction paragraph here...

## Section 1

Content...

## Section 2

Content...

### Subsection

More content...

## Conclusion

Summary here...
```

### Draft Articles

To work on articles without publishing them:

```yaml
---
title: "Work in Progress"
date: "2026-01-17"
summary: "Draft article"
tags: ["draft"]
category: "Drafts"
draft: true  # Set to true to exclude from build
---
```

Draft articles (`draft: true`) are:
- **Not included** in production builds
- **Not shown** in article lists
- **Not indexed** by search engines
- **Still accessible** locally for testing

### Article URL

The article URL is automatically generated from the filename:

```
Filename: posts/2026-01-17-my-article.md
URL:      /blog/2026-01-17-my-article
```

### Images in Articles

Place images in the `public/images/` directory:

```
public/
  images/
    my-photo.jpg
    diagram.png
```

Reference them in your article:

```markdown
![My photo](/images/my-photo.jpg "Photo title")
```

Or use external images:

```markdown
![External image](https://example.com/image.png "Title")
```

### Updating Articles

To update an existing article:

1. Edit the Markdown file in `posts/`
2. Test changes locally: `npm run dev`
3. Commit and push: `git add . && git commit -m "Update: article" && git push`

### Deleting Articles

To remove an article:

1. Delete the Markdown file
2. Rebuild search index: `npm run build`
3. Commit and push

**Note**: Deleted articles will return 404. Consider keeping the file with `draft: true` instead.

### Article Organization

Organize articles with tags and categories:

```yaml
---
tags: ["react", "nextjs", "tutorial"]  # Multiple tags for filtering
category: "Frontend Development"        # One main category
---
```

- **Tags**: Used for filtering and related articles
- **Category**: Primary categorization shown in article metadata

### Article Best Practices

1. **Frontmatter**: Always include all required fields
2. **Dates**: Use `YYYY-MM-DD` format for consistency
3. **Tags**: Use lowercase, hyphenated tags (`web-development`, not `Web Development`)
4. **Summaries**: Keep summaries under 150 characters
5. **Images**: Optimize images before adding (use WebP/AVIF format)
6. **Code**: Always specify language for syntax highlighting
7. **Links**: Use descriptive link text (not "click here")

## Customization Guide

### Theme Customization

The blog uses a dark theme with orange accents. You can customize colors in `tailwind.config.ts`:

```typescript
// tailwind.config.ts
colors: {
  // Background colors
  primary: '#1a1a1a',    // Main background
  secondary: '#242424',  // Card backgrounds
  tertiary: '#2d2d2d',   // Hover states

  // Accent color (change this to your brand color)
  orange: {
    DEFAULT: '#f97316',  // Primary accent (try: #3b82f6 for blue)
    hover: '#ea580c',    // Hover state
    subtle: '#c2410c',   // Subtle highlights
  },
}
```

### Typography

Base typography styles are in `app/globals.css`:

```css
/* Change base font */
:root {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Adjust font sizes */
.prose {
  font-size: 1rem; /* Base font size */
  line-height: 1.75; /* Line height */
}
```

### Navigation

Edit the navigation links in `app/layout.tsx`:

```typescript
// Add or remove navigation items
const navItems = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于' },
  // Add more: { href: '/projects', label: '项目' },
]
```

### Footer Content

Customize the footer in `app/layout.tsx`:

```typescript
<footer>
  <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
  {/* Add social links, copyright info, etc. */}
</footer>
```

### SEO Metadata

Update site-wide metadata in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Your Site Name',
    template: '%s | Your Site Name',
  },
  description: 'Your site description',
  authors: [{ name: 'Your Name', url: 'https://yourwebsite.com' }],
  // Add more metadata...
}
```

### Adding Custom Components

Create new components in `components/`:

```typescript
// components/my-component.tsx
export function MyComponent({ content }: { content: string }) {
  return (
    <div className="p-4 border border-orange-500 rounded">
      {content}
    </div>
  )
}
```

Use in MDX files:

```markdown
---
title: "My Article"
---
import { MyComponent } from '@/components/my-component'

<MyComponent content="Hello from custom component!" />
```

### Extending Content Provider

To switch from local MDX to another content source (Notion, Obsidian, etc.), implement the `ContentProvider` interface:

```typescript
// lib/providers/notion.ts
import type { ContentProvider } from './types'

export class NotionProvider implements ContentProvider {
  async getAllArticles() {
    // Fetch from Notion API
  }

  async getArticleBySlug(slug: string) {
    // Fetch single article from Notion
  }

  // Implement other methods...
}
```

Then update `lib/content.ts` to use your new provider.

## Content Creation Guide

### Markdown Syntax

The blog supports standard GitHub Flavored Markdown (GFM):

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

[Link text](https://example.com)

- List item 1
- List item 2

1. Numbered item
2. Another numbered item

> Blockquote

`inline code`

---

Horizontal rule
```

### Code Blocks

Specify language for syntax highlighting (40+ languages supported):

```markdown
\`\`\`typescript
const greeting: string = "Hello, World!";
interface User {
  name: string;
  age: number;
}
\`\`\`

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

\`\`\`rust
fn main() {
    println!("Hello, World!");
}
\`\`\`
```

### Math Formulas

Use LaTeX syntax with `$` for inline and `$$` for block formulas:

```markdown
Inline math: $E = mc^2$

Euler's formula: $e^{i\pi} + 1 = 0$

Block math:

$$
\int_{a}^{b} f(x) dx = F(b) - F(a)
$$

Matrices:

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$
```

### Diagrams

Use Mermaid code blocks for various diagram types:

```markdown
\`\`\`mermaid
flowchart TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
\`\`\`

\`\`\`mermaid
sequenceDiagram
    participant User
    participant System
    User->>System: Request
    System-->>User: Response
\`\`\`
```

**Supported diagram types:**
- Flowcharts (`flowchart`)
- Sequence diagrams (`sequenceDiagram`)
- State diagrams (`stateDiagram-v2`)
- Class diagrams (`classDiagram`)
- ER diagrams (`erDiagram`)
- Gantt charts (`gantt`)
- Pie charts (`pie`)
- Git graphs (`gitGraph`)
- Mindmaps (`mindmap`)
- Timelines (`timeline`)

### Images

```markdown
![Alt text](image_url "Optional title")

![Local image](/images/my-photo.jpg "Photo title")

![External image](https://example.com/image.png "External image")
```

Images are automatically optimized with Next.js Image component (AVIF/WebP support, lazy loading).

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Custom MDX Components

You can use React components directly in your Markdown:

```markdown
import { Alert } from '@/components/alert'

<Alert type="info">
  This is a custom React component in Markdown!
</Alert>
```

### Frontmatter Reference

Every article must include frontmatter at the top:

```yaml
---
title: "Your Article Title"        # Required: Article title
date: "2026-01-17"                 # Required: Publication date (YYYY-MM-DD)
summary: "Brief description"       # Required: Short description for list view
tags: ["tag1", "tag2"]             # Required: Array of tags for categorization
category: "Category Name"          # Required: Main category
draft: false                       # Required: Set to true to exclude from build
---

# Your Article Content

Write your article content here in Markdown...
```

**Field descriptions:**
- `title`: Displayed on article page and in search results
- `date`: Used for sorting and display (format: YYYY-MM-DD)
- `summary`: Shown in article cards and search results
- `tags`: Used for tag filtering and related articles
- `category`: Primary categorization (shows in article metadata)
- `draft`: Set to `true` to exclude from production build

## Testing

### Running Tests

The project includes comprehensive unit and integration tests using Vitest:

```bash
# Run tests in watch mode (recommended during development)
npm test

# Run tests once
npm run test:run

# Run tests with UI interface (interactive)
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

```
lib/
├── __tests__/
│   ├── content.integration.test.ts    # Content provider integration tests
│   └── ...
├── search/
│   └── __tests__/
│       ├── build-index.test.ts        # Search index unit tests
│       └── client-search.integration.test.ts
└── utils/
    └── __tests__/
        └── reading-time.test.ts       # Utility function tests
```

### What's Tested

**Unit Tests** (65 tests):
- TOC extraction and heading ID generation
- Search tokenization (English, Chinese, mixed)
- Reading time calculation

**Integration Tests** (66 tests):
- Content provider (getAllArticles, getArticleBySlug, etc.)
- Client-side search (loading, searching, error handling)
- End-to-end flows (article list, detail page, tag filtering)

### Writing Tests

Create test files alongside the code you're testing:

```typescript
// lib/utils/__tests__/my-util.test.ts
import { describe, it, expect } from 'vitest'
import { myUtil } from '../my-util'

describe('myUtil', () => {
  it('should do something', () => {
    expect(myUtil()).toBe('expected result')
  })
})
```

### Pre-commit Checks

Before committing, run:

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Run tests
npm run test:run

# Build
npm run build
```

Or use the CI workflow which runs automatically on push.

## Environment Variables

Create a `.env.local` file for local development:

```bash
# Optional: Your production site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For Vercel deployment, configure these in the Vercel dashboard:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Scripts

Complete reference of all available npm scripts:

```bash
# Development
npm run dev              # Start development server at http://localhost:3000

# Building
npm run build            # Build for production (includes search index)
npm run build:search     # Generate search index only
npm run start            # Start production server locally

# Code Quality
npm run lint             # Run ESLint to check code quality
npm run lint:fix         # Auto-fix ESLint issues where possible
npm run format           # Format all files with Prettier
npm run format:check     # Check formatting without modifying files
npm run type-check       # Run TypeScript type checking without emit

# Testing
npm test                 # Run tests in watch mode
npm run test:run         # Run tests once and exit
npm run test:ui          # Run tests with interactive UI interface
npm run test:coverage    # Run tests and generate coverage report

# Analysis
npm run build:analyze    # Build with bundle analyzer (set ANALYZE=true)
```

## Tech Stack

- **Framework**: Next.js 15.1.4 (App Router)
- **Styling**: Tailwind CSS 3.4.17
- **Content**: MDX with remark/rehype plugins
- **Code Highlighting**: react-syntax-highlighter (PrismJS)
- **Search**: FlexSearch
- **Math**: KaTeX
- **Diagrams**: Mermaid
- **Deployment**: Vercel
- **Testing**: Vitest
- **Code Quality**: ESLint, Prettier

## FAQ

### Common Questions

**Q: How do I change the site name and description?**

A: Edit the metadata in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Your Site Name',
    template: '%s | Your Site Name',
  },
  description: 'Your site description',
}
```

**Q: Why is my article not showing up?**

A: Check the following:
1. Is `draft: false` in the frontmatter?
2. Did you run `npm run build` after adding the article?
3. Is the file in the `posts/` directory?
4. Does the file have the `.md` extension?

**Q: How do I add a custom domain?**

A: See the [Deployment Guide](docs/DEPLOYMENT.md) for detailed instructions on configuring custom domains with various DNS providers.

**Q: Can I use this blog with a CMS instead of local files?**

A: Yes! The blog uses a content provider interface (`lib/providers/types.ts`). You can implement a new provider for Notion, Obsidian, or any headless CMS. See the "Extending Content Provider" section above.

**Q: How do I add Google Analytics?**

A: Add your Google Analytics ID to `app/layout.tsx`:

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Q: How do I customize the code highlighting theme?**

A: Edit the theme in `components/code-block.tsx`:

```typescript
<SyntaxHighlighter
  style={vscDarkPlus}  // Change to another theme
  language={language}
  // ...
>
```

Available themes are imported from `react-syntax-highlighter/dist/esm/styles/prism`.

**Q: The search is not working. What do I do?**

A: Make sure the search index is generated:

```bash
# Regenerate search index
npm run build:search

# Or do a full build
npm run build
```

Check that `public/search-index.json` exists after building.

**Q: How do I disable comments?**

A: Comments are not included by default. This is a personal blog without commenting functionality, as per the design goals.

**Q: Can I add RSS feeds?**

A: Yes, create an RSS route. Add `app/rss.xml/route.ts`:

```typescript
export async function GET() {
  const articles = await getAllArticles()

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Your Site</title>
    ${articles.map(article => `
      <item>
        <title>${article.title}</title>
        <link>https://yoursite.com/blog/${article.slug}</link>
      </item>
    `).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' }
  })
}
```

**Q: How do I add a page?**

A: Create a new file in the `app/` directory:

```typescript
// app/my-page/page.tsx
export default function MyPage() {
  return (
    <main>
      <h1>My New Page</h1>
      <p>Page content here...</p>
    </main>
  )
}
```

Then add a link in `app/layout.tsx` navigation.

**Q: What's the difference between `.md` and `.mdx` files?**

A: Both work the same way. `.mdx` is the preferred extension as it enables using React components directly in Markdown. The blog treats both identically.

## Resources

### Official Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)

### Content Writing

- [Markdown Guide](https://www.markdownguide.org/)
- [KaTeX Math Documentation](https://katex.org/docs/supported.html)
- [Mermaid Diagram Guide](https://mermaid.js.org/intro/)

### Development Tools

- [VS Code](https://code.visualstudio.com/) - Recommended editor
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Vitest](https://vitest.dev/) - Testing framework

### Community & Support

- [Next.js GitHub](https://github.com/vercel/next.js)
- [Vercel Discord](https://vercel.com/discord)
- [Tailwind CSS Discord](https://tailwindcss.com/discord)

## License

MIT

## Author

Your Name - [Your GitHub Profile](https://github.com/yourusername)
