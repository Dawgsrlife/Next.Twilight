"use client";

import React from "react";
import { motion } from "framer-motion";
import { pageTransition } from "../../../animations/variants";
import Section from "../../../components/ui/Section";
import CodeBlock from "../../../components/ui/CodeBlock";
import { Card } from "../../../components/ui/Card";

export default function TutorialGuidePage() {
  return (
    <motion.main
      className="flex min-h-screen flex-col items-center justify-start pb-24"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="w-full max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-[rgb(var(--foreground))]">
          Building a Modern Next.js UI: A Comprehensive Guide
        </h1>
        <p className="text-xl text-center text-[rgb(var(--muted-foreground))] mb-12 max-w-3xl mx-auto">
          Learn how to build this exact UI from scratch, from project initialization to creating beautiful, interactive components
        </p>
        
        {/* Table of Contents */}
        <div className="mb-16 bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-[rgb(var(--foreground))]">Table of Contents</h2>
          <ul className="space-y-2 text-[rgb(var(--foreground))]">
            <li className="flex items-center space-x-2">
              <span className="text-[rgb(var(--primary))] font-bold">1.</span>
              <a href="#project-setup" className="hover:text-[rgb(var(--primary))] transition-colors">Project Setup and Dependencies</a>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-[rgb(var(--primary))] font-bold">2.</span>
              <a href="#file-structure" className="hover:text-[rgb(var(--primary))] transition-colors">File Structure and Organization</a>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-[rgb(var(--primary))] font-bold">3.</span>
              <a href="#theme-system" className="hover:text-[rgb(var(--primary))] transition-colors">Theme System Implementation</a>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-[rgb(var(--primary))] font-bold">4.</span>
              <a href="#components" className="hover:text-[rgb(var(--primary))] transition-colors">Core Components</a>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-[rgb(var(--primary))] font-bold">5.</span>
              <a href="#pages" className="hover:text-[rgb(var(--primary))] transition-colors">Pages and Routing</a>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-[rgb(var(--primary))] font-bold">6.</span>
              <a href="#animations" className="hover:text-[rgb(var(--primary))] transition-colors">Animations and Interactions</a>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-[rgb(var(--primary))] font-bold">7.</span>
              <a href="#state-management" className="hover:text-[rgb(var(--primary))] transition-colors">State Management</a>
            </li>
          </ul>
        </div>
        
        {/* This is a placeholder for the actual tutorial content that will be filled in later */}
        <p className="text-center text-[rgb(var(--muted-foreground))] italic mb-12">
          The detailed guide will be filled in with your next prompts. It will cover everything from project setup to advanced animations.
        </p>
      </div>
    </motion.main>
  );
} 