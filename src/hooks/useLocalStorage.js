import { useState, useCallback } from 'react';

/**
 * Custom Hook zur komfortablen und fehlertoleranten Speicherung im localStorage.
 * @param {string} key - Der Schlüssel im localStorage
 * @param {*} initialValue - Der Standardwert, falls noch nichts gespeichert ist
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return typeof initialValue === 'function' ? initialValue() : initialValue;
      }
      return JSON.parse(item);
    } catch (error) {
      console.warn(`Fehler beim Lesen von localStorage-Key "${key}":`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(prev => {
        const valueToStore = typeof value === 'function' ? value(prev) : value;
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch (e) {
            console.error(`Fehler beim Schreiben von localStorage-Key "${key}":`, e);
          }
        }
        return valueToStore;
      });
    } catch (error) {
      console.error(`Fehler beim Setzen von "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}
