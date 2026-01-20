import React from "react";
import { useNavigate } from "react-router-dom";
import { IoHeartOutline, IoHeart, IoCloseOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { Product } from "../../context/AppContext";
import "./SearchResults.css";

interface SearchResultsProps {
  query: string;
  products: Product[];
  onClose: () => void;
  isSaved: (id: number) => boolean;
  toggleSave: (product: Product, e: React.MouseEvent) => void;
  addToCart: (product: Product, e: React.MouseEvent) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  products,
  onClose,
  isSaved,
  toggleSave,
  addToCart,
}) => {
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
    onClose();
  };

  return (
    <div className="search-results-overlay" onClick={onClose}>
      <div
        className="search-results-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="search-results-header">
          <h2 className="search-results-title">Search Results for "{query}"</h2>
          <button className="close-btn" onClick={onClose}>
            <IoCloseOutline size={28} />
          </button>
        </div>

        {/* Results */}
        <div className="search-results-content">
          {products.length === 0 ? (
            <div className="no-results">
              <p className="no-results-text">No products found for "{query}"</p>
              <p className="no-results-subtext">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <>
              <p className="results-count">
                Found {products.length}{" "}
                {products.length === 1 ? "product" : "products"}
              </p>
              <div className="search-results-grid">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="search-result-card"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="search-result-card__image">
                      <img src={product.image} alt={product.name} />
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
                    <div className="search-result-card__info">
                      <h3 className="search-result-card__name">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="search-result-card__description">
                          {product.description}
                        </p>
                      )}
                      <div className="search-result-card__footer">
                        <p className="search-result-card__price">
                          {product.price}
                        </p>
                        <button
                          className="add-cart-btn"
                          onClick={(e) => addToCart(product, e)}
                        >
                          <MdAddShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
