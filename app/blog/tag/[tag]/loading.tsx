/**
 * Tag Page Loading State
 *
 * This file provides a loading state specifically for tag pages.
 * It shows while the articles for a specific tag are being fetched.
 *
 * The skeleton matches the structure of the tag page including:
 * - Breadcrumb navigation
 * - Tag header with name and article count
 * - Article list
 */

import { ArticleCardSkeletonList } from "@/components/skeletons";

export default function TagPageLoading() {
  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-1.5 sm:gap-2 text-text-muted text-xs sm:text-sm">
            <div className="h-3.5 sm:h-4 bg-bg-tertiary rounded animate-pulse w-8 sm:w-10"></div>
            <div className="h-3.5 sm:h-4 w-3 sm:w-4 text-text-muted opacity-50">/</div>
            <div className="h-3.5 sm:h-4 bg-bg-tertiary rounded animate-pulse w-8 sm:w-10"></div>
            <div className="h-3.5 sm:h-4 w-3 sm:w-4 text-text-muted opacity-50">/</div>
            <div className="h-3.5 sm:h-4 bg-bg-tertiary rounded animate-pulse w-16 sm:w-20"></div>
          </div>
        </div>

        {/* Tag Header Skeleton */}
        <header className="mb-6 sm:mb-8 border-l-2 sm:border-l-4 border-bg-tertiary pl-4 sm:pl-6">
          <div className="h-7 sm:h-8 md:h-9 bg-bg-tertiary rounded animate-pulse w-32 sm:w-40 md:w-48 mb-2"></div>
          <div className="h-4 sm:h-5 bg-bg-tertiary rounded animate-pulse w-40 sm:w-52 md:w-64"></div>
        </header>

        {/* Article List Skeleton */}
        <section>
          <ArticleCardSkeletonList count={3} />
        </section>
      </div>
    </main>
  );
}
