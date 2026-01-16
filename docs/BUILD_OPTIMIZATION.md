# Build Optimization Guide

This guide explains the build optimization features configured for this Next.js blog project.

## Bundle Analysis

### What is Bundle Analysis?

Bundle analysis helps you understand the size and composition of your JavaScript bundles. This is crucial for:

- Identifying large dependencies that increase page load times
- Finding duplicate code across bundles
- Optimizing your application's performance
- Monitoring bundle size growth over time

### How to Use

Run the bundle analyzer:

```bash
npm run build:analyze
```

This will:

1. Build your application with bundle analysis enabled
2. Automatically open browser windows showing interactive visualizations of your bundles
3. Generate reports for both client and server bundles

### Understanding the Reports

The bundle analyzer shows:

- **Module sizes**: How large each dependency is
- **Dependency tree**: Which modules import which
- **Duplicate code**: Code that appears in multiple bundles
- **Optimization opportunities**: Large modules that could be code-split

### Optimization Tips

Based on bundle analysis, you can:

1. **Code Splitting**: Split large components into separate chunks

   ```typescript
   // Instead of: import { HeavyComponent } from './HeavyComponent'
   // Use dynamic imports:
   const HeavyComponent = dynamic(() => import("./HeavyComponent"));
   ```

2. **Tree Shaking**: Ensure you're only importing what you need

   ```typescript
   // Bad: import _ from 'lodash'
   // Good: import debounce from 'lodash/debounce'
   ```

3. **Replace Heavy Libraries**: Consider lighter alternatives
   - `moment.js` → `date-fns` or native `Intl`
   - `lodash` → native ES6 methods
   - `react-router` → Next.js built-in routing

4. **Optimize Images**: Use Next.js Image component (already configured)
   - AVIF/WebP formats enabled
   - Responsive image sizes configured
   - Lazy loading enabled

## Build Performance Optimizations

### Current Configuration

The following optimizations are enabled in `next.config.ts`:

1. **SWC Minification** (`swcMinify: true`)
   - Faster than Terser
   - Better minification
   - Enabled by default in Next.js 13+

2. **React Strict Mode** (`reactStrictMode: true`)
   - Catches potential issues
   - Helps with future React features
   - Only affects development

3. **Production Source Maps Disabled** (`productionBrowserSourceMaps: false`)
   - Reduces bundle size
   - Faster builds
   - Better security (exposes less code)

4. **Modular Imports** (`modularizeImports`)
   - Only imports used functions from libraries
   - Reduces bundle size significantly
   - Configured for react-markdown

### Build Scripts

```bash
# Regular build
npm run build

# Build with bundle analysis
npm run build:analyze

# Type checking (pre-deployment)
npm run type-check

# Linting (pre-deployment)
npm run lint
```

## Production Build Checklist

Before deploying to production:

1. **Run Type Check**

   ```bash
   npm run type-check
   ```

   Ensures no TypeScript errors

2. **Run Linter**

   ```bash
   npm run lint
   ```

   Catches code quality issues

3. **Run Build**

   ```bash
   npm run build
   ```

   Verifies production build works

4. **Check Build Size**

   ```bash
   npm run build:analyze
   ```

   Review bundle sizes and look for optimization opportunities

5. **Review Build Output**
   - Check for warnings
   - Verify all pages generated successfully
   - Note build time (should be < 2 minutes)

## Performance Targets

### Bundle Sizes

- **First Load JS**: < 100 KB (gzipped)
- **Page-specific JS**: < 50 KB (gzipped) per page
- **Total JS**: < 200 KB (gzipped) for full application

### Build Times

- **Local build**: < 2 minutes (for < 100 articles)
- **CI/CD build**: < 3 minutes (including tests)

### Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s

## Continuous Monitoring

### Pre-commit Checks

Consider adding a pre-commit hook to run:

```bash
npm run type-check && npm run lint
```

### CI/CD Integration

The `.github/workflows/ci.yml` already includes:

- Type checking
- Linting
- Production build verification

### Regular Bundle Audits

Run bundle analysis:

- **Weekly** during active development
- **After** adding new dependencies
- **Before** major releases
- **When** build times increase significantly

## Troubleshooting

### Build is Slow

1. Check what's taking time:

   ```bash
   npm run build -- --debug
   ```

2. Common causes:
   - Too many articles to process
   - Large images in public folder
   - Inefficient MDX processing
   - Not enough system resources

### Bundle Too Large

1. Run bundle analyzer to identify large modules
2. Check for duplicate dependencies
3. Verify tree-shaking is working
4. Consider code splitting for large components

### Type Errors in Production

If `npm run type-check` fails but build succeeds:

```bash
# This means type errors are being ignored
# Update next.config.ts to be stricter:
const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Don't ignore type errors
  },
  // ... other config
}
```

## Next Steps

After implementing build optimization:

1. [ ] Task 6.4: Configure custom domain (if applicable)
2. [ ] Task 6.5: Set up environment variables for any API keys
3. [ ] Task 6.6: Add pre-deployment checks (type checking, linting)
4. [ ] Task 6.7: Create deployment documentation
