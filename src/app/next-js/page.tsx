"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import CodeBlock from "../components/ui/CodeBlock";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import TutorialCompleter from "../components/ui/TutorialCompleter";
import { useTutorialStore } from "../store/tutorialStore";
import { pageTransition, fadeInUp } from "../animations/variants";

export default function NextJsPage() {
  const { setActiveTutorial } = useTutorialStore();

  useEffect(() => {
    setActiveTutorial("nextjs");
  }, [setActiveTutorial]);

  return (
    <motion.main
      className="flex min-h-screen flex-col items-center justify-start pt-8 pb-24"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Section
        title="Next.js: React Framework for the Web"
        subtitle="Understanding the relationship between React, Next.js, and Node.js"
        titleVariant="h1"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">What is Next.js?</h2>
          <p className="mb-4">
            Next.js is a React framework that provides a complete solution for
            building web applications. It extends React with features like
            server-side rendering, static site generation, file-based routing,
            and more.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card title="React">
              <ul className="list-disc pl-6 space-y-2">
                <li>JavaScript UI library</li>
                <li>Component-based architecture</li>
                <li>Client-side rendering by default</li>
                <li>Requires additional setup for routing, SSR, etc.</li>
                <li>Manual configuration for production</li>
              </ul>
            </Card>
            <Card title="Next.js" className="bg-primary/5">
              <ul className="list-disc pl-6 space-y-2">
                <li>Full-featured React framework</li>
                <li>Server-side rendering & static generation</li>
                <li>Built-in file-based routing</li>
                <li>API routes</li>
                <li>Optimized production builds</li>
              </ul>
            </Card>
          </div>

          <p className="mb-6">
            Think of Next.js as a higher-level framework built on top of React,
            similar to how JavaFX builds on Java to provide a comprehensive
            solution for building desktop applications.
          </p>
        </motion.div>
        
        <TutorialCompleter tutorialId="nextjs" />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">React vs Next.js</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">React Example:</h3>
            <CodeBlock
              language="jsx"
              title="App.jsx (React with react-router-dom)"
              code={`import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';

// In React, you need to set up routing manually
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

// And you'd need to configure a lot more for SSR, optimization, etc.
`}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Next.js Example:</h3>
            <CodeBlock
              language="jsx"
              title="Next.js App Router Structure"
              code={`// In Next.js, routing is file-based in the app/ directory
// app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>{/* Navigation links */}</nav>
        {children}
      </body>
    </html>
  );
}

// app/page.jsx (routes to /)
export default function Home() {
  return <h1>Home Page</h1>;
}

// app/about/page.jsx (routes to /about)
export default function About() {
  return <h1>About Page</h1>;
}

// app/not-found.jsx (handles 404s automatically)
export default function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}
`}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Java/JavaFX Analogy:</h3>
            <p className="mb-4">
              The relationship between React and Next.js is similar to the
              relationship between Java and JavaFX:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card title="Java & React">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Base languages/libraries</li>
                  <li>Require more manual setup</li>
                  <li>More flexible but less opinionated</li>
                  <li>Need additional libraries for UI/routing</li>
                </ul>
              </Card>
              <Card title="JavaFX & Next.js">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Built on top of the base language/library</li>
                  <li>Provide higher-level abstractions</li>
                  <li>Include built-in UI components and routing</li>
                  <li>Opinionated with sensible defaults</li>
                </ul>
              </Card>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Next.js and Node.js</h2>
          
          <p className="mb-4">
            Next.js is built on top of Node.js for its server-side functionality.
            This is what enables server-side rendering and API routes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card title="Node.js">
              <ul className="list-disc pl-6 space-y-2">
                <li>JavaScript runtime for server-side code</li>
                <li>Used to execute JavaScript outside the browser</li>
                <li>Provides access to the file system</li>
                <li>Enables server functionality (HTTP, etc.)</li>
                <li>Powers the Next.js development server</li>
              </ul>
            </Card>
            <Card title="Next.js Server Components">
              <ul className="list-disc pl-6 space-y-2">
                <li>Execute on the server (Node.js)</li>
                <li>Can access databases directly</li>
                <li>Never run in the browser</li>
                <li>Reduce client-side JavaScript</li>
                <li>Secure data fetching without exposing secrets</li>
              </ul>
            </Card>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Next.js API Routes:</h3>
            <CodeBlock
              language="typescript"
              title="app/api/hello/route.ts"
              code={`import { NextResponse } from 'next/server';
 
export async function GET() {
  // This code runs on the server using Node.js
  // You can access databases, file systems, etc. securely
  return NextResponse.json({ message: 'Hello, world!' });
}

export async function POST(request: Request) {
  // Access the request body
  const body = await request.json();
  
  // Process data, interact with databases, etc.
  
  return NextResponse.json({ received: body });
}`}
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">Next.js Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card title="App Router">
              <p className="mb-2">Modern file-based routing system with nested layouts:</p>
              <CodeBlock
                language="plaintext"
                code={`app/
├── layout.tsx     # Root layout
├── page.tsx       # Home page (/)
├── about/
│   └── page.tsx   # About page (/about)
├── blog/
│   ├── layout.tsx # Blog layout
│   ├── page.tsx   # Blog index (/blog)
│   └── [slug]/
│       └── page.tsx # Dynamic route (/blog/post-1)`}
              />
            </Card>
            <Card title="Server Components">
              <p className="mb-2">React components that render on the server:</p>
              <CodeBlock
                language="typescript"
                code={`// This entire component runs on the server
export default async function Dashboard() {
  // Data fetching happens on the server
  const data = await fetchData();
  
  // Only the HTML is sent to the client
  return (
    <main>
      <h1>Dashboard</h1>
      <DataTable items={data} />
    </main>
  );
}`}
              />
            </Card>
          </div>

          <div className="mb-8">
            <Card title="Data Fetching">
              <p className="mb-2">
                Next.js provides powerful data fetching capabilities:
              </p>
              <CodeBlock
                language="typescript"
                code={`// Server Component with data fetching
export default async function Page() {
  // This runs on the server only
  const data = await fetch('https://api.example.com/data', { 
    // Revalidate cache every 60 seconds
    next: { revalidate: 60 }
  }).then(res => res.json());
  
  return (
    <div>
      <h1>Data from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}`}
              />
            </Card>
          </div>

          <div className="mt-8 flex justify-center">
            <Button 
              variant="primary"
              size="lg"
              onClick={() => {
                window.open("https://nextjs.org/docs", "_blank");
              }}
            >
              Learn More About Next.js
            </Button>
          </div>
        </motion.div>
      </Section>
    </motion.main>
  );
} 