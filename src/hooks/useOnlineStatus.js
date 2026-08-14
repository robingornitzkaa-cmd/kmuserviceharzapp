import { useState, useEffect } from 'react';

/**
 * Custom Hook zur zuverlässigen Erkennung des Online/Offline-Status im Browser.
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(() => 
    typeof window !== 'undefined' ? window.navigator.onLine : true
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
