/**
 * Search Result Skeleton Component
 *
 * Displays a loading placeholder for search results in the dropdown.
 * Provides a more content-aware skeleton than a simple spinner.
 */

export function SearchResultSkeleton() {
  return (
    <div className="block px-3 sm:px-4 py-2 sm:py-3">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex-1 min-w-0">
          {/* Title Skeleton */}
          <div className="h-3.5 sm:h-4 bg-bg-tertiary rounded animate-pulse w-3/4 mb-1 sm:mb-2"></div>

          {/* Summary Skeleton */}
          <div className="h-3 bg-bg-tertiary rounded animate-pulse w-full mb-1"></div>
          <div className="h-3 bg-bg-tertiary rounded animate-pulse w-2/3 mb-1.5 sm:mb-2"></div>

          {/* Metadata Skeleton */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-2.5 sm:h-3 w-14 sm:w-16 bg-bg-tertiary rounded animate-pulse"></div>
            <div className="h-2.5 sm:h-3 w-12 sm:w-14 bg-bg-tertiary rounded animate-pulse"></div>
          </div>
        </div>

        {/* Arrow Icon Skeleton */}
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-bg-tertiary rounded animate-pulse flex-shrink-0 mt-0.5 sm:mt-1"></div>
      </div>
    </div>
  );
}

/**
 * Multiple Search Result Skeletons Component
 *
 * Renders a specified number of search result skeletons for loading states.
 */
interface SearchResultSkeletonListProps {
  count?: number;
}

export function SearchResultSkeletonList({ count = 3 }: SearchResultSkeletonListProps) {
  return (
    <ul className="py-1 sm:py-2">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <SearchResultSkeleton />
        </li>
      ))}
    </ul>
  );
}
