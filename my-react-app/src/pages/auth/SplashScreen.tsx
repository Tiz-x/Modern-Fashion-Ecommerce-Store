// import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common';
import './SplashScreen.css';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="splash-screen">
      <div className="splash-screen__content">
        
        {/* Logo/Icon */}
        <div className="splash-screen__logo animate-fade-in">
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 120 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="splash-screen__icon"
          >
            {/* Shopping bag icon */}
            <rect x="25" y="35" width="70" height="75" rx="5" stroke="#0066FF" strokeWidth="4" fill="#E6F0FF"/>
            <path 
              d="M 40 35 C 40 25 50 15 60 15 C 70 15 80 25 80 35" 
              stroke="#0066FF" 
              strokeWidth="4" 
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="45" cy="60" r="3" fill="#0066FF"/>
            <circle cx="75" cy="60" r="3" fill="#0066FF"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="splash-screen__title animate-fade-in animation-delay-100">
          Shoppe
        </h1>

        {/* Tagline */}
        <p className="splash-screen__tagline animate-fade-in animation-delay-200">
          Beautiful eCommerce UI Kit<br />
          for your online store
        </p>

        {/* CTA Button */}
        <div className="splash-screen__actions animate-fade-in-up animation-delay-300">
          <Button 
            variant="primary" 
            size="lg" 
            fullWidth
            onClick={handleGetStarted}
          >
            Let's get started
          </Button>

          {/* Login Link */}
          <button 
            className="splash-screen__login-link"
            onClick={handleLogin}
          >
            I already have an account
          </button>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="splash-screen__indicator animate-fade-in animation-delay-400">
        <div className="indicator-bar indicator-bar--active"></div>
      </div>
    </div>
  );
};