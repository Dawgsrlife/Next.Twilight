"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { name: "Home", path: "/" },
  { name: "TypeScript", path: "/typescript" },
  { name: "Next.js", path: "/next-js" },
  { name: "Tailwind", path: "/tailwind" },
  { name: "Framer Motion", path: "/framer-motion" },
  { name: "Todo", path: "/todo" },
  { name: "About", path: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoAnimated, setIsLogoAnimated] = useState(false);

  useEffect(() => {
    // Animate logo on initial load
    setIsLogoAnimated(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur border-b border-[rgb(var(--border))] bg-[rgba(var(--background),0.8)]">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-8 h-8">
            <motion.svg 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-8 h-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={isLogoAnimated ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ type: "spring", duration: 1.2, bounce: 0.4 }}
            >
              <defs>
                <linearGradient id="twilightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              
              {/* Background circle (night sky) */}
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                fill="url(#twilightGradient)" 
              />
              
              {/* Moon */}
              <circle 
                cx="8" 
                cy="10" 
                r="4" 
                fill="#F9FAFB" 
                fillOpacity="0.9"
              />
              
              {/* Moon shadow */}
              <circle 
                cx="9" 
                cy="11" 
                r="2.5" 
                fill="url(#twilightGradient)" 
                fillOpacity="0.7"
              />
              
              {/* Stars */}
              <circle cx="16" cy="7" r="0.7" fill="white" />
              <circle cx="18" cy="11" r="0.5" fill="white" />
              <circle cx="14" cy="4" r="0.8" fill="white" />
              <circle cx="19" cy="14" r="0.6" fill="white" />
              <circle cx="5" cy="5" r="0.4" fill="white" />
              
              {/* Setting sun glow */}
              <circle 
                cx="15" 
                cy="17" 
                r="2.5" 
                fill="#FBBF24" 
                fillOpacity="0.8"
              />
            </motion.svg>
          </div>
          <div className="text-xl font-mono font-bold text-[rgb(var(--foreground))]">
            <span className="text-[rgb(var(--primary))]">Next</span>.Twilight
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-2 py-1 transition-colors duration-200 ${
                  isActive
                    ? "text-[rgb(var(--primary))]"
                    : "text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))]"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-[rgb(var(--primary))]"
                    layoutId="navbar-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className={`hidden md:block px-4 py-1.5 rounded-md border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-colors ${
              pathname === "/login" ? "text-[rgb(var(--primary))]" : ""
            }`}
          >
            Login
          </Link>
          
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[rgb(var(--muted))] transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "light" && (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                key="light-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </motion.svg>
            )}
            
            {theme === "dark" && (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                key="dark-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </motion.svg>
            )}
          </motion.button>

          <Link 
            href="https://github.com/Dawgsrlife/nextjs-typescript-starter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-[rgb(var(--muted))] transition-colors"
            aria-label="GitHub repository"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          
          <Link 
            href="https://github.com/Dawgsrlife" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-[rgb(var(--muted))] transition-colors"
            aria-label="GitHub profile"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </Link>
          
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-full hover:bg-[rgb(var(--muted))] transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-[rgb(var(--background))] border-b border-[rgb(var(--border))]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col px-4 py-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`relative py-3 border-b border-[rgb(var(--border))] last:border-0 ${
                      isActive
                        ? "text-[rgb(var(--primary))]"
                        : "text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))]"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              <Link
                href="/login"
                className={`py-3 ${
                  pathname === "/login" ? "text-[rgb(var(--primary))]" : "text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 