import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common";
import "./OnboardingScreen.css";

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageBg: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: "Welcome",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eleifend lacus.",
    imageUrl: "/images/onboarding/onboarding-img-1.jpeg",
    imageBg: "linear-gradient(135deg, #FFB6D9 0%, #FFC9E0 100%)",
  },
  {
    id: 2,
    title: "Hello",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eleifend lacus.",
    imageUrl: "/images/onboarding/onboarding-img-2.jpeg",
    imageBg: "linear-gradient(135deg, #FFB6D9 0%, #FFC9E0 100%)",
  },
  {
    id: 3,
    title: "Shop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eleifend lacus.",
    imageUrl: "/images/onboarding/onboarding-img-3.jpeg",
    imageBg: "linear-gradient(135deg, #B8D4FF 0%, #D4E4FF 100%)",
  },
  {
    id: 4,
    title: "Ready?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis.",
    imageUrl: "/images/onboarding/onboarding-img-4.jpeg",
    imageBg: "linear-gradient(135deg, #B8D4FF 0%, #D4E4FF 100%)",
  },
];

export const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleGetStarted = () => {
    navigate("/shop");
  };

  const handleSkip = () => {
    navigate("/shop");
  };

  const isLastSlide = currentSlide === slides.length - 1;
  const slide = slides[currentSlide];

  return (
    <div className="onboarding-screen">
      <div className="onboarding-screen__content">
        {/* Skip button */}
        {!isLastSlide && (
          <button className="onboarding-screen__skip" onClick={handleSkip}>
            Skip
          </button>
        )}

        {/* Card */}
        <div className="onboarding-card animate-fade-in" key={currentSlide}>
          {/* Image */}
          <div
            className="onboarding-card__image"
            style={{ background: slide.imageBg }}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="onboarding-card__img"
            />
          </div>

          {/* Content */}
          <div className="onboarding-card__content">
            <h2 className="onboarding-card__title">{slide.title}</h2>
            <p className="onboarding-card__description">{slide.description}</p>
          </div>

          {/* Action button - only on last slide */}
          {isLastSlide && (
            <div className="onboarding-card__action">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleGetStarted}
              >
                Let's Start
              </Button>
            </div>
          )}
        </div>

        {/* Pagination dots */}
        <div className="onboarding-screen__pagination">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${
                index === currentSlide ? "pagination-dot--active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="onboarding-screen__nav">
          {currentSlide > 0 && (
            <button
              className="nav-arrow nav-arrow--left"
              onClick={handlePrevious}
              aria-label="Previous slide"
            >
              ‹
            </button>
          )}
          {currentSlide < slides.length - 1 && (
            <button
              className="nav-arrow nav-arrow--right"
              onClick={handleNext}
              aria-label="Next slide"
            >
              ›
            </button>
          )}
        </div>
      </div>

      {/* Bottom indicator bar */}
      <div className="onboarding-screen__indicator">
        <div className="indicator-bar indicator-bar--active"></div>
      </div>
    </div>
  );
};