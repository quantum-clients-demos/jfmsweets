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
  Clock,
  Eye,
  Volume2
} from "lucide-react";
import { PRODUCTS, CATEGORIES, HEALTH_QUOTES, TESTIMONIALS, INSTAGRAM_POSTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import { useCart } from "../context/CartContext";

const HERO_SHOWCASE = [
  {
    id: "mixed-nuts",
    slug: "mixed-nuts-chikki",
    title: "Mixed Nuts Chikki",
    tabLabel: "Mixed Nuts Brittle",
    tabIcon: Sparkles,
    badge: "Crown Jewel 2026",
    sensoryTag: "Stone-Rolled 3mm Glass Snap",
    sensoryPill: "Acoustic 3mm Snap",
    craftPill: "100% Kolhapur Gur",
    categoryLabel: "Signature Brittle • Stone-Rolled",
    description: "Mamra almonds, pistachios, cashews & golden walnuts folded in shimmering amber jaggery with an unforgettable acoustic crunch.",
    price: 749,
    originalPrice: 920,
    unit: "/ 500g Tin",
    savePercent: 18,
    image: "/images/products/mixed-nuts-chikki.png",
    defaultWeight: "500g"
  },
  {
    id: "wedding-hampers",
    slug: "wedding-gift-boxes",
    title: "Royal Keepsake Hampers",
    tabLabel: "Brass Gift Hampers",
    tabIcon: Gift,
    badge: "Celebration Reserve",
    sensoryTag: "Brass Tin & Velvet Lining",
    sensoryPill: "4 Royal Confections",
    craftPill: "Pure Brass Keepsake",
    categoryLabel: "Artisanal Gifting • Velvet Keepsake",
    description: "Handcrafted ornate brass & velvet keepsake box customized with gold foil initials, packed with 4 royal brittle and dry fruit tin delicacies.",
    price: 999,
    originalPrice: 1200,
    unit: "/ 1kg Keepsake",
    savePercent: 17,
    image: "/images/products/wedding-gift-box.png",
    defaultWeight: "1kg"
  },
  {
    id: "almond-chikki",
    slug: "almond-chikki",
    title: "Shahi Mamra Almond Brittle",
    tabLabel: "Saffron Almond",
    tabIcon: Award,
    badge: "Royal Reserve",
    sensoryTag: "Pure Kashmiri Kesar Infused",
    sensoryPill: "Zero White Sugar",
    craftPill: "Kashmiri Kesar",
    categoryLabel: "Royal Brittle • Cold Roasted",
    description: "Plump Mamra almonds slow-roasted over wood embers and caramelized in organic sugarcane jaggery with hand-picked saffron threads.",
    price: 719,
    originalPrice: 870,
    unit: "/ 500g Tin",
    savePercent: 17,
    image: "/images/products/almond-chikki.png",
    defaultWeight: "500g"
  }
];

export default function HomePage() {
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [featuredCarouselIndex, setFeaturedCarouselIndex] = useState(0);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  // Rotating Health Quotes interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % HEALTH_QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Auto rotate hero showcase every 6.5s if not paused
  useEffect(() => {
    if (isHeroPaused) return;
    const heroTimer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % HERO_SHOWCASE.length);
    }, 6500);
    return () => clearInterval(heroTimer);
  }, [isHeroPaused]);

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller);

  const nextFeatured = () => {
    setFeaturedCarouselIndex((prev) => (prev + 1) % Math.max(1, featuredProducts.length - 2));
  };
  const prevFeatured = () => {
    setFeaturedCarouselIndex((prev) => (prev === 0 ? Math.max(0, featuredProducts.length - 3) : prev - 1));
  };

  const currentHero = HERO_SHOWCASE[activeHeroIndex];
  const currentHeroProduct = PRODUCTS.find((p) => p.slug === currentHero.slug) || PRODUCTS[0];

  const handleHeroQuickView = () => {
    if (currentHeroProduct) {
      setQuickViewProduct(currentHeroProduct);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* 1. CINEMATIC LUXURY HERO SECTION */}
      <section className="hero-luxury-section">
        {/* Ambient background watermark & glows */}
        <div className="hero-heritage-watermark" aria-hidden="true" />
        <div className="hero-ambient-glow" aria-hidden="true" />

        <div className="container hero-container">
          <div className="hero-grid">
            {/* Left Hero Content */}
            <div className="hero-left-col">
              <div className="hero-heritage-pill">
                <Sparkles size={15} className="pill-sparkle" />
                <span className="pill-text-desktop">Handcrafted Since 1994 • Brass Cauldrons of Rajkot</span>
                <span className="pill-text-mobile">Since 1994 • Brass Cauldrons • Rajkot</span>
              </div>

              <h1 className="hero-headline">
                The Royal Symphony of the{" "}
                <span className="hero-accent-text">
                  Acoustic Crunch
                </span>
              </h1>

              <p className="hero-description">
                Indulge in artisanal peanut chikkis, saffron Mamra almond brittles, and melt-in-mouth delicacies simmered in heavy brass cauldrons with <strong>100% organic Kolhapur jaggery</strong>, pure A2 cow desi ghee, and sun-roasted whole nuts. Zero refined white sugar.
              </p>

              {/* CTAs */}
              <div className="hero-cta-group">
                <Link href="/shop" className="btn btn-primary hero-btn-main">
                  <span>Explore All Sweets</span>
                  <ArrowRight size={19} />
                </Link>
                <Link href="/custom-box" className="btn btn-secondary hero-btn-custom">
                  <Gift size={19} className="gift-ico" />
                  <span>Build Custom Box</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="hero-trust-grid">
                <div className="trust-col">
                  <div className="trust-number">4.98 ★</div>
                  <div className="trust-label">
                    <span className="trust-label-desktop">15,000+ Connoisseurs</span>
                    <span className="trust-label-mobile">15k+ Reviews</span>
                  </div>
                </div>
                <div className="trust-divider" />
                <div className="trust-col">
                  <div className="trust-number">100%</div>
                  <div className="trust-label">
                    <span className="trust-label-desktop">Organic Kolhapur Gur</span>
                    <span className="trust-label-mobile">Kolhapur Gur</span>
                  </div>
                </div>
                <div className="trust-divider" />
                <div className="trust-col">
                  <div className="trust-number">24h</div>
                  <div className="trust-label">
                    <span className="trust-label-desktop">Wok-Fresh Dispatch</span>
                    <span className="trust-label-mobile">Fresh Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Purity Guarantee Strip */}
              <div className="hero-purity-strip">
                <ShieldCheck size={16} className="purity-shield" />
                <span>Pure Desi Ghee • Zero Palm Oil • Zero White Sugar • 100% Veg</span>
              </div>
            </div>

            {/* Right Hero Showcase Centerpiece */}
            <div
              className="hero-right-col"
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
            >
              <div className="hero-showcase-card">
                {/* Segmented Top Selection Tabs */}
                <div className="showcase-tabs-bar">
                  {HERO_SHOWCASE.map((item, idx) => {
                    const TabIcon = item.tabIcon;
                    const isActive = activeHeroIndex === idx;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveHeroIndex(idx)}
                        className={`showcase-tab-btn ${isActive ? "active" : ""}`}
                      >
                        <TabIcon size={13} className="tab-btn-icon" />
                        <span>{item.tabLabel}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Visual Image Presentation */}
                <div className="showcase-visual-wrap">
                  {/* Nav Arrows */}
                  <button
                    type="button"
                    onClick={() => setActiveHeroIndex((prev) => (prev === 0 ? HERO_SHOWCASE.length - 1 : prev - 1))}
                    className="showcase-nav-btn prev"
                    aria-label="Previous signature sweet"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveHeroIndex((prev) => (prev + 1) % HERO_SHOWCASE.length)}
                    className="showcase-nav-btn next"
                    aria-label="Next signature sweet"
                  >
                    <ChevronRight size={18} />
                  </button>

                  <div className="showcase-image-holder">
                    <img
                      key={currentHero.id}
                      src={currentHero.image}
                      alt={currentHero.title}
                      className="showcase-img"
                    />
                  </div>

                  {/* Overlaid Sensory & Craft Badges */}
                  <div className="floating-badge-top-left">
                    <Award size={13} className="badge-ico" />
                    <span>{currentHero.badge}</span>
                  </div>

                  <div className="floating-badge-top-right">
                    <span>{currentHero.sensoryTag}</span>
                  </div>

                  <div className="floating-badge-bottom-left">
                    <Volume2 size={13} className="badge-ico" />
                    <span>{currentHero.sensoryPill}</span>
                  </div>

                  <div className="floating-badge-bottom-right">
                    <span>{currentHero.craftPill}</span>
                  </div>
                </div>

                {/* Card Info & Pricing */}
                <div className="showcase-info-body">
                  <div className="showcase-meta-row">
                    <span className="showcase-cat-label">{currentHero.categoryLabel}</span>
                    <div className="showcase-dots">
                      {HERO_SHOWCASE.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => setActiveHeroIndex(dotIdx)}
                          className={`showcase-dot ${activeHeroIndex === dotIdx ? "active" : ""}`}
                          aria-label={`Show slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="showcase-title">{currentHero.title}</h3>
                  <p className="showcase-desc">{currentHero.description}</p>

                  <div className="showcase-action-strip">
                    <div className="showcase-pricing">
                      <div className="price-main">
                        <span className="price-val">₹{currentHero.price}</span>
                        <span className="price-unit">{currentHero.unit}</span>
                      </div>
                      <div className="price-sub">
                        <span className="price-orig">₹{currentHero.originalPrice}</span>
                        <span className="price-save">Save {currentHero.savePercent}%</span>
                      </div>
                    </div>

                    <div className="showcase-btn-actions">
                      <button
                        type="button"
                        onClick={handleHeroQuickView}
                        className="showcase-quickview-btn"
                        title="Quick View"
                      >
                        <Eye size={15} />
                        <span>Quick View</span>
                      </button>
                      <Link
                        href={`/shop/${currentHero.slug}`}
                        className="showcase-explore-btn"
                      >
                        <span>Details</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
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

      <style jsx>{`
        /* ========================================================
           LUXURY HERO SECTION STYLING
           ======================================================== */
        .hero-luxury-section {
          position: relative;
          min-height: 86vh;
          display: flex;
          align-items: center;
          background: radial-gradient(ellipse at 78% 28%, rgba(246, 226, 168, 0.45) 0%, rgba(254, 250, 244, 0.95) 50%, #FAF6F0 100%);
          color: var(--color-text);
          overflow: hidden;
          padding: 68px 0 88px;
          border-bottom: 1.5px solid rgba(197, 139, 46, 0.25);
        }

        /* Subtle Indian Royal Jaali Watermark Pattern */
        .hero-heritage-watermark {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.045;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30zM30 10l20 20-20 20L10 30z' fill='%23C58B2E' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E");
          background-repeat: repeat;
          z-index: 1;
        }

        /* Ambient Glow behind right showcase */
        .hero-ambient-glow {
          position: absolute;
          top: 15%;
          right: 8%;
          width: 540px;
          height: 540px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 168, 83, 0.3) 0%, rgba(243, 220, 155, 0.12) 45%, transparent 70%);
          filter: blur(45px);
          pointer-events: none;
          z-index: 2;
        }

        .hero-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1320px;
          box-sizing: border-box;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.95fr;
          align-items: center;
          gap: 52px;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        /* Left Column */
        .hero-left-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .pill-text-desktop {
          display: inline;
        }
        .pill-text-mobile {
          display: none;
        }

        .trust-label-desktop {
          display: inline;
        }
        .trust-label-mobile {
          display: none;
        }

        .hero-heritage-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border-radius: 999px;
          background: rgba(197, 139, 46, 0.12);
          border: 1.5px solid rgba(197, 139, 46, 0.38);
          color: var(--color-secondary);
          font-size: 0.86rem;
          font-family: var(--font-royal);
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 22px;
          box-shadow: 0 2px 10px rgba(197, 139, 46, 0.12);
          max-width: 100%;
          box-sizing: border-box;
        }

        .hero-heritage-pill :global(.pill-sparkle) {
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .hero-headline {
          font-size: clamp(2.7rem, 4.8vw, 4.1rem);
          font-family: var(--font-heading);
          font-weight: 800;
          line-height: 1.14;
          color: var(--color-secondary);
          margin-bottom: 20px;
          letter-spacing: -0.015em;
        }

        .hero-accent-text {
          font-style: italic;
          display: inline-block;
          background: linear-gradient(135deg, #a5701e 0%, #c58b2e 50%, #8b5a14 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1.14rem;
          color: var(--color-text-light);
          line-height: 1.8;
          margin-bottom: 36px;
          max-width: 580px;
        }

        .hero-description strong {
          color: var(--color-secondary);
          font-weight: 700;
        }

        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 38px;
        }

        .hero-btn-main {
          font-size: 1.08rem;
          padding: 15px 34px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          box-shadow: 0 4px 18px rgba(197, 139, 46, 0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hero-btn-main:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(197, 139, 46, 0.45);
        }

        .hero-btn-custom {
          font-size: 1.08rem;
          padding: 15px 30px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          transition: transform 0.2s ease;
        }
        .hero-btn-custom:hover {
          transform: translateY(-2px);
        }
        .hero-btn-custom :global(.gift-ico) {
          color: var(--color-primary-light);
          flex-shrink: 0;
        }

        /* Trust Strip */
        .hero-trust-grid {
          display: flex;
          align-items: center;
          gap: 22px;
          padding-top: 24px;
          border-top: 1.5px solid rgba(197, 139, 46, 0.22);
          margin-bottom: 18px;
          width: 100%;
          max-width: 560px;
        }

        .trust-col {
          flex: 1;
        }

        .trust-number {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--color-primary-dark);
          font-family: var(--font-heading);
          line-height: 1.2;
        }

        .trust-label {
          font-size: 0.88rem;
          color: var(--color-text-light);
          font-weight: 600;
          margin-top: 3px;
        }

        .trust-divider {
          width: 1px;
          height: 38px;
          background: rgba(197, 139, 46, 0.28);
          flex-shrink: 0;
        }

        .hero-purity-strip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #7a541e;
          font-weight: 700;
          background: rgba(197, 139, 46, 0.08);
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid rgba(197, 139, 46, 0.22);
        }
        .hero-purity-strip :global(.purity-shield) {
          color: #1e5a39;
          flex-shrink: 0;
        }

        /* Right Column Showcase Card */
        .hero-right-col {
          position: relative;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .hero-showcase-card {
          background: #ffffff;
          border-radius: 26px;
          border: 1.5px solid rgba(197, 139, 46, 0.38);
          box-shadow: 0 24px 60px rgba(184, 107, 39, 0.16), 0 4px 18px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          position: relative;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hero-showcase-card:hover {
          box-shadow: 0 28px 70px rgba(184, 107, 39, 0.22), 0 6px 22px rgba(0, 0, 0, 0.06);
        }

        /* Top Selection Tabs */
        .showcase-tabs-bar {
          display: flex;
          gap: 6px;
          padding: 12px 14px;
          background: #faf4eb;
          border-bottom: 1px solid rgba(197, 139, 46, 0.2);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .showcase-tabs-bar::-webkit-scrollbar {
          display: none;
        }

        .showcase-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 13px;
          border-radius: 999px;
          border: 1px solid rgba(197, 139, 46, 0.25);
          background: transparent;
          color: var(--color-text-light);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .showcase-tab-btn:hover {
          color: var(--color-secondary);
          border-color: var(--color-primary);
        }
        .showcase-tab-btn.active {
          background: linear-gradient(135deg, #3c1518 0%, #200b0d 100%);
          color: #fce7b0;
          border-color: #3c1518;
          box-shadow: 0 2px 8px rgba(60, 21, 24, 0.25);
        }
        .showcase-tab-btn :global(.tab-btn-icon) {
          flex-shrink: 0;
        }

        /* Visual Container */
        .showcase-visual-wrap {
          position: relative;
          height: 310px;
          overflow: hidden;
          background: #faf6f0;
        }

        .showcase-image-holder {
          width: 100%;
          height: 100%;
        }

        .showcase-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .showcase-visual-wrap:hover .showcase-img {
          transform: scale(1.05);
        }

        /* Nav Arrows */
        .showcase-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(197, 139, 46, 0.35);
          color: var(--color-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 6;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          opacity: 0;
        }
        .showcase-visual-wrap:hover .showcase-nav-btn {
          opacity: 1;
        }
        .showcase-nav-btn:hover {
          background: #ffffff;
          transform: translateY(-50%) scale(1.08);
          color: var(--color-primary-dark);
        }
        .showcase-nav-btn.prev {
          left: 12px;
        }
        .showcase-nav-btn.next {
          right: 12px;
        }

        /* Floating Badges Over Image */
        .floating-badge-top-left {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(54, 18, 22, 0.88);
          backdrop-filter: blur(8px);
          color: #fce7b0;
          border: 1px solid rgba(212, 168, 83, 0.45);
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
          z-index: 5;
        }
        .floating-badge-top-left :global(.badge-ico) {
          color: #d4a853;
          flex-shrink: 0;
        }

        .floating-badge-top-right {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          color: var(--color-accent);
          border: 1px solid rgba(197, 139, 46, 0.4);
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 800;
          font-family: var(--font-royal);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          z-index: 5;
        }

        .floating-badge-bottom-left {
          position: absolute;
          bottom: 14px;
          left: 14px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          color: var(--color-secondary);
          border: 1px solid rgba(197, 139, 46, 0.35);
          padding: 6px 13px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
          z-index: 5;
        }
        .floating-badge-bottom-left :global(.badge-ico) {
          color: #c58b2e;
          flex-shrink: 0;
        }

        .floating-badge-bottom-right {
          position: absolute;
          bottom: 14px;
          right: 14px;
          background: rgba(197, 139, 46, 0.94);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
          z-index: 5;
        }

        /* Info Body */
        .showcase-info-body {
          padding: 22px 24px 24px;
        }

        .showcase-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .showcase-cat-label {
          font-family: var(--font-royal);
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-accent);
          font-weight: 800;
        }

        .showcase-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .showcase-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(197, 139, 46, 0.3);
          cursor: pointer;
          padding: 0;
          transition: all 0.25s ease;
        }
        .showcase-dot.active {
          width: 22px;
          border-radius: 999px;
          background: var(--color-primary);
        }

        .showcase-title {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          color: var(--color-secondary);
          margin: 0 0 6px 0;
          font-weight: 700;
          line-height: 1.25;
        }

        .showcase-desc {
          font-size: 0.94rem;
          color: var(--color-text-light);
          margin: 0;
          line-height: 1.6;
        }

        .showcase-action-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1.5px solid rgba(197, 139, 46, 0.2);
          gap: 12px;
        }

        .showcase-pricing {
          display: flex;
          flex-direction: column;
        }

        .price-main {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .price-val {
          font-size: 1.7rem;
          font-weight: 800;
          color: var(--color-secondary);
          font-family: var(--font-heading);
          line-height: 1;
        }
        .price-unit {
          font-size: 0.88rem;
          color: var(--color-text-light);
          font-weight: 600;
        }

        .price-sub {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
        }
        .price-orig {
          font-size: 0.85rem;
          text-decoration: line-through;
          color: #9c8a7e;
        }
        .price-save {
          font-size: 0.78rem;
          font-weight: 700;
          color: #1e5a39;
          background: rgba(30, 90, 57, 0.1);
          padding: 1px 6px;
          border-radius: 4px;
        }

        .showcase-btn-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .showcase-quickview-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid rgba(197, 139, 46, 0.4);
          background: #ffffff;
          color: var(--color-secondary);
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .showcase-quickview-btn:hover {
          border-color: var(--color-primary);
          background: rgba(197, 139, 46, 0.08);
          color: var(--color-primary-dark);
        }

        .showcase-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
          color: #ffffff;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(197, 139, 46, 0.3);
          transition: all 0.2s ease;
        }
        .showcase-explore-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(197, 139, 46, 0.45);
        }

        /* ========================================================
           RESPONSIVE BREAKPOINTS
           ======================================================== */
        @media (max-width: 1040px) {
          .hero-luxury-section {
            padding: 48px 0 64px;
            min-height: auto;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            gap: 38px;
            width: 100%;
            max-width: 100%;
          }

          .hero-left-col {
            align-items: center;
            text-align: center;
            max-width: 680px;
            margin: 0 auto;
            width: 100%;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-cta-group {
            justify-content: center;
          }

          .hero-trust-grid {
            margin: 0 auto 16px;
            justify-content: center;
          }

          .hero-right-col {
            max-width: 480px;
            margin: 0 auto;
            width: 100%;
          }

          .showcase-nav-btn {
            opacity: 0.9;
          }
        }

        @media (max-width: 640px) {
          .hero-luxury-section {
            padding: 24px 0 44px;
            min-height: auto;
            overflow-x: hidden;
          }

          .hero-container {
            padding-left: 14px;
            padding-right: 14px;
            width: 100%;
            max-width: 100%;
          }

          .hero-grid {
            gap: 26px;
            width: 100%;
            max-width: 100%;
          }

          .hero-left-col {
            width: 100%;
            max-width: 100%;
            padding: 0;
          }

          /* Responsive text toggles */
          .pill-text-desktop {
            display: none !important;
          }
          .pill-text-mobile {
            display: inline !important;
          }

          .trust-label-desktop {
            display: none !important;
          }
          .trust-label-mobile {
            display: inline !important;
          }

          .hero-heritage-pill {
            font-size: 0.7rem;
            padding: 5px 12px;
            margin-bottom: 12px;
            letter-spacing: 0.05em;
            max-width: 100%;
            white-space: normal;
            text-align: center;
            line-height: 1.35;
          }

          .hero-headline {
            font-size: clamp(1.75rem, 6.8vw, 2.2rem);
            line-height: 1.18;
            margin-bottom: 12px;
            max-width: 100%;
            word-wrap: break-word;
          }

          .hero-description {
            font-size: 0.92rem;
            line-height: 1.55;
            margin-bottom: 18px;
            max-width: 100%;
          }

          .hero-cta-group {
            width: 100%;
            max-width: 100%;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 18px;
          }

          .hero-btn-main,
          .hero-btn-custom {
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            justify-content: center;
            padding: 13px 18px;
            font-size: 0.96rem;
            border-radius: 11px;
          }

          /* Compact 3-Column Trust Grid */
          .hero-trust-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4px;
            width: 100%;
            max-width: 100%;
            padding-top: 14px;
            margin-bottom: 12px;
            box-sizing: border-box;
          }

          .trust-col {
            text-align: center;
            min-width: 0;
            padding: 0 2px;
          }

          .trust-number {
            font-size: 1.25rem;
            line-height: 1.1;
          }

          .trust-label {
            font-size: 0.7rem;
            line-height: 1.25;
            margin-top: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .trust-divider {
            display: none;
          }

          /* Purity Guarantee Strip wrapping on mobile */
          .hero-purity-strip {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 4px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            font-size: 0.68rem;
            padding: 6px 10px;
            text-align: center;
            border-radius: 10px;
            line-height: 1.35;
          }

          /* Right Showcase Card on Mobile */
          .hero-right-col {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            box-sizing: border-box;
            margin: 0 auto;
          }

          .hero-showcase-card {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            box-sizing: border-box;
            border-radius: 18px;
          }

          .showcase-tabs-bar {
            padding: 8px 8px;
            gap: 5px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }

          .showcase-tab-btn {
            font-size: 0.72rem;
            padding: 5px 9px;
            gap: 4px;
            flex-shrink: 0;
          }

          .showcase-visual-wrap {
            height: 205px;
            width: 100%;
            max-width: 100%;
          }

          .floating-badge-top-left {
            font-size: 0.66rem;
            padding: 3px 7px;
            top: 8px;
            left: 8px;
            gap: 3px;
          }

          .floating-badge-top-right {
            font-size: 0.66rem;
            padding: 3px 7px;
            top: 8px;
            right: 8px;
          }

          .floating-badge-bottom-left {
            font-size: 0.68rem;
            padding: 3px 8px;
            bottom: 8px;
            left: 8px;
            gap: 3px;
          }

          .floating-badge-bottom-right {
            font-size: 0.66rem;
            padding: 3px 7px;
            bottom: 8px;
            right: 8px;
          }

          .showcase-nav-btn {
            width: 30px;
            height: 30px;
            opacity: 0.95;
          }
          .showcase-nav-btn.prev {
            left: 6px;
          }
          .showcase-nav-btn.next {
            right: 6px;
          }

          .showcase-info-body {
            padding: 12px 14px 14px;
            width: 100%;
            box-sizing: border-box;
          }

          .showcase-cat-label {
            font-size: 0.72rem;
          }

          .showcase-title {
            font-size: 1.25rem;
            margin-bottom: 3px;
          }

          .showcase-desc {
            font-size: 0.82rem;
            line-height: 1.45;
          }

          .showcase-action-strip {
            margin-top: 12px;
            padding-top: 10px;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .showcase-pricing {
            flex-direction: row;
            align-items: baseline;
            justify-content: space-between;
          }

          .price-val {
            font-size: 1.4rem;
          }

          .showcase-btn-actions {
            width: 100%;
            gap: 8px;
          }

          .showcase-quickview-btn,
          .showcase-explore-btn {
            flex: 1;
            justify-content: center;
            padding: 8px 10px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
