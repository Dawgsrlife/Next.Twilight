"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function HotKeys() {
  const { toggleTheme } = useTheme();
  const router = useRouter();
  const [showHotkeys, setShowHotkeys] = useState(false);
  
  // Hotkey mappings and descriptions
  const hotkeys = [
    { key: "d", ctrlKey: true, description: "Toggle dark/light mode", action: toggleTheme },
    { key: "g", ctrlKey: true, description: "Open GitHub repository", action: () => window.open("https://github.com/Dawgsrlife/nextjs-typescript-starter", "_blank") },
    { key: "p", ctrlKey: true, description: "Open GitHub profile", action: () => window.open("https://github.com/Dawgsrlife", "_blank") },
    { key: "1", ctrlKey: true, description: "Go to Home page", action: () => router.push("/") },
    { key: "2", ctrlKey: true, description: "Go to TypeScript page", action: () => router.push("/typescript") },
    { key: "3", ctrlKey: true, description: "Go to Next.js page", action: () => router.push("/next-js") },
    { key: "4", ctrlKey: true, description: "Go to Tailwind CSS page", action: () => router.push("/tailwind") },
    { key: "5", ctrlKey: true, description: "Go to Framer Motion page", action: () => router.push("/framer-motion") },
    { key: "6", ctrlKey: true, description: "Go to Todo page", action: () => router.push("/todo") },
    { key: "7", ctrlKey: true, description: "Go to About page", action: () => router.push("/about") },
    { key: "/", ctrlKey: false, description: "Show/hide hotkey reference", action: () => setShowHotkeys(prev => !prev) },
  ];

  // Set up event listeners for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger hotkeys when typing in input elements
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      // Toggle hotkey display with '/' or close with Escape key
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setShowHotkeys(prev => !prev);
        return;
      }
      
      // Close hotkey panel with Escape key only if it's open
      if (e.key === 'Escape' && showHotkeys) {
        e.preventDefault();
        setShowHotkeys(false);
        return;
      }
      
      // Handle other hotkeys
      for (const hotkey of hotkeys) {
        if (e.key.toLowerCase() === hotkey.key.toLowerCase() && 
            ((hotkey.ctrlKey && (e.ctrlKey || e.metaKey)) || (!hotkey.ctrlKey && !e.ctrlKey && !e.metaKey))) {
          e.preventDefault();
          hotkey.action();
          return;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hotkeys, toggleTheme, router, showHotkeys]);

  return (
    <AnimatePresence>
      {showHotkeys && (
        <motion.div 
          className="fixed bottom-8 right-8 z-50 w-80 bg-[rgb(var(--card))] shadow-lg rounded-lg border border-[rgb(var(--border))]"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-4 border-b border-[rgb(var(--border))] flex justify-between items-center">
            <h3 className="font-medium">Keyboard Shortcuts</h3>
            <button 
              onClick={() => setShowHotkeys(false)}
              className="p-1 rounded-md hover:bg-[rgb(var(--muted))] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4 max-h-96 overflow-y-auto">
            <ul className="space-y-3">
              {hotkeys.map((hotkey, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex space-x-1 mr-3 mt-1">
                    {hotkey.ctrlKey && (
                      <kbd className="px-2 py-1 text-xs font-semibold bg-[rgb(var(--muted))] rounded-md border border-[rgb(var(--border))]">
                        CTRL
                      </kbd>
                    )}
                    {hotkey.ctrlKey && (
                      <span className="text-[rgb(var(--muted-foreground))] mx-1">+</span>
                    )}
                    <kbd className="px-2 py-1 text-xs font-semibold bg-[rgb(var(--muted))] rounded-md border border-[rgb(var(--border))]">
                      {hotkey.key.toUpperCase()}
                    </kbd>
                  </div>
                  <span className="text-sm">{hotkey.description}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-3 bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] text-xs rounded-b-lg">
            Press <kbd className="px-1 py-0.5 bg-[rgb(var(--background))] rounded border border-[rgb(var(--border))]">/</kbd> to toggle this panel
          </div>
        </motion.div>
      )}
      
      {!showHotkeys && (
        <motion.button
          className="fixed bottom-8 right-8 z-50 p-3 bg-[rgb(var(--card))] rounded-full shadow-md border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-colors"
          onClick={() => setShowHotkeys(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          title="Show keyboard shortcuts"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
            <path d="M6 8h4"></path>
            <path d="M14 8h4"></path>
            <path d="M8 12h8"></path>
            <path d="M10 16h4"></path>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
} 