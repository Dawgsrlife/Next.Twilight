"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import CodeBlock from "../components/ui/CodeBlock";
import { Card } from "../components/ui/Card";
import { pageTransition } from "../animations/variants";

export default function GuidePage() {
  return (
    <motion.main
      className="flex min-h-screen flex-col items-center justify-start pb-24"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Section>
        <h1 className="text-4xl font-bold mb-6 text-center text-[rgb(var(--foreground))]">
          Complete UI Implementation Guide
        </h1>
        <p className="text-xl text-center text-[rgb(var(--muted-foreground))] mb-12 max-w-3xl mx-auto">
          Step-by-step tutorial to build this exact UI from scratch
        </p>
        
        {/* Table of Contents */}
        <Card className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
          <nav className="space-y-2">
            <a href="#project-setup" className="block hover:text-[rgb(var(--primary))] transition-colors">
              1. Project Setup and Dependencies
            </a>
            <a href="#project-structure" className="block hover:text-[rgb(var(--primary))] transition-colors">
              2. Project Structure and Organization
            </a>
            <a href="#theme-system" className="block hover:text-[rgb(var(--primary))] transition-colors">
              3. Theme System Implementation
            </a>
            <a href="#core-components" className="block hover:text-[rgb(var(--primary))] transition-colors">
              4. Core Components
            </a>
            <a href="#animations" className="block hover:text-[rgb(var(--primary))] transition-colors">
              5. Animations and Page Transitions
            </a>
          </nav>
        </Card>
        
        {/* This will be filled in with detailed implementation guide in future prompts */}
        <div className="space-y-16 w-full">
          <div id="project-setup">
            <h2 className="text-3xl font-bold mb-6">1. Project Setup and Dependencies</h2>
            <p className="text-lg mb-6 text-[rgb(var(--foreground))]">
              This section will be filled with detailed instructions on setting up a Next.js project and installing all required dependencies.
            </p>
            
            <div className="bg-[rgb(var(--muted))] rounded-lg p-6 text-center text-[rgb(var(--muted-foreground))]">
              <p className="italic">Content for this section will be added in future prompts.</p>
            </div>
          </div>
          
          <div id="project-structure">
            <h2 className="text-3xl font-bold mb-6">2. Project Structure and Organization</h2>
            <p className="text-lg mb-6 text-[rgb(var(--foreground))]">
              This section will cover the file structure of the project and how components, pages, and utilities are organized.
            </p>
            
            <div className="bg-[rgb(var(--muted))] rounded-lg p-6 text-center text-[rgb(var(--muted-foreground))]">
              <p className="italic">Content for this section will be added in future prompts.</p>
            </div>
          </div>
          
          <div id="theme-system">
            <h2 className="text-3xl font-bold mb-6">3. Theme System Implementation</h2>
            <p className="text-lg mb-6 text-[rgb(var(--foreground))]">
              This section will explain how the light/dark mode theming system is implemented using CSS variables and context providers.
            </p>
            
            <div className="bg-[rgb(var(--muted))] rounded-lg p-6 text-center text-[rgb(var(--muted-foreground))]">
              <p className="italic">Content for this section will be added in future prompts.</p>
            </div>
          </div>
          
          <div id="core-components">
            <h2 className="text-3xl font-bold mb-6">4. Core Components</h2>
            <p className="text-lg mb-6 text-[rgb(var(--foreground))]">
              This section will provide detailed implementation of each core component, including Header, Footer, and reusable UI elements.
            </p>
            
            <div className="bg-[rgb(var(--muted))] rounded-lg p-6 text-center text-[rgb(var(--muted-foreground))]">
              <p className="italic">Content for this section will be added in future prompts.</p>
            </div>
          </div>
          
          <div id="animations">
            <h2 className="text-3xl font-bold mb-6">5. Animations and Page Transitions</h2>
            <p className="text-lg mb-6 text-[rgb(var(--foreground))]">
              This section will cover the implementation of animations and transitions using Framer Motion.
            </p>
            
            <div className="bg-[rgb(var(--muted))] rounded-lg p-6 text-center text-[rgb(var(--muted-foreground))]">
              <p className="italic">Content for this section will be added in future prompts.</p>
            </div>
          </div>
        </div>
      </Section>
    </motion.main>
  );
} 