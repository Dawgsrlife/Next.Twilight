"use client";

import React from "react";
import { motion } from "framer-motion";
import { pageTransition } from "../animations/variants";

// Placeholder components that will be filled in later
const TempComponent1 = () => (
  <div className="p-4 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--card))]">
    <h3 className="text-xl font-bold mb-2">Component 1</h3>
    <p className="text-[rgb(var(--foreground))]">This is a temporary component that will be replaced.</p>
  </div>
);

const TempComponent2 = () => (
  <div className="p-4 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--card))]">
    <h3 className="text-xl font-bold mb-2">Component 2</h3>
    <p className="text-[rgb(var(--foreground))]">This is a temporary component that will be replaced.</p>
  </div>
);

const TempComponent3 = () => (
  <div className="p-4 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--card))]">
    <h3 className="text-xl font-bold mb-2">Component 3</h3>
    <p className="text-[rgb(var(--foreground))]">This is a temporary component that will be replaced.</p>
  </div>
);

const TempComponent4 = () => (
  <div className="p-4 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--card))]">
    <h3 className="text-xl font-bold mb-2">Component 4</h3>
    <p className="text-[rgb(var(--foreground))]">This is a temporary component that will be replaced.</p>
  </div>
);

const TempComponent5 = () => (
  <div className="p-4 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--card))]">
    <h3 className="text-xl font-bold mb-2">Component 5</h3>
    <p className="text-[rgb(var(--foreground))]">This is a temporary component that will be replaced.</p>
  </div>
);

export default function TutorialGuidePage() {
  return (
    <motion.main
      className="flex min-h-screen flex-col items-center justify-start py-12 px-4"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-[rgb(var(--foreground))]">
          Complete UI Tutorial Guide
        </h1>
        <p className="text-xl text-center text-[rgb(var(--muted-foreground))] mb-12">
          This page will contain a comprehensive guide on building this UI from scratch
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <TempComponent1 />
          <TempComponent2 />
          <TempComponent3 />
          <TempComponent4 />
          <TempComponent5 />
        </div>
      </div>
    </motion.main>
  );
} 