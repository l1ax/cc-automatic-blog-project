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
    <section className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-text-primary flex items-center">
          <span className="w-1 h-6 bg-accent-primary mr-3"></span>
          {selectedTag ? (
            <>
              标签: <span className="ml-2 text-accent-primary">{selectedTag}</span>
            </>
          ) : (
            <>
              最新文章
              <span className="ml-3 text-sm font-normal text-text-muted">
                ({articleCount})
              </span>
            </>
          )}
        </h2>

        {selectedTag && (
          <Link
            href={buildUrl()}
            className="text-sm text-text-secondary hover:text-accent-primary transition-colors duration-200"
          >
            清除筛选
          </Link>
        )}
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Link
            href={buildUrl()}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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
