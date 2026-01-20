import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  IoHomeOutline,
  IoHeartOutline,
  IoHeart,
  IoCartOutline,
  IoPersonOutline,
  IoArrowBack,
} from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { useApp } from "../../context/AppContext";
import "./CategoryPage.css";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

// Sample products data - you'll replace with real data
const allProducts: Product[] = [
  {
    id: 1,
    name: "Summer Dress",
    price: "$45.00",
    image: "/images/categories/clothing-1.jpg",
    category: "clothing",
  },
  {
    id: 2,
    name: "Casual Top",
    price: "$32.00",
    image: "/images/categories/clothing-2.jpg",
    category: "clothing",
  },
  {
    id: 3,
    name: "Evening Gown",
    price: "$89.00",
    image: "/images/categories/clothing-3.jpg",
    category: "clothing",
  },
  {
    id: 4,
    name: "T-Shirt",
    price: "$25.00",
    image: "/images/categories/clothing-4.jpg",
    category: "clothing",
  },
  {
    id: 5,
    name: "Running Shoes",
    price: "$75.00",
    image: "/images/categories/shoes-1.jpg",
    category: "shoes",
  },
  {
    id: 6,
    name: "Sneakers",
    price: "$65.00",
    image: "/images/categories/shoes-2.jpg",
    category: "shoes",
  },
  {
    id: 7,
    name: "Heels",
    price: "$95.00",
    image: "/images/categories/shoes-4.jpg",
    category: "shoes",
  },
  {
    id: 8,
    name: "Boots",
    price: "$120.00",
    image: "/images/categories/shoes-3.jpg",
    category: "shoes",
  },
  {
    id: 9,
    name: "Leather Bag",
    price: "$150.00",
    image: "/images/categories/bags-1.jpg",
    category: "bags",
  },
  {
    id: 10,
    name: "Tote Bag",
    price: "$45.00",
    image: "/images/categories/bags-2.jpg",
    category: "bags",
  },
  {
    id: 11,
    name: "Backpack",
    price: "$65.00",
    image: "/images/categories/bags-4.jpg",
    category: "bags",
  },
  {
    id: 12,
    name: "Clutch",
    price: "$85.00",
    image: "/images/categories/bags-3.jpg",
    category: "bags",
  },
  {
    id: 13,
    name: "Lace Set",
    price: "$55.00",
    image: "/images/categories/lingerie-1.jpg",
    category: "lingerie",
  },
  {
    id: 14,
    name: "Silk Robe",
    price: "$75.00",
    image: "/images/categories/lingerie-2.jpg",
    category: "lingerie",
  },
  {
    id: 15,
    name: "Sport Watch",
    price: "$200.00",
    image: "/images/categories/watch-3.jpg",
    category: "watch",
  },
  {
    id: 16,
    name: "Classic Watch",
    price: "$350.00",
    image: "/images/categories/watch-2.jpg",
    category: "watch",
  },
  {
    id: 17,
    name: "Hoodie Black",
    price: "$55.00",
    image: "/images/categories/hoodies-2.jpg",
    category: "hoodies",
  },
  {
    id: 18,
    name: "Hoodie Gray",
    price: "$55.00",
    image: "/images/categories/hoodies-1.jpg",
    category: "hoodies",
  },
];

export const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = useParams<{ category: string }>();
  const { addToSaved, removeFromSaved, isSaved, addToCart, savedCount, cartCount } = useApp();

  // Get category name from route state or params
  const categoryName =
    location.state?.categoryName ||
    (category
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : "All Products");

  // Filter products by category if specified
  const products =
    category && category !== "all"
      ? allProducts.filter(
          (product) => product.category === category.toLowerCase()
        )
      : allProducts;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const toggleSave = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking heart
    if (isSaved(product.id)) {
      removeFromSaved(product.id);
    } else {
      addToSaved(product);
    }
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    addToCart(product);
  };

  return (
    <div className="category-page">
      {/* Header */}
      <header className="category-header">
        <button className="back-btn" onClick={handleBack}>
          <IoArrowBack size={24} />
        </button>
        <h1 className="category-title">{categoryName}</h1>
        <div className="header-spacer"></div>
      </header>

      {/* Products Grid */}
      <div className="category-content">
        <div className="products-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-card__image">
                <img src={product.image} alt={product.name} />

                {/* Save/Love Button */}
                <button
                  className={`save-btn ${
                    isSaved(product.id) ? "save-btn--active" : ""
                  }`}
                  onClick={(e) => toggleSave(product, e)}
                >
                  {isSaved(product.id) ? (
                    <IoHeart size={20} />
                  ) : (
                    <IoHeartOutline size={20} />
                  )}
                </button>
              </div>

              <div className="product-card__info">
                <h3 className="product-card__name">{product.name}</h3>
                <p className="product-card__price">{product.price}</p>

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
            {savedCount > 0 && (
              <span className="badge">{savedCount}</span>
            )}
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
            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
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