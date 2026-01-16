/**
 * Text Skeleton Components
 *
 * Various text placeholder components with shimmer animation for loading states.
 */

interface TextSkeletonProps {
  className?: string;
}

/**
 * Heading Skeleton
 *
 * Loading placeholder for headings (h1, h2, h3, etc.)
 */
export function HeadingSkeleton({ className = "" }: TextSkeletonProps) {
  return <div className={`h-6 sm:h-8 bg-bg-tertiary rounded animate-pulse ${className}`}></div>;
}

/**
 * Paragraph Skeleton
 *
 * Loading placeholder for paragraphs. Supports multiple lines.
 */
interface ParagraphSkeletonProps extends TextSkeletonProps {
  lines?: number;
}

export function ParagraphSkeleton({ lines = 3, className = "" }: ParagraphSkeletonProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-bg-tertiary rounded animate-pulse"
          style={{ width: index === lines - 1 ? "66%" : "100%" }}
        ></div>
      ))}
    </div>
  );
}

/**
 * Text Line Skeleton
 *
 * Simple single-line text placeholder with configurable width.
 */
interface TextLineSkeletonProps extends TextSkeletonProps {
  width?: string;
}

export function TextLineSkeleton({ width = "100%", className = "" }: TextLineSkeletonProps) {
  return (
    <div
      className={`h-4 bg-bg-tertiary rounded animate-pulse ${className}`}
      style={{ width }}
    ></div>
  );
}
