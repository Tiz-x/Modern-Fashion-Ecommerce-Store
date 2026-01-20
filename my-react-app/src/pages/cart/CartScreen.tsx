import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoHomeOutline, IoHeartOutline, IoCartOutline, IoPersonOutline, IoTrashOutline, IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import { useApp } from '../../context/AppContext';
import './CartScreen.css';

export const CartScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, removeFromCart, updateCartItemQuantity, cartTotal, savedCount, cartCount } = useApp();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleProductClick = (productId: number) => {
    const cartItem = cartItems.find(item => item.product.id === productId);
    if (cartItem) {
      navigate(`/product/${productId}`, { state: { product: cartItem.product } });
    }
  };

  const handleRemove = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromCart(productId);
  };

  const handleIncrement = (productId: number, currentQuantity: number, e: React.MouseEvent) => {
    e.stopPropagation();
    updateCartItemQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId: number, currentQuantity: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentQuantity > 1) {
      updateCartItemQuantity(productId, currentQuantity - 1);
    }
  };

  
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-screen">
      <header className="page-header">
        <h1 className="page-title">Shopping Cart</h1>
        {cartItems.length > 0 && (
          <span className="item-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
        )}
      </header>

      <div className="page-content">
        {cartItems.length === 0 ? (
          <div className="placeholder-content">
            <IoCartOutline size={80} className="placeholder-icon" />
            <h2 className="placeholder-title">Your Cart is Empty</h2>
            <p className="placeholder-text">
              Add items to your cart to see them here. Start shopping now!
            </p>
            <button className="browse-btn" onClick={() => handleNavigation('/shop')}>
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div 
                  key={item.product.id} 
                  className="cart-item"
                  onClick={() => handleProductClick(item.product.id)}
                >
                  <div className="cart-item__image">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>

                  <div className="cart-item__details">
                    <h3 className="cart-item__name">{item.product.name}</h3>
                    <p className="cart-item__price">{item.product.price}</p>
                    
                    {/* Selected Options */}
                    {(item.selectedSize || item.selectedColor) && (
                      <div className="cart-item__options">
                        {item.selectedSize && (
                          <span className="option-tag">Size: {item.selectedSize}</span>
                        )}
                        {item.selectedColor && (
                          <span className="option-tag">Color: {item.selectedColor}</span>
                        )}
                      </div>
                    )}

                    {/* Quantity Controls */}
                    <div className="cart-item__quantity">
                      <button
                        className="quantity-btn"
                        onClick={(e) => handleDecrement(item.product.id, item.quantity, e)}
                      >
                        <IoRemoveOutline size={16} />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={(e) => handleIncrement(item.product.id, item.quantity, e)}
                      >
                        <IoAddOutline size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="remove-btn"
                    onClick={(e) => handleRemove(item.product.id, e)}
                  >
                    <IoTrashOutline size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Shipping</span>
                <span className="summary-value">Free</span>
              </div>
              <div className="summary-row summary-row--total">
                <span className="summary-label">Total</span>
                <span className="summary-value">${cartTotal.toFixed(2)}</span>
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
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