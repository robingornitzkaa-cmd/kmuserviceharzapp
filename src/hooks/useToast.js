import { useState, useCallback } from 'react';

/**
 * Custom Hook für ein flexibles Toast- und Notification-System.
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = { id, message, type, duration };

    setToasts(prev => [...prev.slice(-4), newToast]); // max 5 visible toasts

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, [removeToast]);

  const showToast = useCallback((message) => {
    return addToast(message, 'info', 3500);
  }, [addToast]);

  const showSuccess = useCallback((message) => {
    return addToast(message, 'success', 3500);
  }, [addToast]);

  const showError = useCallback((message) => {
    return addToast(message, 'error', 5000);
  }, [addToast]);

  const showWarning = useCallback((message) => {
    return addToast(message, 'warning', 4000);
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    showToast,
    showSuccess,
    showError,
    showWarning
  };
}
