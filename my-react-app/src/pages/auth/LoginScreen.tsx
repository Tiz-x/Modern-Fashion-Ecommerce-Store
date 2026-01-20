import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common';
import './LoginScreen.css';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleNext = () => {
    if (!email.trim()) {
      alert('Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Navigate to password screen (we'll create this)
    navigate('/login/password', { state: { email } });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="login-screen">
      <div className="login-screen__content">
        
        {/* Header */}
        <div className="login-screen__header animate-fade-in">
          <h1 className="login-screen__title">Login</h1>
          <p className="login-screen__subtitle">Good to see you back! ❤️</p>
        </div>

        {/* Form */}
        <div className="login-screen__form animate-fade-in animation-delay-100">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="login-screen__actions animate-fade-in-up animation-delay-200">
          <Button 
            variant="primary" 
            size="lg" 
            fullWidth
            onClick={handleNext}
          >
            Next
          </Button>

          <button 
            className="login-screen__cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="login-screen__indicator">
        <div className="indicator-bar"></div>
        <div className="indicator-bar"></div>
        <div className="indicator-bar indicator-bar--active"></div>
      </div>
    </div>
  );
};