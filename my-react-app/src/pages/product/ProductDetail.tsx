import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  IoArrowBack,
  IoHeartOutline,
  IoHeart,
  IoShareSocialOutline,
  IoStarSharp,
  IoStarHalfSharp,
  IoStarOutline,
} from 'react-icons/io5';
import { MdAddShoppingCart } from 'react-icons/md';
import { useApp } from '../../context/AppContext';
import './ProductDetail.css';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description?: string;
  rating?: number;
  reviews?: number;
  sizes?: string[];
  colors?: string[];
  images?: string[];
}

// This will match your products from CategoryPage
const allProducts: Product[] = [
  {
    id: 1,
    name: 'Summer Dress',
    price: '$45.00',
    image: '/images/categories/clothing-1.jpg',
    category: 'clothing',
    description: 'Beautiful summer dress perfect for warm weather. Made with high-quality breathable fabric for maximum comfort.',
    rating: 4.5,
    reviews: 128,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Pink', 'White', 'Yellow'],
    images: [
      '/images/categories/clothing-1.jpg',
      '/images/categories/clothing-2.jpg',
      '/images/categories/clothing-3.jpg',
      '/images/categories/clothing-4.jpg',
    ],
  },
  {
    id: 2,
    name: 'Casual Top',
    price: '$32.00',
    image: '/images/products/clothing-2.jpg',
    category: 'clothing',
    description: 'Comfortable casual top for everyday wear. Soft fabric and versatile design.',
    rating: 4.0,
    reviews: 89,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Gray'],
    images: ['/images/products/clothing-2.jpg'],
  },
  {
    id: 3,
    name: 'Evening Gown',
    price: '$89.00',
    image: '/images/products/clothing-3.jpg',
    category: 'clothing',
    description: 'Elegant evening gown for special occasions. Premium fabric with beautiful draping.',
    rating: 5.0,
    reviews: 256,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Burgundy'],
    images: ['/images/products/clothing-3.jpg'],
  },
  {
    id: 4,
    name: 'T-Shirt',
    price: '$25.00',
    image: '/images/products/clothing-4.jpg',
    category: 'clothing',
    description: 'Classic cotton t-shirt. Perfect for casual outings and layering.',
    rating: 4.2,
    reviews: 342,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Gray', 'Navy', 'Red'],
    images: ['/images/products/clothing-4.jpg'],
  },
  {
    id: 5,
    name: 'Running Shoes',
    price: '$75.00',
    image: '/images/products/shoes-1.jpg',
    category: 'shoes',
    description: 'High-performance running shoes with excellent cushioning and support.',
    rating: 4.7,
    reviews: 543,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Black', 'Blue', 'Red'],
    images: ['/images/products/shoes-1.jpg'],
  },
  {
    id: 6,
    name: 'Sneakers',
    price: '$65.00',
    image: '/images/products/shoes-2.jpg',
    category: 'shoes',
    description: 'Stylish sneakers for everyday wear. Comfortable and trendy.',
    rating: 4.3,
    reviews: 234,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['White', 'Black', 'Gray'],
    images: ['/images/products/shoes-2.jpg'],
  },
  {
    id: 7,
    name: 'Heels',
    price: '$95.00',
    image: '/images/products/shoes-3.jpg',
    category: 'shoes',
    description: 'Elegant heels perfect for formal events. Comfortable design for all-day wear.',
    rating: 4.1,
    reviews: 167,
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['Black', 'Nude', 'Red'],
    images: ['/images/products/shoes-3.jpg'],
  },
  {
    id: 8,
    name: 'Boots',
    price: '$120.00',
    image: '/images/products/shoes-4.jpg',
    category: 'shoes',
    description: 'Durable boots for all seasons. Premium leather with waterproof coating.',
    rating: 4.8,
    reviews: 421,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Brown', 'Black'],
    images: ['/images/products/shoes-4.jpg'],
  },
  {
    id: 9,
    name: 'Leather Bag',
    price: '$150.00',
    image: '/images/products/bags-1.jpg',
    category: 'bags',
    description: 'Premium leather bag with spacious compartments. Perfect for work and travel.',
    rating: 4.6,
    reviews: 198,
    sizes: ['One Size'],
    colors: ['Brown', 'Black', 'Tan'],
    images: ['/images/products/bags-1.jpg'],
  },
  {
    id: 10,
    name: 'Tote Bag',
    price: '$45.00',
    image: '/images/products/bags-2.jpg',
    category: 'bags',
    description: 'Versatile tote bag for daily use. Durable canvas material.',
    rating: 4.4,
    reviews: 312,
    sizes: ['One Size'],
    colors: ['Beige', 'Navy', 'Black'],
    images: ['/images/products/bags-2.jpg'],
  },
  {
    id: 11,
    name: 'Backpack',
    price: '$65.00',
    image: '/images/products/bags-3.jpg',
    category: 'bags',
    description: 'Functional backpack with multiple pockets. Great for students and travelers.',
    rating: 4.5,
    reviews: 456,
    sizes: ['One Size'],
    colors: ['Black', 'Gray', 'Blue'],
    images: ['/images/products/bags-3.jpg'],
  },
  {
    id: 12,
    name: 'Clutch',
    price: '$85.00',
    image: '/images/products/bags-4.jpg',
    category: 'bags',
    description: 'Elegant clutch for evening events. Compact yet spacious.',
    rating: 4.3,
    reviews: 145,
    sizes: ['One Size'],
    colors: ['Gold', 'Silver', 'Black'],
    images: ['/images/products/bags-4.jpg'],
  },
  {
    id: 13,
    name: 'Lace Set',
    price: '$55.00',
    image: '/images/products/lingerie-1.jpg',
    category: 'lingerie',
    description: 'Delicate lace lingerie set. Comfortable and elegant.',
    rating: 4.7,
    reviews: 234,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'White', 'Red'],
    images: ['/images/products/lingerie-1.jpg'],
  },
  {
    id: 14,
    name: 'Silk Robe',
    price: '$75.00',
    image: '/images/products/lingerie-2.jpg',
    category: 'lingerie',
    description: 'Luxurious silk robe. Perfect for lounging in style.',
    rating: 4.9,
    reviews: 187,
    sizes: ['S', 'M', 'L'],
    colors: ['Pink', 'Black', 'Champagne'],
    images: ['/images/products/lingerie-2.jpg'],
  },
  {
    id: 15,
    name: 'Sport Watch',
    price: '$200.00',
    image: '/images/products/watch-1.jpg',
    category: 'watch',
    description: 'Advanced sport watch with fitness tracking. Water-resistant up to 50m.',
    rating: 4.6,
    reviews: 678,
    sizes: ['One Size'],
    colors: ['Black', 'Blue', 'Red'],
    images: ['/images/products/watch-1.jpg'],
  },
  {
    id: 16,
    name: 'Classic Watch',
    price: '$350.00',
    image: '/images/products/watch-2.jpg',
    category: 'watch',
    description: 'Timeless classic watch. Elegant design for any occasion.',
    rating: 4.8,
    reviews: 432,
    sizes: ['One Size'],
    colors: ['Gold', 'Silver', 'Rose Gold'],
    images: ['/images/products/watch-2.jpg'],
  },
  {
    id: 17,
    name: 'Hoodie Black',
    price: '$55.00',
    image: '/images/products/hoodies-1.jpg',
    category: 'hoodies',
    description: 'Comfortable black hoodie. Soft fleece lining for warmth.',
    rating: 4.4,
    reviews: 567,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    images: ['/images/products/hoodies-1.jpg'],
  },
  {
    id: 18,
    name: 'Hoodie Gray',
    price: '$55.00',
    image: '/images/products/hoodies-2.jpg',
    category: 'hoodies',
    description: 'Cozy gray hoodie. Perfect for casual wear and workouts.',
    rating: 4.5,
    reviews: 489,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gray'],
    images: ['/images/products/hoodies-2.jpg'],
  },
];

export const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const { addToSaved, removeFromSaved, isSaved, addToCart } = useApp();

  // Get product from location state or find by ID
  const product = location.state?.product || allProducts.find(p => p.id === Number(productId));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="product-detail">
        <div className="error-message">Product not found</div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const currentImage = images[currentImageIndex];

  const handleBack = () => {
    navigate(-1);
  };

  const toggleSave = () => {
    if (product) {
      if (isSaved(product.id)) {
        removeFromSaved(product.id);
      } else {
        addToSaved(product);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name}`,
        url: window.location.href,
      });
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize, selectedColor);
      alert(`Added ${quantity} ${product.name} to cart!`);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoStarSharp key={`full-${i}`} className="star star--filled" />);
    }

    if (hasHalfStar) {
      stars.push(<IoStarHalfSharp key="half" className="star star--filled" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<IoStarOutline key={`empty-${i}`} className="star" />);
    }

    return stars;
  };

  return (
    <div className="product-detail">
      {/* Header */}
      <header className="product-detail__header">
        <button className="back-btn" onClick={handleBack}>
          <IoArrowBack size={24} />
        </button>
        <div className="header-actions">
          <button className="icon-btn" onClick={handleShare}>
            <IoShareSocialOutline size={24} />
          </button>
          <button className={`icon-btn ${product && isSaved(product.id) ? 'icon-btn--active' : ''}`} onClick={toggleSave}>
            {product && isSaved(product.id) ? <IoHeart size={24} /> : <IoHeartOutline size={24} />}
          </button>
        </div>
      </header>

      {/* Product Images */}
      <div className="product-images">
        <div className="main-image">
          <img src={currentImage} alt={product.name} />
        </div>

        {images.length > 1 && (
          <div className="image-thumbnails">
            {images.map((img: string, index: number) => (
              <button
                key={index}
                className={`thumbnail ${index === currentImageIndex ? 'thumbnail--active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <div className="product-header">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">{product.price}</p>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="product-rating">
            <div className="stars">
              {renderStars(product.rating)}
            </div>
            <span className="rating-text">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        )}

        {/* Description */}
        <div className="product-description">
          <h3 className="section-title">Description</h3>
          <p className="description-text">
            {product.description || 'No description available.'}
          </p>
        </div>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="product-options">
            <h3 className="section-title">Size</h3>
            <div className="options-grid">
              {product.sizes.map((size: string) => (
                <button
                  key={size}
                  className={`option-btn ${selectedSize === size ? 'option-btn--selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-options">
            <h3 className="section-title">Color</h3>
            <div className="options-grid">
              {product.colors.map((color: string) => (
                <button
                  key={color}
                  className={`option-btn ${selectedColor === color ? 'option-btn--selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="product-quantity">
          <h3 className="section-title">Quantity</h3>
          <div className="quantity-controls">
            <button className="quantity-btn" onClick={decrementQuantity}>
              −
            </button>
            <span className="quantity-value">{quantity}</span>
            <button className="quantity-btn" onClick={incrementQuantity}>
              +
            </button>
          </div>
        </div>
      </div>

      {/* Add to Cart Button - Fixed at bottom */}
      <div className="product-footer">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <MdAddShoppingCart size={24} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};