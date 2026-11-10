import { useState, useEffect } from 'react';

// Added the third parameter: skipSave
export function useLocalStorage(key, initialValue, skipSave = false) {
  const [value, setValue] = useState(() => {
    try {
      if (skipSave) return initialValue; // Guests don't read from storage
      
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error("Error parsing localStorage key:", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (skipSave) return; // Guests don't save to storage

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  }, [key, value, skipSave]);

  return [value, setValue];
}