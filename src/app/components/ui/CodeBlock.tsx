"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language,
  title,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-muted mb-4">
      {title && (
        <div className="px-4 py-2 bg-muted border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm text-muted-foreground">
              {title}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded-sm bg-muted-foreground/10">
              {language}
            </span>
          </div>
        </div>
      )}
      <pre className={`p-4 overflow-x-auto bg-muted`}>
        <code className={`language-${language} text-sm font-mono text-foreground`}>
          {showLineNumbers
            ? code
                .split("\n")
                .map((line, i) => (
                  <div key={i} className="table-row">
                    <span className="table-cell text-right pr-4 select-none text-muted-foreground w-8">
                      {i + 1}
                    </span>
                    <span className="table-cell">{line}</span>
                  </div>
                ))
            : code}
        </code>
      </pre>
      <motion.button
        className="absolute top-3 right-3 p-2 rounded-md bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-colors text-muted-foreground"
        onClick={handleCopy}
        whileTap={{ scale: 0.95 }}
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        )}
      </motion.button>
    </div>
  );
} 