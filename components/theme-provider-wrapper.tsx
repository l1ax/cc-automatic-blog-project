"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBox } from "@/components/search-box";
import { MobileNav } from "@/components/mobile-nav";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-divider bg-bg-primary sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top bar: logo, search, and mobile menu */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-lg sm:text-xl font-bold text-accent-primary">
              Tech Blog
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
            <div className="flex-1 max-w-[140px] sm:max-w-xs md:max-w-md hidden sm:block">
              <SearchBox placeholder="搜索文章..." />
            </div>
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
        {/* Desktop navigation - shown on larger screens */}
        <nav className="hidden sm:flex items-center space-x-6">
          <Link
            href="/"
            className="text-text-secondary hover:text-accent-primary transition-colors duration-200"
          >
            首页
          </Link>
          <Link
            href="/about"
            className="text-text-secondary hover:text-accent-primary transition-colors duration-200"
          >
            关于
          </Link>
        </nav>
      </div>
    </header>
  );
}
