import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/content';
import { MDXContent } from '@/components/mdx-content';

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
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.summary || `Read ${article.title}`,
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-text-secondary hover:text-accent-primary transition-colors duration-200 mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
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
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-text-muted text-sm mb-6">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
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
                <span className="w-1 h-1 bg-text-muted rounded-full mr-2"></span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-accent-primary rounded-full mr-2"></span>
                  {article.category}
                </span>
              </div>
            )}
          </div>

          {article.summary && (
            <p className="text-xl text-text-secondary border-l-4 border-accent-primary pl-6 py-2">
              {article.summary}
            </p>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-bg-tertiary text-text-secondary text-sm rounded-full border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <MDXContent content={article.content} />
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-divider">
          <Link
            href="/"
            className="inline-flex items-center text-accent-primary hover:text-accent-hover transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
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
