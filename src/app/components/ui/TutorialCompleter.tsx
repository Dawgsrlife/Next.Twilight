"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTutorialStore } from '../../store/tutorialStore';
import Button from './Button';

interface TutorialCompleterProps {
  tutorialId: string;
  className?: string;
}

export default function TutorialCompleter({ tutorialId, className = "" }: TutorialCompleterProps) {
  const { completeTutorial, isCompleted } = useTutorialStore();
  const completed = isCompleted(tutorialId);

  useEffect(() => {
    // Auto-scroll to the component when it comes into view
    const handleScroll = () => {
      const element = document.getElementById('tutorial-completer');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        if (isVisible) {
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleComplete = () => {
    completeTutorial(tutorialId);
  };

  return (
    <motion.div
      id="tutorial-completer"
      className={`my-12 p-6 border border-[rgb(var(--primary))]/30 rounded-lg bg-[rgb(var(--card))] ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-serif font-medium mb-2">
            {completed ? 'Tutorial Completed!' : 'Mark Tutorial as Completed'}
          </h3>
          <p className="text-[rgb(var(--muted-foreground))]">
            {completed
              ? 'Great job! You\'ve completed this section.'
              : 'Once you\'ve understood this section, mark it as completed to track your progress.'}
          </p>
        </div>

        <Button
          onClick={handleComplete}
          disabled={completed}
          variant={completed ? "success" : "primary"}
        >
          {completed ? (
            <div className="flex items-center">
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
            </div>
          ) : (
            'Mark as Completed'
          )}
        </Button>
      </div>
    </motion.div>
  );
} 