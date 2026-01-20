import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common';
import './SignupScreen.css';

interface FormData {
  photo: File | null;
  photoPreview: string;
  email: string;
  password: string;
  countryCode: string;
  phone: string;
}

export const SignupScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    photo: null,
    photoPreview: '',
    email: '',
    password: '',
    countryCode: '🇬🇧',
    phone: ''
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: file,
          photoPreview: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDone = () => {
    if (!formData.email.trim()) {
      alert('Please enter your email');
      return;
    }

    if (!formData.password) {
      alert('Please enter a password');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    console.log('Signup data:', formData);
    navigate('/onboarding');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="signup-screen">
      <div className="signup-screen__content">
        
        {/* Header */}
        <div className="signup-screen__header animate-fade-in">
          <h1 className="signup-screen__title">Create<br/>Account</h1>
        </div>

        {/* Profile Photo */}
        <div className="signup-screen__photo animate-fade-in animation-delay-100">
          <input
            type="file"
            id="photo-upload"
            className="photo-upload__input"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <label htmlFor="photo-upload" className="photo-upload__label">
            {formData.photoPreview ? (
              <img 
                src={formData.photoPreview} 
                alt="Profile" 
                className="photo-upload__image"
              />
            ) : (
              <div className="photo-upload__placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeDasharray="2 2"/>
                  <circle cx="12" cy="10" r="3"/>
                  <path d="M6 18.5C6 16 8 14 12 14C16 14 18 16 18 18.5"/>
                </svg>
              </div>
            )}
          </label>
        </div>

        {/* Form */}
        <div className="signup-screen__form animate-fade-in animation-delay-200">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="signup-input"
            />
          </div>

          <div className="form-group">
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="signup-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  {showPassword ? (
                    <>
                      <path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    </>
                  ) : (
                    <>
                      <path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                      <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="form-group">
            <div className="phone-input">
              <select
                className="country-select"
                value={formData.countryCode}
                onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
              >
                <option value="🇬🇧">NG</option>
                <option value="🇺🇸">🇺🇸</option>
                <option value="🇳🇬">GB</option>
              </select>
              <input
                type="tel"
                placeholder="Your number"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                className="signup-input phone-number"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="signup-screen__actions animate-fade-in-up animation-delay-300">
          <Button 
            variant="primary" 
            size="lg" 
            fullWidth
            onClick={handleDone}
          >
            Done
          </Button>

          <button 
            className="signup-screen__cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="signup-screen__indicator">
        <div className="indicator-bar"></div>
        <div className="indicator-bar indicator-bar--active"></div>
        <div className="indicator-bar"></div>
      </div>
    </div>
  );
};