import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IoSearchOutline,
  // IoCamera,
  IoArrowForward,
  IoHomeOutline,
  IoHeartOutline,
  IoHeart,
  IoCartOutline,
  IoPersonOutline,
  IoArrowUp,
} from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { useApp, Product } from "../../context/AppContext";
import "./ShopScreen.css";

interface SaleBanner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  bgGradient: string;
}

const saleBanners: SaleBanner[] = [
  {
    id: 1,
    title: "Big Sale",
    subtitle: "Up to 50%",
    description: "Neque porro quisquam",
    image: "/images/banners/sale-banner-1.jpg",
    bgGradient: "linear-gradient(135deg, #FFA726 0%, #FFB84D 100%)",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh Collection",
    description: "Latest fashion trends",
    image: "/images/banners/sale-banner-2.jpg",
    bgGradient: "linear-gradient(135deg, #FF6B9D 0%, #FFA1BF 100%)",
  },
  {
    id: 3,
    title: "Hot Deals",
    subtitle: "Limited Offer",
    description: "Grab them now",
    image: "/images/banners/sale-banner-3.jpg",
    bgGradient: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
  },
  {
    id: 4,
    title: "Special Discount",
    subtitle: "Save More",
    description: "Exclusive deals",
    image: "/images/banners/sale-banner-4.jpg",
    bgGradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
  },
  {
    id: 5,
    title: "Flash Sale",
    subtitle: "24 Hours Only",
    description: "Don't miss out",
    image: "/images/banners/sale-banner-5.jpg",
    bgGradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
  },
];

interface Category {
  id: number;
  name: string;
  count: number;
  images: string[];
}

const categories: Category[] = [
  {
    id: 1,
    name: "Clothing",
    count: 399,
    images: [
      "/images/categories/clothing-1.jpg",
      "/images/categories/clothing-2.jpg",
      "/images/categories/clothing-3.jpg",
      "/images/categories/clothing-4.jpg",
    ],
  },
  {
    id: 2,
    name: "Shoes",
    count: 536,
    images: [
      "/images/categories/shoes-1.jpg",
      "/images/categories/shoes-2.jpg",
      "/images/categories/shoes-3.jpg",
      "/images/categories/shoes-4.jpg",
    ],
  },
  {
    id: 3,
    name: "Bags",
    count: 97,
    images: [
      "/images/categories/bags-1.jpg",
      "/images/categories/bags-2.jpg",
      "/images/categories/bags-3.jpg",
      "/images/categories/bags-4.jpg",
    ],
  },
  {
    id: 4,
    name: "Lingerie",
    count: 238,
    images: [
      "/images/categories/lingerie-1.jpg",
      "/images/categories/lingerie-2.jpg",
      "/images/categories/lingerie-3.jpg",
      "/images/categories/lingerie-4.jpg",
    ],
  },
  {
    id: 5,
    name: "Watch",
    count: 218,
    images: [
      "/images/categories/watch-1.jpg",
      "/images/categories/watch-2.jpg",
      "/images/categories/watch-3.jpg",
      "/images/categories/watch-4.jpg",
    ],
  },
  {
    id: 6,
    name: "Hoodies",
    count: 218,
    images: [
      "/images/categories/hoodies-1.jpg",
      "/images/categories/hoodies-2.jpg",
      "/images/categories/hoodies-3.jpg",
      "/images/categories/hoodies-4.jpg",
    ],
  },
];

// Convert to full Product objects
const topProducts: Product[] = [
  {
    id: 101,
    name: "Trendy Watch",
    price: "$120.00",
    image: "/images/products/top-1.jpg",
    category: "watch",
  },
  {
    id: 102,
    name: "Stylish Bag",
    price: "$85.00",
    image: "/images/products/top-2.jpg",
    category: "bags",
  },
  {
    id: 103,
    name: "Classic Shoes",
    price: "$95.00",
    image: "/images/products/top-3.jpg",
    category: "shoes",
  },
  {
    id: 104,
    name: "Summer Dress",
    price: "$65.00",
    image: "/images/products/top-4.jpg",
    category: "clothing",
  },
  {
    id: 105,
    name: "Cool Hoodie",
    price: "$55.00",
    image: "/images/products/top-5.jpg",
    category: "hoodies",
  },
];

const newItems: Product[] = [
  {
    id: 201,
    name: "Blue Sneakers",
    description: "Lorem ipsum dolor sit amet consectetur",
    price: "$37.00",
    image: "/images/products/new-1.jpg",
    category: "shoes",
  },
  {
    id: 202,
    name: "Red Shoes",
    description: "Lorem ipsum dolor sit amet consectetur",
    price: "$32.00",
    image: "/images/products/new-2.jpg",
    category: "shoes",
  },
  {
    id: 203,
    name: "Blue Nike",
    description: "Lorem ipsum dolor sit amet consectetur",
    price: "$32.00",
    image: "/images/products/new-3.jpg",
    category: "shoes",
  },
];

const flashSaleItems: Product[] = [
  {
    id: 301,
    name: "Flash Product 1",
    price: "$50.00",
    image: "/images/flash-sale/item-1.jpg",
    category: "clothing",
  },
  {
    id: 302,
    name: "Flash Product 2",
    price: "$70.00",
    image: "/images/flash-sale/item-2.jpg",
    category: "shoes",
  },
  {
    id: 303,
    name: "Flash Product 3",
    price: "$60.00",
    image: "/images/flash-sale/item-3.jpg",
    category: "bags",
  },
  {
    id: 304,
    name: "Flash Product 4",
    price: "$65.00",
    image: "/images/flash-sale/item-4.jpg",
    category: "clothing",
  },
  {
    id: 305,
    name: "Flash Product 5",
    price: "$75.00",
    image: "/images/flash-sale/item-5.jpg",
    category: "watch",
  },
  {
    id: 306,
    name: "Flash Product 6",
    price: "$55.00",
    image: "/images/flash-sale/item-6.jpg",
    category: "hoodies",
  },
];

const popularItems: Product[] = [
  {
    id: 401,
    name: "Pink Dress",
    price: "$25.00",
    image: "/images/popular/item-1.jpg",
    category: "clothing",
  },
  {
    id: 402,
    name: "Fashion Style",
    price: "$750.00",
    image: "/images/popular/item-2.jpg",
    category: "clothing",
  },
  {
    id: 403,
    name: "Yellow Jacket",
    price: "$32.00",
    image: "/images/popular/item-3.jpg",
    category: "clothing",
  },
  {
    id: 404,
    name: "Casual Wear",
    price: "$45.00",
    image: "/images/popular/item-4.jpg",
    category: "clothing",
  },
];

const justForYouItems: Product[] = [
  {
    id: 501,
    name: "Sunglasses",
    description: "Lorem ipsum dolor sit amet consectetur",
    price: "$47.00",
    image: "/images/just-for-you/item-1.jpg",
    category: "accessories",
  },
  {
    id: 502,
    name: "Yellow Fashion",
    description: "Lorem ipsum dolor sit amet consectetur",
    price: "$47.00",
    image: "/images/just-for-you/item-2.jpg",
    category: "clothing",
  },
  {
    id: 503,
    name: "Pink Style",
    description: "Lorem ipsum dolor sit amet consectetur",
    price: "$47.00",
    image: "/images/just-for-you/item-3.jpg",
    category: "clothing",
  },
  {
    id: 504,
    name: "Purple Outfit",
    description: "Lorem ipsum dolor sit amet consectetur",
    price: "$47.00",
    image: "/images/just-for-you/item-4.jpg",
    category: "clothing",
  },
  {
    id: 505,
    name: "Summer Dress",
    description: "Lorem ipsum dolor sit amet consectetur",
    price: "$52.00",
    image: "/images/just-for-you/item-5.jpg",
    category: "clothing",
  },
  {
    id: 506,
    name: "Casual Look",
    description: "Lorem ipsum dolor sit amet consectetur",
    price: "$38.00",
    image: "/images/just-for-you/item-6.jpg",
    category: "clothing",
  },
  {
    id: 507,
    name: "Trendy Top",
    description: "Lorem ipsum dolor sit amet consectetur",
    price: "$45.00",
    image: "/images/just-for-you/item-7.jpg",
    category: "clothing",
  },
  {
    id: 508,
    name: "Chic Wear",
    description: "Lorem ipsum dolor sit amet consectetur",
    price: "$55.00",
    image: "/images/just-for-you/item-8.jpg",
    category: "clothing",
  },
];

export const ShopScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    savedCount,
    cartCount,
    addToSaved,
    removeFromSaved,
    isSaved,
    addToCart,
  } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Auto-slide banner every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % saleBanners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentBanner(index);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName.toLowerCase()}`);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const toggleSave = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved(product.id)) {
      removeFromSaved(product.id);
    } else {
      addToSaved(product);
    }
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const banner = saleBanners[currentBanner];

  return (
    <div className="shop-screen">
      {/* Shop Header with Title and Search */}
      <header
        className="shop-main-header"
        style={{
          background: "white",
          padding: "16px 20px",
          borderBottom: "1px solid #F3F4F6",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <h1
          className="shop-main-header__title"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#000",
            margin: 0,
            flexShrink: 0,
          }}
        >
          Shop
        </h1>
        <div
          className="shop-main-header__search"
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IoSearchOutline
            size={20}
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9CA3AF",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(e) => {
              e.target.style.background = "#FFFFFF";
              e.target.style.borderColor = "#0066FF";
              e.target.style.boxShadow = "0 0 0 3px rgba(0, 102, 255, 0.1)";
              navigate("/search");
            }}
            onBlur={(e) => {
              e.target.style.background = "#F3F4F6";
              e.target.style.borderColor = "#E5E7EB";
              e.target.style.boxShadow = "none";
            }}
            style={{
              width: "100%",
              padding: "12px 50px 12px 52px",
              background: "#F3F4F6",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              fontSize: "15px",
              color: "#111827",
              outline: "none",
              transition: "all 0.2s ease",
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#9CA3AF";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#D1D5DB";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
              aria-label="Clear search"
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "24px",
                height: "24px",
                background: "#D1D5DB",
                border: "none",
                borderRadius: "50%",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                padding: 0,
                zIndex: 2,
                transition: "all 0.2s ease",
              }}
            >
              ✕
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="shop-content">
        {/* Big Sale Banner */}
        <div
          className="big-sale-banner"
          style={{ background: banner.bgGradient }}
        >
          <div className="big-sale-banner__content">
            <h2 className="big-sale-banner__title">{banner.title}</h2>
            <p className="big-sale-banner__subtitle">{banner.subtitle}</p>
            <p className="big-sale-banner__description">{banner.description}</p>
          </div>
          <div className="big-sale-banner__image">
            <img src={banner.image} alt={banner.title} />
          </div>

          {/* Pagination dots */}
          <div className="big-sale-banner__dots">
            {saleBanners.map((_, index) => (
              <button
                key={index}
                className={`dot ${
                  index === currentBanner ? "dot--active" : ""
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="section-header">
            <h2 className="section-title">Categories</h2>
            <button
              className="see-all-btn"
              onClick={() => handleCategoryClick("all")}
            >
              See All
              <span className="see-all-icon">
                <IoArrowForward size={14} />
              </span>
            </button>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card"
                onClick={() => handleCategoryClick(category.name)}
                style={{ cursor: "pointer" }}
              >
                <div className="category-card__images">
                  {category.images.map((image, index) => (
                    <div key={index} className="category-card__image">
                      <img src={image} alt={`${category.name} ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <div className="category-card__info">
                  <h3 className="category-card__name">{category.name}</h3>
                  <span className="category-card__count">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Products Section */}
        <section className="top-products-section">
          <h2 className="section-title">Top Products</h2>

          <div className="top-products-scroll">
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="top-product-card"
                onClick={() => handleProductClick(product)}
              >
                <img src={product.image} alt={product.name} />
                {/* Heart icon for top products */}
                <button
                  className={`top-product-save-btn ${
                    isSaved(product.id) ? "top-product-save-btn--active" : ""
                  }`}
                  onClick={(e) => toggleSave(product, e)}
                >
                  {isSaved(product.id) ? (
                    <IoHeart size={16} />
                  ) : (
                    <IoHeartOutline size={16} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* New Items Section */}
        <section className="new-items-section">
          <div className="section-header">
            <h2 className="section-title">New Items</h2>
            <button className="see-all-btn">
              See All
              <span className="see-all-icon">
                <IoArrowForward size={14} />
              </span>
            </button>
          </div>

          <div className="new-items-grid">
            {newItems.map((item) => (
              <div
                key={item.id}
                className="new-item-card"
                onClick={() => handleProductClick(item)}
              >
                <div className="new-item-card__image">
                  <img src={item.image} alt={item.name} />
                  {/* Heart icon */}
                  <button
                    className={`save-btn ${
                      isSaved(item.id) ? "save-btn--active" : ""
                    }`}
                    onClick={(e) => toggleSave(item, e)}
                  >
                    {isSaved(item.id) ? (
                      <IoHeart size={20} />
                    ) : (
                      <IoHeartOutline size={20} />
                    )}
                  </button>
                </div>
                <div className="new-item-card__info">
                  <h3 className="new-item-card__name">{item.name}</h3>
                  <p className="new-item-card__description">
                    {item.description}
                  </p>
                  <p className="new-item-card__price">{item.price}</p>
                  {/* Add to cart button */}
                  <button
                    className="add-to-cart-btn-small"
                    onClick={(e) => handleAddToCart(item, e)}
                  >
                    <MdAddShoppingCart size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Flash Sale Section */}
        <section className="flash-sale-section">
          <div className="section-header">
            <h2 className="section-title">Flash Sale</h2>
            <div className="flash-timer">
              <span className="timer-icon">⏱</span>
              <span className="timer-text">00 36 68</span>
            </div>
          </div>

          <div className="flash-sale-grid">
            {flashSaleItems.map((item) => (
              <div
                key={item.id}
                className="flash-sale-card"
                onClick={() => handleProductClick(item)}
              >
                <div className="flash-sale-card__image">
                  <img src={item.image} alt={item.name} />
                  <span className="discount-badge">50%</span>
                  {/* Heart icon */}
                  <button
                    className={`save-btn ${
                      isSaved(item.id) ? "save-btn--active" : ""
                    }`}
                    onClick={(e) => toggleSave(item, e)}
                  >
                    {isSaved(item.id) ? (
                      <IoHeart size={20} />
                    ) : (
                      <IoHeartOutline size={20} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Most Popular Section */}
        <section className="most-popular-section">
          <div className="section-header">
            <h2 className="section-title">Most Popular</h2>
            <button className="see-all-btn">
              See All
              <span className="see-all-icon">
                <IoArrowForward size={14} />
              </span>
            </button>
          </div>

          <div className="popular-items-scroll">
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="popular-item-card"
                onClick={() => handleProductClick(item)}
              >
                <div className="popular-item-card__image">
                  <img src={item.image} alt={item.name} />
                  {/* Heart icon */}
                  <button
                    className={`save-btn ${
                      isSaved(item.id) ? "save-btn--active" : ""
                    }`}
                    onClick={(e) => toggleSave(item, e)}
                  >
                    {isSaved(item.id) ? (
                      <IoHeart size={20} />
                    ) : (
                      <IoHeartOutline size={20} />
                    )}
                  </button>
                </div>
                <div className="popular-item-card__info">
                  <h3 className="popular-item-card__name">{item.name}</h3>
                  <p className="popular-item-card__price">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Just For You Section */}
        <section className="just-for-you-section">
          <div className="section-header">
            <h2 className="section-title">
              Just For You <span className="star-icon">⭐</span>
            </h2>
          </div>

          <div className="just-for-you-grid">
            {justForYouItems.map((item) => (
              <div
                key={item.id}
                className="just-for-you-card"
                onClick={() => handleProductClick(item)}
              >
                <div className="just-for-you-card__image">
                  <img src={item.image} alt={item.name} />
                  {/* Heart icon */}
                  <button
                    className={`save-btn ${
                      isSaved(item.id) ? "save-btn--active" : ""
                    }`}
                    onClick={(e) => toggleSave(item, e)}
                  >
                    {isSaved(item.id) ? (
                      <IoHeart size={20} />
                    ) : (
                      <IoHeartOutline size={20} />
                    )}
                  </button>
                </div>
                <div className="just-for-you-card__info">
                  <h3 className="just-for-you-card__name">{item.name}</h3>
                  <p className="just-for-you-card__description">
                    {item.description}
                  </p>
                  <p className="just-for-you-card__price">{item.price}</p>
                  {/* Add to cart button */}
                  <button
                    className="add-to-cart-btn-small"
                    onClick={(e) => handleAddToCart(item, e)}
                  >
                    <MdAddShoppingCart size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <IoArrowUp size={24} />
        </button>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="bottom-nav">
        <button
          className={`bottom-nav__btn ${
            location.pathname === "/shop" ? "bottom-nav__btn--active" : ""
          }`}
          onClick={() => handleNavigation("/shop")}
        >
          <IoHomeOutline className="bottom-nav__icon" size={24} />
          <span className="bottom-nav__label">Shop</span>
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
