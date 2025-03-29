"use client";

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useAudio } from './AudioManager';

// You can change this to any sequence you like
const SECRET_CODE = 'chick';

export default function EasterEgg() {
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const { playEasterEggSound, stopEasterEggSound } = useAudio();
  
  // Define triggerEasterEgg before it's used in useEffect
  const triggerEasterEgg = useCallback(() => {
    setShowEasterEgg(true);
    
    // Create explosive confetti
    launchConfetti();
    
    // Try to play chicken sound using our audio manager
    // Wrapped in try/catch to prevent any audio errors from breaking the Easter egg
    try {
      playEasterEggSound().catch(() => {
        // Silent catch - don't let audio errors affect the visual experience
      });
    } catch (e) {
      // Silent catch - just ensure the Easter egg animation still works
      console.log("Audio playback error suppressed");
    }
    
    // Hide after animation completes and fade out sound
    setTimeout(() => {
      try {
        stopEasterEggSound(true); // true for fade out
      } catch (e) {
        // Ensure animation cleanup happens even if audio fails
      }
      setShowEasterEgg(false);
    }, 4500);
  }, [playEasterEggSound, stopEasterEggSound]);
  
  // Define launchConfetti function before it's used in triggerEasterEgg
  const launchConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    
    const colors = ['#FFC700', '#FF0000', '#FF7700', '#FFFF00'];
    
    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: 2
      });
      
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: 2
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
    
    // Add some confetti from the top for extra effect
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0, x: 0.5 },
        colors: colors,
        startVelocity: 30
      });
    }, 1000);
  };
  
  useEffect(() => {
    // Check if the sequence matches our secret code
    const checkSecretCode = () => {
      const pressed = keysPressed.join('').toLowerCase();
      
      // Keep only the last 5 characters to avoid buffer overflow
      if (keysPressed.length > 10) {
        setKeysPressed(keys => keys.slice(-10));
      }
      
      const isMatch = SECRET_CODE.startsWith(pressed);
      
      if (!isMatch) {
        setKeysPressed([]);
        return;
      }
      
      if (pressed === SECRET_CODE) {
        triggerEasterEgg();
        setKeysPressed([]);
      }
    };
    
    checkSecretCode();
  }, [keysPressed, triggerEasterEgg]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only track alphabetic keys
      if (/^[a-z]$/i.test(e.key)) {
        setKeysPressed(prev => [...prev, e.key]);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <AnimatePresence>
      {showEasterEgg && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-yellow-100 to-yellow-300 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Background Elements */}
          <motion.div 
            className="absolute inset-0 overflow-hidden" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Sun */}
            <motion.div 
              className="absolute top-10 right-10 w-32 h-32 bg-yellow-400 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360],
                transition: {
                  scale: { repeat: Infinity, duration: 2, type: "tween" },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }
              }}
            >
              {/* Sun rays */}
              {[...Array(8)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute top-1/2 left-1/2 w-4 h-16 bg-yellow-400 -translate-x-1/2 -translate-y-1/2 origin-center"
                  style={{ rotate: `${i * 45}deg`, translateY: -40 }}
                  animate={{
                    scaleY: [1, 1.2, 1],
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      delay: i * 0.1,
                      type: "tween" // Explicitly use tween
                    }
                  }}
                />
              ))}
            </motion.div>
            
            {/* Clouds */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full opacity-80"
                style={{
                  width: 100 + Math.random() * 100,
                  height: 50 + Math.random() * 30,
                  top: Math.random() * 200,
                  left: -200 + (i * 200)
                }}
                animate={{
                  x: ["0vw", "100vw"],
                  transition: {
                    duration: 15 + Math.random() * 10,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "linear"
                  }
                }}
              />
            ))}
          </motion.div>
          
          {/* Main Chick Animation */}
          <motion.div
            className="relative"
            initial={{ scale: 0, y: 100 }}
            animate={{ 
              scale: 1,
              y: 0 
            }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 10,
              duration: 1
            }}
          >
            {/* Shadow */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/20 rounded-full"
              animate={{
                width: [180, 150, 180],
                opacity: [0.2, 0.3, 0.2],
                transition: {
                  repeat: Infinity,
                  duration: 1,
                  type: "tween" // Use tween type for multi-keyframe animations
                }
              }}
            />
            
            {/* Chick Body */}
            <motion.div 
              className="relative z-10 w-72 h-72 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
                y: [0, -10, 0],
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  type: "tween" // Use tween type for multi-keyframe animations
                }
              }}
            >
              {/* Eyes */}
              <div className="absolute top-[30%] left-[30%] w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-black rounded-full"></div>
              </div>
              <div className="absolute top-[30%] right-[30%] w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-black rounded-full"></div>
              </div>
              
              {/* Beak */}
              <motion.div 
                className="absolute top-[40%] left-1/2 -translate-x-1/2 w-16 h-12 bg-orange-500 rounded-b-full"
                animate={{
                  scaleY: [1, 0.7, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 0.5,
                    repeatDelay: 2,
                    type: "tween" // Use tween type for multi-keyframe animations
                  }
                }}
              ></motion.div>
              
              {/* Wings */}
              <motion.div 
                className="absolute -left-10 top-1/3 w-24 h-36 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-l-full"
                animate={{
                  rotate: [-5, 20, -5],
                  x: [0, -5, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.2,
                    type: "tween" // Use tween for multi-keyframe
                  }
                }}
                style={{ transformOrigin: "right center" }}
              ></motion.div>
              <motion.div 
                className="absolute -right-10 top-1/3 w-24 h-36 bg-gradient-to-l from-yellow-200 to-yellow-300 rounded-r-full"
                animate={{
                  rotate: [5, -20, 5],
                  x: [0, 5, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.2,
                    type: "tween" // Use tween for multi-keyframe
                  }
                }}
                style={{ transformOrigin: "left center" }}
              ></motion.div>
              
              {/* Feet */}
              <motion.div
                className="absolute bottom-2 left-1/3 w-10 h-14 bg-orange-500 rounded-b-lg"
                animate={{
                  rotate: [-5, 10, -5],
                  y: [0, -5, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 0.8,
                    repeatDelay: 0.4,
                    type: "tween" // Use tween for multi-keyframe
                  }
                }}
                style={{ transformOrigin: "top center" }}
              ></motion.div>
              <motion.div
                className="absolute bottom-2 right-1/3 w-10 h-14 bg-orange-500 rounded-b-lg"
                animate={{
                  rotate: [5, -10, 5],
                  y: [0, -5, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 0.8,
                    repeatDelay: 0.2,
                    type: "tween" // Use tween for multi-keyframe
                  }
                }}
                style={{ transformOrigin: "top center" }}
              ></motion.div>
              
              {/* Crest/Comb */}
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 flex"
                animate={{
                  y: [0, -2, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 0.6,
                    type: "tween" // Use tween for multi-keyframe
                  }
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-10 bg-red-500 rounded-t-full mx-0.5"
                    style={{
                      height: 20 + Math.abs(i - 2) * 4,
                      transformOrigin: "bottom"
                    }}
                    animate={{
                      scaleY: [1, 1.1, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 0.5,
                        delay: i * 0.1,
                        type: "tween" // Use tween for multi-keyframe
                      }
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Text Effects */}
          <motion.h1
            className="absolute bottom-40 text-6xl font-bold text-orange-600 pointer-events-none text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.5, 
              duration: 0.8, 
              type: "spring" 
            }}
          >
            SURPRISE CHICK!
          </motion.h1>
          
          {/* Apply a separate scale effect after the initial animation */}
          <motion.div
            className="absolute bottom-40 w-full flex justify-center pointer-events-none"
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            transition={{
              repeat: 1,
              repeatType: "reverse",
              duration: 0.3,
              delay: 0.8,
              type: "tween"
            }}
          >
            <div className="text-6xl font-bold text-transparent">SURPRISE CHICK!</div>
          </motion.div>
          
          <motion.p
            className="absolute bottom-20 text-xl font-semibold text-orange-700 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 1, duration: 0.5 }
            }}
          >
            You found the Easter Egg! 🐣
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 