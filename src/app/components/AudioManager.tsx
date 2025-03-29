"use client";

import { createContext, useContext, useEffect, useRef, useState } from 'react';

// Define types for audio context
type AudioContextType = {
  isMuted: boolean;
  isPlaying: boolean;
  toggleMute: () => void;
  playEasterEggSound: () => Promise<void>;
  stopEasterEggSound: (fadeOut?: boolean) => void;
  resumeBackgroundMusic: () => void;
};

// Create context with default values
const AudioContext = createContext<AudioContextType>({
  isMuted: false,
  isPlaying: false,
  toggleMute: () => {},
  playEasterEggSound: async () => {},
  stopEasterEggSound: () => {},
  resumeBackgroundMusic: () => {},
});

// Custom hook for using audio context
export const useAudio = () => useContext(AudioContext);

export default function AudioManager({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true); // Start muted by default
  const [isPlaying, setIsPlaying] = useState(false);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const easterEggSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio on client side
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Create background music element
      backgroundMusicRef.current = new Audio('/sounds/lofi.mp3');
      backgroundMusicRef.current.loop = true; // Ensure music loops continuously
      backgroundMusicRef.current.volume = 0.5;
      
      // Create easter egg sound element
      easterEggSoundRef.current = new Audio('/sounds/chicks_cheeps.mp3');
      easterEggSoundRef.current.loop = false; // Easter egg sound should not loop
      
      // Preload audio
      backgroundMusicRef.current.load();
      easterEggSoundRef.current.load();
      
      // Setup event listeners
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.addEventListener('playing', () => setIsPlaying(true));
        backgroundMusicRef.current.addEventListener('pause', () => setIsPlaying(false));
        // Since we're looping, we shouldn't need this 'ended' event, but keeping it for safety
        backgroundMusicRef.current.addEventListener('ended', () => {
          console.log('Background music ended but should loop automatically');
          // As a fallback, restart the track if loop property somehow fails
          if (backgroundMusicRef.current && !isMuted) {
            backgroundMusicRef.current.currentTime = 0;
            backgroundMusicRef.current.play().catch(e => console.error('Fallback play failed:', e));
          }
        });
      }
      
      // Try to play background music (might be blocked by browser)
      if (!isMuted) {
        const playPromise = backgroundMusicRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.log("Auto-play prevented. User interaction needed to start audio:", e);
            setIsMuted(true);
          });
        }
      }
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
    
    // Cleanup on unmount
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.removeEventListener('playing', () => setIsPlaying(true));
        backgroundMusicRef.current.removeEventListener('pause', () => setIsPlaying(false));
        backgroundMusicRef.current.removeEventListener('ended', () => {});
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
      if (easterEggSoundRef.current) {
        easterEggSoundRef.current.pause();
        easterEggSoundRef.current = null;
      }
    };
  }, []);
  
  // Update audio elements when mute state changes
  useEffect(() => {
    if (!backgroundMusicRef.current) return;
    
    if (isMuted) {
      backgroundMusicRef.current.pause();
    } else {
      // Double-check the loop property is still true before playing
      if (backgroundMusicRef.current.loop === false) {
        backgroundMusicRef.current.loop = true;
      }
      
      const playPromise = backgroundMusicRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.error("Background music play failed:", e);
        });
      }
    }
  }, [isMuted]);
  
  // Toggle mute function
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };
  
  // Play easter egg sound and pause background music
  const playEasterEggSound = async (): Promise<void> => {
    if (isMuted || !easterEggSoundRef.current) return Promise.resolve();
    
    // Pause background music first
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
    }
    
    // Play easter egg sound
    try {
      easterEggSoundRef.current.currentTime = 0;
      const playPromise = easterEggSoundRef.current.play();
      
      if (playPromise !== undefined) {
        return playPromise.catch(e => {
          console.error("Easter egg sound play failed:", e);
        });
      }
    } catch (e) {
      console.error("Easter egg sound error:", e);
    }
    
    return Promise.resolve();
  };
  
  // Stop easter egg sound with optional fade out
  const stopEasterEggSound = (fadeOut: boolean = true) => {
    if (!easterEggSoundRef.current) return;
    
    if (fadeOut) {
      // Fade out over 1 second
      const fadeInterval = setInterval(() => {
        if (!easterEggSoundRef.current) {
          clearInterval(fadeInterval);
          return;
        }
        
        if (easterEggSoundRef.current.volume > 0.05) {
          easterEggSoundRef.current.volume -= 0.05;
        } else {
          easterEggSoundRef.current.pause();
          easterEggSoundRef.current.volume = 1.0; // Reset volume for next time
          clearInterval(fadeInterval);
          
          // Resume background music after fade out
          resumeBackgroundMusic();
        }
      }, 50);
    } else {
      // Stop immediately
      easterEggSoundRef.current.pause();
      easterEggSoundRef.current.currentTime = 0;
      
      // Resume background music
      resumeBackgroundMusic();
    }
  };
  
  // Resume background music
  const resumeBackgroundMusic = () => {
    if (isMuted || !backgroundMusicRef.current) return;
    
    try {
      const playPromise = backgroundMusicRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.error("Background music resume failed:", e);
        });
      }
    } catch (e) {
      console.error("Background music resume error:", e);
    }
  };
  
  return (
    <AudioContext.Provider
      value={{
        isMuted,
        isPlaying,
        toggleMute,
        playEasterEggSound,
        stopEasterEggSound,
        resumeBackgroundMusic,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
} 