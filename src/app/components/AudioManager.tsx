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
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);

  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const easterEggSoundRef = useRef<HTMLAudioElement | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      backgroundMusicRef.current = new Audio('/sounds/lofi.mp3');
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.volume = 0.5;

      easterEggSoundRef.current = new Audio('/sounds/chicks_cheeps.mp3');
      easterEggSoundRef.current.loop = false;

      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;

      if (backgroundMusicRef.current && analyserRef.current && audioContextRef.current) {
        sourceNodeRef.current = audioContextRef.current.createMediaElementSource(backgroundMusicRef.current);
        sourceNodeRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }

      backgroundMusicRef.current.load();
      easterEggSoundRef.current.load();

      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.addEventListener('playing', () => {
          setIsPlaying(true);
          startVisualization();
        });

        backgroundMusicRef.current.addEventListener('pause', () => {
          setIsPlaying(false);
          stopVisualization();
        });

        backgroundMusicRef.current.addEventListener('ended', () => {
          if (backgroundMusicRef.current && !isMuted) {
            backgroundMusicRef.current.currentTime = 0;
            backgroundMusicRef.current.play().catch(e => console.error('Fallback play failed:', e));
          }
        });
      }

      setTimeout(() => {
        if (backgroundMusicRef.current) {
          if (audioContextRef.current?.state === 'suspended') {
            audioContextRef.current.resume().catch(e => {
              console.log("Audio context resume failed:", e);
            });
          }

          const playPromise = backgroundMusicRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(e => {
              if (e.name === 'NotAllowedError') {
                console.log("Auto-play prevented. User interaction needed to start audio.");
                setIsMuted(true);
              } else if (e.name !== 'AbortError') {
                console.log("Audio playback error:", e);
                setIsMuted(true);
              }
            });
          }
        }
      }, 100);

      const attemptPlayOnInteraction = () => {
        if (backgroundMusicRef.current && isMuted) {
          setIsMuted(false);
          backgroundMusicRef.current.play().catch(e => {
            console.error("Play on interaction failed:", e);
          });
          document.removeEventListener('click', attemptPlayOnInteraction);
          document.removeEventListener('keydown', attemptPlayOnInteraction);
          document.removeEventListener('touchstart', attemptPlayOnInteraction);
        }
      };

      document.addEventListener('click', attemptPlayOnInteraction);
      document.addEventListener('keydown', attemptPlayOnInteraction);
      document.addEventListener('touchstart', attemptPlayOnInteraction);

    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }

    return () => {
      stopVisualization();

      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }

      if (easterEggSoundRef.current) {
        easterEggSoundRef.current.pause();
        easterEggSoundRef.current = null;
      }

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

      document.removeEventListener('click', () => {});
      document.removeEventListener('keydown', () => {});
      document.removeEventListener('touchstart', () => {});
    };
  }, []);

  const startVisualization = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateVisualization = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArray);
      setAudioData(new Uint8Array(dataArray));

      animationFrameRef.current = requestAnimationFrame(updateVisualization);
    };

    updateVisualization();
  };

  const stopVisualization = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setAudioData(null);
  };

  useEffect(() => {
    if (!backgroundMusicRef.current) return;

    if (isMuted) {
      backgroundMusicRef.current.pause();
    } else {
      if (backgroundMusicRef.current.loop === false) {
        backgroundMusicRef.current.loop = true;
      }

      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const playPromise = backgroundMusicRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          if (e.name !== 'AbortError') {
            console.error("Background music play failed:", e);
          }
        });
      }
    }
  }, [isMuted]);

  const toggleMute = () => {
    document.dispatchEvent(new CustomEvent('audio-mute-toggled'));
    setIsMuted(prev => !prev);
  };

  const playEasterEggSound = async (): Promise<void> => {
    if (isMuted || !easterEggSoundRef.current) return Promise.resolve();

    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
    }

    try {
      easterEggSoundRef.current.currentTime = 0;
      const playPromise = easterEggSoundRef.current.play();

      if (playPromise !== undefined) {
        return playPromise.catch(e => {
          if (e.name !== 'AbortError') {
            console.error("Easter egg sound play failed:", e);
          }
        });
      }
    } catch (e) {
      if (e instanceof Error && e.name !== 'AbortError') {
        console.error("Easter egg sound error:", e);
      }
    }

    return Promise.resolve();
  };

  const stopEasterEggSound = (fadeOut: boolean = true) => {
    if (!easterEggSoundRef.current) return;

    if (fadeOut) {
      const fadeInterval = setInterval(() => {
        if (!easterEggSoundRef.current) {
          clearInterval(fadeInterval);
          return;
        }

        if (easterEggSoundRef.current.volume > 0.05) {
          easterEggSoundRef.current.volume -= 0.05;
        } else {
          easterEggSoundRef.current.pause();
          easterEggSoundRef.current.volume = 1.0;
          clearInterval(fadeInterval);
          resumeBackgroundMusic();
        }
      }, 50);
    } else {
      easterEggSoundRef.current.pause();
      easterEggSoundRef.current.currentTime = 0;
      resumeBackgroundMusic();
    }
  };

  const resumeBackgroundMusic = () => {
    if (isMuted || !backgroundMusicRef.current) return;

    try {
      const playPromise = backgroundMusicRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          if (e.name !== 'AbortError') {
            console.error("Background music resume failed:", e);
          }
        });
      }
    } catch (e) {
      if (e instanceof Error && e.name !== 'AbortError') {
        console.error("Background music resume error:", e);
      }
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
