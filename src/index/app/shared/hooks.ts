import React from 'react'
import { useLocation } from 'react-router-dom'

export function useHtmlId() {
  const id = React.useMemo(() => Math.random().toString(16).substr(2), [])

  return (name: string) => name + '-' + id
}


export function useQuery() {
  const location = useLocation()
  const params = (
    // Prefer pulling the parameters from the hash
    location.hash
    // but fal back to allowing search for backward compatilibity. Search
    // parameters are sent to the server, so when arriving by QR code the server
    // can see the first part of the secret.
    || location.search
  )

  return new URLSearchParams(
    params.replace(/^#/, '?')
  );
}


// Based on the hook at https://usehooks.com/useLocalStorage/
export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
