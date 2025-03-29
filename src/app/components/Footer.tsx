"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <motion.footer 
      className="w-full border-t border-[rgb(var(--border))] bg-[rgb(var(--background))]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-serif font-medium">Next.js Starter Kit</h3>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              A beautiful starter for modern web development with Next.js, TypeScript, and Tailwind CSS.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-serif font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/todo" className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-colors">
                  Todo App
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-serif font-medium">Connect</h3>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/Dawgsrlife/nextjs-typescript-starter" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a 
                href="https://twitter.com/Dawgsrlife" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-[rgb(var(--border))] text-center">
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            © {new Date().getFullYear()} Developed with ❤️ by{" "}
            <a 
              href="https://github.com/Dawgsrlife"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(var(--primary))] hover:underline"
            >
              AlexanderTheMango / Dawgsrlife
            </a>
          </p>
        </div>
      </div>
    </motion.footer>
  );
} 