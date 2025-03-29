"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Section from "../components/ui/Section";
import { Card } from "../components/ui/Card";
import { pageTransition } from "../animations/variants";

export default function AboutPage() {
  return (
    <motion.main
      className="flex flex-col items-center justify-start pb-24"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroSection />
      <MissionSection />
      <TechnologySection />
      <TeamSection />
      <ContactSection />
    </motion.main>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <div ref={ref} className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--primary))] to-purple-700 opacity-20 dark:opacity-30 dark:from-purple-600 dark:to-pink-500"
        style={{ y, opacity }}
      />
      
      <motion.div 
        className="container mx-auto h-full flex items-center justify-center text-center px-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-[rgb(var(--foreground))]">
            About Next.Twilight
          </h1>
          <p className="text-xl md:text-2xl text-[rgb(var(--foreground))] max-w-2xl mx-auto">
            A modern web development toolkit and learning platform
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <Section>
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-[rgb(var(--muted-foreground))]">
            Building a better learning experience for web developers
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <p>
            Next.Twilight solves the common problem of fragmented learning resources by providing a unified platform where developers can understand how modern web technologies work together. I built this project during my second year as a developer to address the gaps I found in existing tutorials.
          </p>
          
          <p>
            The project demonstrates practical implementations of Next.js, TypeScript, Tailwind CSS, and Framer Motion working in harmony. Instead of isolated examples, you'll find real-world patterns and solutions that show how these technologies complement each other in production-ready code.
          </p>
          
          <p>
            The UI features a clean, accessible design with a custom color scheme that works well in both light and dark modes. All animations are implemented with performance in mind, following best practices for motion design that enhance rather than distract from the user experience.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

function TechnologySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <Section>
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif font-bold mb-4">Technologies</h2>
          <p className="text-lg text-[rgb(var(--muted-foreground))]">
            The modern web stack powering this experience
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card title="Next.js" className="h-full">
              <p className="mb-4">
                The React framework for production that enables features like server-side rendering, static site generation, and API routes. Next.js 14 with the App Router provides an optimal developer experience.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>App Router architecture</li>
                <li>Server and Client components</li>
                <li>API Routes</li>
                <li>Built-in optimizations</li>
              </ul>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card title="TypeScript" className="h-full">
              <p className="mb-4">
                A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. TypeScript enhances code quality and developer experience through its robust type system.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Type safety</li>
                <li>Enhanced IDE support</li>
                <li>Interfaces and type definitions</li>
                <li>Better code organization</li>
              </ul>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card title="Tailwind CSS" className="h-full">
              <p className="mb-4">
                A utility-first CSS framework that allows for rapid UI development without sacrificing customization. Tailwind makes it easy to build responsive, consistent designs through composition.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utility-first approach</li>
                <li>Responsive design system</li>
                <li>Dark mode support</li>
                <li>Custom theming</li>
              </ul>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card title="Framer Motion" className="h-full">
              <p className="mb-4">
                A production-ready animation library for React that makes it easy to create polished animations and gestures. Framer Motion enables sophisticated motion design with a simple declarative API.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Declarative animations</li>
                <li>Gesture recognition</li>
                <li>Layout animations</li>
                <li>Exit animations</li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Team members with updated styling and image for Alex
  const teamMembers = [
    {
      name: "Alex (AlexanderTheMango)",
      role: "Creator & Developer",
      bio: "Full-stack developer focused on modern web technologies and user-friendly interfaces. Currently working on projects that bridge the gap between development and education.",
      image: "/images/profile-lemon.png", // Using the provided image
    },
    {
      name: "Sakura Miyazaki",
      role: "UI Design",
      bio: "Placeholder representing UI design contributions to the project. Focus areas include component structure, visual hierarchy, and responsive layouts.",
      image: "https://i.pravatar.cc/300?img=5",
    },
    {
      name: "Haruki Tanaka",
      role: "Animation Development",
      bio: "Placeholder representing animation implementation work. Responsible for performance optimization and creating smooth transitions throughout the application.",
      image: "https://i.pravatar.cc/300?img=3",
    },
    {
      name: "Yuki Nakamura",
      role: "Architecture",
      bio: "Placeholder representing code architecture planning. Focused on maintainable patterns, state management solutions, and code organization strategies.",
      image: "https://i.pravatar.cc/300?img=4",
    },
  ];
  
  return (
    <Section>
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif font-bold mb-4">Team</h2>
          <p className="text-lg text-[rgb(var(--muted-foreground))]">
            Project contributors and role specializations
          </p>
          <p className="text-sm text-[rgb(var(--muted-foreground))] mt-2 italic">
            Note: With the exception of Alex, team members represent different development specialties
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            >
              <Card className="h-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[rgb(var(--primary))]/80">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-1 text-[rgb(var(--foreground))]">{member.name}</h3>
                    <p className="text-[rgb(var(--primary))] text-sm font-semibold mb-2">{member.role}</p>
                    <p className="text-[rgb(var(--foreground))] opacity-80">{member.bio}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <Section>
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif font-bold mb-4">Contact</h2>
          <p className="text-lg text-[rgb(var(--muted-foreground))]">
            Questions, feedback, or collaboration inquiries
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-4 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-serif font-medium mb-4 text-[rgb(var(--foreground))]">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 min-w-6 text-[rgb(var(--primary))] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[rgb(var(--foreground))] break-words">contact@nextjstwilight.dev</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 min-w-6 text-[rgb(var(--primary))] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-[rgb(var(--foreground))]">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 min-w-6 text-[rgb(var(--primary))] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[rgb(var(--foreground))]">Toronto, Canada</span>
                </li>
              </ul>
              
              <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-[rgb(var(--foreground))]">Connect</h3>
              <div className="flex flex-wrap gap-2">
                <a href="https://github.com/Dawgsrlife" className="p-3 bg-[rgb(var(--muted))] rounded-full hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://x.com/Dawgsrlifee" className="p-3 bg-[rgb(var(--muted))] rounded-full hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/alex-he-meng" className="p-3 bg-[rgb(var(--muted))] rounded-full hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://www.instagram.com/alexanderthemango/" className="p-3 bg-[rgb(var(--muted))] rounded-full hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-serif font-medium mb-4 text-[rgb(var(--foreground))]">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-[rgb(var(--foreground))]">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full p-2 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-[rgb(var(--foreground))]">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full p-2 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-[rgb(var(--foreground))]">Message</label>
                  <textarea 
                    id="message" 
                    rows={3}
                    className="w-full p-2 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] resize-y min-h-[100px]"
                    placeholder="Type your message here..."
                  />
                </div>
                <button 
                  type="button"
                  className="px-4 py-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-md hover:bg-[rgb(var(--primary))]/90 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
} 