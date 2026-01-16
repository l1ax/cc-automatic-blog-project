'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { CodeBlock } from './code-block';
import { generateHeadingId } from '@/lib/toc';

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ node, children, ...props }) => {
          const id = generateHeadingId(String(children));
          return (
            <h1 id={id} className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mt-8 sm:mt-12 mb-4 sm:mb-6 first:mt-0 scroll-mt-20 sm:scroll-mt-24" {...props}>
              {children}
            </h1>
          );
        },
        h2: ({ node, children, ...props }) => {
          const id = generateHeadingId(String(children));
          return (
            <h2 id={id} className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary mt-6 sm:mt-10 mb-3 sm:mb-5 scroll-mt-20 sm:scroll-mt-24" {...props}>
              {children}
            </h2>
          );
        },
        h3: ({ node, children, ...props }) => {
          const id = generateHeadingId(String(children));
          return (
            <h3 id={id} className="text-lg sm:text-xl md:text-2xl font-semibold text-text-primary mt-5 sm:mt-8 mb-3 sm:mb-4 scroll-mt-20 sm:scroll-mt-24" {...props}>
              {children}
            </h3>
          );
        },
        h4: ({ node, children, ...props }) => {
          const id = generateHeadingId(String(children));
          return (
            <h4 id={id} className="text-base sm:text-lg md:text-xl font-semibold text-text-primary mt-4 sm:mt-6 mb-2 sm:mb-3 scroll-mt-20 sm:scroll-mt-24" {...props}>
              {children}
            </h4>
          );
        },
        p: ({ node, ...props }) => (
          <p className="text-text-secondary leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside mb-4 sm:mb-6 space-y-1.5 sm:space-y-2 text-text-secondary text-sm sm:text-base" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside mb-4 sm:mb-6 space-y-1.5 sm:space-y-2 text-text-secondary text-sm sm:text-base" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="ml-2 sm:ml-4" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-2 sm:border-l-4 border-accent-primary pl-3 sm:pl-4 py-2 my-4 sm:my-6 bg-bg-secondary italic text-text-secondary text-sm sm:text-base" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a className="text-accent-primary hover:text-accent-hover underline transition-colors duration-200 text-sm sm:text-base break-all" {...props} />
        ),
        strong: ({ node, ...props }) => (
          <strong className="font-semibold text-text-primary" {...props} />
        ),
        em: ({ node, ...props }) => (
          <em className="italic text-text-secondary" {...props} />
        ),
        code: ({ node, inline, className, children, ...props }: any) => {
          const language = className?.replace(/language-/, '') || '';

          if (inline) {
            return (
              <code className="bg-bg-tertiary text-accent-primary px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-mono break-all" {...props}>
                {children}
              </code>
            );
          }

          return (
            <CodeBlock code={String(children).replace(/\n$/, '')} language={language} />
          );
        },
        pre: ({ node, children, ...props }: any) => {
          // Don't render pre wrapper since CodeBlock handles it
          const codeElement = (children as any)?.props?.children;
          if (codeElement && typeof codeElement === 'string') {
            return <>{children}</>;
          }
          return <>{children}</>;
        },
        hr: ({ node, ...props }) => (
          <hr className="border-t border-divider my-6 sm:my-8" {...props} />
        ),
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto -mx-3 sm:mx-0 mb-4 sm:mb-6">
            <table className="min-w-full divide-y divide-border text-xs sm:text-sm" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-bg-secondary" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody className="bg-bg-tertiary divide-y divide-border" {...props} />
        ),
        tr: ({ node, ...props }) => (
          <tr {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-text-primary uppercase tracking-wider whitespace-nowrap" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-text-secondary" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
