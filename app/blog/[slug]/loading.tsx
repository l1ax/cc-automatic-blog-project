/**
 * Article Page Loading State
 *
 * This file provides a loading state specifically for article detail pages.
 * It shows while the article content is being fetched and rendered.
 *
 * The skeleton matches the structure of the article page including:
 * - Back to home link
 * - Article header (title, metadata, summary, tags)
 * - Article content placeholders
 * - Footer with back link
 */

// import { HeadingSkeleton, ParagraphSkeleton } from "@/components/skeletons";

export default function ArticleLoading() {
  return (
    <article className="min-h-screen">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back to Home Skeleton */}
        <div className="mb-6 sm:mb-8">
          <div className="h-5 sm:h-6 bg-bg-tertiary rounded animate-pulse w-24 sm:w-28 inline-flex items-center"></div>
        </div>

        {/* Article Header Skeleton */}
        <header className="mb-8 sm:mb-12">
          {/* Title Skeleton */}
          <div className="h-8 sm:h-10 md:h-12 lg:h-14 bg-bg-tertiary rounded animate-pulse mb-4 sm:mb-6 w-full"></div>
          <div className="h-8 sm:h-10 md:h-12 lg:h-14 bg-bg-tertiary rounded animate-pulse mb-4 sm:mb-6 w-3/4"></div>

          {/* Metadata Skeleton */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="h-4 sm:h-5 w-20 sm:w-24 bg-bg-tertiary rounded animate-pulse"></div>
            <div className="h-4 sm:h-5 w-24 sm:w-28 bg-bg-tertiary rounded animate-pulse"></div>
          </div>

          {/* Summary Skeleton */}
          <div className="border-l-2 sm:border-l-4 border-bg-tertiary pl-4 sm:pl-6 py-2 sm:py-3 mb-4 sm:mb-6">
            <div className="h-4 bg-bg-tertiary rounded animate-pulse w-full mb-2"></div>
            <div className="h-4 bg-bg-tertiary rounded animate-pulse w-5/6"></div>
          </div>

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            <div className="h-6 sm:h-7 w-16 sm:w-20 bg-bg-tertiary rounded-full animate-pulse"></div>
            <div className="h-6 sm:h-7 w-14 sm:w-18 bg-bg-tertiary rounded-full animate-pulse"></div>
            <div className="h-6 sm:h-7 w-20 sm:w-24 bg-bg-tertiary rounded-full animate-pulse"></div>
            <div className="h-6 sm:h-7 w-12 sm:w-16 bg-bg-tertiary rounded-full animate-pulse"></div>
          </div>
        </header>

        {/* Article Content Skeleton */}
        <div className="space-y-6 sm:space-y-8">
          {/* Simulate multiple content blocks */}
          {Array.from({ length: 5 }).map((_, blockIndex) => (
            <div key={blockIndex} className="space-y-3 sm:space-y-4">
              {/* Heading */}
              <div className="h-5 sm:h-6 md:h-7 bg-bg-tertiary rounded animate-pulse w-1/2 sm:w-3/5"></div>

              {/* Paragraphs */}
              <div className="space-y-2">
                <div className="h-4 bg-bg-tertiary rounded animate-pulse w-full"></div>
                <div className="h-4 bg-bg-tertiary rounded animate-pulse w-full"></div>
                <div className="h-4 bg-bg-tertiary rounded animate-pulse w-4/5"></div>
              </div>

              {/* Code block placeholder for some sections */}
              {(blockIndex === 1 || blockIndex === 3) && (
                <div className="bg-bg-tertiary rounded-lg p-3 sm:p-4 border border-border">
                  <div className="h-3.5 sm:h-4 bg-bg-secondary rounded animate-pulse w-16 sm:w-20 mb-3"></div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="h-3.5 sm:h-4 bg-bg-secondary rounded animate-pulse w-full"></div>
                    <div className="h-3.5 sm:h-4 bg-bg-secondary rounded animate-pulse w-11/12"></div>
                    <div className="h-3.5 sm:h-4 bg-bg-secondary rounded animate-pulse w-full"></div>
                    <div className="h-3.5 sm:h-4 bg-bg-secondary rounded animate-pulse w-10/12"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Article Footer Skeleton */}
        <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-divider">
          <div className="h-5 sm:h-6 bg-bg-tertiary rounded animate-pulse w-24 sm:w-28 inline-flex items-center"></div>
        </footer>
      </div>
    </article>
  );
}
