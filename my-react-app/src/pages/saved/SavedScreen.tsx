import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoHomeOutline, IoHeartOutline, IoCartOutline, IoPersonOutline, IoTrashOutline } from 'react-icons/io5';
import { MdAddShoppingCart } from 'react-icons/md';
import { useApp } from '../../context/AppContext';
import './SavedScreen.css';

export const SavedScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { savedItems, removeFromSaved, addToCart, savedCount, cartCount } = useApp();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleProductClick = (productId: number) => {
    const product = savedItems.find(p => p.id === productId);
    if (product) {
      navigate(`/product/${productId}`, { state: { product } });
    }
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleRemove = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromSaved(productId);
  };

  return (
    <div className="saved-screen">
      <header className="page-header">
        <h1 className="page-title">Saved Items</h1>
        {savedItems.length > 0 && (
          <span className="item-count">{savedItems.length} {savedItems.length === 1 ? 'item' : 'items'}</span>
        )}
      </header>

      <div className="page-content">
        {savedItems.length === 0 ? (
          <div className="placeholder-content">
            <IoHeartOutline size={80} className="placeholder-icon" />
            <h2 className="placeholder-title">No Saved Items Yet</h2>
            <p className="placeholder-text">
              Items you save will appear here. Browse the shop to find products you love!
            </p>
            <button className="browse-btn" onClick={() => handleNavigation('/shop')}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="saved-items-grid">
            {savedItems.map((product) => (
              <div 
                key={product.id} 
                className="saved-item-card"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="saved-item-card__image">
                  <img src={product.image} alt={product.name} />
                  
                  {/* Remove Button */}
                  <button
                    className="remove-btn"
                    onClick={(e) => handleRemove(product.id, e)}
                  >
                    <IoTrashOutline size={18} />
                  </button>
                </div>

                <div className="saved-item-card__info">
                  <h3 className="saved-item-card__name">{product.name}</h3>
                  <p className="saved-item-card__price">{product.price}</p>

                  {/* Add to Cart Button */}
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <MdAddShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="bottom-nav">
        <button 
          className={`bottom-nav__btn ${location.pathname === '/shop' ? 'bottom-nav__btn--active' : ''}`}
          onClick={() => handleNavigation('/shop')}
        >
          <IoHomeOutline className="bottom-nav__icon" size={24} />
          <span className="bottom-nav__label">Home</span>
        </button>
        <button 
          className={`bottom-nav__btn ${location.pathname === '/saved' ? 'bottom-nav__btn--active' : ''}`}
          onClick={() => handleNavigation('/saved')}
        >
          <div className="icon-wrapper">
            <IoHeartOutline className="bottom-nav__icon" size={24} />
            {savedCount > 0 && (
              <span className="badge">{savedCount}</span>
            )}
          </div>
          <span className="bottom-nav__label">Saved</span>
        </button>
        <button 
          className={`bottom-nav__btn ${location.pathname === '/cart' ? 'bottom-nav__btn--active' : ''}`}
          onClick={() => handleNavigation('/cart')}
        >
          <div className="icon-wrapper">
            <IoCartOutline className="bottom-nav__icon" size={24} />
            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
          </div>
          <span className="bottom-nav__label">Cart</span>
        </button>
        <button 
          className={`bottom-nav__btn ${location.pathname === '/profile' ? 'bottom-nav__btn--active' : ''}`}
          onClick={() => handleNavigation('/profile')}
        >
          <IoPersonOutline className="bottom-nav__icon" size={24} />
          <span className="bottom-nav__label">Profile</span>
        </button>
      </nav>
    </div>
  );
};