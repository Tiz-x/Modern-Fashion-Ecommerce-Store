import React, { useState, useEffect } from 'react';

interface MobileOnlyProps {
  children: React.ReactNode;
}

export const MobileOnly: React.FC<MobileOnlyProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      // Mobile ONLY: max width 480px (smartphones only, no tablets)
      setIsMobile(window.innerWidth <= 480);
    };

    // Check on mount
    checkScreenSize();

    // Check on resize
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isMobile) {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        color: 'white',
        fontSize: '24px',
        textAlign: 'center',
        padding: '20px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        📱 Please open on mobile
      </div>
    );
  }

  return <>{children}</>;
};