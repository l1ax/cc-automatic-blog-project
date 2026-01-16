"use client";

import React, { useState, useEffect } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathBlockProps {
  formula: string;
  displayMode: boolean;
}

export function MathBlock({ formula, displayMode }: MathBlockProps) {
  const [error, setError] = useState<string | null>(null);
  const [renderedHtml, setRenderedHtml] = useState<string>("");

  useEffect(() => {
    try {
      const html = katex.renderToString(formula, {
        displayMode,
        throwOnError: false,
        strict: "ignore",
        trust: false,
        output: "html",
      });
      setRenderedHtml(html);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to render formula");
    }
  }, [formula, displayMode]);

  if (error) {
    return (
      <div className="bg-bg-tertiary border border-red-500/50 rounded p-3 sm:p-4 my-4">
        <p className="text-red-400 text-sm">Math rendering error: {error}</p>
        <pre className="mt-2 text-xs text-text-secondary overflow-x-auto">
          <code>{formula}</code>
        </pre>
      </div>
    );
  }

  if (displayMode) {
    return (
      <div className="my-6 sm:my-8 overflow-x-auto">
        <div
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
          className="min-w-full flex justify-center items-center py-2"
          style={{ fontSize: "1.1em" }}
        />
      </div>
    );
  }

  return (
    <span
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
      className="mx-1"
      style={{ fontSize: "1em" }}
    />
  );
}
