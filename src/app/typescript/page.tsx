"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import CodeBlock from "../components/ui/CodeBlock";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useTutorialStore } from "../store/tutorialStore";
import { pageTransition, fadeInUp } from "../animations/variants";

export default function TypeScriptPage() {
  const { setActiveTutorial, completeTutorial } = useTutorialStore();

  useEffect(() => {
    setActiveTutorial("typescript");
    // Auto-complete this tutorial after visiting
    completeTutorial("typescript");
  }, [setActiveTutorial, completeTutorial]);

  return (
    <motion.main
      className="flex min-h-screen flex-col items-center justify-start pt-8 pb-24"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Section
        title="TypeScript: Strongly Typed JavaScript"
        subtitle="Understanding the relationship between JavaScript and TypeScript"
        titleVariant="h1"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">What is TypeScript?</h2>
          <p className="mb-4">
            TypeScript is a superset of JavaScript that adds static type checking
            to the language. It was developed by Microsoft to address the
            scaling challenges of large JavaScript applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card title="JavaScript">
              <ul className="list-disc pl-6 space-y-2">
                <li>Dynamically typed</li>
                <li>Interpreted language</li>
                <li>Runs directly in the browser</li>
                <li>Flexible but error-prone</li>
                <li>No compilation step</li>
              </ul>
            </Card>
            <Card title="TypeScript" className="bg-primary/5">
              <ul className="list-disc pl-6 space-y-2">
                <li>Statically typed</li>
                <li>Compiled to JavaScript</li>
                <li>Cannot run directly (must compile first)</li>
                <li>More structured and predictable</li>
                <li>Catches errors at compile time</li>
              </ul>
            </Card>
          </div>

          <p className="mb-6">
            TypeScript is a superset of JavaScript that adds static type checking. This helps you catch errors early 
            by catching errors before your code runs. It&apos;s similar to how a spell checker catches errors before you publish a document.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">JavaScript vs TypeScript</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">JavaScript Example:</h3>
            <CodeBlock
              language="javascript"
              title="javascript-example.js"
              code={`// JavaScript doesn't enforce types
function addNumbers(a, b) {
  return a + b;
}

// These all work in JavaScript (but might not be what you expect)
console.log(addNumbers(5, 10));        // 15
console.log(addNumbers("5", 10));      // "510" (string concatenation)
console.log(addNumbers("Hello", 10));  // "Hello10" (string concatenation)
console.log(addNumbers(null, 10));     // 10 (null is coerced to 0)
console.log(addNumbers(undefined, 10)); // NaN (undefined + number is NaN)
`}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">TypeScript Example:</h3>
            <CodeBlock
              language="typescript"
              title="typescript-example.ts"
              code={`// TypeScript enforces types
function addNumbers(a: number, b: number): number {
  return a + b;
}

// These compile and work as expected
console.log(addNumbers(5, 10));        // 15

// These would cause compiler errors:
// console.log(addNumbers("5", 10));      // Error: Argument of type 'string' is not assignable to parameter of type 'number'
// console.log(addNumbers("Hello", 10));  // Error: Argument of type 'string' is not assignable to parameter of type 'number'
// console.log(addNumbers(null, 10));     // Error: Argument of type 'null' is not assignable to parameter of type 'number'
// console.log(addNumbers(undefined, 10)); // Error: Argument of type 'undefined' is not assignable to parameter of type 'number'
`}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Java Analogy:</h3>
            <p className="mb-4">
              If you&apos;re familiar with Java, you can think of the relationship between TypeScript and JavaScript like the relationship between 
              Java and a hypothetical loosely-typed version of Java.
            </p>
            <CodeBlock
              language="java"
              title="java-example.java"
              code={`// Java is strongly typed like TypeScript
public class Example {
    // Types are explicitly declared
    public static int addNumbers(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        System.out.println(addNumbers(5, 10)); // Works: 15
        
        // This would not compile:
        // System.out.println(addNumbers("5", 10)); // Error: incompatible types
    }
}
`}
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">TypeScript Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card title="Type Annotations">
              <CodeBlock
                language="typescript"
                code={`// Basic type annotations
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["John", "Jane"];

// Objects
let user: { id: number; name: string } = { 
  id: 1, 
  name: "John" 
};`}
              />
            </Card>
            <Card title="Interfaces & Types">
              <CodeBlock
                language="typescript"
                code={`// Interface definition
interface User {
  id: number;
  name: string;
  email?: string; // Optional property
}

// Type alias
type UserRole = "admin" | "editor" | "viewer";

// Using both
interface AdminUser extends User {
  role: UserRole;
  permissions: string[];
}`}
              />
            </Card>
          </div>

          <div className="mb-8">
            <Card title="Generics">
              <p className="mb-2">
                Generics allow you to create reusable components that can work
                with a variety of types:
              </p>
              <CodeBlock
                language="typescript"
                code={`// Generic function
function getFirstItem<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

// Usage
const firstNumber = getFirstItem<number>([1, 2, 3]); // Type: number | undefined
const firstString = getFirstItem<string>(["a", "b", "c"]); // Type: string | undefined

// Generic interface
interface Repository<T> {
  getById(id: number): T;
  getAll(): T[];
  create(item: T): void;
}`}
              />
            </Card>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">
            TypeScript in Next.js Projects
          </h2>
          <p className="mb-4">
            Next.js has excellent TypeScript integration. Here&apos;s how TypeScript helps in a Next.js project:
          </p>
          <CodeBlock
            language="typescript"
            title="pages/api/example.ts (Next.js API Route with TypeScript)"
            code={`import type { NextApiRequest, NextApiResponse } from 'next';

// Define response data type
type ResponseData = {
  message: string;
  timestamp: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Type safety when accessing request properties
  const { name } = req.query;
  
  // Type safety when sending response
  res.status(200).json({ 
    message: \`Hello, \${name || 'World'}!\`, 
    timestamp: Date.now() 
  });
}`}
          />

          <div className="mt-8 flex justify-center">
            <Button 
              variant="primary"
              size="lg"
              onClick={() => {
                window.open("https://www.typescriptlang.org/docs/", "_blank");
              }}
            >
              Learn More About TypeScript
            </Button>
          </div>
        </motion.div>
      </Section>
    </motion.main>
  );
} 