import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // Retrieve stored value or use initialValue
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  // Update localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage key:", key, error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
