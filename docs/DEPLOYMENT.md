# Deployment Guide: Personal Tech Blog

This guide provides comprehensive instructions for deploying your blog to Vercel, including troubleshooting and advanced configurations.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Deployment Methods](#deployment-methods)
3. [Environment Variables](#environment-variables)
4. [Custom Domain Configuration](#custom-domain-configuration)
5. [Pre-deployment Checks](#pre-deployment-checks)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Build Optimization](#build-optimization)
8. [Troubleshooting](#troubleshooting)
9. [Deployment Checklist](#deployment-checklist)

---

## Quick Start

### Prerequisites

- GitHub account
- Vercel account (sign up with GitHub)
- Node.js 18+ and npm installed locally

### Fastest Deployment (5 minutes)

1. **Push code to GitHub**:

   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Click "Deploy"

3. **Done!** Vercel will give you a URL like `https://your-blog.vercel.app`

---

## Deployment Methods

### Method 1: Vercel Dashboard (Recommended)

**Best for**: First-time deployment, automatic deployments

1. **Import Repository**:
   - Login to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

2. **Configure Project**:
   | Setting | Value |
   |---------|-------|
   | Framework Preset | Next.js (auto-detected) |
   | Root Directory | `./` |
   | Build Command | `npm run build` |
   | Output Directory | `.next` |
   | Install Command | `npm install` |
   | Node.js Version | 20.x |

3. **Deploy**:
   - Click "Deploy"
   - Wait ~2 minutes for build to complete
   - Visit your deployment URL

4. **Automatic Deployments**:
   - Push to `main` branch → Production deployment
   - Pull requests → Preview deployments

### Method 2: Vercel CLI

**Best for**: Custom deployments, local testing

```bash
# Install Vercel CLI
npm i -g vercel

# Login (opens browser)
vercel login

# Link project
vercel link

# Deploy to production
vercel --prod

# Deploy to preview URL
vercel
```

### Method 3: Vercel REST API

**Best for**: Automated deployments, CI/CD integration

```bash
# Create deployment via API
curl -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "cc-automatic-blog-project",
    "gitSource": {
      "type": "github",
      "repo": "yourusername/cc-automatic-blog-project",
      "ref": "main"
    }
  }'
```

---

## Environment Variables

### Required Variables

None required for basic deployment.

### Optional Variables

| Variable               | Purpose                            | Example                              |
| ---------------------- | ---------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Production URL for sitemap/OG tags | `https://blog.example.com`           |
| `ANALYZE`              | Enable bundle analyzer             | `true` (for `npm run build:analyze`) |

### Setting Environment Variables

#### Via Vercel Dashboard:

1. Go to Project Settings → Environment Variables
2. Add variable name and value
3. Select environments (Production, Preview, Development)
4. Click "Save"
5. **Redeploy** to apply changes

#### Via Vercel CLI:

```bash
# Add environment variable
vercel env add NEXT_PUBLIC_SITE_URL production

# List all variables
vercel env ls

# Remove variable
vercel env rm NEXT_PUBLIC_SITE_URL production
```

#### Local Development:

Create `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Note**: `.env.local` is git-ignored. See `.env.example` for template.

---

## Custom Domain Configuration

### Adding a Custom Domain

#### Option 1: Vercel-provided Subdomain (Free)

1. Go to Project Settings → Domains
2. Enter subdomain (e.g., `blog.vercel.app` is default)
3. Click "Add"

#### Option 2: Your Own Domain

1. **Buy a domain** (optional):
   - [Namecheap](https://www.namecheap.com)
   - [Google Domains](https://domains.google)
   - [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)

2. **Add domain in Vercel**:
   - Go to Project Settings → Domains
   - Enter your domain (e.g., `blog.example.com`)
   - Click "Add"

3. **Configure DNS**:
   - Vercel will show DNS records to add
   - For root domain (e.g., `example.com`):
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     ```
   - For subdomain (e.g., `blog.example.com`):
     ```
     Type: CNAME
     Name: blog
     Value: cname.vercel-dns.com
     ```

4. **Wait for DNS propagation**:
   - Usually takes 5-30 minutes
   - Can take up to 48 hours in rare cases
   - Check status in Vercel dashboard

#### Option 3: Using Cloudflare (Recommended)

If you use Cloudflare for DNS:

1. **Add domain in Vercel** (as above)
2. **Add DNS records in Cloudflare**:
   - Type: `CNAME`
   - Name: `blog` (or `@` for root)
   - Target: `cname.vercel-dns.com`
   - Proxy status: **Proxied** (orange cloud)
3. **SSL/TLS**:
   - Set to "Full" or "Full (strict)" in Cloudflare SSL/TLS settings

### SSL Certificates

Vercel automatically:

- Issues Let's Encrypt SSL certificates
- Renews certificates automatically
- Supports HTTPS only (redirects HTTP → HTTPS)

No manual SSL configuration needed.

---

## Pre-deployment Checks

### Type Checking

```bash
# Run TypeScript type checker
npm run type-check

# Or manually
npx tsc --noEmit
```

**Fix type errors** before deploying.

### Linting

```bash
# Run ESLint
npm run lint

# Or manually
npx next lint
```

**Fix lint errors** before deploying.

### Build Verification

```bash
# Full production build
npm run build

# Check output
✓ Generated static pages
✓ Generated search index
✓ No TypeScript errors
✓ No ESLint errors
```

### Production Preview Locally

```bash
# Build and start production server
npm run build
npm run start

# Visit http://localhost:3000
```

---

## CI/CD Pipeline

### GitHub Actions CI

The project includes `.github/workflows/ci.yml` that runs on:

- Push to `main` branch
- Pull requests to `main`
- Manual workflow dispatch

#### CI Jobs

| Job          | Purpose               | Commands             |
| ------------ | --------------------- | -------------------- |
| `type-check` | TypeScript validation | `npm run type-check` |
| `lint`       | Code quality checks   | `npm run lint`       |
| `build`      | Production build      | `npm run build`      |

#### CI Configuration

```yaml
# .github/workflows/ci.yml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run type-check

  lint:
    # ... similar to type-check ...

  build:
    needs: [type-check, lint]
    # ... build step ...
```

#### Branch Protection (Optional)

Require CI checks before merging to `main`:

1. Go to GitHub repository Settings → Branches
2. Add branch protection rule for `main`:
   - ✅ Require status checks to pass
   - Select: `Type Check`, `Lint`, `Build`
   - ✅ Require branches to be up to date
3. Save

---

## Build Optimization

### Bundle Analysis

Analyze your bundle size:

```bash
# Generate bundle report
npm run build:analyze

# Or with environment variable
ANALYZE=true npm run build
```

This opens an interactive report showing:

- Client-side JavaScript size
- Server-side bundle size
- Dependencies and their sizes

### Optimization Tips

1. **Code Splitting**:
   - Next.js automatically splits by routes
   - Use dynamic imports for large components:
     ```tsx
     const HeavyComponent = dynamic(() => import("./HeavyComponent"));
     ```

2. **Image Optimization**:
   - Use `next/image` for all images
   - AVIF/WebP formats enabled by default

3. **Font Optimization**:
   - Use `next/font` for custom fonts
   - Currently using system fonts (no external requests)

4. **Search Index**:
   - Generated at build time
   - Served as static JSON
   - Loads asynchronously (non-blocking)

### Performance Targets

| Metric                   | Target      | How to Check            |
| ------------------------ | ----------- | ----------------------- |
| Build Time               | < 2 minutes | `time npm run build`    |
| First Contentful Paint   | < 1.8s      | Lighthouse              |
| Largest Contentful Paint | < 2.5s      | Lighthouse              |
| Total Bundle Size        | < 200KB     | `npm run build:analyze` |

---

## Troubleshooting

### Build Failures

#### Error: "Module not found"

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

#### Error: "TypeScript errors"

```bash
# Check type errors
npm run type-check

# Fix errors or use type assertions
# Then rebuild
npm run build
```

#### Error: "ESLint errors"

```bash
# Check lint errors
npm run lint

# Auto-fix some issues
npm run lint -- --fix

# Then rebuild
npm run build
```

#### Error: "Search index not found"

```bash
# Generate search index manually
npm run build:search

# Verify it exists
ls -la public/search-index.json
```

### Deployment Issues

#### Vercel deployment shows "Ready" but site is blank

**Cause**: Build succeeded but runtime error

**Solution**:

1. Check Vercel deployment logs
2. Look for runtime errors in Functions tab
3. Test locally: `npm run build && npm run start`
4. Fix errors and redeploy

#### Environment variables not working

**Cause**: Variable not set or not prefixed with `NEXT_PUBLIC_`

**Solution**:

1. Ensure variable starts with `NEXT_PUBLIC_` for client-side access
2. Set variable in Vercel dashboard
3. **Redeploy** (environment variables only apply on new deployments)

#### Custom domain not working

**Cause**: DNS misconfiguration

**Solution**:

1. Use `dig` to check DNS:
   ```bash
   dig blog.example.com
   ```
2. Verify DNS records match Vercel's instructions
3. Wait for DNS propagation (5-30 minutes)
4. Check Vercel dashboard for domain configuration errors

#### Search not working on production

**Cause**: Search index not generated or wrong path

**Solution**:

1. Verify `public/search-index.json` exists:
   ```bash
   npm run build:search
   ls public/search-index.json
   ```
2. Check browser console for 404 errors
3. Verify `build:search` runs before build (check `package.json` scripts)
4. Redeploy to Vercel

### Performance Issues

#### Site is slow to load

**Diagnosis**:

1. Run Lighthouse audit
2. Check bundle size: `npm run build:analyze`
3. Check Vercel Analytics

**Solutions**:

- Enable compression (automatic on Vercel)
- Optimize images (use `next/image`)
- Reduce JavaScript bundle size
- Enable Vercel Edge Network (automatic)

#### Build time too long

**Target**: < 2 minutes for < 100 articles

**If slower**:

1. Check number of articles
2. Consider ISR (Incremental Static Regeneration)
3. Optimize images and assets
4. Use Vercel caching

---

## Deployment Checklist

Use this checklist before deploying to production:

### Pre-deployment

- [ ] All TypeScript errors fixed (`npm run type-check`)
- [ ] All ESLint errors fixed (`npm run lint`)
- [ ] Production build succeeds locally (`npm run build`)
- [ ] Search index generated (`ls public/search-index.json`)
- [ ] Environment variables configured (if needed)
- [ ] Custom domain DNS configured (if using custom domain)
- [ ] Updated `NEXT_PUBLIC_SITE_URL` environment variable

### Deployment

- [ ] Repository pushed to GitHub
- [ ] GitHub repository connected to Vercel
- [ ] Initial deployment successful
- [ ] Vercel deployment URL works
- [ ] CI checks pass in GitHub Actions

### Post-deployment

- [ ] Custom domain works (if configured)
- [ ] HTTPS redirect works
- [ ] All pages load correctly
- [ ] Search functionality works
- [ ] Images load and optimize correctly
- [ ] Math formulas render correctly
- [ ] Diagrams render correctly
- [ ] Mobile responsive test passes
- [ ] Lighthouse score > 90 (mobile)
- [ ] Sitemap accessible (`/sitemap.xml`)
- [ ] Robots.txt accessible (`/robots.txt`)

### Verification Commands

```bash
# Check site is accessible
curl https://your-domain.com

# Check sitemap
curl https://your-domain.com/sitemap.xml

# Check robots.txt
curl https://your-domain.com/robots.txt

# Check search index
curl https://your-domain.com/search-index.json
```

---

## Advanced Topics

### Zero-Downtime Deployments

Vercel automatically:

- Deploys to new URL first
- Runs health checks
- Swaps traffic to new deployment
- Rolls back on failure

No manual configuration needed.

### Rollback Deployment

Via Vercel Dashboard:

1. Go to Deployments tab
2. Find previous successful deployment
3. Click "Promote to Production"

Via Vercel CLI:

```bash
# List deployments
vercel ls

# Promote specific deployment
vercel promote <deployment-url> --scope <team>
```

### Preview Deployments

Every pull request automatically gets a preview URL:

- `https://your-branch.pr-123.your-domain.vercel.app`
- Test changes before merging
- Share preview URL for review

### Deployment Hooks

Vercel supports deployment hooks (webhooks):

```json
// vercel.json
{
  "github": {
    "silent": true
  },
  "hooks": {
    "preBuild": "echo 'Starting build...'",
    "postBuild": "echo 'Build complete!'"
  }
}
```

### Multiple Environments

Create different projects for:

- Production (main branch)
- Staging (develop branch)
- Feature branches (preview deployments)

---

## Support and Resources

### Official Documentation

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)

### Common Issues

- [Vercel Troubleshooting](https://vercel.com/docs/concepts/solutions/troubleshooting)
- [Next.js Deployment Errors](https://nextjs.org/docs/deployment#troubleshooting)

### Community

- [Vercel Discord](https://vercel.com/discord)
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vercel)

---

## Summary

This blog is designed for simple, reliable deployment:

1. **Push to GitHub** → Automatic Vercel deployment
2. **CI checks pass** → Build succeeds
3. **Deployment live** → Site updated

The entire process takes ~2-3 minutes from `git push` to live deployment.

**Key points**:

- No server configuration needed
- Automatic HTTPS/SSL
- Automatic deployments on git push
- Preview deployments for pull requests
- Built-in CI/CD with GitHub Actions

For questions or issues, refer to the [Troubleshooting](#troubleshooting) section or consult the official Vercel documentation.
