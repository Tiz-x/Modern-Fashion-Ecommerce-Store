import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import { MobileOnly } from './components/MobileOnly';

// Import pages - each from their own folder
import { SplashScreen, SignupScreen, LoginScreen, PasswordScreen } from './pages/auth';
import { OnboardingScreen } from './pages/onboarding';
import { ShopScreen } from './pages/shop';
import { SearchScreen } from './pages/search';
import { CategoryPage } from './pages/category';
import { ProductDetail } from './pages/product';
import { SavedScreen } from './pages/saved';
import { CartScreen } from './pages/cart';
import { CheckoutScreen } from './pages/checkout';
import { ProfileScreen } from './pages/profile';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    animation: 'fadeIn 0.3s ease-out'
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px'
    }}>
      <div style={{
        position: 'relative',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '48px',
              height: '48px',
              border: '3px solid transparent',
              borderTopColor: i === 0 ? '#0066FF' : i === 1 ? 'rgba(0, 102, 255, 0.6)' : 'rgba(0, 102, 255, 0.3)',
              borderRadius: '50%',
              animation: `spinnerRotate 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite`,
              animationDelay: `${-0.4 * i}s`
            }}
          />
        ))}
        <div style={{
          width: '8px',
          height: '8px',
          background: '#0066FF',
          borderRadius: '50%',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
      </div>
      <p style={{
        fontSize: '16px',
        color: '#374151',
        fontWeight: 500,
        margin: 0,
        animation: 'fadeInOut 2s ease-in-out infinite'
      }}>Loading...</p>
    </div>
  </div>
);

// App Content with Loading
const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    // Start loading
    setIsLoading(true);

    // Delay to show loading animation
    const timer = setTimeout(() => {
      setDisplayLocation(location);
      setIsLoading(false);
    }, 600); // 600ms loading time

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div style={{ 
        opacity: isLoading ? 0 : 1, 
        transition: 'opacity 0.3s ease-out',
        animation: !isLoading ? 'fadeInUp 0.4s ease-out' : 'none'
      }}>
        <Routes location={displayLocation}>
          {/* Splash Screen - Main entry point */}
          <Route path="/" element={<SplashScreen />} />
          
          {/* Signup Screen */}
          <Route path="/signup" element={<SignupScreen />} />
          
          {/* Login Screen */}
          <Route path="/login" element={<LoginScreen />} />
          
          {/* Password Screen */}
          <Route path="/login/password" element={<PasswordScreen />} />
          
          {/* Onboarding Screen - After login/signup */}
          <Route path="/onboarding" element={<OnboardingScreen />} />
          
          {/* Shop Screen - Main app after onboarding */}
          <Route path="/shop" element={<ShopScreen />} />
          
          {/* Search Screen - Search products */}
          <Route path="/search" element={<SearchScreen />} />
          
          {/* Category Page - Shows products by category */}
          <Route path="/category/:category" element={<CategoryPage />} />
          
          {/* Product Detail Page - Shows full product details */}
          <Route path="/product/:productId" element={<ProductDetail />} />
          
          {/* Saved Screen */}
          <Route path="/saved" element={<SavedScreen />} />
          
          {/* Cart Screen */}
          <Route path="/cart" element={<CartScreen />} />
          
          {/* Checkout Screen */}
          <Route path="/checkout" element={<CheckoutScreen />} />
          
          {/* Profile Screen */}
          <Route path="/profile" element={<ProfileScreen />} />
          
          {/* Redirect /splash to root */}
          <Route path="/splash" element={<Navigate to="/" replace />} />
          
          {/* Catch all - redirect to splash */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <MobileOnly>
      <AppProvider>
        <Router>
          <div className="app">
            <AppContent />
          </div>
        </Router>
      </AppProvider>
    </MobileOnly>
  );
}

export default App;