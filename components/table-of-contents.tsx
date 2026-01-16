'use client';

import { useEffect, useState, useRef } from 'react';
import { TocItem } from '@/lib/toc';

interface TableOfContentsProps {
  toc: TocItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const headingElementsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    // Collect all heading elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      }
    );

    // Observe all heading elements
    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        headingElementsRef.current.set(item.id, element);
        observer.observe(element);
      }
    });

    // Capture the ref value for cleanup
    const currentRef = headingElementsRef.current;

    return () => {
      toc.forEach((item) => {
        const element = currentRef.get(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [toc]);

  // Don't render if there are no headings
  if (toc.length === 0) {
    return null;
  }

  return (
    <nav className="hidden lg:block fixed left-0 right-0 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="absolute left-full ml-8 top-0 w-64 pointer-events-auto">
        <div className="sticky top-24">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-between w-full text-sm font-semibold text-text-primary mb-4 hover:text-accent-primary transition-colors"
          >
            <span>目录</span>
            <svg
              className={`w-4 h-4 transition-transform ${isCollapsed ? '-rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {!isCollapsed && (
            <ul className="space-y-2 text-sm">
              {toc.map((item) => (
                <li
                  key={item.id}
                  style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(item.id);
                      if (element) {
                        const offset = 80; // Header height offset
                        const bodyRect = document.body.getBoundingClientRect().top;
                        const elementRect = element.getBoundingClientRect().top;
                        const elementPosition = elementRect - bodyRect;
                        const offsetPosition = elementPosition - offset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth',
                        });
                      }
                    }}
                    className={`block py-1 border-l-2 transition-all duration-200 ${
                      activeId === item.id
                        ? 'border-accent-primary text-accent-primary font-medium pl-3'
                        : 'border-transparent text-text-secondary hover:text-text-primary hover:border-divider pl-3'
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
