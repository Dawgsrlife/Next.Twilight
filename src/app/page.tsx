"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Card, CardGrid } from "./components/ui/Card";
import Section from "./components/ui/Section";
import { useTutorialStore } from "./store/tutorialStore";
import Button from "./components/ui/Button";
import CodeBlock from "./components/ui/CodeBlock";
import { pageTransition, staggerContainer, staggerItems } from "./animations/variants";

export default function Home() {
  const { tutorials, setActiveTutorial } = useTutorialStore();
  
  useEffect(() => {
    setActiveTutorial("intro");
  }, [setActiveTutorial]);

  return (
    <motion.main
      className="flex min-h-screen flex-col items-center justify-start pb-24"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroSection />
      
      <Section>
        <motion.div 
          className="mb-12 p-6 bg-[rgb(var(--card))] rounded-lg border border-[rgb(var(--border))]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h3 
            className="text-xl font-serif font-semibold mb-4"
            variants={staggerItems}
          >
            About This Interactive Tutorial
          </motion.h3>
          <motion.p 
            className="mb-4"
            variants={staggerItems}
          >
            This web application is designed to teach you the fundamental concepts and relationships between several modern web development technologies:
          </motion.p>
          <motion.ul 
            className="list-disc pl-6 space-y-2 mb-4"
            variants={staggerItems}
          >
            <li>JavaScript and TypeScript</li>
            <li>React and Next.js</li>
            <li>Styling with Tailwind CSS</li>
            <li>Animations with Framer Motion</li>
            <li>State management with Zustand</li>
          </motion.ul>
          <motion.p 
            variants={staggerItems}
          >
            Navigate through the different sections to learn about each technology and see practical examples. The app itself serves as a demonstration of these technologies working together.
          </motion.p>
        </motion.div>

        <CardGrid className="mb-12">
          {tutorials.map((tutorial) => (
            <Card
              key={tutorial.id}
              title={tutorial.title}
              className={tutorial.completed ? "border-[rgb(var(--primary))]/50" : ""}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-[rgb(var(--muted-foreground))]">{tutorial.description}</p>
              <div className="flex justify-between items-center">
                <Link href={tutorial.path}>
                  <Button variant="primary">
                    {tutorial.completed ? "Review" : "Start Learning"}
                  </Button>
                </Link>
                {tutorial.completed && (
                  <span className="text-green-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Completed
                  </span>
                )}
              </div>
            </Card>
          ))}
        </CardGrid>

        <div className="w-full max-w-4xl">
          <h3 className="text-xl font-serif font-semibold mb-4">Project Structure Overview</h3>
          <CodeBlock
            language="bash"
            title="Project Structure"
            code={`nextjs-typescript-starter/
├── .next/              # Next.js build output
├── node_modules/       # Dependencies
├── public/             # Static assets
├── src/                # Source code
│   ├── app/            # Next.js app directory
│   │   ├── animations/ # Animation utilities
│   │   ├── components/ # React components
│   │   │   └── ui/     # Reusable UI components
│   │   ├── store/      # State management
│   │   ├── about/      # About page
│   │   ├── login/      # Login page 
│   │   ├── todo/       # Todo app page
│   │   ├── layout.tsx  # Root layout component
│   │   ├── page.tsx    # Home page
│   │   └── globals.css # Global styles
├── .gitignore          # Git ignore file
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration`}
          />
        </div>
      </Section>
    </motion.main>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  return (
    <motion.div 
      ref={ref}
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ opacity, y }}
    >
      <motion.div 
        style={{ scale }} 
        className="relative z-10 text-center max-w-4xl px-4"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-serif font-bold text-[rgb(var(--foreground))] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Next.js Tutorial Playground
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-[rgb(var(--muted-foreground))] mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Learn modern web development with interactive examples
        </motion.p>
        
        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/todo">
            <Button variant="primary" size="lg">
              Try Todo App
            </Button>
          </Link>
          <Link href="https://github.com/Dawgsrlife/nextjs-typescript-starter" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              View on GitHub
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--primary),0.1)] to-transparent" />
      
      {/* Animated orbs */}
      <motion.div 
        className="absolute w-64 h-64 rounded-full bg-[rgba(var(--primary),0.1)] blur-3xl"
        initial={{ x: -100, y: -100 }}
        animate={{ 
          x: [-100, 100, -100],
          y: [-100, 100, -100],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-[rgba(var(--accent),0.1)] blur-3xl"
        initial={{ x: 100, y: 100 }}
        animate={{ 
          x: [100, -100, 100],
          y: [100, -100, 100],
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
}
