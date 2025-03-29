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
  audioData: Uint8Array | null;
};

// Create context with default values
const AudioContext = createContext<AudioContextType>({
  isMuted: false,
  isPlaying: false,
  toggleMute: () => {},
  playEasterEggSound: async () => {},
  stopEasterEggSound: () => {},
  resumeBackgroundMusic: () => {},
  audioData: null,
});

// Custom event for audio mute toggle
export const audioMuteToggledEvent = new CustomEvent('audio-mute-toggled');

// Custom hook for using audio context
export const useAudio = () => useContext(AudioContext);

export default function AudioManager({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false); // Start unmuted by default
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const easterEggSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // Web Audio API elements
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
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
      
      // Initialize Web Audio API for visualization
      audioContextRef.current = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64; // Small FFT size for performance
      
      // Connect audio element to analyzer
      if (backgroundMusicRef.current && analyserRef.current && audioContextRef.current) {
        sourceNodeRef.current = audioContextRef.current.createMediaElementSource(backgroundMusicRef.current);
        sourceNodeRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }
      
      // Preload audio
      backgroundMusicRef.current.load();
      easterEggSoundRef.current.load();
      
      // Setup event listeners
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.addEventListener('playing', () => {
          setIsPlaying(true);
          startVisualization();
        });
        
        backgroundMusicRef.current.addEventListener('pause', () => {
          setIsPlaying(false);
          stopVisualization();
        });
        
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
      
      // Adding a timeout to try to play audio after a brief delay
      // This increases the chances of autoplay working in some browsers
      setTimeout(() => {
        // Try to play background music when component mounts
        if (backgroundMusicRef.current) {
          // First try to resume the audio context if needed
          if (audioContextRef.current?.state === 'suspended') {
            audioContextRef.current.resume().catch(e => {
              console.log("Audio context resume failed:", e);
            });
          }
          
          // Then try to play the audio
          const playPromise = backgroundMusicRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(e => {
              console.log("Auto-play prevented. User interaction needed to start audio:", e);
              setIsMuted(true); // Set to muted if autoplay fails
            });
          }
        }
      }, 100);
      
      // Also attempt to play on user interaction with the page
      const attemptPlayOnInteraction = () => {
        if (backgroundMusicRef.current && isMuted) {
          setIsMuted(false);
          backgroundMusicRef.current.play().catch(e => {
            console.error("Play on interaction failed:", e);
          });
          // Remove the event listeners after first interaction
          document.removeEventListener('click', attemptPlayOnInteraction);
          document.removeEventListener('keydown', attemptPlayOnInteraction);
          document.removeEventListener('touchstart', attemptPlayOnInteraction);
        }
      };
      
      // Add event listeners for user interaction
      document.addEventListener('click', attemptPlayOnInteraction);
      document.addEventListener('keydown', attemptPlayOnInteraction);
      document.addEventListener('touchstart', attemptPlayOnInteraction);
      
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
    
    // Cleanup on unmount
    return () => {
      stopVisualization();
      
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
      
      // Clean up Web Audio API
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
      
      if (analyserRef.current) {
        analyserRef.current.disconnect();
        analyserRef.current = null;
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(e => console.error('Error closing audio context:', e));
        audioContextRef.current = null;
      }
      
      // Remove interaction event listeners
      document.removeEventListener('click', () => {});
      document.removeEventListener('keydown', () => {});
      document.removeEventListener('touchstart', () => {});
    };
  }, [isMuted]);  
  
  // Function to start audio visualization
  const startVisualization = () => {
    if (!analyserRef.current) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const updateVisualization = () => {
      if (!analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      setAudioData(new Uint8Array(dataArray)); // Create a copy to ensure React detects the change
      
      animationFrameRef.current = requestAnimationFrame(updateVisualization);
    };
    
    updateVisualization();
  };
  
  // Function to stop audio visualization
  const stopVisualization = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setAudioData(null);
  };
  
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
      
      // Resume audio context if suspended (browsers require user interaction)
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
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
    // Dispatch an event to notify that muting was toggled 
    // (so MusicPopup won't show itself when CTRL+M is used)
    document.dispatchEvent(new CustomEvent('audio-mute-toggled'));
    
    // Toggle the mute state
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
          // Don't treat aborted fetches as errors that need to be logged
          if (e.name !== 'AbortError') {
            console.error("Easter egg sound play failed:", e);
          }
        });
      }
    } catch (e) {
      // Check if this is an abort error
      if (e instanceof Error && e.name !== 'AbortError') {
        console.error("Easter egg sound error:", e);
      }
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
        audioData,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
} 