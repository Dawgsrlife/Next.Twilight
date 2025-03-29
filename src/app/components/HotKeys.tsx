"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAudio } from './AudioManager';
import { requestCloseAllPopupsEvent } from './ui/MusicPopup';

// Custom event for toggling music player
export const toggleMusicPlayerEvent = new CustomEvent('toggleMusicPlayer');
// Custom event for tracking hotkeys panel state
export const hotkeysPanelStateEvent = new CustomEvent('hotkeysStateChanged', { detail: false });

// Create stack for tracking open popups
export const popupStack: string[] = [];

export default function HotKeys() {
  const { toggleTheme } = useTheme();
  const { toggleMute } = useAudio();
  const router = useRouter();
  const [showHotkeys, setShowHotkeys] = useState(false);
  const [musicPlayerOpen, setMusicPlayerOpen] = useState(true); // Default to true since MusicPopup starts open
  const [musicButtonVisible, setMusicButtonVisible] = useState(true);
  
  // Function to toggle music player via event
  const triggerMusicPlayerToggle = useCallback(() => {
    document.dispatchEvent(toggleMusicPlayerEvent);
  }, []);
  
  // Track popup states for layering
  useEffect(() => {
    // Initialize music player in the popup stack since it starts open
    if (!popupStack.includes('musicPlayer')) {
      popupStack.push('musicPlayer');
    }
    
    // Listen for music player state changes
    const handleMusicPlayerState = (e: Event) => {
      const customEvent = e as CustomEvent;
      setMusicPlayerOpen(customEvent.detail);
      
      if (customEvent.detail) {
        if (!popupStack.includes('musicPlayer')) {
          popupStack.push('musicPlayer');
        }
      } else {
        const index = popupStack.indexOf('musicPlayer');
        if (index > -1) {
          popupStack.splice(index, 1);
        }
      }
    };
    
    // Handle music player closed event
    const handleMusicPlayerClosed = () => {
      setMusicPlayerOpen(false);
      const index = popupStack.indexOf('musicPlayer');
      if (index > -1) {
        popupStack.splice(index, 1);
      }
    };
    
    // Check for music player button visibility
    const checkMusicButtonVisibility = () => {
      const musicButton = document.querySelector('[title^="Show music player"]');
      setMusicButtonVisible(!!musicButton);
    };
    
    // Check for hotkeys panel visibility
    const updateHotkeysInStack = (isOpen: boolean) => {
      if (isOpen) {
        if (!popupStack.includes('hotkeys')) {
          popupStack.push('hotkeys');
        }
      } else {
        const index = popupStack.indexOf('hotkeys');
        if (index > -1) {
          popupStack.splice(index, 1);
        }
      }
    };
    
    // Setup initial state
    updateHotkeysInStack(showHotkeys);
    checkMusicButtonVisibility();
    
    // Add event listeners
    document.addEventListener('musicPopupStateChanged', handleMusicPlayerState);
    document.addEventListener('musicPopupClosed', handleMusicPlayerClosed);
    
    // Set up a mutation observer to watch for music button presence
    const observer = new MutationObserver(() => {
      checkMusicButtonVisibility();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Cleanup
    return () => {
      document.removeEventListener('musicPopupStateChanged', handleMusicPlayerState);
      document.removeEventListener('musicPopupClosed', handleMusicPlayerClosed);
      observer.disconnect();
    };
  }, [showHotkeys]);
  
  // Toggle hotkeys panel
  const toggleHotkeys = useCallback(() => {
    const newState = !showHotkeys;
    setShowHotkeys(newState);
    
    // Create a new event with the current state
    const event = new CustomEvent('hotkeysStateChanged', { detail: newState });
    document.dispatchEvent(event);
    
    if (newState) {
      // Always ensure hotkeys is at the top of the stack when opened
      
      // Remove hotkeys from stack if it's already there (to avoid duplicates)
      const index = popupStack.indexOf('hotkeys');
      if (index > -1) {
        popupStack.splice(index, 1);
      }
      // Add to top of stack
      popupStack.push('hotkeys');
    } else {
      const index = popupStack.indexOf('hotkeys');
      if (index > -1) {
        popupStack.splice(index, 1);
      }
    }
  }, [showHotkeys]);
  
  // Hotkey mappings and descriptions
  const hotkeys = useMemo(() => [
    { key: "d", ctrlKey: true, description: "Toggle dark/light mode", action: toggleTheme },
    { key: "m", ctrlKey: true, description: "Toggle audio mute", action: toggleMute },
    { key: " ", ctrlKey: false, description: "Play/pause audio", action: toggleMute },
    { key: "j", ctrlKey: true, description: "Toggle music player", action: triggerMusicPlayerToggle },
    { key: "k", ctrlKey: true, description: "Toggle keyboard shortcuts", action: () => toggleHotkeys() },
    { key: "g", ctrlKey: true, description: "Open GitHub repository", action: () => window.open("https://github.com/Dawgsrlife/nextjs-typescript-starter", "_blank") },
    { key: "h", ctrlKey: true, description: "Open GitHub profile", action: () => window.open("https://github.com/Dawgsrlife", "_blank") },
    { key: "1", ctrlKey: true, description: "Go to Home page", action: () => router.push("/") },
    { key: "2", ctrlKey: true, description: "Go to TypeScript page", action: () => router.push("/typescript") },
    { key: "3", ctrlKey: true, description: "Go to Next.js page", action: () => router.push("/next-js") },
    { key: "4", ctrlKey: true, description: "Go to Tailwind CSS page", action: () => router.push("/tailwind") },
    { key: "5", ctrlKey: true, description: "Go to Framer Motion page", action: () => router.push("/framer-motion") },
    { key: "6", ctrlKey: true, description: "Go to Todo page", action: () => router.push("/todo") },
    { key: "7", ctrlKey: true, description: "Go to About page", action: () => router.push("/about") },
    { key: "/", ctrlKey: false, description: "Show/hide hotkey reference", action: () => toggleHotkeys() },
  ], [toggleTheme, toggleMute, router, toggleHotkeys, triggerMusicPlayerToggle]);

  // Close the top-most popup when Escape is pressed
  const closeTopPopup = () => {
    if (popupStack.length === 0) return;
    
    const topPopup = popupStack.pop();
    
    if (topPopup === 'hotkeys') {
      setShowHotkeys(false);
      document.dispatchEvent(new CustomEvent('hotkeysStateChanged', { detail: false }));
    } else if (topPopup === 'musicPlayer') {
      document.dispatchEvent(requestCloseAllPopupsEvent);
    }
  };

  // Set up event listeners for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger hotkeys when typing in input elements
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      // Handle Escape key for closing popups in stack order
      if (e.key === 'Escape') {
        e.preventDefault();
        closeTopPopup();
        return;
      }
      
      // Handle Space bar for play/pause
      if (e.key === ' ' && !e.ctrlKey && !e.metaKey) {
        // Only capture space if we're not in an interactive element
        const activeElement = document.activeElement;
        const isInteractive = 
          activeElement instanceof HTMLButtonElement || 
          activeElement instanceof HTMLAnchorElement ||
          activeElement instanceof HTMLTextAreaElement ||
          activeElement instanceof HTMLInputElement ||
          activeElement?.hasAttribute('role');
          
        if (!isInteractive) {
          e.preventDefault(); // Prevent page scroll on space
          toggleMute();
          return;
        }
      }
      
      // Toggle hotkey display with '/' or close with Escape key
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleHotkeys();
        return;
      }
      
      // Handle other hotkeys
      for (const hotkey of hotkeys) {
        if (e.key.toLowerCase() === hotkey.key.toLowerCase() && 
            ((hotkey.ctrlKey && (e.ctrlKey || e.metaKey)) || (!hotkey.ctrlKey && !e.ctrlKey && !e.metaKey))) {
          e.preventDefault();
          hotkey.action();
          return;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hotkeys, toggleTheme, toggleMute, router, toggleHotkeys]);

  // Calculate button and panel position based on music player state
  const buttonPosition = "right-8"; // Keep button position fixed
  
  // Panel positioning:
  // - When music player is open: position above music player (bottom-64)
  // - When music button is visible but player is closed: position above music button (bottom-24)
  // - Otherwise: position at standard location (bottom-8)
  const getPanelClassName = () => {
    if (musicPlayerOpen) {
      return "bottom-64 right-8"; // Above open music player
    } else if (musicButtonVisible && !musicPlayerOpen) {
      return "bottom-24 right-8"; // Above music toggle button
    } else {
      return "bottom-8 right-8"; // Standard position
    }
  };
  
  const panelClassName = getPanelClassName();

  return (
    <AnimatePresence>
      {showHotkeys && (
        <motion.div 
          className={`fixed z-50 w-80 bg-[rgb(var(--card))] shadow-lg rounded-lg border border-[rgb(var(--border))] ${panelClassName}`}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          layout
        >
          <div className="p-4 border-b border-[rgb(var(--border))] flex justify-between items-center">
            <h3 className="font-medium">Keyboard Shortcuts</h3>
            <button 
              onClick={toggleHotkeys}
              className="p-1 rounded-md hover:bg-[rgb(var(--muted))] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4 max-h-96 overflow-y-auto">
            <ul className="space-y-3">
              {hotkeys.map((hotkey, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex space-x-1 mr-3 mt-1">
                    {hotkey.ctrlKey && (
                      <kbd className="px-2 py-1 text-xs font-semibold bg-[rgb(var(--muted))] rounded-md border border-[rgb(var(--border))]">
                        CTRL
                      </kbd>
                    )}
                    {hotkey.ctrlKey && (
                      <span className="text-[rgb(var(--muted-foreground))] mx-1">+</span>
                    )}
                    <kbd className="px-2 py-1 text-xs font-semibold bg-[rgb(var(--muted))] rounded-md border border-[rgb(var(--border))]">
                      {hotkey.key === " " ? "SPACE" : hotkey.key.toUpperCase()}
                    </kbd>
                  </div>
                  <span className="text-sm">{hotkey.description}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-3 bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] text-xs rounded-b-lg">
            Press <kbd className="px-1 py-0.5 bg-[rgb(var(--background))] rounded border border-[rgb(var(--border))]">/</kbd> or <kbd className="px-1 py-0.5 bg-[rgb(var(--background))] rounded border border-[rgb(var(--border))]">CTRL+K</kbd> to toggle this panel
          </div>
        </motion.div>
      )}
      
      {!showHotkeys && (
        <motion.button
          className={`fixed bottom-8 z-50 p-3 bg-[rgb(var(--card))] rounded-full shadow-md border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-colors ${buttonPosition}`}
          onClick={toggleHotkeys}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          title="Show keyboard shortcuts"
          layout
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
            <path d="M6 8h4"></path>
            <path d="M14 8h4"></path>
            <path d="M8 12h8"></path>
            <path d="M10 16h4"></path>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
} 