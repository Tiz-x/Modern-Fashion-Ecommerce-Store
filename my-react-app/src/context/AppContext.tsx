import React, { createContext, useContext, useState, ReactNode } from 'react';

// Product Interface - INCLUDES IMAGE
export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;  // ← CRITICAL: This must be included
  images?: string[];  // Optional: Multiple images for gallery
  category?: string;
  description?: string;
  rating?: number;
  reviews?: number;
  discount?: string;
}

// Cart Item Interface 
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

// Context Interface
interface AppContextType {
  // Cart
  cart: CartItem[];
  cartItems: CartItem[];  // Alias for compatibility
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;  // Alias for compatibility
  clearCart: () => void;
  getCartTotal: () => string;
  cartTotal: number;  // Numeric total for compatibility
  getCartItemCount: () => number;
  cartCount: number;  // Direct count for compatibility
  
  // Saved Items
  savedItems: Product[];
  savedCount: number;  // Direct count for compatibility
  addToSaved: (product: Product) => void;
  removeFromSaved: (productId: number) => void;
  isSaved: (productId: number) => boolean;
  
  // User
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<Product[]>([]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Add to Cart - PRESERVES ALL PRODUCT DATA INCLUDING IMAGE
  const addToCart = (
    product: Product, 
    quantity: number = 1, 
    selectedSize?: string, 
    selectedColor?: string
  ) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => 
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );
      
      if (existingItem) {
        // Update quantity for existing item with same size/color
        return prevCart.map((item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item with product wrapped
        return [...prevCart, { 
          product: product,
          quantity: quantity,
          selectedSize: selectedSize,
          selectedColor: selectedColor
        }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.product.price.replace('$', ''));
      return sum + price * item.quantity;
    }, 0);
    return `$${total.toFixed(2)}`;
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Add to Saved - PRESERVES ALL PRODUCT DATA INCLUDING IMAGE
  const addToSaved = (product: Product) => {
    setSavedItems((prevSaved) => {
      const isAlreadySaved = prevSaved.some((item) => item.id === product.id);
      if (!isAlreadySaved) {
        return [...prevSaved, product];  // ← INCLUDES IMAGE AND ALL DATA
      }
      return prevSaved;
    });
  };

  const removeFromSaved = (productId: number) => {
    setSavedItems((prevSaved) => prevSaved.filter((item) => item.id !== productId));
  };

  const isSaved = (productId: number) => {
    return savedItems.some((item) => item.id === productId);
  };

  const value: AppContextType = {
    cart,
    cartItems: cart,  // Alias for compatibility
    addToCart,
    removeFromCart,
    updateQuantity,
    updateCartItemQuantity: updateQuantity,  // Alias for compatibility
    clearCart,
    getCartTotal,
    cartTotal: parseFloat(getCartTotal().replace('$', '')),  // Numeric total
    getCartItemCount,
    cartCount: getCartItemCount(),  // Direct count
    savedItems,
    savedCount: savedItems.length,  // Direct count
    addToSaved,
    removeFromSaved,
    isSaved,
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};