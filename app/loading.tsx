/**
 * Global Loading State
 *
 * This file provides a loading state for the entire application.
 * Next.js automatically shows this component while any page in the app directory is loading.
 * It falls back to this component when a page-specific loading.tsx is not available.
 */

import { ArticleCardSkeletonList } from "@/components/skeletons";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section Skeleton */}
        <section className="mb-10 sm:mb-16">
          <div className="h-8 sm:h-10 md:h-12 bg-bg-tertiary rounded animate-pulse mb-3 sm:mb-4 w-48 sm:w-56 md:w-64"></div>
          <div className="h-5 sm:h-6 bg-bg-tertiary rounded animate-pulse mb-4 sm:mb-6 w-64 sm:w-80 md:w-96"></div>
          <div className="space-y-2">
            <div className="h-4 bg-bg-tertiary rounded animate-pulse w-full max-w-2xl"></div>
            <div className="h-4 bg-bg-tertiary rounded animate-pulse w-full max-w-xl"></div>
          </div>
        </section>

        {/* Tag Filter Skeleton */}
        <section className="mb-6 sm:mb-8">
          <div className="h-6 sm:h-7 bg-bg-tertiary rounded animate-pulse w-32 sm:w-40 mb-3 sm:mb-4"></div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <div className="h-7 sm:h-8 w-16 sm:w-20 bg-bg-tertiary rounded-full animate-pulse"></div>
            <div className="h-7 sm:h-8 w-14 sm:w-18 bg-bg-tertiary rounded-full animate-pulse"></div>
            <div className="h-7 sm:h-8 w-20 sm:w-24 bg-bg-tertiary rounded-full animate-pulse"></div>
            <div className="h-7 sm:h-8 w-12 sm:w-16 bg-bg-tertiary rounded-full animate-pulse"></div>
            <div className="h-7 sm:h-8 w-18 sm:w-22 bg-bg-tertiary rounded-full animate-pulse"></div>
          </div>
        </section>

        {/* Article List Skeleton */}
        <section>
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-1 h-5 sm:h-6 bg-bg-tertiary rounded mr-2 sm:mr-3 animate-pulse"></div>
            <div className="h-6 sm:h-7 bg-bg-tertiary rounded animate-pulse w-40 sm:w-48"></div>
          </div>
          <ArticleCardSkeletonList count={3} />
        </section>

        {/* Features Section Skeleton */}
        <section className="mt-12 sm:mt-16">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-1 h-5 sm:h-6 bg-bg-tertiary rounded mr-2 sm:mr-3 animate-pulse"></div>
            <div className="h-6 sm:h-7 bg-bg-tertiary rounded animate-pulse w-24 sm:w-28"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-bg-secondary rounded-lg p-4 sm:p-6 border border-border"
              >
                <div className="w-10 h-10 bg-bg-tertiary rounded-lg animate-pulse mb-4"></div>
                <div className="h-5 sm:h-6 bg-bg-tertiary rounded animate-pulse mb-2 w-24 sm:w-32"></div>
                <div className="h-4 bg-bg-tertiary rounded animate-pulse w-full"></div>
                <div className="h-4 bg-bg-tertiary rounded animate-pulse w-2/3 mt-2"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
