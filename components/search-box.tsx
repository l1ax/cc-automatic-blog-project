"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { getSearchIndex } from "@/lib/search";
import type { ClientSearchResult } from "@/lib/search";

interface SearchBoxProps {
  placeholder?: string;
}

export function SearchBox({ placeholder = "搜索文章..." }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ClientSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const searchIndex = getSearchIndex();
        const searchResults = await searchIndex.search(searchQuery, 10);
        setResults(searchResults);
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debouncedSearch(query);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query, debouncedSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Global keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+K (macOS) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) {
      if (e.key === "Escape") {
        setQuery("");
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = `/blog/${results[selectedIndex].slug}`;
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim() && results.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          className="block w-full pl-8 sm:pl-10 pr-14 sm:pr-16 py-1.5 sm:py-2 bg-bg-tertiary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors duration-200"
        />
        {/* Keyboard shortcut badge */}
        <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-text-muted bg-bg-secondary border border-border rounded">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        </div>
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Results */}
          <div className="absolute z-20 mt-2 w-full sm:w-auto bg-bg-secondary border border-border rounded-lg shadow-xl shadow-bg-primary/50 max-h-80 sm:max-h-96 overflow-hidden">
            {isLoading ? (
              <div className="py-6 sm:py-8 px-3 sm:px-4 text-center text-text-muted">
                <svg
                  className="animate-spin h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-xs sm:text-sm">搜索中...</span>
              </div>
            ) : results.length > 0 ? (
              <ul className="py-1 sm:py-2">
                {results.map((result, index) => (
                  <li key={result.slug}>
                    <Link
                      href={`/blog/${result.slug}`}
                      onClick={handleResultClick}
                      className={`block px-3 sm:px-4 py-2 sm:py-3 hover:bg-bg-tertiary transition-colors duration-150 ${
                        index === selectedIndex ? "bg-bg-tertiary" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 sm:gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-medium text-text-primary mb-0.5 sm:mb-1 line-clamp-1">
                            {result.title}
                          </h4>
                          {result.summary && (
                            <p className="text-[10px] sm:text-xs text-text-secondary line-clamp-2 mb-1 sm:mb-2">
                              {result.summary}
                            </p>
                          )}
                          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-text-muted">
                            <span className="flex items-center">
                              <svg
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-0.5 sm:mr-1"
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
                              {result.date}
                            </span>
                            {result.readingTime && (
                              <span className="flex items-center">
                                <svg
                                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-0.5 sm:mr-1"
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
                                {result.readingTime} 分钟
                              </span>
                            )}
                          </div>
                        </div>
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted flex-shrink-0 mt-0.5 sm:mt-1"
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
                  </li>
                ))}
              </ul>
            ) : query.trim() ? (
              <div className="py-6 sm:py-8 px-3 sm:px-4 text-center text-text-muted">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xs sm:text-sm">未找到相关文章</p>
                <p className="text-[10px] sm:text-xs mt-1 text-text-muted">
                  试试其他关键词
                </p>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
