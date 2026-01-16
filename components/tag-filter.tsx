"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface TagFilterProps {
  allTags: string[];
  selectedTag?: string;
  articleCount: number;
}

export function TagFilter({ allTags, selectedTag, articleCount }: TagFilterProps) {
  const searchParams = useSearchParams();

  const buildUrl = (tag?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    const queryString = params.toString();
    return queryString ? `/?${queryString}` : "/";
  };

  return (
    <section className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary flex items-center">
          <span className="w-1 h-5 sm:h-6 bg-accent-primary mr-2 sm:mr-3"></span>
          {selectedTag ? (
            <>
              <span className="text-base sm:text-xl">标签:</span>{" "}
              <span className="ml-1 sm:ml-2 text-accent-primary truncate max-w-[150px] sm:max-w-none">{selectedTag}</span>
            </>
          ) : (
            <>
              <span className="text-base sm:text-2xl">最新文章</span>
              <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-normal text-text-muted">
                ({articleCount})
              </span>
            </>
          )}
        </h2>

        {selectedTag && (
          <Link
            href={buildUrl()}
            className="text-xs sm:text-sm text-text-secondary hover:text-accent-primary transition-colors duration-200"
          >
            清除筛选
          </Link>
        )}
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <Link
            href={buildUrl()}
            className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              !selectedTag
                ? "bg-accent-primary text-bg-primary"
                : "bg-bg-tertiary text-text-secondary border border-border hover:border-accent-primary/50 hover:text-accent-primary"
            }`}
          >
            全部
          </Link>
          {allTags.map((tag) => (
            <Link
              key={tag}
              href={buildUrl(tag)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedTag?.toLowerCase() === tag.toLowerCase()
                  ? "bg-accent-primary text-bg-primary"
                  : "bg-bg-tertiary text-text-secondary border border-border hover:border-accent-primary/50 hover:text-accent-primary"
              }`}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
