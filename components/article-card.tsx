import Link from "next/link";
import type { ArticleMetadata } from "@/lib/content";

interface ArticleCardProps {
  article: ArticleMetadata;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { title, date, summary, tags, category, slug, readingTime } = article;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block bg-bg-secondary rounded-lg p-6 border border-border hover:border-accent-primary transition-all duration-200 hover:shadow-lg hover:shadow-accent-primary/10"
    >
      <div className="flex flex-col h-full">
        {/* Article Header */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-200">
            {title}
          </h3>

          {summary && (
            <p className="text-text-secondary mb-4 line-clamp-2 text-sm leading-relaxed">
              {summary}
            </p>
          )}
        </div>

        {/* Article Metadata */}
        <div className="flex items-center flex-wrap gap-3 text-sm text-text-muted">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1.5"
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
            {date}
          </span>

          {readingTime && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5"
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
              {readingTime} 分钟
            </span>
          )}

          {category && (
            <span className="flex items-center">
              <span className="w-2 h-2 bg-accent-primary rounded-full mr-1.5"></span>
              {category}
            </span>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-bg-tertiary text-text-secondary text-xs rounded-full border border-border group-hover:border-accent-primary/50 group-hover:text-accent-primary transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
