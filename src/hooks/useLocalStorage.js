// useState - to hold value in memory. useEffect - to sync to localStorage.
import { useState, useEffect } from 'react';

// Custom hook: same API as useState but survives refresh
export function useLocalStorage(key, initialValue) {
  // Lazy initializer - runs only once on mount
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      // If found, parse it; otherwise use the initial value
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch (error) {
      // If JSON is corrupt, log and fall back
      console.error("Error parsing localStorage key:", key, error);
      return initialValue;
    }
  });

  // Whenever value changes, write it back to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  }, [key, value]); // Re-run when key or value changes

  // Return same [value, setter] shape as useState
  return [value, setValue];
}

// ============================================================
// SUMMARY
// ============================================================
// A custom hook that works like useState but remembers the value
// after a page refresh (uses localStorage + JSON.stringify/parse).
// Usage: const [cart, setCart] = useLocalStorage('campus-cart', []);
// Think of it as a state that has a memory.
// ============================================================