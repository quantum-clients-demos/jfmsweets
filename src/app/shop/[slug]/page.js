"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS } from "../../../data/products";
import ProductCard from "../../../components/ProductCard";
import ProductBenefitsSection from "../../../components/ProductBenefitsSection";
import { useCart } from "../../../context/CartContext";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Share2
} from "lucide-react";

function ShopProductDetailContent({ slug }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isWishlisted, addToast } = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(product.gallery?.[0] || product.image);
  const [selectedWeight, setSelectedWeight] = useState(product.defaultWeight || Object.keys(product.pricing)[0]);
  const [quantity, setQuantity] = useState(1);
  const [nutritionOpen, setNutritionOpen] = useState(true);

  // Pincode checker
  const [pincode, setPincode] = useState("");
  const [deliveryMsg, setDeliveryMsg] = useState(null);

  const pricing = product.pricing[selectedWeight] || Object.values(product.pricing)[0];
  const wishlisted = isWishlisted(product.id);

  const handleCheckDelivery = (e) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length < 6) {
      addToast("Please enter a valid 6-digit PIN code", "error");
      return;
    }
    const isMetro = ["11", "12", "40", "56", "50", "60", "70"].some((c) => pincode.startsWith(c));
    setDeliveryMsg(
      isMetro
        ? "⚡ Express Metro Dispatch: Arrives in 24-48 Hours! Free shipping eligible."
        : "Standard Courier: Arrives in 2 to 4 business days in crush-proof tins."
    );
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity);
    router.push("/checkout");
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const fallbackRelated = relatedProducts.length > 0 ? relatedProducts : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="product-detail-page-wrapper" style={{ paddingBottom: "90px", background: "var(--color-bg)" }}>
      {/* Breadcrumb */}
      <div style={{ background: "var(--color-bg-alt)", padding: "14px 0", borderBottom: "1px solid rgba(212, 168, 83, 0.25)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "6px 10px", flexWrap: "wrap", fontSize: "0.88rem", color: "var(--color-text-light)" }}>
            <Link href="/" style={{ color: "var(--color-primary-dark)", fontWeight: 700, textDecoration: "none" }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/shop" style={{ color: "var(--color-primary-dark)", fontWeight: 700, textDecoration: "none" }}>Shop</Link>
            <ChevronRight size={14} />
            <Link href={`/shop?category=${product.category}`} style={{ color: "var(--color-primary-dark)", fontWeight: 600, textDecoration: "none" }}>
              {product.categoryLabel}
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: "var(--color-secondary)", fontWeight: 800, wordBreak: "break-word" }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "clamp(24px, 4vw, 44px)" }}>
        {/* Main Product Grid */}
        <div className="product-detail-grid">
          {/* Left: Large Image Gallery */}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                borderRadius: "clamp(16px, 4vw, 24px)",
                overflow: "hidden",
                border: "2px solid var(--color-primary)",
                background: "#ffffff",
                boxShadow: "0 18px 45px rgba(60, 21, 24, 0.12)",
                marginBottom: "16px",
                position: "relative",
              }}
            >
              <img
                src={selectedImage}
                alt={product.name}
                style={{ width: "100%", height: "clamp(280px, 75vw, 480px)", objectFit: "cover", display: "block" }}
              />
              {product.badge && (
                <span className="badge badge-gold" style={{ position: "absolute", top: "14px", left: "14px", fontSize: "0.8rem", padding: "5px 12px" }}>
                  <Sparkles size={13} /> {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div
                className="gallery-thumbnails"
                style={{
                  display: "flex",
                  gap: "10px",
                  overflowX: "auto",
                  paddingBottom: "6px",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(imgUrl)}
                    aria-label={`Select photo ${idx + 1}`}
                    style={{
                      width: "clamp(64px, 16vw, 84px)",
                      height: "clamp(64px, 16vw, 84px)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: selectedImage === imgUrl ? "2.5px solid var(--color-primary)" : "1.5px solid var(--color-primary-light)",
                      cursor: "pointer",
                      padding: 0,
                      background: "#fff",
                      flexShrink: 0,
                      boxShadow: selectedImage === imgUrl ? "0 4px 12px rgba(212, 168, 83, 0.35)" : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}

            {/* Desktop Benefits & Related Quotes Section (Filling empty space under gallery) */}
            <div className="product-benefits-desktop-slot">
              <ProductBenefitsSection product={product} />
            </div>
          </div>

          {/* Right: Product Info & Actions */}
          <div style={{ minWidth: 0 }}>
            <span style={{ fontFamily: "var(--font-royal)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-accent)", fontWeight: 800 }}>
              {product.categoryLabel}
            </span>

            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)",
                color: "var(--color-secondary)",
                lineHeight: 1.25,
                marginTop: "6px",
                marginBottom: "10px",
                wordBreak: "break-word",
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px 12px", flexWrap: "wrap", marginBottom: "20px", fontSize: "0.95rem" }}>
              <div style={{ display: "flex", color: "var(--color-primary)" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--color-primary)" color="var(--color-primary)" />
                ))}
              </div>
              <span style={{ fontWeight: 800, color: "var(--color-secondary)" }}>{product.rating}</span>
              <span style={{ color: "var(--color-text-light)", fontWeight: 500 }}>• {product.reviewsCount} verified connoisseur reviews</span>
            </div>

            {/* Pricing Banner */}
            <div
              style={{
                background: "var(--color-bg-alt)",
                padding: "clamp(14px, 3vw, 20px) clamp(16px, 3.5vw, 24px)",
                borderRadius: "16px",
                border: "1.5px solid var(--color-primary)",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px 14px",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "clamp(1.8rem, 5vw, 2.4rem)", fontWeight: 800, color: "var(--color-secondary)", fontFamily: "var(--font-heading)" }}>
                  ₹{pricing.price}
                </span>
                {pricing.originalPrice && (
                  <span style={{ fontSize: "1.1rem", textDecoration: "line-through", color: "var(--color-text-light)", fontWeight: 500 }}>
                    ₹{pricing.originalPrice}
                  </span>
                )}
                {pricing.savePercent && (
                  <span style={{ fontSize: "0.85rem", color: "var(--color-success)", fontWeight: 800, background: "#E8F5EE", padding: "3px 10px", borderRadius: "999px" }}>
                    Save {pricing.savePercent}%
                  </span>
                )}
              </div>
              <span style={{ marginLeft: "auto", fontSize: "0.85rem", color: "var(--color-text-light)", fontWeight: 500 }}>
                Tax included
              </span>
            </div>

            <p style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.05rem)", color: "var(--color-text-light)", lineHeight: 1.7, marginBottom: "24px" }}>
              {product.description}
            </p>

            {/* Weight Options */}
            <div style={{ marginBottom: "26px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
                <span style={{ fontSize: "0.98rem", fontWeight: 700, color: "var(--color-secondary)" }}>
                  Select Package Weight:
                </span>
                <span style={{ fontSize: "0.82rem", color: "var(--color-primary-dark)", fontWeight: 700 }}>
                  Airtight Golden Keepsake Tin
                </span>
              </div>
              <div className="weight-options-grid">
                {Object.keys(product.pricing).map((weightKey) => {
                  const isSelected = selectedWeight === weightKey;
                  const wPricing = product.pricing[weightKey];
                  return (
                    <button
                      key={weightKey}
                      type="button"
                      onClick={() => setSelectedWeight(weightKey)}
                      style={{
                        padding: "clamp(10px, 2.5vw, 14px) clamp(8px, 2vw, 12px)",
                        borderRadius: "14px",
                        border: isSelected ? "2.5px solid var(--color-primary)" : "1.5px solid var(--color-primary-light)",
                        background: isSelected ? "var(--color-secondary)" : "#ffffff",
                        color: isSelected ? "#ffffff" : "var(--color-secondary)",
                        cursor: "pointer",
                        textAlign: "center",
                        boxShadow: isSelected ? "0 4px 14px rgba(60, 21, 24, 0.25)" : "none",
                        transition: "all 0.15s ease",
                        minWidth: 0,
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)" }}>{weightKey}</div>
                      <div style={{ fontSize: "clamp(0.82rem, 2.2vw, 0.92rem)", color: isSelected ? "var(--color-primary-light)" : "var(--color-primary-dark)", marginTop: "3px", fontWeight: 700 }}>
                        ₹{wPricing.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Buttons */}
            <div className="product-actions-wrap">
              {/* Stepper + Wishlist */}
              <div className="product-actions-aux">
                <div className="product-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="stepper-btn"
                  >
                    -
                  </button>
                  <span className="stepper-val">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="stepper-btn"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id, product.name)}
                  aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  className="wishlist-btn-detail"
                  style={{
                    color: wishlisted ? "var(--color-error)" : "var(--color-secondary)",
                  }}
                >
                  <Heart size={22} fill={wishlisted ? "var(--color-error)" : "none"} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={() => addToCart(product, selectedWeight, quantity)}
                className="btn btn-primary add-to-cart-main-btn"
              >
                <ShoppingBag size={20} /> Add to Cart (₹{pricing.price * quantity})
              </button>

              {/* Buy Now */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="btn btn-secondary buy-now-main-btn"
              >
                Buy Now
              </button>
            </div>

            {/* Luxury Brand Trust Perks */}
            <div className="product-perks-strip">
              <div className="product-perk-item">
                <Sparkles size={16} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                <span>Pure Desi Ghee</span>
              </div>
              <div className="product-perk-item">
                <ShieldCheck size={16} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                <span>0% Preservatives</span>
              </div>
              <div className="product-perk-item">
                <Clock size={16} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                <span>Daily Fresh Batches</span>
              </div>
              <div className="product-perk-item">
                <Truck size={16} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                <span>Crush-Proof Tin</span>
              </div>
            </div>

            {/* Pincode Estimator */}
            <div
              style={{
                background: "#ffffff",
                padding: "clamp(16px, 3vw, 22px)",
                borderRadius: "16px",
                border: "1.5px solid var(--color-primary-light)",
                marginBottom: "24px",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 700, fontSize: "0.98rem", marginBottom: "12px", color: "var(--color-secondary)" }}>
                <Truck size={20} style={{ color: "var(--color-primary)", flexShrink: 0 }} /> Check Express Delivery Pincode
              </div>
              <form onSubmit={handleCheckDelivery} style={{ display: "flex", gap: "10px", width: "100%", boxSizing: "border-box" }}>
                <input
                  type="text"
                  placeholder="Enter 6-digit PIN code"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid var(--color-primary)",
                    fontSize: "0.95rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "12px 20px",
                    background: "var(--color-secondary)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Check
                </button>
              </form>

              {deliveryMsg && (
                <div style={{ marginTop: "12px", fontSize: "0.9rem", color: "var(--color-success)", fontWeight: 600, lineHeight: 1.5 }}>
                  {deliveryMsg}
                </div>
              )}
            </div>

            {/* Mobile Benefits & Related Quotes Section (Placed right after purchase options & delivery) */}
            <div className="product-benefits-mobile-slot">
              <ProductBenefitsSection product={product} />
            </div>

            {/* Nutrition & Ingredients Accordion */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                border: "1.5px solid var(--color-primary-light)",
                overflow: "hidden",
                marginBottom: "24px",
              }}
            >
              <button
                type="button"
                onClick={() => setNutritionOpen(!nutritionOpen)}
                style={{
                  width: "100%",
                  padding: "clamp(14px, 3vw, 18px) clamp(16px, 3.5vw, 22px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "clamp(0.98rem, 2.5vw, 1.08rem)",
                  color: "var(--color-secondary)",
                  textAlign: "left",
                }}
              >
                <span>Ingredients & Nutritional Facts</span>
                <ChevronDown size={20} style={{ transform: nutritionOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
              </button>

              {nutritionOpen && (
                <div style={{ padding: "0 clamp(16px, 3.5vw, 22px) clamp(16px, 3.5vw, 22px)", borderTop: "1px solid var(--color-bg)", paddingTop: "16px" }}>
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontFamily: "var(--font-royal)", fontSize: "0.85rem", fontWeight: 800, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                      Pure Ingredients
                    </div>
                    <p style={{ fontSize: "0.95rem", color: "var(--color-text)", lineHeight: 1.6 }}>
                      {product.ingredients}
                    </p>
                  </div>

                  <div style={{ fontFamily: "var(--font-royal)", fontSize: "0.85rem", fontWeight: 800, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                    Approx. Nutrition per 100g
                  </div>
                  <div className="nutrition-grid">
                    {Object.entries(product.nutrition || {}).map(([k, v]) => (
                      <div key={k} style={{ background: "var(--color-bg)", padding: "10px 14px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                        <span style={{ textTransform: "capitalize", color: "var(--color-text-light)", fontSize: "0.88rem" }}>{k}</span>
                        <strong style={{ color: "var(--color-secondary)", fontSize: "0.95rem" }}>{v}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div style={{ background: "#ffffff", borderRadius: "20px", padding: "clamp(20px, 4vw, 36px)", border: "1.5px solid var(--color-primary-light)", marginBottom: "56px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.4rem, 4vw, 1.75rem)", color: "var(--color-secondary)", marginBottom: "18px" }}>
            Customer Reviews ({product.reviewsCount})
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ padding: "clamp(16px, 3.5vw, 22px)", borderRadius: "14px", background: "var(--color-bg)", border: "1px solid rgba(212, 168, 83, 0.25)" }}>
              <div style={{ display: "flex", gap: "5px", color: "var(--color-primary)", marginBottom: "8px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--color-primary)" color="var(--color-primary)" />
                ))}
              </div>
              <h4 style={{ fontWeight: 700, fontSize: "clamp(1.05rem, 2.5vw, 1.15rem)", color: "var(--color-secondary)", marginBottom: "6px" }}>
                The snap is unbelievable!
              </h4>
              <p style={{ fontSize: "clamp(0.92rem, 2.2vw, 1.02rem)", color: "var(--color-text-light)", lineHeight: 1.65 }}>
                You can immediately tell this is crafted with pure jaggery and roasted nuts without sugar syrups. Delivered fresh in the golden tin in 24 hours.
              </p>
              <div style={{ fontSize: "0.88rem", color: "var(--color-primary-dark)", marginTop: "10px", fontWeight: 700 }}>
                Sunita Malhotra, Mumbai • Verified Purchaser
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Carousel */}
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem, 4vw, 2.3rem)", color: "var(--color-secondary)", marginBottom: "26px", textAlign: "center" }}>
            You May Also Savor
          </h2>
          <div className="grid-4-cols">
            {fallbackRelated.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="mobile-sticky-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0, flex: 1 }}>
          <img
            src={selectedImage}
            alt={product.name}
            style={{ width: "42px", height: "42px", borderRadius: "8px", objectFit: "cover", border: "1px solid var(--color-primary-light)", flexShrink: 0 }}
          />
          <div style={{ minWidth: 0, overflow: "hidden" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--color-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {product.name}
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--color-primary-dark)" }}>
              ₹{pricing.price * quantity} <span style={{ fontSize: "0.75rem", color: "var(--color-text-light)", fontWeight: 500 }}>({selectedWeight})</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product, selectedWeight, quantity)}
          className="btn btn-primary"
          style={{ padding: "0 16px", height: "44px", fontSize: "0.92rem", flexShrink: 0, gap: "6px", whiteSpace: "nowrap" }}
        >
          <ShoppingBag size={16} /> Add to Cart
        </button>
      </div>

      <style jsx global>{`
        .product-detail-grid {
          display: grid;
          grid-template-columns: minmax(300px, 1fr) minmax(320px, 1.15fr);
          gap: clamp(24px, 4vw, 52px);
          align-items: start;
          margin-bottom: 56px;
        }

        .gallery-thumbnails::-webkit-scrollbar {
          display: none;
        }
        .gallery-thumbnails {
          scrollbar-width: none;
        }

        .weight-options-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .product-actions-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
          margin-bottom: 28px;
        }
        .product-actions-aux {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .product-stepper {
          display: flex;
          align-items: center;
          border: 2px solid var(--color-primary);
          border-radius: 999px;
          overflow: hidden;
          background: #fff;
          height: 52px;
        }
        .stepper-btn {
          padding: 0 16px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.35rem;
          color: var(--color-secondary);
          font-weight: 700;
        }
        .stepper-val {
          font-weight: 800;
          min-width: 36px;
          text-align: center;
          font-size: 1.15rem;
          color: var(--color-secondary);
        }
        .wishlist-btn-detail {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1.5px solid var(--color-primary-light);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(60, 21, 24, 0.1);
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .wishlist-btn-detail:hover {
          transform: scale(1.05);
        }
        .add-to-cart-main-btn {
          flex: 1 1 200px;
          height: 52px;
          font-size: 1.05rem;
          white-space: nowrap;
        }
        .buy-now-main-btn {
          height: 52px;
          padding: 0 24px;
          font-size: 1.05rem;
          white-space: nowrap;
        }

        .product-perks-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 24px;
          padding: 14px 16px;
          background: var(--color-bg-alt);
          border-radius: 14px;
          border: 1px solid var(--color-primary-light);
        }
        .product-perk-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-secondary);
        }

        .nutrition-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .mobile-sticky-bar {
          display: none;
        }

        /* Benefits & Quotes Slots */
        .product-benefits-desktop-slot {
          display: block;
          margin-top: 24px;
        }
        .product-benefits-mobile-slot {
          display: none;
        }

        @media (max-width: 900px) {
          .product-detail-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .product-benefits-desktop-slot {
            display: none !important;
          }
          .product-benefits-mobile-slot {
            display: block !important;
            margin-bottom: 24px;
          }
        }

        @media (max-width: 768px) {
          .product-detail-page-wrapper {
            padding-bottom: 120px !important;
          }
          .mobile-sticky-bar {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-top: 1.5px solid var(--color-primary-light);
            padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            box-shadow: 0 -4px 20px rgba(60, 21, 24, 0.12);
            box-sizing: border-box;
          }
        }

        @media (max-width: 680px) {
          .product-actions-wrap {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 24px;
          }
          .product-actions-aux {
            display: flex;
            width: 100%;
            justify-content: space-between;
            gap: 12px;
          }
          .product-stepper {
            flex: 1;
            justify-content: space-between;
          }
          .stepper-btn {
            padding: 0 20px;
          }
          .add-to-cart-main-btn {
            width: 100% !important;
            flex: none !important;
            height: 52px;
            font-size: 1.05rem;
          }
          .buy-now-main-btn {
            width: 100% !important;
            flex: none !important;
            height: 50px;
            font-size: 1.05rem;
          }

          .product-perks-strip {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px 14px;
            padding: 12px 14px;
          }
        }

        @media (max-width: 500px) {
          .nutrition-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .weight-options-grid {
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}

function ProductDetailWrapper() {
  const params = useParams();
  const slug = params?.slug || "";
  return <ShopProductDetailContent key={slug} slug={slug} />;
}

export default function ShopProductDetailPage() {
  return (
    <Suspense fallback={<div style={{ padding: "80px 20px", textAlign: "center" }}>Loading sweet details...</div>}>
      <ProductDetailWrapper />
    </Suspense>
  );
}
