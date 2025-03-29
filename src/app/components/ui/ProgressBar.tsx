"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
  showPercentage?: boolean;
  height?: number;
}

export default function ProgressBar({
  progress,
  className = "",
  showPercentage = true,
  height = 8,
}: ProgressBarProps) {
  // Ensure progress is between 0 and 100
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        {showPercentage && (
          <div className="text-sm font-medium text-muted-foreground">
            {Math.round(safeProgress)}% Complete
          </div>
        )}
      </div>
      <div
        className="w-full bg-secondary rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <motion.div
          className="bg-primary h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${safeProgress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
} 