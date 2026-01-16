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

- Node.js 18+ and npm

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cc-automatic-blog-project.git
   cd cc-automatic-blog-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build the search index and application
npm run build

# Or build separately:
npm run build:search  # Generate search index
npm run build         # Build Next.js application
```

## Deployment

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

When you connect Vercel to your GitHub repository:

1. **Push to `main`**: Triggers production deployment
2. **Pull requests**: Creates preview deployments for testing
3. **Commit status**: Vercel updates GitHub commit statuses

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

1. Create a new Markdown file in `posts/`:
   ```
   posts/YYYY-MM-DD-article-title.md
   ```

2. Add frontmatter to the top:
   ```yaml
   ---
   title: "Your Article Title"
   date: "2026-01-17"
   summary: "Brief description of the article"
   tags: ["tag1", "tag2"]
   category: "Category Name"
   draft: false
   ---
   ```

3. Write your content in Markdown below the frontmatter

4. Commit and push:
   ```bash
   git add posts/YYYY-MM-DD-article-title.md
   git commit -m "Add: new article"
   git push
   ```

5. Vercel will automatically deploy your changes

## Content Features

### Math Formulas

Use LaTeX syntax with `$` for inline and `$$` for block formulas:

```markdown
Inline math: $E = mc^2$

Block math:
$$
\int_{a}^{b} f(x) dx = F(b) - F(a)
$$
```

### Diagrams

Use Mermaid code blocks:

```markdown
\`\`\`mermaid
flowchart TD
    A[Start] --> B[End]
\`\`\`
```

### Code Blocks

Specify language for syntax highlighting:

````markdown
\`\`\`typescript
const greeting: string = "Hello, World!";
\`\`\`
````

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

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:search # Generate search index
npm run start        # Start production server
npm run type-check   # TypeScript type checking
npm run lint         # ESLint code linting
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

## License

MIT

## Author

Your Name - [Your GitHub Profile](https://github.com/yourusername)
