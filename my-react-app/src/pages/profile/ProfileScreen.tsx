import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoHeartOutline,
  IoCartOutline,
  IoPersonOutline,
  IoChevronForward,
  IoPersonCircleOutline,
  IoReceiptOutline,
  IoLocationOutline,
  IoCardOutline,
  IoNotificationsOutline,
  IoHelpCircleOutline,
  IoShieldCheckmarkOutline,
  IoLogOutOutline,
  IoSettingsOutline,
  IoStarOutline,
  IoCameraOutline,
} from "react-icons/io5";
import { useApp } from "../../context/AppContext";
import "./ProfileScreen.css";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  memberSince: string;
}

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { savedCount, cartCount } = useApp();

  // Mock user data - in real app, this would come from authentication context
  const [user] = useState<UserProfile>({
    name: "TizCode",
    email: "tiz.code@example.com",
    phone: "+234 XXX XXX XXXX",
    memberSince: "January 2024",
  });

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Handle logout logic
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      // Clear user session and navigate to login
      navigate("/login");
    }
  };

  const menuSections = [
    {
      title: "Account",
      items: [
        {
          icon: <IoPersonCircleOutline size={24} />,
          label: "Edit Profile",
          action: () => {},
          badge: null,
        },
        {
          icon: <IoReceiptOutline size={24} />,
          label: "My Orders",
          action: () => {},
          badge: null,
        },
        {
          icon: <IoLocationOutline size={24} />,
          label: "Addresses",
          action: () => {},
          badge: null,
        },
        {
          icon: <IoCardOutline size={24} />,
          label: "Payment Methods",
          action: () => {},
          badge: null,
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: <IoNotificationsOutline size={24} />,
          label: "Notifications",
          action: () => {},
          badge: null,
        },
        {
          icon: <IoSettingsOutline size={24} />,
          label: "Settings",
          action: () => {},
          badge: null,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: <IoHelpCircleOutline size={24} />,
          label: "Help Center",
          action: () => {},
          badge: null,
        },
        {
          icon: <IoShieldCheckmarkOutline size={24} />,
          label: "Privacy & Security",
          action: () => {},
          badge: null,
        },
        {
          icon: <IoStarOutline size={24} />,
          label: "Rate Our App",
          action: () => {},
          badge: null,
        },
      ],
    },
  ];

  return (
    <div className="profile-screen">
      <header className="profile-header">
        <h1 className="profile-header-title">Profile</h1>
      </header>

      <div className="profile-content">
        {/* User Card */}
        <div className="user-card">
          <div className="user-card__avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">
                <IoPersonCircleOutline size={60} />
              </div>
            )}
            <button className="avatar-edit-btn">
              <IoCameraOutline size={18} />
            </button>
          </div>
          <div className="user-card__info">
            <h2 className="user-name">{user.name}</h2>
            <p className="user-email">{user.email}</p>
            <p className="user-member">Member since {user.memberSince}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div
            className="stat-card"
            onClick={() => handleNavigation("/orders")}
          >
            <div className="stat-icon stat-icon--orders">
              <IoReceiptOutline size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-value">0</p>
              <p className="stat-label">Orders</p>
            </div>
          </div>
          <div className="stat-card" onClick={() => handleNavigation("/saved")}>
            <div className="stat-icon stat-icon--saved">
              <IoHeartOutline size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-value">{savedCount}</p>
              <p className="stat-label">Saved</p>
            </div>
          </div>
          <div className="stat-card" onClick={() => handleNavigation("/cart")}>
            <div className="stat-icon stat-icon--cart">
              <IoCartOutline size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-value">{cartCount}</p>
              <p className="stat-label">In Cart</p>
            </div>
          </div>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, index) => (
          <div key={index} className="menu-section">
            <h3 className="menu-section-title">{section.title}</h3>
            <div className="menu-items">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className="menu-item"
                  onClick={item.action}
                >
                  <div className="menu-item__icon">{item.icon}</div>
                  <span className="menu-item__label">{item.label}</span>
                  {item.badge && (
                    <span className="menu-item__badge">{item.badge}</span>
                  )}
                  <IoChevronForward className="menu-item__arrow" size={20} />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          <IoLogOutOutline size={24} />
          <span>Logout</span>
        </button>

        {/* App Version */}
        <p className="app-version">Version 1.0.0</p>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="bottom-nav">
        <button
          className={`bottom-nav__btn ${
            location.pathname === "/shop" ? "bottom-nav__btn--active" : ""
          }`}
          onClick={() => handleNavigation("/shop")}
        >
          <IoHomeOutline className="bottom-nav__icon" size={24} />
          <span className="bottom-nav__label">Home</span>
        </button>
        <button
          className={`bottom-nav__btn ${
            location.pathname === "/saved" ? "bottom-nav__btn--active" : ""
          }`}
          onClick={() => handleNavigation("/saved")}
        >
          <div className="icon-wrapper">
            <IoHeartOutline className="bottom-nav__icon" size={24} />
            {savedCount > 0 && <span className="badge">{savedCount}</span>}
          </div>
          <span className="bottom-nav__label">Saved</span>
        </button>
        <button
          className={`bottom-nav__btn ${
            location.pathname === "/cart" ? "bottom-nav__btn--active" : ""
          }`}
          onClick={() => handleNavigation("/cart")}
        >
          <div className="icon-wrapper">
            <IoCartOutline className="bottom-nav__icon" size={24} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </div>
          <span className="bottom-nav__label">Cart</span>
        </button>
        <button
          className={`bottom-nav__btn ${
            location.pathname === "/profile" ? "bottom-nav__btn--active" : ""
          }`}
          onClick={() => handleNavigation("/profile")}
        >
          <IoPersonOutline className="bottom-nav__icon" size={24} />
          <span className="bottom-nav__label">Profile</span>
        </button>
      </nav>
    </div>
  );
};
