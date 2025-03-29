"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  path: string;
  completed: boolean;
}

interface TutorialState {
  tutorials: Tutorial[];
  activeTutorial: string | null;
  completedTutorials: string[];
  setActiveTutorial: (id: string) => void;
  completeTutorial: (id: string) => void;
  isCompleted: (id: string) => boolean;
}

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set, get) => ({
      tutorials: [
        {
          id: "intro",
          title: "Project Overview",
          description: "Introduction to the tutorial playground and its features.",
          path: "/",
          completed: false,
        },
        {
          id: "typescript",
          title: "TypeScript",
          description: "Learn TypeScript's type system and its integration with React.",
          path: "/typescript",
          completed: false,
        },
        {
          id: "nextjs",
          title: "Next.js",
          description: "Explore Next.js features including the App Router.",
          path: "/next-js",
          completed: false,
        },
        {
          id: "tailwind",
          title: "Tailwind CSS",
          description: "Understand utility-first CSS with Tailwind.",
          path: "/tailwind",
          completed: false,
        },
        {
          id: "framer",
          title: "Framer Motion",
          description: "Create beautiful animations and transitions.",
          path: "/framer-motion",
          completed: false,
        },
        {
          id: "todo",
          title: "Todo App",
          description: "A complete example combining all technologies.",
          path: "/todo",
          completed: false,
        },
      ],
      activeTutorial: null,
      completedTutorials: [],
      
      setActiveTutorial: (id) => set({ activeTutorial: id }),
      
      completeTutorial: (id) => {
        set((state) => {
          // Check if already completed to avoid duplicates
          if (state.completedTutorials.includes(id)) {
            return state;
          }
          
          // Update the tutorials array to mark the tutorial as completed
          const updatedTutorials = state.tutorials.map(tutorial => 
            tutorial.id === id ? { ...tutorial, completed: true } : tutorial
          );
          
          return {
            tutorials: updatedTutorials,
            completedTutorials: [...state.completedTutorials, id],
          };
        });
      },
      
      isCompleted: (id) => {
        return get().completedTutorials.includes(id);
      },
    }),
    {
      name: 'tutorial-storage',
      skipHydration: true,
    }
  )
); 