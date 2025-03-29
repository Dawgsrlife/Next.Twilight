"use client";

import { useAudio } from '../AudioManager';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { popupStack } from '../HotKeys';

// Create custom events for popup state management
export const musicPopupStateEvent = new CustomEvent('musicPopupStateChanged', { detail: false });
export const musicPopupClosedEvent = new CustomEvent('musicPopupClosed');
export const requestCloseAllPopupsEvent = new CustomEvent('requestCloseAllPopups');

// Set a global variable to track if this is the first render
let isFirstRender = true;

export default function MusicPopup() {
  const { isPlaying, isMuted, toggleMute, togglePlayPause, audioData } = useAudio();
  // Start with the popup open by default
  const [showPopup, setShowPopup] = useState(true);
  const [autoHide, setAutoHide] = useState(true);
  const [muteToggleDetected, setMuteToggleDetected] = useState(false);
  const [playPauseToggleDetected, setPlayPauseToggleDetected] = useState(false);
  
  const trackInfo = {
    title: "Chill Lofi Beats",
    artist: "Next.js Twilight",
    duration: "∞",
  };

  // Track current beat for animation
  const [beat, setBeat] = useState(0);
  
  // Announce initial state to all components
  useEffect(() => {
    if (isFirstRender) {
      // Add to popup stack on initial render
      if (!popupStack.includes('musicPlayer')) {
        popupStack.push('musicPlayer');
      }
      
      // Create a custom event with the initial state
      const initialStateEvent = new CustomEvent('musicPopupStateChanged', { detail: true });
      
      // Wait a bit to ensure other components have mounted
      setTimeout(() => {
        document.dispatchEvent(initialStateEvent);
      }, 100);
      
      // Set the flag to false so this only runs once
      isFirstRender = false;
      
      // Show the popup initially but don't auto-hide it
      // Hide it after 8 seconds on initial load only
      const timer = setTimeout(() => {
        setShowPopup(false);
        
        // Remove from popup stack when hidden
        const index = popupStack.indexOf('musicPlayer');
        if (index > -1) {
          popupStack.splice(index, 1);
        }
        
        // Notify other components
        document.dispatchEvent(new CustomEvent('musicPopupStateChanged', { detail: false }));
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Listen for mute toggle events
  useEffect(() => {
    // Create a listener that will be triggered when mute state changes
    const handleMuteChange = () => {
      setMuteToggleDetected(true);
      
      // Reset the flag after a short delay to allow for future detections
      setTimeout(() => {
        setMuteToggleDetected(false);
      }, 100);
    };
    
    // Listen for changes in the isMuted state
    document.addEventListener('audio-mute-toggled', handleMuteChange);
    
    return () => {
      document.removeEventListener('audio-mute-toggled', handleMuteChange);
    };
  }, []);

  // Listen for play/pause toggle events
  useEffect(() => {
    // Create a listener that will be triggered when play/pause state changes
    const handlePlayPauseChange = () => {
      setPlayPauseToggleDetected(true);
      
      // Reset the flag after a short delay to allow for future detections
      setTimeout(() => {
        setPlayPauseToggleDetected(false);
      }, 100);
    };
    
    // Listen for changes in the play/pause state
    document.addEventListener('audio-playpause-toggled', handlePlayPauseChange);
    
    return () => {
      document.removeEventListener('audio-playpause-toggled', handlePlayPauseChange);
    };
  }, []);
  
  // Show popup when music status changes, only for certain actions
  useEffect(() => {
    // Skip auto-show/hide for these conditions:
    // 1. If autoHide is disabled 
    // 2. If mute toggle was detected (ALT+M)
    // 3. If play/pause toggle was detected (spacebar)
    if (!autoHide || muteToggleDetected || playPauseToggleDetected) return;
    
    // For music player visibility, we ONLY want to show the popup when:
    // - The user clicks the music player button
    // - The user uses CTRL+J to toggle the player
    // - This is the initial page load
    
    // We specifically DON'T want the popup to appear when:
    // - The user presses ALT+M to mute/unmute
    // - The user presses spacebar to play/pause
  }, [isPlaying, isMuted, autoHide, muteToggleDetected, playPauseToggleDetected]);

  // Update the popup stack when music popup state changes
  const updateMusicPopupInStack = useCallback((isOpen: boolean) => {
    if (isOpen) {
      // Remove musicPlayer from stack if it's already there (to avoid duplicates)
      const index = popupStack.indexOf('musicPlayer');
      if (index > -1) {
        popupStack.splice(index, 1);
      }
      // Add to top of stack
      popupStack.push('musicPlayer');
    } else {
      const index = popupStack.indexOf('musicPlayer');
      if (index > -1) {
        popupStack.splice(index, 1);
      }
    }
  }, []);

  // Listen for toggle event from keyboard shortcut (CTRL+J)
  useEffect(() => {
    const handleToggleEvent = () => {
      // When explicitly toggling via CTRL+J, always show the popup
      if (!showPopup) {
        setShowPopup(true);
        
        // Update the popup stack
        if (!popupStack.includes('musicPlayer')) {
          popupStack.push('musicPlayer');
        }
        
        // Dispatch event to notify other components
        const event = new CustomEvent('musicPopupStateChanged', { detail: true });
        document.dispatchEvent(event);
      } else {
        // If already showing, hide it
        setShowPopup(false);
        
        // Update the popup stack
        const index = popupStack.indexOf('musicPlayer');
        if (index > -1) {
          popupStack.splice(index, 1);
        }
        
        // Dispatch event to notify other components
        const event = new CustomEvent('musicPopupStateChanged', { detail: false });
        document.dispatchEvent(event);
      }
    };
    
    document.addEventListener('toggleMusicPlayer', handleToggleEvent);
    return () => document.removeEventListener('toggleMusicPlayer', handleToggleEvent);
  }, [showPopup]);
  
  // Toggle popup visibility (for button click)
  const togglePopup = useCallback(() => {
    // For explicit toggle actions (button click), we want to show/hide
    const newState = !showPopup;
    setShowPopup(newState);
    setAutoHide(false); // Disable auto-hide when manually toggled
    
    // Dispatch event to notify other components
    const event = new CustomEvent('musicPopupStateChanged', { detail: newState });
    document.dispatchEvent(event);
    
    // Update the popup stack
    updateMusicPopupInStack(newState);
  }, [showPopup, updateMusicPopupInStack]);
  
  // Listen for Escape key to close popups
  useEffect(() => {
    const handleCloseAllPopups = () => {
      if (showPopup) {
        setShowPopup(false);
        document.dispatchEvent(musicPopupClosedEvent);
        updateMusicPopupInStack(false);
      }
    };
    
    document.addEventListener('requestCloseAllPopups', handleCloseAllPopups);
    
    return () => {
      document.removeEventListener('requestCloseAllPopups', handleCloseAllPopups);
    };
  }, [showPopup, updateMusicPopupInStack]);
  
  // Create beat animation
  useEffect(() => {
    if (!isPlaying || isMuted) return;

    const interval = setInterval(() => {
      setBeat(prev => (prev + 1) % 4);
    }, 600); // 100 BPM
    
    return () => clearInterval(interval);
  }, [isPlaying, isMuted]);

  // Process audio data for visualization
  const barHeights = useMemo(() => {
    if (!audioData || audioData.length === 0) {
      // Default animation when no audio data is available
      return [0.4, 0.6, 0.8].map(() => ({
        height: Math.random() * 20 + 5,
        value: 0
      }));
    }

    // Sample a few frequency bands for the visualization
    // Focus on lower and mid frequencies which are more prominent in lofi music
    const lowIdx = Math.floor(audioData.length * 0.1);  // Low frequencies
    const midIdx = Math.floor(audioData.length * 0.3);  // Mid frequencies
    const highIdx = Math.floor(audioData.length * 0.6); // Higher-mid frequencies

    return [
      {
        height: (audioData[lowIdx] / 255) * 24 + 4, // Scale to reasonable height
        value: audioData[lowIdx]
      },
      {
        height: (audioData[midIdx] / 255) * 24 + 4,
        value: audioData[midIdx]
      },
      {
        height: (audioData[highIdx] / 255) * 20 + 4,
        value: audioData[highIdx]
      }
    ];
  }, [audioData]);

  // Play/Pause Button 
  const handlePlayPauseClick = () => {
    // Directly trigger the togglePlayPause function from AudioManager
    // and let its implementation handle the state sync logic
    togglePlayPause();
  };
  
  // Mute/Unmute Button
  const handleMuteClick = () => {
    // Directly trigger the toggleMute function from AudioManager
    toggleMute();
  };
  
  // Fixed positions for popup and button
  const popupPosition = "bottom-24";
  const buttonPosition = "bottom-8";

  return (
    <>
      {/* Music Player Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className={`fixed right-24 z-40 bg-[rgb(var(--card))] shadow-lg rounded-lg border border-[rgb(var(--border))] overflow-hidden ${popupPosition}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            layout
          >
            {/* Purple gradient top bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-pink-500" />
            
            <div className="p-4 flex items-center space-x-4">
              {/* Vinyl Album Cover Animation */}
              <motion.div 
                className="h-14 w-14 rounded-md bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 overflow-hidden flex items-center justify-center shadow-inner"
                animate={{ rotate: isPlaying && !isMuted ? 360 : 0 }}
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
                <div className="flex justify-between items-center">
                  <p className="font-medium truncate">{trackInfo.title}</p>
                  
                  {/* Close button */}
                  <button 
                    onClick={() => {
                      setShowPopup(false);
                      document.dispatchEvent(new CustomEvent('musicPopupStateChanged', { detail: false }));
                      // Update popup stack
                      const index = popupStack.indexOf('musicPlayer');
                      if (index > -1) {
                        popupStack.splice(index, 1);
                      }
                    }}
                    className="p-1 -mr-2 -mt-1 rounded-md hover:bg-[rgb(var(--muted))] transition-colors"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-xs text-[rgb(var(--muted-foreground))] truncate">{trackInfo.artist}</p>
                
                {/* Status indicators */}
                <div className="mt-1 flex items-center justify-between">
                  {/* Play/Pause status */}
                  <span className="text-xs font-medium flex items-center">
                    <motion.span 
                      className={`inline-block w-2 h-2 rounded-full mr-1.5 ${isPlaying ? 'bg-green-500' : 'bg-yellow-500'}`}
                      animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {isPlaying ? 'Playing' : 'Paused'}
                  </span>
                  
                  {/* Muted status */}
                  <span className="text-xs font-medium flex items-center ml-2">
                    <motion.span 
                      className={`inline-block w-2 h-2 rounded-full mr-1.5 ${!isMuted ? 'bg-blue-500' : 'bg-red-500'}`}
                    />
                    {!isMuted ? 'Sound On' : 'Muted'}
                  </span>
                </div>
                
                <div className="mt-1 flex items-center justify-between">
                  {/* Keyboard hints */}
                  <span className="text-xs text-[rgb(var(--muted-foreground))]">
                    <kbd className="px-1 py-0.5 bg-[rgb(var(--muted))] rounded text-[10px] border border-[rgb(var(--border))]">Space</kbd> play/pause
                  </span>
                  <span className="text-xs text-[rgb(var(--muted-foreground))]">
                    <kbd className="px-1 py-0.5 bg-[rgb(var(--muted))] rounded text-[10px] border border-[rgb(var(--border))]">Alt+M</kbd> mute
                  </span>
                </div>
                
                {/* Progress Dots */}
                <div className="mt-2 flex items-center space-x-1">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div 
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        i === beat ? 'bg-[rgb(var(--primary))]' : 'bg-[rgb(var(--muted))]'
                      }`}
                      animate={i === beat && isPlaying && !isMuted ? { scale: [1, 1.5, 1] } : {}}
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
              
              {/* Live Audio Waveform Visualization */}
              <div className="relative h-10 w-8 flex items-end justify-center space-x-px">
                {barHeights.map((bar, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm"
                    style={{ 
                      height: `${bar.height}px`,
                      opacity: Math.max(0.4, bar.value / 255) // Ensure minimum visibility
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                ))}
              </div>
              
              {/* Playback Control Buttons */}
              <div className="flex flex-col space-y-2">
                {/* Mute/Unmute Button */}
                <motion.button
                  onClick={handleMuteClick}
                  className="p-2 rounded-full hover:bg-[rgb(var(--muted))] transition-colors"
                  whileTap={{ scale: 0.9 }}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-5 h-5"
                  >
                    {!isMuted ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
                    )}
                  </svg>
                </motion.button>
                
                {/* Play/Pause Button */}
                <motion.button
                  onClick={handlePlayPauseClick}
                  className="p-2 rounded-full hover:bg-[rgb(var(--muted))] transition-colors"
                  whileTap={{ scale: 0.9 }}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-5 h-5"
                  >
                    {!isPlaying ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                    )}
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Player Toggle Button */}
      {!showPopup && (
        <motion.button
          className={`fixed right-24 z-50 p-3 bg-[rgb(var(--card))] rounded-full shadow-md border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-colors ${buttonPosition}`}
          onClick={togglePopup}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          title="Show music player (CTRL+J)"
          layout
        >
          <motion.div className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 19a7 7 0 1 0 0-14"></path>
            </svg>
            {/* Show indicators for both playing and unmuted state */}
            <div className="absolute -top-1 -right-1 flex space-x-0.5">
              {isPlaying && (
                <motion.span 
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              {!isMuted && isPlaying && (
                <motion.span 
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
              )}
            </div>
          </motion.div>
        </motion.button>
      )}
    </>
  );
} 