"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MermaidDiagramProps {
  code: string;
}

let mermaidInitialized = false;

export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    // Initialize Mermaid only once
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          darkMode: true,
          background: "#2d2d2d",
          primaryColor: "#f97316",
          primaryTextColor: "#e5e5e5",
          primaryBorderColor: "#f97316",
          lineColor: "#a3a3a3",
          secondaryColor: "#242424",
          tertiaryColor: "#1a1a1a",
          fontSize: "16px",
        },
        securityLevel: "loose",
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
        console.error("Mermaid rendering error:", err);
        setError(err instanceof Error ? err.message : "Failed to render diagram");
      }
    };

    renderDiagram();
  }, [code]);

  if (error) {
    return (
      <div className="bg-bg-tertiary border border-red-900 rounded-lg p-4 sm:p-6 my-4">
        <div className="flex items-center gap-2 text-red-400 mb-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
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
    <div className="my-4 sm:my-6">
      <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 bg-bg-secondary border border-border rounded-t-lg">
        <span className="text-[10px] sm:text-xs font-medium text-text-muted">Mermaid Diagram</span>
        <button
          onClick={() => setShowCode(!showCode)}
          className="px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs text-text-secondary hover:text-accent-primary transition-colors rounded flex items-center gap-1"
          aria-label={showCode ? "Show diagram" : "Show code"}
        >
          {showCode ? (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="hidden sm:inline">查看图表</span>
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <span className="hidden sm:inline">查看代码</span>
            </>
          )}
        </button>
      </div>
      {showCode ? (
        <div className="rounded-b-lg overflow-hidden border border-t-0 border-border">
          <SyntaxHighlighter
            language="mermaid"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "0.75rem",
              borderRadius: "0 0 0.5rem 0.5rem",
              background: "#2d2d2d",
              fontSize: "0.75rem",
              lineHeight: "1.5",
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
      ) : (
        <div className="border border-t-0 border-border rounded-b-lg overflow-x-auto">
          <div
            ref={ref}
            className="flex items-center justify-center p-4"
            style={{ minHeight: "100px" }}
          />
        </div>
      )}
    </div>
  );
}
