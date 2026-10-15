"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Star, ShoppingBag, Heart, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [selectedWeight, setSelectedWeight] = useState(product?.defaultWeight || Object.keys(product?.pricing || {})[0]);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(product?.image);

  if (!product) return null;

  const pricing = product.pricing[selectedWeight] || Object.values(product.pricing)[0];
  const wishlisted = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart(product, selectedWeight, quantity);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box quickview-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Mobile Pull Handle Indicator */}
        <div className="quickview-pull-handle" />

        {/* Pinned Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="quickview-close-btn"
        >
          <X size={18} />
        </button>

        {/* Scrollable Content Body */}
        <div className="quickview-scroll-body">
          <div className="quickview-grid">
            {/* Left / Top: Image Gallery */}
            <div className="quickview-media">
              <div className="quickview-main-image-wrap">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="quickview-main-image"
                />
                {product.badge && (
                  <span className="badge badge-gold quickview-badge">
                    <Sparkles size={11} /> {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnail Selector */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="quickview-thumbnails">
                  {product.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImage(imgUrl)}
                      className={`quickview-thumb-btn ${currentImage === imgUrl ? "active" : ""}`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right / Details */}
            <div className="quickview-details">
              <div className="quickview-category">
                {product.categoryLabel}
              </div>
              <h2 className="quickview-title">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="quickview-rating-row">
                <div className="quickview-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#d5a657" color="#d5a657" />
                  ))}
                </div>
                <span className="quickview-rating-val">{product.rating}</span>
                <span className="quickview-rating-count">({product.reviewsCount} reviews)</span>
              </div>

              {/* Price Row */}
              <div className="quickview-price-row">
                <span className="quickview-price-current">
                  ₹{pricing.price}
                </span>
                {pricing.originalPrice && (
                  <span className="quickview-price-orig">
                    ₹{pricing.originalPrice}
                  </span>
                )}
                {pricing.savePercent && (
                  <span className="quickview-save-badge">
                    Save {pricing.savePercent}%
                  </span>
                )}
              </div>

              {/* Weight Options */}
              <div className="quickview-weight-section">
                <div className="quickview-weight-label">
                  Select Net Weight:
                </div>
                <div className="quickview-weight-pills">
                  {Object.keys(product.pricing).map((weightKey) => {
                    const isSelected = selectedWeight === weightKey;
                    return (
                      <button
                        key={weightKey}
                        type="button"
                        onClick={() => setSelectedWeight(weightKey)}
                        className={`quickview-weight-pill ${isSelected ? "selected" : ""}`}
                      >
                        {weightKey}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <p className="quickview-description">
                {product.description}
              </p>

              {/* Desktop-only Action Row (on mobile, shown in sticky bottom bar) */}
              <div className="quickview-desktop-actions">
                <div className="quickview-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="quickview-stepper-btn"
                  >
                    -
                  </button>
                  <span className="quickview-stepper-val">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="quickview-stepper-btn"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="btn btn-primary quickview-add-btn"
                >
                  <ShoppingBag size={18} /> Add to Cart (₹{pricing.price * quantity})
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id, product.name)}
                  aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  className="quickview-wishlist-btn"
                  style={{ color: wishlisted ? "#dc2626" : "var(--color-secondary)" }}
                >
                  <Heart size={20} fill={wishlisted ? "#dc2626" : "none"} />
                </button>
              </div>

              {/* Full Details Link */}
              <div className="quickview-full-details-link">
                <Link
                  href={`/shop/${product.slug || product.id}`}
                  onClick={onClose}
                >
                  View Full Nutritional Facts & Reviews <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Action Bar (always visible without scrolling on mobile) */}
        <div className="quickview-mobile-sticky-bar">
          <div className="quickview-stepper">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
              className="quickview-stepper-btn"
            >
              -
            </button>
            <span className="quickview-stepper-val">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
              className="quickview-stepper-btn"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="btn btn-primary quickview-mobile-add-btn"
          >
            <ShoppingBag size={18} /> Add to Cart (₹{pricing.price * quantity})
          </button>

          <button
            type="button"
            onClick={() => toggleWishlist(product.id, product.name)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="quickview-wishlist-btn"
            style={{ color: wishlisted ? "#dc2626" : "var(--color-secondary)" }}
          >
            <Heart size={20} fill={wishlisted ? "#dc2626" : "none"} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .quickview-pull-handle {
          display: none;
        }

        .quickview-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid var(--color-primary-light);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-secondary);
          z-index: 30;
          box-shadow: 0 4px 14px rgba(60, 21, 24, 0.16);
          transition: transform 0.15s ease;
        }
        .quickview-close-btn:hover {
          transform: scale(1.08);
        }

        .quickview-scroll-body {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--color-primary-light) transparent;
        }
        .quickview-scroll-body::-webkit-scrollbar {
          width: 5px;
        }
        .quickview-scroll-body::-webkit-scrollbar-track {
          background: transparent;
        }
        .quickview-scroll-body::-webkit-scrollbar-thumb {
          background: rgba(212, 168, 83, 0.45);
          border-radius: 999px;
        }

        .quickview-grid {
          display: grid;
          grid-template-columns: minmax(280px, 1fr) minmax(320px, 1.15fr);
          gap: 28px;
          padding: 28px;
        }

        .quickview-media {
          position: relative;
        }

        .quickview-main-image-wrap {
          border-radius: 14px;
          overflow: hidden;
          background: #f5ece1;
          border: 1px solid #ede3d2;
          margin-bottom: 12px;
          position: relative;
        }
        .quickview-main-image {
          width: 100%;
          height: 320px;
          object-fit: cover;
          display: block;
        }
        .quickview-badge {
          position: absolute;
          top: 12px;
          left: 12px;
        }

        .quickview-thumbnails {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }
        .quickview-thumbnails::-webkit-scrollbar {
          display: none;
        }
        .quickview-thumb-btn {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #d5a657;
          cursor: pointer;
          padding: 0;
          background: #fff;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }
        .quickview-thumb-btn.active {
          border: 2px solid var(--color-primary);
          box-shadow: 0 2px 8px rgba(212, 168, 83, 0.35);
        }
        .quickview-thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .quickview-details {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .quickview-category {
          font-family: var(--font-royal);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent);
          font-weight: 800;
          margin-bottom: 6px;
        }
        .quickview-title {
          font-family: var(--font-heading);
          font-size: 1.65rem;
          margin-bottom: 8px;
          color: var(--color-secondary);
          line-height: 1.25;
          word-break: break-word;
        }

        .quickview-rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
          font-size: 0.92rem;
          flex-wrap: wrap;
        }
        .quickview-stars {
          display: flex;
          color: #d5a657;
        }
        .quickview-rating-val {
          font-weight: 800;
          color: var(--color-secondary);
        }
        .quickview-rating-count {
          color: var(--color-text-light);
          font-size: 0.85rem;
        }

        .quickview-price-row {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .quickview-price-current {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--color-secondary);
          font-family: var(--font-heading);
        }
        .quickview-price-orig {
          font-size: 1.05rem;
          text-decoration: line-through;
          color: var(--color-text-light);
        }
        .quickview-save-badge {
          font-size: 0.82rem;
          color: var(--color-success);
          font-weight: 800;
          background: #e8f5ee;
          padding: 2px 9px;
          border-radius: 999px;
        }

        .quickview-weight-section {
          margin-bottom: 16px;
        }
        .quickview-weight-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-secondary);
          margin-bottom: 8px;
        }
        .quickview-weight-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .quickview-weight-pill {
          padding: 7px 14px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          border: 1.5px solid #d5a657;
          background: #ffffff;
          color: var(--color-text);
          transition: all 0.15s ease;
        }
        .quickview-weight-pill.selected {
          border: 2px solid var(--color-primary);
          background: var(--color-secondary);
          color: #ffffff;
        }

        .quickview-description {
          font-size: 0.95rem;
          color: var(--color-text-light);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .quickview-desktop-actions {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 20px;
        }
        .quickview-stepper {
          display: flex;
          align-items: center;
          border: 1.5px solid var(--color-primary);
          border-radius: 999px;
          overflow: hidden;
          background: #fff;
          height: 46px;
          flex-shrink: 0;
        }
        .quickview-stepper-btn {
          padding: 0 14px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          color: var(--color-secondary);
          font-weight: 700;
        }
        .quickview-stepper-val {
          font-weight: 800;
          min-width: 28px;
          text-align: center;
          font-size: 0.98rem;
          color: var(--color-secondary);
        }
        .quickview-add-btn {
          flex: 1;
          height: 46px;
          font-size: 0.98rem;
          white-space: nowrap;
          justify-content: center;
        }
        .quickview-wishlist-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1.5px solid var(--color-primary-light);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(60, 21, 24, 0.08);
          transition: transform 0.15s ease;
        }
        .quickview-wishlist-btn:hover {
          transform: scale(1.06);
        }

        .quickview-full-details-link {
          padding-top: 14px;
          border-top: 1px solid rgba(212, 168, 83, 0.25);
        }
        .quickview-full-details-link a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          color: var(--color-primary-dark);
          font-weight: 700;
          text-decoration: none;
        }

        .quickview-mobile-sticky-bar {
          display: none;
        }

        @media (max-width: 640px) {
          .quickview-pull-handle {
            display: block;
            width: 42px;
            height: 4px;
            background: rgba(212, 168, 83, 0.45);
            border-radius: 999px;
            margin: 10px auto 4px;
            flex-shrink: 0;
          }

          .quickview-close-btn {
            top: 10px;
            right: 12px;
            width: 34px;
            height: 34px;
          }

          .quickview-grid {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 10px 16px 18px;
          }

          .quickview-main-image {
            height: clamp(170px, 44vw, 210px);
          }

          .quickview-thumbnails {
            gap: 6px;
          }
          .quickview-thumb-btn {
            width: 48px;
            height: 48px;
          }

          .quickview-title {
            font-size: 1.35rem;
            margin-bottom: 6px;
          }
          .quickview-rating-row {
            margin-bottom: 10px;
          }
          .quickview-price-row {
            margin-bottom: 12px;
          }
          .quickview-price-current {
            font-size: 1.5rem;
          }

          .quickview-description {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 0.88rem;
            line-height: 1.5;
            margin-bottom: 14px;
          }

          .quickview-desktop-actions {
            display: none;
          }

          .quickview-full-details-link {
            padding-top: 10px;
            margin-bottom: 4px;
          }

          .quickview-mobile-sticky-bar {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 16px calc(10px + env(safe-area-inset-bottom, 0px));
            background: #ffffff;
            border-top: 1.5px solid var(--color-primary-light);
            box-shadow: 0 -4px 16px rgba(60, 21, 24, 0.08);
            flex-shrink: 0;
            z-index: 25;
            box-sizing: border-box;
          }
          .quickview-mobile-add-btn {
            flex: 1;
            height: 46px;
            font-size: 0.95rem;
            white-space: nowrap;
            justify-content: center;
            padding: 0 12px;
          }
        }
      `}</style>
    </div>
  );
}
