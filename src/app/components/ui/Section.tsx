"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  titleVariant?: "h1" | "h2" | "h3";
}

export default function Section({
  title,
  subtitle,
  children,
  className = "",
  id,
  titleVariant = "h2",
}: SectionProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const TitleComponent = titleVariant;

  return (
    <motion.section
      id={id}
      className={`py-12 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <motion.div variants={childVariants} className="text-center mb-12">
            {title && (
              <TitleComponent className="text-3xl font-serif font-bold mb-3 text-[rgb(var(--foreground))]">
                {title}
              </TitleComponent>
            )}
            {subtitle && (
              <p className="text-xl text-[rgb(var(--muted-foreground))]">{subtitle}</p>
            )}
          </motion.div>
        )}
        <motion.div
          variants={childVariants}
          className="prose prose-lg dark:prose-invert mx-auto max-w-none"
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
} 