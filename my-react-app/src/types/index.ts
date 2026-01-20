// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phoneNumber?: string;
  createdAt: Date;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  sizes?: string[];
  colors?: string[];
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

// Category types
export interface Category {
  id: string;
  name: string;
  image: string;
  icon?: string;
  productCount?: number;
}

// Order types
export type OrderStatus = 'To Pay' | 'To Receive' | 'To Review';

export interface Order {
  id: string;
  products: Array<{
    product: Product;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  status: OrderStatus;
  total: number;
  createdAt: Date;
  estimatedDelivery?: Date;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

// Story types
export interface Story {
  id: string;
  image: string;
  isViewed?: boolean;
  userId: string;
}

// Flash Sale types
export interface FlashSale {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: number;
  endTime: Date;
  products: Product[];
}