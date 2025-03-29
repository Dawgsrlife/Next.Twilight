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
    <div className="relative rounded-lg overflow-hidden bg-[rgb(var(--muted))] mb-4 w-full max-w-4xl mx-auto">
      <div className="px-4 py-2 bg-[rgb(var(--muted))] border-b border-[rgb(var(--border))] flex items-center justify-between">
        {title ? (
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm text-[rgb(var(--muted-foreground))]">
              {title}
            </span>
          </div>
        ) : (
          <div></div> 
        )}
        
        <div className="flex items-center space-x-2">
          <div className="bg-[rgb(var(--accent))] rounded-md px-3 py-1 text-xs uppercase tracking-wider text-[rgb(var(--accent-foreground))] shadow-sm">
            {language}
          </div>
          
          <motion.button
            className="p-2 rounded-md bg-[rgb(var(--muted-foreground))]/10 hover:bg-[rgb(var(--muted-foreground))]/20 transition-colors text-[rgb(var(--muted-foreground))]"
            onClick={handleCopy}
            whileTap={{ scale: 0.95 }}
            title={copied ? "Copied!" : "Copy code"}
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
                className="text-green-500"
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
      </div>
      
      <pre className="p-4 overflow-x-auto bg-[rgb(var(--muted))]">
        <code className={`language-${language} text-sm font-mono text-[rgb(var(--foreground))]`}>
          {showLineNumbers
            ? code
                .split("\n")
                .map((line, i) => (
                  <div key={i} className="table-row">
                    <span className="table-cell text-right pr-4 select-none text-[rgb(var(--muted-foreground))] w-8">
                      {i + 1}
                    </span>
                    <span className="table-cell">{line}</span>
                  </div>
                ))
            : code}
        </code>
      </pre>
    </div>
  );
} 