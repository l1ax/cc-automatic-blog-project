/**
 * ArticleCard Skeleton Component
 *
 * Displays a loading placeholder for article cards with a shimmer animation effect.
 * Used on the homepage, tag pages, and wherever article lists are displayed.
 */

export function ArticleCardSkeleton() {
  return (
    <div className="bg-bg-secondary rounded-lg p-4 sm:p-6 border border-border">
      <div className="flex flex-col h-full">
        {/* Title Skeleton */}
        <div className="flex-1 mb-3 sm:mb-4">
          <div className="h-5 sm:h-6 bg-bg-tertiary rounded animate-pulse mb-2 w-3/4"></div>
          <div className="h-4 bg-bg-tertiary rounded animate-pulse w-full mb-2"></div>
          <div className="h-4 bg-bg-tertiary rounded animate-pulse w-2/3"></div>
        </div>

        {/* Metadata Skeleton */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="h-3.5 sm:h-4 w-16 sm:w-20 bg-bg-tertiary rounded animate-pulse"></div>
          <div className="h-3.5 sm:h-4 w-12 sm:w-16 bg-bg-tertiary rounded animate-pulse"></div>
          <div className="h-3.5 sm:h-4 w-14 sm:w-18 bg-bg-tertiary rounded animate-pulse"></div>
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <div className="h-5 sm:h-6 w-14 sm:w-16 bg-bg-tertiary rounded-full animate-pulse"></div>
          <div className="h-5 sm:h-6 w-12 sm:w-14 bg-bg-tertiary rounded-full animate-pulse"></div>
          <div className="h-5 sm:h-6 w-16 sm:w-20 bg-bg-tertiary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

/**
 * Multiple ArticleCard Skeletons Component
 *
 * Renders a specified number of article card skeletons for loading states.
 */
interface ArticleCardSkeletonListProps {
  count?: number;
}

export function ArticleCardSkeletonList({ count = 3 }: ArticleCardSkeletonListProps) {
  return (
    <div className="grid gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
}
