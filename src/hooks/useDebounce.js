import { useState, useEffect } from 'react';

/**
 * Custom Hook zur Verzögerung von schnellen Eingaben (Debouncing),
 * z. B. für Suchfelder oder Auto-Save-Aktionen.
 * @param {*} value - Der aktuelle Wert
 * @param {number} delay - Verzögerung in Millisekunden (Standard: 300ms)
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
