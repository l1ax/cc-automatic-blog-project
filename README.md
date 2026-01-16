# cc-automatic-blog-project

Personal tech blog built with Next.js 15, MDX, and Tailwind CSS.

## Features

- Dark theme with orange accents
- MDX support for blog articles
- Static site generation (SSG)
- Responsive design
- Code highlighting with Markdown rendering

## Getting Started

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

## Deployment

This project is configured for deployment on Vercel.

### Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will automatically detect Next.js and deploy

### Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel (requires browser authentication)
vercel login

# Deploy to production
vercel --prod
```

## Project Structure

- `app/` - Next.js app directory with pages
- `posts/` - Blog articles in Markdown
- `components/` - React components
- `lib/` - Utility functions
- `docs/` - Project documentation (PRD, PROGRESS)