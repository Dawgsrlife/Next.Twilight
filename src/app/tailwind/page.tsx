"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import CodeBlock from "../components/ui/CodeBlock";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useTutorialStore } from "../store/tutorialStore";
import { pageTransition, fadeInUp } from "../animations/variants";

// Define allowed color types
type ColorType = "indigo" | "blue" | "red" | "green" | "purple" | "amber";
type SizeType = "sm" | "md" | "lg";
type RoundedType = "none" | "sm" | "md" | "lg" | "full";
type ShadowType = "none" | "sm" | "md" | "lg" | "xl";

export default function TailwindPage() {
  const { setActiveTutorial, completeTutorial } = useTutorialStore();
  const [color, setColor] = useState<ColorType>("indigo");
  const [size, setSize] = useState<SizeType>("md");
  const [rounded, setRounded] = useState<RoundedType>("md");
  const [shadow, setShadow] = useState<ShadowType>("md");
  
  const colors = {
    indigo: "bg-indigo-500 hover:bg-indigo-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
    green: "bg-green-500 hover:bg-green-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    amber: "bg-amber-500 hover:bg-amber-600",
  };
  
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };
  
  const roundedVariants = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };
  
  const shadowVariants = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  useEffect(() => {
    setActiveTutorial("tailwind");
    // Auto-complete this tutorial after visiting
    completeTutorial("tailwind");
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
        title="Tailwind CSS: Utility-First CSS Framework"
        subtitle="Learn how to style your web applications with Tailwind CSS"
        titleVariant="h1"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">What is Tailwind CSS?</h2>
          <p className="mb-4">
            Tailwind CSS is a utility-first CSS framework that provides a set of
            predefined classes that you can apply directly to your HTML elements.
            Instead of writing custom CSS, you compose styles by combining these
            utility classes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card title="Traditional CSS">
              <CodeBlock
                language="css"
                code={`.button {
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

.button:hover {
  background-color: #4338ca;
}

.large-button {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

/* Many more custom classes */
`}
              />
            </Card>
            <Card title="Tailwind CSS" className="bg-primary/5">
              <CodeBlock
                language="html"
                code={`<!-- Button with utility classes -->
<button class="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700">
  Click me
</button>

<!-- Large button -->
<button class="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 text-lg">
  Click me
</button>
`}
              />
            </Card>
          </div>

          <p className="mb-6">
            This approach offers rapid development, consistency, and
            responsiveness without having to write custom CSS.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Core Concepts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card title="Utility Classes">
              <p className="mb-2">Small, single-purpose classes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">text-lg</code> - Set font size to large</li>
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">font-bold</code> - Apply bold font weight</li>
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">p-4</code> - Add padding on all sides</li>
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">mb-2</code> - Add margin to bottom</li>
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">flex</code> - Use flexbox layout</li>
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">items-center</code> - Center items vertically</li>
              </ul>
            </Card>
            <Card title="Responsive Design">
              <p className="mb-2">Responsive modifiers for different screen sizes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">sm:flex</code> - Flex on small screens and up</li>
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">md:w-1/2</code> - Half width on medium screens</li>
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">lg:text-xl</code> - Extra large text on large screens</li>
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">xl:p-8</code> - More padding on extra large screens</li>
              </ul>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card title="Hover, Focus, and Other States">
              <p className="mb-2">State modifiers:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">hover:bg-blue-700</code> - Blue background on hover</li>
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">focus:outline-none</code> - Remove outline on focus</li>
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">active:bg-blue-800</code> - Darker blue when active</li>
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">disabled:opacity-50</code> - Reduce opacity when disabled</li>
              </ul>
            </Card>
            <Card title="Dark Mode">
              <p className="mb-2">Dark mode support:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">dark:bg-gray-800</code> - Dark background in dark mode</li>
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">dark:text-white</code> - White text in dark mode</li>
                <li><code className="bg-[rgb(var(--muted))] px-1 py-0.5 rounded">dark:border-gray-700</code> - Dark border in dark mode</li>
              </ul>
            </Card>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Interactive Playground</h2>
          
          <div className="p-6 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Customize Button</h3>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <select 
                  value={color}
                  onChange={(e) => setColor(e.target.value as ColorType)}
                  className="bg-[rgb(var(--background))] border border-[rgb(var(--input))] rounded-md p-2"
                >
                  <option value="indigo">Indigo</option>
                  <option value="blue">Blue</option>
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="amber">Amber</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <select 
                  value={size}
                  onChange={(e) => setSize(e.target.value as SizeType)}
                  className="bg-[rgb(var(--background))] border border-[rgb(var(--input))] rounded-md p-2"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Rounded</label>
                <select 
                  value={rounded}
                  onChange={(e) => setRounded(e.target.value as RoundedType)}
                  className="bg-[rgb(var(--background))] border border-[rgb(var(--input))] rounded-md p-2"
                >
                  <option value="none">None</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="full">Full</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Shadow</label>
                <select 
                  value={shadow}
                  onChange={(e) => setShadow(e.target.value as ShadowType)}
                  className="bg-[rgb(var(--background))] border border-[rgb(var(--input))] rounded-md p-2"
                >
                  <option value="none">None</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex justify-center">
                <button 
                  className={`text-[rgb(var(--primary-foreground))] font-medium ${colors[color]} ${sizes[size]} ${roundedVariants[rounded]} ${shadowVariants[shadow]}`}
                >
                  Click Me
                </button>
              </div>
              
              <CodeBlock
                language="html"
                code={`<button class="text-[rgb(var(--primary-foreground))] font-medium ${colors[color]} ${sizes[size]} ${roundedVariants[rounded]} ${shadowVariants[shadow]}">
  Click Me
</button>`}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">
            Tailwind vs Traditional CSS
          </h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Java UI Toolkit Analogy:</h3>
            <p className="mb-4">
              The relationship between traditional CSS and Tailwind CSS is 
              similar to the difference between coding layouts manually in Java Swing
              versus using a more declarative approach in JavaFX:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card title="Java Swing (Like Traditional CSS)">
                <CodeBlock
                  language="java"
                  code={`// Manually setting properties
JButton button = new JButton("Click Me");
button.setBackground(new Color(79, 70, 229));
button.setForeground(Color.WHITE);
button.setFont(new Font("Arial", Font.BOLD, 12));
button.setBorder(BorderFactory.createEmptyBorder(8, 16, 8, 16));

// Dealing with layouts manually
JPanel panel = new JPanel();
panel.setLayout(new BorderLayout());
panel.add(button, BorderLayout.CENTER);`}
                />
              </Card>
              <Card title="JavaFX with FXML (Like Tailwind)">
                <CodeBlock
                  language="xml"
                  code={`<!-- Declarative styling with CSS classes -->
<Button 
  text="Click Me" 
  styleClass="primary-button large-button rounded-button" 
/>

<!-- CSS file -->
.primary-button {
  -fx-background-color: #4f46e5;
  -fx-text-fill: white;
}
.large-button {
  -fx-padding: 8 16 8 16;
}
.rounded-button {
  -fx-background-radius: 4;
}`}
                />
              </Card>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button 
              variant="primary"
              size="lg"
              onClick={() => {
                window.open("https://tailwindcss.com/docs", "_blank");
              }}
            >
              Learn More About Tailwind CSS
            </Button>
          </div>
        </motion.div>
      </Section>
    </motion.main>
  );
} 