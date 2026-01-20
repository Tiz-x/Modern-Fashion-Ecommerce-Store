import React, { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  IoArrowBack,
  IoSearchOutline,
  IoCloseCircle,
  IoHomeOutline,
  IoHeartOutline,
  IoCartOutline,
  IoPersonOutline,
  IoHeart,
} from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { useApp, Product } from "../../context/AppContext";
import "./SearchScreen.css";


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
    image: "/images/categories/shoes-3.jpg",
    category: "shoes",
  },
  {
    id: 8,
    name: "Boots",
    price: "$120.00",
    image: "/images/categories/shoes-4.jpg",
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
    image: "/images/categories/bags-3.jpg",
    category: "bags",
  },
  {
    id: 12,
    name: "Clutch",
    price: "$85.00",
    image: "/images/categories/bags-4.jpg",
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
    image: "/images/categories/watch-1.jpg",
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
    image: "/images/categories/hoodies-1.jpg",
    category: "hoodies",
  },
  {
    id: 18,
    name: "Hoodie Gray",
    price: "$55.00",
    image: "/images/categories/hoodies-2.jpg",
    category: "hoodies",
  },
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
];

type SortOption = "relevance" | "price-low" | "price-high" | "name";

export const SearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const {
    savedCount,
    cartCount,
    addToSaved,
    removeFromSaved,
    isSaved,
    addToCart,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  // Filter and search products
  const filteredProducts = allProducts
    .filter((product) => {
      // Text search
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory =
        selectedCategory === "all" ||
        (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());

      // Price filter
      const price = parseFloat(product.price.replace("$", ""));
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (
            parseFloat(a.price.replace("$", "")) -
            parseFloat(b.price.replace("$", ""))
          );
        case "price-high":
          return (
            parseFloat(b.price.replace("$", "")) -
            parseFloat(a.price.replace("$", ""))
          );
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is reactive, but you can add additional logic here
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

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div
      className="search-screen"
      style={{
        minHeight: "100vh",
        background: "#F9FAFB",
        paddingBottom: "80px",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "white",
          padding: "16px 20px",
          borderBottom: "1px solid #F3F4F6",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <button
          onClick={handleBack}
          style={{
            background: "none",
            border: "none",
            color: "#374151",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
            transition: "color 0.2s",
          }}
        >
          <IoArrowBack size={24} />
        </button>

        <form
          onSubmit={handleSearch}
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
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
              autoFocus
              style={{
                width: "100%",
                padding: "12px 44px 12px 52px",
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
                type="button"
                onClick={clearSearch}
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
                  padding: 0,
                  zIndex: 2,
                }}
              >
                <IoCloseCircle size={20} />
              </button>
            )}
          </div>
        </form>
      </header>

      {/* Filters */}
      <div className="search-filters">
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="clothing">Clothing</option>
            <option value="shoes">Shoes</option>
            <option value="bags">Bags</option>
            <option value="lingerie">Lingerie</option>
            <option value="watch">Watch</option>
            <option value="hoodies">Hoodies</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="filter-select"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

        <div className="filter-group filter-group--price">
          <label className="filter-label">
            Price: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <div className="price-inputs">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="price-input"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="price-input"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="search-content">
        <div className="search-results-header">
          <h2 className="results-count">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "Result" : "Results"}
            {searchQuery && ` for "${searchQuery}"`}
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <IoSearchOutline size={64} className="no-results-icon" />
            <h3 className="no-results-title">No products found</h3>
            <p className="no-results-text">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product)}
              >
                <div className="product-card__image">
                  <img src={product.image} alt={product.name} />

                  {/* Save Button */}
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
                  <p className="product-card__category">{product.category || 'Uncategorized'}</p>
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
        )}
      </div>

      {/* Bottom Navigation */}
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