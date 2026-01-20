import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { Button } from '@/components/common';
import './PasswordScreen.css';

export const PasswordScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'User';
  const [password, setPassword] = useState('');
  const [passwordDots, setPasswordDots] = useState(0);

  // Get user name from email (first part before @)
  const userName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);

  useEffect(() => {
    setPasswordDots(password.length);
  }, [password]);

  const handleSubmit = () => {
    if (!password) {
      alert('Please enter your password');
      return;
    }

    console.log('Login with:', { email, password });
    navigate('/onboarding');
  };

  const handleNotYou = () => {
    navigate('/login');
  };

  return (
    <div className="password-screen">
      <div className="password-screen__content">
        
        {/* Profile Section */}
        <div className="password-screen__profile animate-fade-in">
          <div className="profile-picture">
            {/* Default avatar with pink background */}
            <div className="profile-avatar">
              <span>{userName.charAt(0)}</span>
            </div>
          </div>
          <h1 className="profile-greeting">Hello, {userName}!!</h1>
          <p className="profile-instruction">Type your password</p>
          
          {/* Password Dots Indicator */}
          <div className="password-dots">
            {[...Array(8)].map((_, index) => (
              <div 
                key={index} 
                className={`password-dot ${index < passwordDots ? 'password-dot--filled' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Hidden Password Input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input-hidden"
          autoFocus
          maxLength={8}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />

        {/* Actions */}
        <div className="password-screen__actions">
          <button 
            className="password-screen__not-you"
            onClick={handleNotYou}
          >
            Not you? 
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" fill="#0066FF"/>
              <path d="M13 10L7 10M10 7L13 10L10 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="password-screen__indicator">
        <div className="indicator-bar"></div>
        <div className="indicator-bar"></div>
        <div className="indicator-bar"></div>
        <div className="indicator-bar indicator-bar--active"></div>
      </div>
    </div>
  );
};