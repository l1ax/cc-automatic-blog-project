'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

// Language aliases mapping
const languageAliases: Record<string, string> = {
  'js': 'javascript',
  'ts': 'typescript',
  'jsx': 'jsx',
  'tsx': 'tsx',
  'c++': 'cpp',
  'csharp': 'csharp',
  'shell': 'bash',
  'sh': 'bash',
  'yml': 'yaml',
};

function normalizeLanguage(lang: string): string {
  const normalized = lang.toLowerCase();
  return languageAliases[normalized] || normalized;
}

export function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const normalizedLang = normalizeLanguage(language);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 sm:my-6 rounded-lg overflow-hidden border border-border">
      <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 bg-bg-secondary border-b border-border">
        <span className="text-[10px] sm:text-xs font-medium text-text-muted">{language}</span>
        <button
          onClick={copyToClipboard}
          className="px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs text-text-secondary hover:text-accent-primary transition-colors rounded flex items-center gap-1"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="hidden sm:inline">已复制</span>
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">复制</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <SyntaxHighlighter
          language={normalizedLang}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '0.75rem',
            borderRadius: '0 0 0.5rem 0.5rem',
            background: '#2d2d2d',
            fontSize: '0.75rem',
            lineHeight: '1.5',
            minWidth: '100%',
          }}
          codeTagProps={{
            style: {
              fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
