'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  code: string;
}

let mermaidInitialized = false;

export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Mermaid only once
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          darkMode: true,
          background: '#2d2d2d',
          primaryColor: '#f97316',
          primaryTextColor: '#e5e5e5',
          primaryBorderColor: '#f97316',
          lineColor: '#a3a3a3',
          secondaryColor: '#242424',
          tertiaryColor: '#1a1a1a',
          fontSize: '16px',
        },
        securityLevel: 'loose',
      });
      mermaidInitialized = true;
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const renderDiagram = async () => {
      try {
        setError(null);
        // Generate a unique ID for the diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // Render the diagram directly (mermaid.render handles validation)
        const { svg } = await mermaid.render(id, code);

        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
      }
    };

    renderDiagram();
  }, [code]);

  if (error) {
    return (
      <div className="bg-bg-tertiary border border-red-900 rounded-lg p-4 sm:p-6 my-4">
        <div className="flex items-center gap-2 text-red-400 mb-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold text-sm">Diagram Error</span>
        </div>
        <p className="text-red-300 text-sm sm:text-base">{error}</p>
        <details className="mt-3">
          <summary className="cursor-pointer text-xs sm:text-sm text-red-400 hover:text-red-300">
            View code
          </summary>
          <pre className="mt-2 p-2 bg-bg-secondary rounded text-xs text-text-secondary overflow-x-auto">
            <code>{code}</code>
          </pre>
        </details>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="flex items-center justify-center my-4 sm:my-6 overflow-x-auto"
      style={{ minHeight: '100px' }}
    />
  );
}
