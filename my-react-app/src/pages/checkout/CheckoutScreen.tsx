import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoArrowBack,
  IoCard,
  IoWallet,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { useApp } from "../../context/AppContext";
import "./CheckoutScreen.css";

interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export const CheckoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useApp();
  const [step, setStep] = useState<"shipping" | "payment" | "success">(
    "shipping"
  );
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate shipping info
    const isValid = Object.values(shippingInfo).every(
      (value) => value.trim() !== ""
    );

    if (isValid) {
      setStep("payment");
    } else {
      alert("Please fill in all shipping information");
    }
  };

  const handlePlaceOrder = () => {
    // Process payment
    setStep("success");

    // Clear cart after 3 seconds and redirect to shop
    setTimeout(() => {
      clearCart();
      navigate("/shop");
    }, 3000);
  };

  const shippingFee = 0; // Free shipping
  const tax = cartTotal * 0.08; // 8% tax
  const total = cartTotal + shippingFee + tax;

  if (step === "success") {
    return (
      <div className="checkout-screen">
        <div className="success-container">
          <div className="success-content">
            <IoCheckmarkCircle className="success-icon" size={100} />
            <h1 className="success-title">Order Placed Successfully!</h1>
            <p className="success-message">
              Thank you for your order. You will receive a confirmation email
              shortly.
            </p>
            <div className="success-details">
              <p>
                <strong>Order Total:</strong> ${total.toFixed(2)}
              </p>
              <p>
                <strong>Delivery to:</strong> {shippingInfo.fullName}
              </p>
              <p className="success-redirect">
                Redirecting to shop in 3 seconds...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-screen">
      {/* Header */}
      <header className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <IoArrowBack size={24} />
        </button>
        <h1 className="checkout-title">Checkout</h1>
        <div className="header-spacer"></div>
      </header>

      {/* Steps Indicator */}
      <div className="steps-indicator">
        <div
          className={`step ${
            step === "shipping" ? "step--active" : "step--completed"
          }`}
        >
          <div className="step-number">1</div>
          <span className="step-label">Shipping</span>
        </div>
        <div className="step-line"></div>
        <div className={`step ${step === "payment" ? "step--active" : ""}`}>
          <div className="step-number">2</div>
          <span className="step-label">Payment</span>
        </div>
      </div>

      <div className="checkout-content">
        {step === "shipping" && (
          <form className="shipping-form" onSubmit={handleContinueToPayment}>
            <h2 className="section-title">Shipping Information</h2>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="TizCode Timi"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="+1 234 567 8900"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                className="form-input"
                placeholder="123 Main Street"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="New York"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="NY"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleInputChange}
                className="form-input"
                placeholder="10001"
                required
              />
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h3 className="summary-title">Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row summary-row--total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button type="submit" className="continue-btn">
              Continue to Payment
            </button>
          </form>
        )}

        {step === "payment" && (
          <div className="payment-section">
            <h2 className="section-title">Payment Method</h2>

            <div className="payment-methods">
              <div
                className={`payment-option ${
                  paymentMethod === "card" ? "payment-option--active" : ""
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <IoCard size={32} />
                <span>Credit/Debit Card</span>
              </div>

              <div
                className={`payment-option ${
                  paymentMethod === "cash" ? "payment-option--active" : ""
                }`}
                onClick={() => setPaymentMethod("cash")}
              >
                <IoWallet size={32} />
                <span>Cash on Delivery</span>
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="card-form">
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Cardholder Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="TizCode Timi"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Summary */}
            <div className="shipping-summary">
              <h3 className="summary-title">Delivering to:</h3>
              <p className="delivery-info">
                <strong>{shippingInfo.fullName}</strong>
                <br />
                {shippingInfo.address}
                <br />
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                <br />
                {shippingInfo.phone}
              </p>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h3 className="summary-title">Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row summary-row--total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order - ${total.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
