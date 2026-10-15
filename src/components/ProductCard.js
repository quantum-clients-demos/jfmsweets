"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingBag, Eye, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [selectedWeight, setSelectedWeight] = useState(
    product.defaultWeight || Object.keys(product.pricing)[0]
  );
  const [isHovered, setIsHovered] = useState(false);

  const pricing = product.pricing[selectedWeight] || Object.values(product.pricing)[0];
  const wishlisted = isWishlisted(product.id);
  const targetUrl = `/shop/${product.slug || product.id}`;

  const categoryDisplay = product.categoryLabel
    ? product.categoryLabel.replace("/", "&")
    : "Artisanal Sweet";

  return (
    <div
      className="luxury-card product-card-root"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Media Area with Luxury Image Showcase */}
      <div className="product-card-media">
        <Link href={targetUrl} className="product-media-link" tabIndex={-1}>
          <img
            src={product.image}
            alt={product.name}
            className="product-card-img"
          />
        </Link>

        {/* Dark Luxury Floating Badge with Champagne Gold Trim */}
        {product.badge && (
          <div className="product-card-badge-wrap">
            <span className="product-card-badge">
              <Sparkles size={11} className="badge-sparkle-icon" />
              <span>{product.badge}</span>
            </span>
          </div>
        )}

        {/* Wishlist Floating Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id, product.name);
          }}
          aria-label="Save to wishlist"
          className={`product-wishlist-btn ${wishlisted ? "wishlisted" : ""}`}
        >
          <Heart size={16} fill={wishlisted ? "var(--color-error)" : "none"} />
        </button>

        {/* Desktop Quick View Overlay Button */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="product-quickview-btn"
            aria-label={`Quick preview for ${product.name}`}
          >
            <Eye size={15} />
            <span>Quick View</span>
          </button>
        )}
      </div>

      {/* Product Content Details */}
      <div className="product-card-body">
        {/* Category & Star Rating Row */}
        <div className="product-meta-row">
          <span className="product-category-tag" title={categoryDisplay}>
            {categoryDisplay}
          </span>
          <div className="product-rating-pill">
            <Star size={12} fill="#c9882a" color="#c9882a" />
            <span className="product-rating-val">{product.rating}</span>
            <span className="product-rating-count">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <Link href={targetUrl} className="product-title-anchor">
          <h3 className="product-card-title">{product.name}</h3>
        </Link>

        {/* Short Tagline with Locked Height for Uniform Alignment */}
        <p className="product-card-tagline">{product.tagline}</p>

        {/* Tactile Weight Selector Chips */}
        <div className="product-weight-track">
          {Object.keys(product.pricing).map((weightKey) => {
            const isSelected = selectedWeight === weightKey;
            return (
              <button
                key={weightKey}
                onClick={() => setSelectedWeight(weightKey)}
                className={`product-weight-chip ${isSelected ? "selected" : ""}`}
                type="button"
                aria-pressed={isSelected}
              >
                {weightKey}
              </button>
            );
          })}
        </div>

        {/* Price & Add to Bag CTA Row */}
        <div className="product-footer-row">
          <div className="product-price-stack">
            <div className="product-price-line">
              <span className="product-price-current">₹{pricing.price}</span>
              {pricing.originalPrice && (
                <span className="product-price-original">₹{pricing.originalPrice}</span>
              )}
            </div>
            {pricing.savePercent && (
              <span className="product-save-chip">Save {pricing.savePercent}%</span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, selectedWeight, 1)}
            aria-label={`Add ${product.name} (${selectedWeight}) to bag`}
            className="product-add-btn"
          >
            <ShoppingBag size={15} />
            <span className="add-btn-label">Add</span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        /* Base Card Styling (Preserving existing mobile architecture) */
        .product-card-root {
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid rgba(212, 168, 83, 0.22);
          box-shadow: 0 4px 16px rgba(54, 18, 22, 0.04);
          overflow: hidden;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.28s ease;
        }

        /* Top Media Area */
        .product-card-media {
          position: relative;
          width: 100%;
          padding-top: 88%;
          overflow: hidden;
          background: var(--color-bg);
        }
        .product-media-link {
          position: absolute;
          inset: 0;
          display: block;
        }
        .product-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .product-card-root:hover .product-card-img {
          transform: scale(1.07);
        }

        /* Floating Badge */
        .product-card-badge-wrap {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 10;
          pointer-events: none;
        }
        .product-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(36, 17, 7, 0.92) 0%, rgba(20, 7, 2, 0.96) 100%);
          color: #fce7b0;
          border: 1px solid rgba(201, 136, 42, 0.55);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
        }
        .badge-sparkle-icon {
          color: #d5a657;
        }

        /* Wishlist Button */
        .product-wishlist-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 10;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(201, 136, 42, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-secondary);
          box-shadow: 0 3px 10px rgba(60, 21, 24, 0.1);
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .product-wishlist-btn:hover {
          transform: scale(1.1);
          background: #ffffff;
          border-color: var(--color-primary);
        }
        .product-wishlist-btn.wishlisted {
          color: var(--color-error);
          background: #ffffff;
          border-color: rgba(198, 40, 40, 0.35);
        }

        /* Desktop Quick View Overlay */
        .product-quickview-btn {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%) translateY(26px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          background: rgba(36, 17, 7, 0.95);
          backdrop-filter: blur(10px);
          color: #fce7b0;
          border: 1.5px solid #c9882a;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
          z-index: 10;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        /* Content Body */
        .product-card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* Meta Row */
        .product-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
          gap: 8px;
        }
        .product-category-tag {
          font-family: var(--font-royal);
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #925c0e;
          font-weight: 800;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .product-rating-pill {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-secondary);
          background: rgba(201, 136, 42, 0.09);
          padding: 2px 7px;
          border-radius: 999px;
          flex-shrink: 0;
        }
        .product-rating-val {
          color: var(--color-secondary);
        }
        .product-rating-count {
          color: #8c7c70;
          font-weight: 500;
          font-size: 0.74rem;
        }

        /* Title */
        .product-title-anchor {
          text-decoration: none;
          display: block;
        }
        .product-card-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-secondary);
          line-height: 1.3;
          margin-bottom: 6px;
          transition: color 0.2s ease;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .product-title-anchor:hover .product-card-title {
          color: var(--color-primary-dark);
        }

        /* Tagline */
        .product-card-tagline {
          font-size: 0.88rem;
          color: var(--color-text-light);
          line-height: 1.5;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 3em;
        }

        /* Weight Track */
        .product-weight-track {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .product-weight-chip {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid rgba(201, 136, 42, 0.25);
          background: #ffffff;
          color: var(--color-text-light);
          transition: all 0.15s ease;
        }
        .product-weight-chip:hover {
          border-color: var(--color-primary);
          color: var(--color-secondary);
        }
        .product-weight-chip.selected {
          border: 1.5px solid var(--color-primary);
          background: rgba(201, 136, 42, 0.12);
          color: var(--color-secondary);
          font-weight: 700;
          box-shadow: 0 2px 6px rgba(201, 136, 42, 0.18);
        }

        /* Footer Row */
        .product-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding-top: 12px;
          border-top: 1px solid rgba(212, 168, 83, 0.2);
          margin-top: auto;
        }
        .product-price-stack {
          min-width: 0;
        }
        .product-price-line {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .product-price-current {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--color-secondary);
          font-family: var(--font-heading);
          line-height: 1.1;
        }
        .product-price-original {
          font-size: 0.86rem;
          text-decoration: line-through;
          color: #9c8a7d;
          font-weight: 500;
        }
        .product-save-chip {
          font-size: 0.72rem;
          color: #1e5a39;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.28);
          padding: 1px 6px;
          border-radius: 4px;
          font-weight: 700;
          display: inline-block;
          margin-top: 2px;
        }

        /* Add to Bag CTA Button */
        .product-add-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
          color: #ffffff;
          border: none;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 12px rgba(197, 139, 46, 0.3);
          transition: all 0.2s ease;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .product-add-btn:hover {
          background: linear-gradient(135deg, #d5a657 0%, #b87a1d 100%);
          box-shadow: 0 6px 18px rgba(197, 139, 46, 0.45);
          transform: translateY(-1px);
        }
        .product-add-btn:active {
          transform: scale(0.97);
        }

        /* ========================================================
           DESKTOP-ONLY ENHANCEMENTS (>= 960px)
           Enhanced aesthetics without altering mobile styling
           ======================================================== */
        @media (min-width: 960px) {
          .product-card-root {
            border-radius: 20px;
            box-shadow: 0 6px 24px rgba(54, 18, 22, 0.05);
            border-color: rgba(201, 136, 42, 0.25);
          }
          .product-card-root:hover {
            transform: translateY(-6px);
            box-shadow: 0 18px 42px rgba(54, 18, 22, 0.12), 0 0 0 1px rgba(201, 136, 42, 0.4);
            border-color: var(--color-primary);
          }

          /* Reveal Quick View button on hover */
          .product-card-root:hover .product-quickview-btn {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
          .product-quickview-btn:hover {
            background: #c9882a;
            color: #ffffff;
            border-color: #ffffff;
            transform: translateX(-50%) scale(1.04);
          }

          /* Slightly more relaxed desktop padding */
          .product-card-body {
            padding: 20px 22px 22px 22px;
          }

          .product-card-title {
            font-size: 1.25rem;
            margin-bottom: 8px;
          }

          .product-card-tagline {
            font-size: 0.92rem;
            min-height: 2.8em;
            margin-bottom: 14px;
          }

          .product-weight-chip {
            padding: 5px 12px;
            font-size: 0.84rem;
            border-radius: 7px;
          }

          .product-add-btn {
            padding: 10px 20px;
            font-size: 0.92rem;
          }
        }
      `}</style>
    </div>
  );
}
