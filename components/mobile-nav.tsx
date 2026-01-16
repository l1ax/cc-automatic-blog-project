"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, []);

  const navLinks = [
    { href: "/", label: "首页" },
    { href: "/about", label: "关于" },
  ];

  return (
    <div ref={menuRef} className="sm:hidden">
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-accent-primary hover:bg-bg-tertiary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        <span className="sr-only">打开菜单</span>
        {/* Hamburger Icon */}
        <svg
          className={`h-6 w-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            // Close icon (X)
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            // Hamburger icon
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-64 max-w-[80vw] bg-bg-secondary border-l border-divider shadow-xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-divider">
            <span className="text-lg font-bold text-accent-primary">菜单</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-accent-primary hover:bg-bg-tertiary transition-colors duration-200"
              aria-label="关闭菜单"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <nav className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-lg text-base text-text-secondary hover:text-accent-primary hover:bg-bg-tertiary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-divider">
            <p className="text-xs text-text-muted text-center">Built with Next.js & TypeScript</p>
          </div>
        </div>
      </div>
    </div>
  );
}
