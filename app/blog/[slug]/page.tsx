import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles } from '@/lib/content';
import { MDXContent } from '@/components/mdx-content';
import { TableOfContents } from '@/components/table-of-contents';
import { RelatedArticles } from '@/components/related-articles';
import { extractToc } from '@/lib/toc';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const baseUrl = 'https://yourdomain.com';
  const url = `${baseUrl}/blog/${slug}`;

  return {
    title: article.title,
    description: article.summary || `Read ${article.title}`,
    keywords: article.tags,
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.summary || `Read ${article.title}`,
      publishedTime: article.date,
      authors: ['Blog Author'],
      tags: article.tags,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary || `Read ${article.title}`,
      images: [
        {
          url: '/twitter-image',
          width: 1200,
          height: 600,
          alt: article.title,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Extract table of contents from article content
  const toc = extractToc(article.content);

  // Get related articles
  const relatedArticles = await getRelatedArticles(
    article.slug,
    article.tags || [],
    article.category,
    3
  );

  // Generate structured data for this article
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.summary,
    image: 'https://yourdomain.com/opengraph-image',
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: 'Blog Author',
      url: 'https://yourdomain.com',
    },
    publisher: {
      '@type': 'Organization',
      name: '个人技术博客',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourdomain.com/icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourdomain.com/blog/${article.slug}`,
    },
    keywords: article.tags?.join(', '),
    articleSection: article.category,
  };

  return (
    <article className="min-h-screen">
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Table of Contents - fixed on desktop */}
      {toc.length > 0 && <TableOfContents toc={toc} />}

      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-text-secondary hover:text-accent-primary transition-colors duration-200 mb-6 sm:mb-8 text-base sm:text-lg"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回首页
        </Link>

        {/* Article Header */}
        <header className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 sm:mb-6 leading-tight sm:leading-tight text-balance">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-text-muted text-sm sm:text-base mb-4 sm:mb-6">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={article.date}>{article.date}</time>
            </div>

            {article.category && (
              <div className="flex items-center">
                <span className="w-1 h-1 bg-text-muted rounded-full mr-1.5 sm:mr-2"></span>
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-primary rounded-full mr-1.5 sm:mr-2"></span>
                  {article.category}
                </span>
              </div>
            )}
          </div>

          {article.summary && (
            <p className="text-base sm:text-lg md:text-xl text-text-secondary border-l-2 sm:border-l-4 border-accent-primary pl-4 sm:pl-6 py-2 sm:py-3 leading-relaxed-mobile">
              {article.summary}
            </p>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-4 sm:mt-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 sm:px-3 py-1 bg-bg-tertiary text-text-secondary text-xs sm:text-sm rounded-full border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-invert prose-base sm:prose-lg max-w-none reading-width">
          <MDXContent content={article.content} />
        </div>

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} />

        {/* Article Footer */}
        <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-divider">
          <Link
            href="/"
            className="inline-flex items-center text-accent-primary hover:text-accent-hover transition-colors duration-200 text-base sm:text-lg"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回首页
          </Link>
        </footer>
      </div>
    </article>
  );
}
