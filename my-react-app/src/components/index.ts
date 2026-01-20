import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageLoading = (duration: number = 600) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Start loading
    setIsLoading(true);

    // Stop loading after duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [location.pathname, duration]);

  return isLoading;
};