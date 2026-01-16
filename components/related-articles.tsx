import Link from 'next/link';
import type { ArticleMetadata } from '@/lib/providers/types';

interface RelatedArticlesProps {
  articles: ArticleMetadata[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-divider">
      <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 sm:mb-8 flex items-center">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-accent-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        相关文章
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block p-4 sm:p-5 bg-bg-tertiary rounded-lg border border-border hover:border-accent-primary transition-all duration-200 hover:shadow-lg hover:shadow-accent-primary/10"
          >
            {/* Article Title */}
            <h3 className="text-base sm:text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors duration-200 mb-2 sm:mb-3 line-clamp-2 text-balance">
              {article.title}
            </h3>

            {/* Article Metadata */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-text-muted text-xs sm:text-sm mb-3">
              {/* Date */}
              <div className="flex items-center">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1"
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

              {/* Reading Time */}
              {article.readingTime && (
                <>
                  <span className="w-1 h-1 bg-text-muted rounded-full"></span>
                  <div className="flex items-center">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {article.readingTime} 分钟
                  </div>
                </>
              )}
            </div>

            {/* Article Summary */}
            {article.summary && (
              <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 mb-3 leading-relaxed">
                {article.summary}
              </p>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-bg-secondary text-text-muted text-xs rounded border border-border group-hover:border-accent-primary/50 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
                {article.tags.length > 3 && (
                  <span className="px-2 py-0.5 text-text-muted text-xs">
                    +{article.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Arrow Icon */}
            <div className="mt-3 sm:mt-4 flex items-center text-accent-primary text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              阅读更多
              <svg
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-6 sm:mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center text-text-secondary hover:text-accent-primary transition-colors duration-200 text-sm sm:text-base"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          查看所有文章
        </Link>
      </div>
    </section>
  );
}
