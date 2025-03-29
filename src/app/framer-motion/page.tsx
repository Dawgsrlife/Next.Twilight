"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import Section from "../components/ui/Section";
import CodeBlock from "../components/ui/CodeBlock";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useTutorialStore } from "../store/tutorialStore";
import { pageTransition, fadeInUp } from "../animations/variants";

export default function FramerMotionPage() {
  const { setActiveTutorial, completeTutorial } = useTutorialStore();
  const [scope, animate] = useAnimate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animation, setAnimation] = useState("fade");
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = async () => {
    setIsPlaying(true);
    
    if (animation === "fade") {
      await animate(scope.current, 
        { opacity: [0, 1] }, 
        { duration: 1 }
      );
    } else if (animation === "scale") {
      await animate(scope.current, 
        { scale: [0, 1.1, 1] }, 
        { duration: 1, times: [0, 0.7, 1] }
      );
    } else if (animation === "rotate") {
      await animate(scope.current, 
        { rotate: [0, 360] }, 
        { duration: 1 }
      );
    } else if (animation === "slide") {
      await animate(scope.current, 
        { x: [-100, 0] }, 
        { duration: 0.7, ease: "easeOut" }
      );
    } else if (animation === "spring") {
      await animate(scope.current, 
        { y: [-100, 0] }, 
        { type: "spring", stiffness: 150, damping: 10 }
      );
    }
    
    setIsPlaying(false);
  };

  useEffect(() => {
    setActiveTutorial("framer-motion");
    // Auto-complete this tutorial after visiting
    completeTutorial("framer-motion");
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
        title="Framer Motion: Animation Library for React"
        subtitle="Create smooth and powerful animations with ease"
        titleVariant="h1"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">What is Framer Motion?</h2>
          <p className="mb-4">
            Framer Motion is a production-ready animation library for React that
            makes creating complex, fluid animations and interactions simple and
            declarative. It provides a set of components and hooks that abstract
            away the complexities of CSS and JavaScript animations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card title="Without Framer Motion">
              <CodeBlock
                language="css"
                code={`/* CSS Animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animated-element {
  animation: fadeIn 0.5s ease forwards;
}

/* For transitions between elements */
.element-enter {
  opacity: 0;
}
.element-enter-active {
  opacity: 1;
  transition: opacity 0.5s ease;
}
.element-exit {
  opacity: 1;
}
.element-exit-active {
  opacity: 0;
  transition: opacity 0.5s ease;
}`}
              />
            </Card>
            <Card title="With Framer Motion" className="bg-primary/5">
              <CodeBlock
                language="jsx"
                code={`// Simple fade-in animation
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Hello, world!
</motion.div>

// AnimatePresence for elements entering/exiting
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      I'll animate when I'm removed
    </motion.div>
  )}
</AnimatePresence>`}
              />
            </Card>
          </div>

          <p className="mb-6">
            Framer Motion abstracts away the complexity of animations, allowing
            you to create sophisticated motion with minimal code. It's similar to
            how JavaFX's animation API simplifies animations compared to
            manually handling animations in base Java.
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
            <Card title="Motion Components">
              <p className="mb-2">Basic usage with motion components:</p>
              <CodeBlock
                language="jsx"
                code={`// Convert any HTML element to a motion component
<motion.div
  // Starting state
  initial={{ opacity: 0, scale: 0.8 }}
  
  // Final state
  animate={{ opacity: 1, scale: 1 }}
  
  // Animation configuration
  transition={{
    duration: 0.5,
    ease: "easeOut"
  }}
>
  I will fade and scale in
</motion.div>`}
              />
            </Card>
            
            <Card title="Variants">
              <p className="mb-2">Reusable animation configurations:</p>
              <CodeBlock
                language="jsx"
                code={`// Define animation states
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1 // Children animate sequentially
    }
  }
};

// Parent component
<motion.ul
  variants={variants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.li key={item.id} variants={variants}>
      {item.text}
    </motion.li>
  ))}
</motion.ul>`}
              />
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card title="Gestures">
              <p className="mb-2">Interactive animations with gestures:</p>
              <CodeBlock
                language="jsx"
                code={`<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click me!
</motion.button>

// With drag gestures
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300, top: 0, bottom: 200 }}
  whileDrag={{ scale: 1.1 }}
>
  Drag me
</motion.div>`}
              />
            </Card>
            
            <Card title="AnimatePresence">
              <p className="mb-2">Animate components when they're removed from the React tree:</p>
              <CodeBlock
                language="jsx"
                code={`<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      I'll animate when I enter and exit!
    </motion.div>
  )}
</AnimatePresence>

// Modal example
<AnimatePresence>
  {isModalOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        className="modal"
      >
        Modal content
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>`}
              />
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
          <h2 className="text-2xl font-bold mb-6">Interactive Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card title="Animation Playground">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Animation Type</label>
                <select 
                  value={animation}
                  onChange={(e) => setAnimation(e.target.value)}
                  className="bg-background border border-input rounded-md p-2 w-full"
                >
                  <option value="fade">Fade</option>
                  <option value="scale">Scale</option>
                  <option value="rotate">Rotate</option>
                  <option value="slide">Slide</option>
                  <option value="spring">Spring</option>
                </select>
              </div>
              
              <div className="h-40 border border-border rounded-lg flex justify-center items-center mb-4">
                <motion.div 
                  ref={scope}
                  className="w-24 h-24 bg-primary/80 rounded-lg flex items-center justify-center text-white font-bold"
                >
                  Motion
                </motion.div>
              </div>
              
              <Button 
                onClick={playAnimation} 
                disabled={isPlaying}
                fullWidth
              >
                {isPlaying ? "Animating..." : "Play Animation"}
              </Button>
              
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Code:</h4>
                <CodeBlock
                  language="jsx"
                  code={animation === "fade" 
                    ? `animate(element, 
  { opacity: [0, 1] }, 
  { duration: 1 }
);`
                    : animation === "scale"
                    ? `animate(element, 
  { scale: [0, 1.1, 1] }, 
  { duration: 1, times: [0, 0.7, 1] }
);`
                    : animation === "rotate"
                    ? `animate(element, 
  { rotate: [0, 360] }, 
  { duration: 1 }
);`
                    : animation === "slide"
                    ? `animate(element, 
  { x: [-100, 0] }, 
  { duration: 0.7, ease: "easeOut" }
);`
                    : `animate(element, 
  { y: [-100, 0] }, 
  { type: "spring", stiffness: 150, damping: 10 }
);`}
                />
              </div>
            </Card>
            
            <Card title="Modal Example">
              <p className="mb-4">
                Click the button below to open a modal with smooth enter/exit animations:
              </p>
              
              <Button 
                onClick={() => setIsModalOpen(true)}
                fullWidth
              >
                Open Modal
              </Button>
              
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Code:</h4>
                <CodeBlock
                  language="jsx"
                  code={`<AnimatePresence>
  {isModalOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-card p-6 rounded-lg max-w-md"
      >
        <h2 className="text-xl font-bold mb-2">Modal Title</h2>
        <p className="mb-4">This modal animates in and out smoothly!</p>
        <Button onClick={() => setIsModalOpen(false)}>
          Close Modal
        </Button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>`}
                />
              </div>
            </Card>
          </div>

          <div className="mb-8">
            <Card title="Staggered List Animation">
              <p className="mb-4">Elements animate in sequence with a staggered delay:</p>
              
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="space-y-2"
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <motion.div
                    key={item}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.4,
                        },
                      },
                    }}
                    className="bg-primary/10 dark:bg-primary/20 p-3 rounded-md"
                  >
                    List Item {item}
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="mt-4">
                <CodeBlock
                  language="jsx"
                  code={`<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }}
>
  {items.map((item) => (
    <motion.div
      key={item}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.4 },
        },
      }}
    >
      List Item {item}
    </motion.div>
  ))}
</motion.div>`}
                />
              </div>
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
            Framer Motion & Java Animation Analogy
          </h2>
          
          <div className="mb-6">
            <p className="mb-4">
              The relationship between traditional JavaScript animations and
              Framer Motion is similar to the relationship between manual
              animations in Java and JavaFX's animation framework:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card title="Java Manual Animation (Like JS/CSS)">
                <CodeBlock
                  language="java"
                  code={`// Manual animation in a Thread
Thread animationThread = new Thread(() -> {
    try {
        double opacity = 0.0;
        while (opacity < 1.0) {
            final double currentOpacity = opacity;
            // Update UI on JavaFX thread
            Platform.runLater(() -> 
                node.setOpacity(currentOpacity)
            );
            opacity += 0.05;
            Thread.sleep(30); // ~30fps
        }
        Platform.runLater(() -> 
            node.setOpacity(1.0)
        );
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
});
animationThread.start();`}
                />
              </Card>
              <Card title="JavaFX Animation (Like Framer Motion)">
                <CodeBlock
                  language="java"
                  code={`// Declarative animation with JavaFX
FadeTransition fadeIn = new FadeTransition(
    Duration.millis(500), node);
fadeIn.setFromValue(0.0);
fadeIn.setToValue(1.0);

// Chain animations
SequentialTransition sequence = 
    new SequentialTransition(
        fadeIn,
        new PauseTransition(Duration.millis(500)),
        createMoveAnimation()
    );

// Play the animation
sequence.play();`}
                />
              </Card>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button 
              variant="primary"
              size="lg"
              onClick={() => {
                window.open("https://www.framer.com/motion/", "_blank");
              }}
            >
              Learn More About Framer Motion
            </Button>
          </div>
        </motion.div>
      </Section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card p-6 rounded-lg max-w-md w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-2">Framer Motion Modal</h2>
              <p className="mb-4">
                This modal is built with Framer Motion's
                <code className="bg-muted px-1 py-0.5 rounded mx-1">AnimatePresence</code>
                component, which allows it to smoothly animate when entering and exiting the DOM.
              </p>
              <div className="flex justify-end">
                <Button onClick={() => setIsModalOpen(false)}>
                  Close Modal
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
} 