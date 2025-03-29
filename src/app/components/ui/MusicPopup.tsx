"use client";

import { useAudio } from '../AudioManager';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function MusicPopup() {
  const { isPlaying, isMuted, toggleMute } = useAudio();
  const [showPopup, setShowPopup] = useState(false);
  const [trackInfo, setTrackInfo] = useState({
    title: "Chill Lofi Beats",
    artist: "Next.js Twilight",
    duration: "∞",
  });

  // Track current beat for animation
  const [beat, setBeat] = useState(0);
  
  // Show popup when music starts playing
  useEffect(() => {
    if (isPlaying && !isMuted) {
      setShowPopup(true);
      
      // Hide popup after 8 seconds
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    } else {
      setShowPopup(false);
    }
  }, [isPlaying, isMuted]);

  // Create beat animation
  useEffect(() => {
    if (!isPlaying || isMuted) return;

    const interval = setInterval(() => {
      setBeat(prev => (prev + 1) % 4);
    }, 600); // 100 BPM
    
    return () => clearInterval(interval);
  }, [isPlaying, isMuted]);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="fixed bottom-24 right-8 z-40 bg-[rgb(var(--card))] shadow-lg rounded-lg border border-[rgb(var(--border))] overflow-hidden"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {/* Purple gradient top bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-pink-500" />
          
          <div className="p-4 flex items-center space-x-4">
            {/* Vinyl Album Cover Animation */}
            <motion.div 
              className="h-14 w-14 rounded-md bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 overflow-hidden flex items-center justify-center shadow-inner"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear"
              }}
              style={{
                backgroundImage: "radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.07) 31%, rgba(255,255,255,0.07) 32%, transparent 33%, transparent 50%, rgba(255,255,255,0.05) 51%, rgba(255,255,255,0.05) 52%, transparent 53%)"
              }}
            >
              <div className="w-3 h-3 bg-[rgb(var(--background))] rounded-full" />
            </motion.div>
            
            <div className="flex-1 flex flex-col min-w-32">
              <p className="font-medium truncate">{trackInfo.title}</p>
              <p className="text-xs text-[rgb(var(--muted-foreground))] truncate">{trackInfo.artist}</p>
              
              {/* Progress Dots */}
              <div className="mt-2 flex items-center space-x-1">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i === beat ? 'bg-[rgb(var(--primary))]' : 'bg-[rgb(var(--muted))]'
                    }`}
                    animate={i === beat ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  />
                ))}
                <div className="text-xs text-[rgb(var(--muted-foreground))] ml-2 flex items-center">
                  {/* Infinity loop symbol */}
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg"
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="mr-1"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <path d="M18.1784 8C23.2784 8 23.2784 16 18.1784 16C13.0784 16 10.9784 8 5.87842 8C0.778418 8 0.778418 16 5.87842 16C10.9784 16 13.0784 8 18.1784 8Z" />
                  </motion.svg>
                  Looping
                </div>
              </div>
            </div>
            
            {/* Animated Equalizer */}
            <div className="relative h-10 w-6 flex items-end justify-center space-x-px">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm"
                  animate={{
                    height: [
                      Math.random() * 8 + 4,
                      Math.random() * 16 + 8,
                      Math.random() * 24 + 4,
                      Math.random() * 12 + 6,
                    ],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            
            {/* Mute/Unmute Button */}
            <motion.button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-[rgb(var(--muted))] transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 