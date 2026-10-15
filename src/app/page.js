"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Gift,
  ShieldCheck,
  Heart,
  Quote,
  Camera,
  Award,
  Truck,
  CheckCircle2,
  Clock
} from "lucide-react";
import { PRODUCTS, CATEGORIES, HEALTH_QUOTES, TESTIMONIALS, INSTAGRAM_POSTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import { useCart } from "../context/CartContext";

export default function HomePage() {
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [featuredCarouselIndex, setFeaturedCarouselIndex] = useState(0);

  // Rotating Health Quotes interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % HEALTH_QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller);

  const nextFeatured = () => {
    setFeaturedCarouselIndex((prev) => (prev + 1) % Math.max(1, featuredProducts.length - 2));
  };
  const prevFeatured = () => {
    setFeaturedCarouselIndex((prev) => (prev === 0 ? Math.max(0, featuredProducts.length - 3) : prev - 1));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* 1. CINEMATIC FULL-SCREEN HERO WITH FLOATING DECORATIONS */}
      {/* 1. CINEMATIC LUXURY HERO SECTION */}
      <section
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          background: "radial-gradient(ellipse at 78% 30%, rgba(243, 220, 155, 0.42) 0%, rgba(254, 248, 238, 0.92) 42%, #FAF6F0 100%)",
          color: "var(--color-text)",
          overflow: "hidden",
          padding: "70px 0 90px",
          borderBottom: "1.5px solid rgba(197, 139, 46, 0.25)",
        }}
      >
        {/* Subtle warm ambient golden orbs */}
        <div className="gold-particle" style={{ width: "160px", height: "160px", top: "12%", left: "6%", opacity: 0.25 }} />
        <div className="gold-particle" style={{ width: "240px", height: "240px", bottom: "8%", right: "10%", animationDelay: "-3s", opacity: 0.3 }} />
        <div className="gold-particle" style={{ width: "100px", height: "100px", top: "55%", left: "42%", animationDelay: "-5s", opacity: 0.2 }} />

        <div className="container" style={{ position: "relative", zIndex: 10 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              alignItems: "center",
              gap: "48px",
            }}
          >
            {/* Left Hero Content */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 22px",
                  borderRadius: "999px",
                  background: "rgba(197, 139, 46, 0.12)",
                  border: "1.5px solid rgba(197, 139, 46, 0.4)",
                  color: "var(--color-secondary)",
                  fontSize: "0.88rem",
                  fontFamily: "var(--font-royal)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "24px",
                  boxShadow: "0 2px 10px rgba(197, 139, 46, 0.12)",
                }}
              >
                <Sparkles size={16} style={{ color: "var(--color-primary)" }} />
                Handcrafted Since 1994 • Brass Cauldrons
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.8rem, 5.2vw, 4.3rem)",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  lineHeight: 1.14,
                  color: "var(--color-secondary)",
                  marginBottom: "22px",
                  letterSpacing: "-0.01em",
                }}
              >
                The Royal Symphony of the{" "}
                <span className="gold-gradient-text" style={{ fontStyle: "italic", display: "inline-block" }}>
                  Acoustic Crunch
                </span>
              </h1>

              <p
                style={{
                  fontSize: "1.18rem",
                  color: "var(--color-text-light)",
                  lineHeight: 1.8,
                  marginBottom: "38px",
                  maxWidth: "580px",
                }}
              >
                Indulge in artisanal peanut chikkis, saffron Mamra almond brittles, and melt-in-mouth Kaju Katli prepared with <strong style={{ color: "var(--color-secondary)", fontWeight: 700 }}>100% organic Kolhapur jaggery</strong>, pure A2 cow desi ghee, and sun-roasted whole nuts. Zero refined white sugar.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "42px" }}>
                <Link href="/shop" className="btn btn-primary btn-lg" style={{ fontSize: "1.1rem", padding: "16px 36px" }}>
                  Explore All Sweets <ArrowRight size={20} />
                </Link>
                <Link href="/custom-box" className="btn btn-secondary btn-lg" style={{ fontSize: "1.1rem", padding: "16px 32px" }}>
                  <Gift size={20} style={{ color: "var(--color-primary-light)" }} /> Build Custom Box
                </Link>
              </div>

              {/* Trust Indicators */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                  paddingTop: "26px",
                  borderTop: "1.5px solid rgba(197, 139, 46, 0.22)",
                }}
              >
                <div>
                  <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}>
                    4.98 ★
                  </div>
                  <div style={{ fontSize: "0.92rem", color: "var(--color-text-light)", fontWeight: 600 }}>15,000+ Orders</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}>
                    100%
                  </div>
                  <div style={{ fontSize: "0.92rem", color: "var(--color-text-light)", fontWeight: 600 }}>Organic Kolhapur Gur</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}>
                    24h
                  </div>
                  <div style={{ fontSize: "0.92rem", color: "var(--color-text-light)", fontWeight: 600 }}>Express Dispatch</div>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase Luxury Card */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "26px",
                  padding: "26px",
                  border: "1.5px solid rgba(197, 139, 46, 0.35)",
                  boxShadow: "0 24px 60px rgba(184, 107, 39, 0.16), 0 4px 18px rgba(0, 0, 0, 0.05)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Gold corner accent glow */}
                <div
                  style={{
                    position: "absolute",
                    top: "-40px",
                    right: "-40px",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(243, 220, 155, 0.5) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                  <span className="badge badge-gold" style={{ fontSize: "0.85rem", padding: "6px 14px", fontWeight: 700 }}>
                    <Award size={14} /> Crown Jewel 2026
                  </span>
                  <span style={{ fontSize: "0.88rem", color: "var(--color-accent)", fontWeight: 700, fontFamily: "var(--font-royal)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Stone-Rolled 3mm Glass Snap
                  </span>
                </div>

                <div
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    marginBottom: "20px",
                    background: "var(--color-bg)",
                    border: "1.5px solid rgba(197, 139, 46, 0.25)",
                    position: "relative",
                  }}
                >
                  <img
                    src="/images/products/mixed-nuts-chikki.png"
                    alt="Mixed Nuts Chikki"
                    style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }}
                  />
                </div>

                <div>
                  <div style={{ fontFamily: "var(--font-royal)", fontSize: "0.84rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-accent)", fontWeight: 800 }}>
                    Artisanal Chikki / Brittle
                  </div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", color: "var(--color-secondary)", marginTop: "6px", fontWeight: 700 }}>
                    Mixed Nuts Chikki
                  </h3>
                  <p style={{ fontSize: "0.98rem", color: "var(--color-text-light)", marginTop: "6px", lineHeight: 1.65 }}>
                    Almonds, pistachios, cashews, and walnuts folded in shimmering amber jaggery with crisp acoustic snap.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    paddingTop: "18px",
                    borderTop: "1.5px solid rgba(197, 139, 46, 0.2)",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-secondary)", fontFamily: "var(--font-heading)" }}>₹749</span>
                    <span style={{ fontSize: "0.95rem", color: "var(--color-text-light)", marginLeft: "8px", fontWeight: 600 }}>/ 500g Tin</span>
                  </div>
                  <Link href="/shop/mixed-nuts-chikki" className="btn btn-primary btn-sm" style={{ fontSize: "0.96rem", padding: "10px 22px" }}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES SHOWCASE (3 Categories) */}
      <section style={{ padding: "90px 0 70px", background: "var(--color-bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 52px" }}>
            <span style={{ fontFamily: "var(--font-royal)", fontSize: "0.92rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-accent)", fontWeight: 800 }}>
              Curated Collections
            </span>
            <h2 style={{ fontSize: "2.8rem", fontFamily: "var(--font-heading)", color: "var(--color-secondary)", marginTop: "8px" }}>
              Our Signature Specialties
            </h2>
            <p style={{ fontSize: "1.1rem", color: "var(--color-text-light)", marginTop: "10px", lineHeight: 1.7 }}>
              Explore our three core departments of authentic Indian craftsmanship.
            </p>
          </div>

          <div className="grid-3-cols">
            {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className="luxury-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  border: "1.5px solid rgba(212, 168, 83, 0.35)",
                }}
              >
                <div style={{ position: "relative", height: "250px", overflow: "hidden" }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "14px",
                      left: "14px",
                      background: "rgba(60, 21, 24, 0.92)",
                      color: "var(--color-bg)",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {cat.count} Varieties
                  </div>
                </div>

                <div style={{ padding: "26px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{cat.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.45rem", color: "var(--color-secondary)", marginBottom: "10px" }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: "1.02rem", color: "var(--color-text-light)", lineHeight: 1.65, flex: 1, marginBottom: "20px" }}>
                    {cat.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary-dark)", fontWeight: 700, fontSize: "1.0rem" }}>
                    Explore Category <ArrowRight size={17} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CAROUSEL */}
      <section style={{ padding: "80px 0", background: "var(--color-bg-alt)", borderTop: "1px solid rgba(212, 168, 83, 0.25)", borderBottom: "1px solid rgba(212, 168, 83, 0.25)" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "20px", marginBottom: "40px" }}>
            <div>
              <span style={{ fontFamily: "var(--font-royal)", fontSize: "0.92rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-accent)", fontWeight: 800 }}>
                Handpicked Favorites
              </span>
              <h2 style={{ fontSize: "2.8rem", fontFamily: "var(--font-heading)", color: "var(--color-secondary)", marginTop: "8px" }}>
                Featured Sweets Carousel
              </h2>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={prevFeatured}
                aria-label="Previous"
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  border: "1.5px solid var(--color-primary)",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--color-secondary)",
                }}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={nextFeatured}
                aria-label="Next"
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  border: "1.5px solid var(--color-primary)",
                  background: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#200B0D",
                }}
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          <div className="grid-4-cols">
            {featuredProducts.slice(featuredCarouselIndex, featuredCarouselIndex + 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. HEALTH & WELLNESS QUOTES SECTION (ROTATING) */}
      <section
        style={{
          padding: "90px 0",
          background: "linear-gradient(135deg, #361216 0%, #200A0D 100%)",
          color: "var(--color-bg)",
          position: "relative",
          overflow: "hidden",
          borderTop: "2px solid rgba(197, 139, 46, 0.35)",
          borderBottom: "2px solid rgba(197, 139, 46, 0.35)",
        }}
      >
        <div className="container" style={{ maxWidth: "1100px", textAlign: "center", position: "relative", zIndex: 10 }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(212, 168, 83, 0.2)",
              border: "1.5px solid var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              color: "var(--color-primary-light)",
            }}
          >
            <Quote size={28} />
          </div>

          <span
            className="badge badge-gold"
            style={{ marginBottom: "20px", letterSpacing: "0.1em", fontSize: "0.85rem", padding: "6px 16px" }}
          >
            {HEALTH_QUOTES[activeQuoteIndex].tag}
          </span>

          <p
            className="font-accent"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontStyle: "italic",
              color: "#ffffff",
              lineHeight: 1.55,
              marginBottom: "24px",
              minHeight: "110px",
            }}
          >
            &ldquo;{HEALTH_QUOTES[activeQuoteIndex].quote}&rdquo;
          </p>

          <div style={{ fontFamily: "var(--font-royal)", fontSize: "1.15rem", color: "var(--color-primary-light)", fontWeight: 700, letterSpacing: "0.06em" }}>
            — {HEALTH_QUOTES[activeQuoteIndex].author}
          </div>

          {/* Dots Indicator */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "28px" }}>
            {HEALTH_QUOTES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveQuoteIndex(idx)}
                style={{
                  width: activeQuoteIndex === idx ? "28px" : "10px",
                  height: "10px",
                  borderRadius: "999px",
                  background: activeQuoteIndex === idx ? "var(--color-primary)" : "rgba(255, 255, 255, 0.35)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. BESTSELLERS GRID */}
      <section style={{ padding: "90px 0", background: "var(--color-bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 52px" }}>
            <span style={{ fontFamily: "var(--font-royal)", fontSize: "0.92rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-accent)", fontWeight: 800 }}>
              Customer Favorites
            </span>
            <h2 style={{ fontSize: "2.8rem", fontFamily: "var(--font-heading)", color: "var(--color-secondary)", marginTop: "8px" }}>
              Our Most Celebrated Bestsellers
            </h2>
            <p style={{ fontSize: "1.1rem", color: "var(--color-text-light)", marginTop: "10px", lineHeight: 1.7 }}>
              Timeless recipes perfected across 30 years and thousands of festive gatherings.
            </p>
          </div>

          <div className="grid-4-cols">
            {bestsellers.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Link href="/shop" className="btn btn-secondary btn-lg" style={{ fontSize: "1.15rem", padding: "16px 36px" }}>
              Explore All 18 Creations <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CUSTOM ORDER CTA BANNER */}
      <section style={{ padding: "90px 0", background: "var(--color-bg-alt)" }}>
        <div className="container">
          <div
            className="glass-card"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, var(--color-bg) 100%)",
              border: "2px solid var(--color-primary)",
              padding: "clamp(30px, 4vw, 54px) clamp(20px, 3.5vw, 44px)",
              borderRadius: "28px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              alignItems: "center",
              gap: "44px",
            }}
          >
            <div>
              <span className="badge badge-gold" style={{ marginBottom: "16px", fontSize: "0.85rem", padding: "6px 14px" }}>
                🎁 Bespoke & Bulk Orders
              </span>
              <h2 style={{ fontSize: "2.8rem", fontFamily: "var(--font-heading)", color: "var(--color-secondary)", marginBottom: "16px", lineHeight: 1.2 }}>
                Weddings, Corporate Gifting & Custom Boxes
              </h2>
              <p style={{ fontSize: "1.12rem", color: "var(--color-text-light)", lineHeight: 1.75, marginBottom: "28px" }}>
                Create personalized sweet hampers with your custom brass logos, silk ribbons, and hand-selected brittles. Direct pan-India dispatch to your guest list.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px", fontSize: "1.05rem", color: "var(--color-text)", fontWeight: 600 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={20} style={{ color: "var(--color-success)" }} /> Tiered wholesale bulk discounts
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={20} style={{ color: "var(--color-success)" }} /> Velvet keepsake trunks & embossed canisters
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={20} style={{ color: "var(--color-success)" }} /> 1-on-1 Dedicated Gifting Concierge
                </div>
              </div>

              <Link href="/custom-orders" className="btn btn-primary btn-lg" style={{ fontSize: "1.12rem", padding: "16px 34px" }}>
                Inquire For Custom Orders <ArrowRight size={20} />
              </Link>
            </div>

            <div style={{ borderRadius: "20px", overflow: "hidden", border: "2px solid var(--color-primary)", boxShadow: "var(--shadow-md)" }}>
              <img
                src="/images/products/gift-boxes-hampers.png"
                alt="Luxury Sweet Hampers"
                style={{ width: "100%", height: "380px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section style={{ padding: "90px 0", background: "var(--color-bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 52px" }}>
            <span style={{ fontFamily: "var(--font-royal)", fontSize: "0.92rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-accent)", fontWeight: 800 }}>
              Royal Connoisseurs
            </span>
            <h2 style={{ fontSize: "2.8rem", fontFamily: "var(--font-heading)", color: "var(--color-secondary)", marginTop: "8px" }}>
              Loved Across Generations
            </h2>
          </div>

          <div className="grid-3-cols">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="luxury-card"
                style={{
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: "5px", color: "var(--color-primary)", marginBottom: "16px" }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="var(--color-primary)" color="var(--color-primary)" />
                    ))}
                  </div>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.28rem", color: "var(--color-secondary)", marginBottom: "12px", lineHeight: 1.35 }}>
                    &ldquo;{t.title}&rdquo;
                  </h4>
                  <p style={{ fontSize: "1.02rem", color: "var(--color-text-light)", lineHeight: 1.7, marginBottom: "24px" }}>
                    {t.comment}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingTop: "16px", borderTop: "1px solid rgba(212, 168, 83, 0.25)" }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--color-primary)" }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--color-secondary)" }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: "0.88rem", color: "var(--color-accent)", fontWeight: 600 }}>
                      {t.location} • Verified Buyer
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INSTAGRAM / SOCIAL FEED SECTION */}
      <section style={{ padding: "80px 0", background: "var(--color-bg-alt)", borderTop: "1px solid rgba(212, 168, 83, 0.25)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--color-accent)", fontSize: "0.94rem", fontFamily: "var(--font-royal)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>
              <Camera size={18} /> @JFMSweetsOfficial
            </div>
            <h2 style={{ fontSize: "2.6rem", fontFamily: "var(--font-heading)", color: "var(--color-secondary)", marginTop: "8px" }}>
              Follow The Sweet Journey
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "18px",
            }}
          >
            {INSTAGRAM_POSTS.map((post) => (
              <div
                key={post.id}
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  height: "220px",
                  border: "1.5px solid var(--color-primary-light)",
                  cursor: "pointer",
                }}
              >
                <img
                  src={post.image}
                  alt="Instagram feed"
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(60, 21, 24, 0.8)",
                    opacity: 0,
                    transition: "opacity 0.25s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    padding: "18px",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                >
                  <Camera size={24} style={{ color: "var(--color-primary-light)", marginBottom: "8px" }} />
                  <div style={{ fontSize: "0.92rem", fontWeight: 700 }}>{post.likes} Likes</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-bg)", marginTop: "6px", lineHeight: 1.4 }}>
                    {post.caption.slice(0, 50)}...
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
