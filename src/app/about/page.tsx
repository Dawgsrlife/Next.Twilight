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
  const isInView = useInView(ref, { once: false });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  return (
    <motion.div 
      ref={ref}
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ opacity, y }}
    >
      <motion.div 
        style={{ scale }} 
        className="relative z-10 text-center max-w-4xl px-4"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-serif font-bold text-[rgb(var(--foreground))] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Crafting Digital Experiences
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-[rgb(var(--muted-foreground))] mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Building modern, responsive, and accessible web applications with Next.js, TypeScript, and Tailwind CSS.
        </motion.p>
      </motion.div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--primary),0.1)] to-transparent" />
    </motion.div>
  );
}

function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  return (
    <Section>
      <div className="w-full max-w-4xl mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Our Mission</h2>
          <p className="text-lg text-[rgb(var(--muted-foreground))] leading-relaxed">
            We believe in creating web applications that are not only visually stunning but also performant,
            accessible, and user-friendly. Our mission is to leverage the latest web technologies
            to build digital experiences that delight users and deliver business value.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Performance",
              description: "We optimize every aspect of our applications to ensure lightning-fast load times and smooth interactions.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-[rgb(var(--primary))]">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              )
            },
            {
              title: "Accessibility",
              description: "We design with accessibility in mind, ensuring our applications are usable by everyone, regardless of ability.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-[rgb(var(--primary))]">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v4"></path>
                  <path d="M12 16h.01"></path>
                </svg>
              )
            },
            {
              title: "Design",
              description: "We create beautiful, intuitive interfaces that make complex tasks feel simple and natural.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-[rgb(var(--primary))]">
                  <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06z"></path>
                  <path d="M12 7c-2-1-2-1-4-1-3 0-4 2-4 3.5C4 12.5 8 20 8 20c.33-.33.67-.67 1-1"></path>
                </svg>
              )
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-serif font-medium mb-2">{item.title}</h3>
              <p className="text-[rgb(var(--muted-foreground))]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function TechnologySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  
  return (
    <motion.div
      ref={ref}
      className="relative w-full py-24 overflow-hidden bg-[rgb(var(--accent))]"
    >
      {/* Parallax background */}
      <motion.div 
        className="absolute inset-0 bg-[url('/techbg.jpg')] bg-cover bg-center opacity-10"
        style={{ y: backgroundY }}
      />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Our Technology Stack</h2>
          <p className="text-lg text-[rgb(var(--muted-foreground))] leading-relaxed">
            We use cutting-edge technologies to build modern, fast, and scalable web applications.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              name: "Next.js",
              icon: "/nextjs-icon.png",
              description: "React framework for production"
            },
            {
              name: "TypeScript",
              icon: "/typescript-icon.png",
              description: "Typed JavaScript for better code"
            },
            {
              name: "Tailwind CSS",
              icon: "/tailwind-icon.png",
              description: "Utility-first CSS framework"
            },
            {
              name: "Framer Motion",
              icon: "/framer-icon.png",
              description: "Animation library for React"
            }
          ].map((tech, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="w-20 h-20 mb-4 rounded-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] flex items-center justify-center shadow-md">
                <div className="text-3xl">{tech.name.charAt(0)}</div>
              </div>
              <h3 className="text-lg font-medium mb-1">{tech.name}</h3>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  return (
    <Section>
      <div ref={ref} className="w-full max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Meet Our Team</h2>
          <p className="text-lg text-[rgb(var(--muted-foreground))] leading-relaxed">
            We're a small but mighty team of developers, designers, and product thinkers
            passionate about creating exceptional digital experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Mango",
              role: "Founder & Developer",
              bio: "Passionate about building beautiful, accessible web applications with modern technologies."
            },
            {
              name: "Sarah Johnson",
              role: "Lead Designer",
              bio: "Creates stunning user interfaces that are both beautiful and functional."
            },
            {
              name: "Mike Rivera",
              role: "Full Stack Developer",
              bio: "Expert in both frontend and backend technologies, with a focus on performance optimization."
            }
          ].map((person, index) => (
            <motion.div
              key={index}
              className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[rgb(var(--muted))] flex items-center justify-center">
                <span className="text-3xl font-serif">{person.name.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-serif font-medium text-center mb-1">{person.name}</h3>
              <p className="text-[rgb(var(--primary))] text-center text-sm mb-4">{person.role}</p>
              <p className="text-[rgb(var(--muted-foreground))] text-center">{person.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  return (
    <Section className="bg-[rgb(var(--muted))]">
      <div ref={ref} className="w-full max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Get In Touch</h2>
          <p className="text-lg text-[rgb(var(--muted-foreground))] leading-relaxed">
            Have a project in mind? We'd love to hear from you. Drop us a line and let's create something amazing together.
          </p>
        </motion.div>
        
        <motion.div
          className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-serif font-medium mb-4">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[rgb(var(--primary))] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>hello@nextjstwilight.com</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[rgb(var(--primary))] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[rgb(var(--primary))] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Web Dev Lane<br />San Francisco, CA 94107</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-serif font-medium mb-4">Social Media</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/Dawgsrlife/nextjs-typescript-starter" target="_blank" rel="noopener noreferrer" className="p-3 bg-[rgb(var(--muted))] rounded-full hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="#" className="p-3 bg-[rgb(var(--muted))] rounded-full hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="p-3 bg-[rgb(var(--muted))] rounded-full hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="p-3 bg-[rgb(var(--muted))] rounded-full hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
} 