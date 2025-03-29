"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../components/ui/Section";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { pageTransition } from "../animations/variants";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string; // Store as ISO string for better serialization
}

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const todoVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 }
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isInitialized, setIsInitialized] = useState(false);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        // Initialize with empty array if there was an error
        setTodos([]);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    // Only save after initial load to prevent overwriting data
    if (isInitialized) {
      localStorage.setItem("todos", JSON.stringify(todos));
      console.log("Todos saved to localStorage:", todos);
    }
  }, [todos, isInitialized]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const newTodoItem: Todo = {
      id: crypto.randomUUID(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString() // Store as ISO string for better serialization
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all" filter
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <motion.main
      className="flex min-h-screen flex-col items-center justify-start pt-8 pb-24"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Section
        title="Todo App"
        subtitle="A simple, beautiful todo app built with Next.js and Framer Motion"
        titleVariant="h1"
      >
        <div className="w-full max-w-2xl mx-auto mt-8">
          <Card className="p-6">
            <form onSubmit={addTodo} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="What needs to be done?"
                  className="flex-1 p-3 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--foreground))]"
                />
                <Button type="submit" disabled={!newTodo.trim()}>
                  Add
                </Button>
              </div>
            </form>

            <motion.div
              className="space-y-3 mb-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {filteredTodos.length === 0 ? (
                  <motion.div
                    className="p-4 text-center text-[rgb(var(--muted-foreground))]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {filter === "all" 
                      ? "No todos yet. Add one above!" 
                      : filter === "active" 
                        ? "No active todos!" 
                        : "No completed todos!"}
                  </motion.div>
                ) : (
                  filteredTodos.map(todo => (
                    <motion.div
                      key={todo.id}
                      className={`flex items-center justify-between p-3 rounded-md border ${
                        todo.completed
                          ? "border-[rgb(var(--primary-foreground))] bg-[rgba(var(--primary),0.1)]"
                          : "border-[rgb(var(--border))]"
                      }`}
                      variants={todoVariants}
                      layout
                      exit="exit"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            todo.completed
                              ? "border-[rgb(var(--primary))] bg-[rgb(var(--primary))]"
                              : "border-[rgb(var(--border))]"
                          }`}
                          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                        >
                          {todo.completed && (
                            <motion.svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-3 h-3 text-white"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </motion.svg>
                          )}
                        </button>
                        
                        <span className={`${todo.completed ? "line-through text-[rgb(var(--muted-foreground))]" : ""}`}>
                          {todo.text}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[rgb(var(--muted-foreground))]">
                          {formatDate(todo.createdAt)}
                        </span>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-1 text-[rgb(var(--destructive))] hover:bg-[rgba(var(--destructive),0.1)] rounded-full transition-colors"
                          aria-label="Delete todo"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>

            <div className="flex flex-wrap justify-between items-center border-t border-[rgb(var(--border))] pt-4">
              <span className="text-sm text-[rgb(var(--muted-foreground))]">
                {activeTodosCount} {activeTodosCount === 1 ? "item" : "items"} left
              </span>
              
              <div className="flex gap-2 my-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === "all"
                      ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                      : "hover:bg-[rgb(var(--muted))]"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === "active"
                      ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                      : "hover:bg-[rgb(var(--muted))]"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === "completed"
                      ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                      : "hover:bg-[rgb(var(--muted))]"
                  }`}
                >
                  Completed
                </button>
              </div>
              
              <button
                onClick={clearCompleted}
                className="text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
                disabled={!todos.some(todo => todo.completed)}
              >
                Clear completed
              </button>
            </div>
          </Card>
          
          <div className="mt-8 text-center">
            <h3 className="text-xl font-serif mb-2">Pro Tips</h3>
            <p className="text-[rgb(var(--muted-foreground))]">
              Your todos are automatically saved to your browser's local storage.
              <br />
              They will persist even if you close or refresh the page.
            </p>
          </div>
        </div>
      </Section>
    </motion.main>
  );
} 