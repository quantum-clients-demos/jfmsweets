"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Gift,
  ChevronDown,
  ChevronRight,
  User,
  ArrowRight
} from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data/products";

const emptySubscribe = () => () => {};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, wishlistCount, setIsCartOpen } = useCart();
  const { user } = useAuth();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const safeWishlistCount = mounted ? wishlistCount : 0;
  const safeCartCount = mounted ? cartCount : 0;
  const safeUser = mounted ? user : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileMenuOpen(false);
      setSearchOpen(false);
      setMegaMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <>
      {/* Top Royal Announcement Bar */}
      <div
        style={{
          background: "linear-gradient(90deg, #3C1518 0%, #200B0D 50%, #3C1518 100%)",
          color: "var(--color-bg)",
          fontSize: "0.92rem",
          padding: "10px 16px",
          textAlign: "center",
          borderBottom: "1px solid rgba(212, 168, 83, 0.3)",
          position: "relative",
          zIndex: 8100,
        }}
      >
        <div
          className="header-topbar-container"
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 clamp(16px, 3vw, 36px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ flex: 1, display: "none", alignItems: "center", gap: "8px", fontSize: "0.85rem", whiteSpace: "nowrap" }} className="topbar-left">
            <span style={{ color: "var(--color-primary)" }}>✦</span>
            <span>100% Organic Kolhapur Gur & Pure Desi Cow Ghee</span>
          </div>

          <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontWeight: 500, fontSize: "clamp(0.76rem, 2.4vw, 0.92rem)", textAlign: "center", padding: "0 10px" }}>
            <span
              style={{
                background: "var(--color-primary)",
                color: "#200B0D",
                padding: "2px 8px",
                borderRadius: "999px",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              FESTIVE OFFER
            </span>
            <span style={{ whiteSpace: "nowrap" }}>
              Code <strong style={{ color: "var(--color-primary-light)", letterSpacing: "0.05em", fontWeight: 800 }}>CRUNCH20</strong> for 20% off!
            </span>
          </div>

          <div style={{ flex: 1, display: "none", alignItems: "center", justifyContent: "flex-end", gap: "16px", fontSize: "0.88rem", whiteSpace: "nowrap" }} className="topbar-right">
            <Link href="/contact" style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--color-bg)", textDecoration: "none" }}>
              <PhoneCall size={14} style={{ color: "var(--color-primary)" }} />
              <span style={{ fontWeight: 600 }}>Bulk Orders: +91 98200 12345</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 8000,
          background: isScrolled ? "rgba(255, 248, 231, 0.96)" : "rgba(253, 245, 230, 0.94)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: isScrolled ? "1px solid rgba(212, 168, 83, 0.3)" : "1px solid rgba(212, 168, 83, 0.18)",
          boxShadow: isScrolled ? "var(--shadow-md)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="header-main-container"
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 clamp(16px, 2.5vw, 36px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: isScrolled ? "70px" : "82px",
            transition: "height 0.3s ease",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-secondary)",
              padding: "8px",
            }}
            className="mobile-toggle-btn"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px, 1.2vw, 12px)",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              className="logo-icon-box"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "11px",
                background: "linear-gradient(135deg, #3C1518 0%, #200B0D 100%)",
                border: "2px solid var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-primary-light)",
                boxShadow: "0 4px 12px rgba(60, 21, 24, 0.2)",
                flexShrink: 0,
              }}
            >
              <Sparkles size={19} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-royal)",
                  fontSize: "clamp(1.2rem, 2vw, 1.55rem)",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  color: "var(--color-secondary)",
                  lineHeight: 1.1,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                <span>JFM</span>
                <span style={{ color: "var(--color-primary-dark)" }}>SWEETS</span>
              </div>
              <div
                className="logo-subtitle"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--color-text-light)",
                  fontWeight: 700,
                  marginTop: "1px",
                  whiteSpace: "nowrap",
                }}
              >
                Royal Handcrafted Brittles
              </div>
            </div>
          </Link>

          {/* Desktop Navigation with Mega Menu - Beautifully Centered with Breathing Room */}
          <nav
            style={{
              display: "none",
              alignItems: "center",
              gap: "clamp(10px, 1.4vw, 24px)",
              margin: "0 16px",
              flex: 1,
              justifyContent: "center",
            }}
            className="desktop-nav"
          >
            <Link
              href="/"
              style={{
                fontSize: "0.93rem",
                fontWeight: pathname === "/" ? 800 : 600,
                color: pathname === "/" ? "var(--color-primary-dark)" : "var(--color-secondary)",
                letterSpacing: "0.015em",
                padding: "8px 2px",
                position: "relative",
                whiteSpace: "nowrap",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
            >
              <span>Home</span>
              {pathname === "/" && (
                <span style={{ position: "absolute", bottom: "0px", left: 0, right: 0, height: "2px", background: "var(--color-primary)", borderRadius: "2px" }} />
              )}
            </Link>

            {/* Shop with Mega Menu Trigger */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <Link
                href="/shop"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.93rem",
                  fontWeight: pathname.startsWith("/shop") ? 800 : 600,
                  color: pathname.startsWith("/shop") ? "var(--color-primary-dark)" : "var(--color-secondary)",
                  padding: "8px 2px",
                  letterSpacing: "0.015em",
                  position: "relative",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
              >
                <span>Shop</span>
                <ChevronDown size={14} style={{ transform: megaMenuOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                {pathname.startsWith("/shop") && (
                  <span style={{ position: "absolute", bottom: "0px", left: 0, right: 0, height: "2px", background: "var(--color-primary)", borderRadius: "2px" }} />
                )}
              </Link>

              {/* Mega Menu Dropdown */}
              {megaMenuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "-80px",
                    width: "590px",
                    background: "#ffffff",
                    borderRadius: "18px",
                    padding: "24px",
                    border: "1.5px solid var(--color-primary-light)",
                    boxShadow: "0 20px 50px rgba(54, 18, 22, 0.16)",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "22px",
                    zIndex: 9000,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ fontFamily: "var(--font-royal)", fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", color: "var(--color-primary-dark)", letterSpacing: "0.1em", marginBottom: "4px" }}>
                      Browse By Category
                    </div>
                    {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.id}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "10px 12px",
                          borderRadius: "10px",
                          transition: "background 0.2s",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-bg)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <span style={{ fontSize: "1.35rem" }}>{cat.icon}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "0.98rem", color: "var(--color-secondary)" }}>
                            {cat.name}
                          </div>
                          <div style={{ fontSize: "0.84rem", color: "var(--color-text-light)" }}>
                            {cat.count} items
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Mega Menu Featured Card */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, var(--color-secondary) 0%, #200B0D 100%)",
                      borderRadius: "14px",
                      padding: "20px",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span className="badge badge-gold" style={{ fontSize: "0.78rem", marginBottom: "10px" }}>
                        Bestseller
                      </span>
                      <h4 style={{ fontFamily: "var(--font-heading)", color: "#fff", fontSize: "1.25rem", marginBottom: "8px" }}>
                        Mixed Nuts Chikki
                      </h4>
                      <p style={{ fontSize: "0.9rem", color: "var(--color-bg)", lineHeight: 1.55 }}>
                        Pistachios, Mamra almonds, cashews & organic Kolhapur jaggery.
                      </p>
                    </div>
                    <Link
                      href="/shop/mixed-nuts-chikki"
                      className="btn btn-primary btn-sm"
                      style={{ marginTop: "16px", alignSelf: "flex-start", fontSize: "0.92rem", padding: "8px 18px" }}
                    >
                      View Sweet →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/custom-box"
              style={{
                fontSize: "0.93rem",
                fontWeight: pathname === "/custom-box" ? 800 : 600,
                color: pathname === "/custom-box" ? "var(--color-primary-dark)" : "var(--color-secondary)",
                letterSpacing: "0.015em",
                padding: "8px 2px",
                position: "relative",
                whiteSpace: "nowrap",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
            >
              <span>Build A Box</span>
              {pathname === "/custom-box" && (
                <span style={{ position: "absolute", bottom: "0px", left: 0, right: 0, height: "2px", background: "var(--color-primary)", borderRadius: "2px" }} />
              )}
            </Link>

            <Link
              href="/custom-orders"
              style={{
                fontSize: "0.93rem",
                fontWeight: pathname === "/custom-orders" ? 800 : 600,
                color: pathname === "/custom-orders" ? "var(--color-primary-dark)" : "var(--color-secondary)",
                letterSpacing: "0.015em",
                padding: "8px 2px",
                position: "relative",
                whiteSpace: "nowrap",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
            >
              <span>Bulk Orders</span>
              {pathname === "/custom-orders" && (
                <span style={{ position: "absolute", bottom: "0px", left: 0, right: 0, height: "2px", background: "var(--color-primary)", borderRadius: "2px" }} />
              )}
            </Link>

            <Link
              href="/about"
              style={{
                fontSize: "0.93rem",
                fontWeight: pathname === "/about" ? 800 : 600,
                color: pathname === "/about" ? "var(--color-primary-dark)" : "var(--color-secondary)",
                letterSpacing: "0.015em",
                padding: "8px 2px",
                position: "relative",
                whiteSpace: "nowrap",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
            >
              <span>About Us</span>
              {pathname === "/about" && (
                <span style={{ position: "absolute", bottom: "0px", left: 0, right: 0, height: "2px", background: "var(--color-primary)", borderRadius: "2px" }} />
              )}
            </Link>

            <Link
              href="/blog"
              style={{
                fontSize: "0.93rem",
                fontWeight: pathname.startsWith("/blog") ? 800 : 600,
                color: pathname.startsWith("/blog") ? "var(--color-primary-dark)" : "var(--color-secondary)",
                letterSpacing: "0.015em",
                padding: "8px 2px",
                position: "relative",
                whiteSpace: "nowrap",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
            >
              <span>Recipes</span>
              {pathname.startsWith("/blog") && (
                <span style={{ position: "absolute", bottom: "0px", left: 0, right: 0, height: "2px", background: "var(--color-primary)", borderRadius: "2px" }} />
              )}
            </Link>

            <Link
              href="/contact"
              style={{
                fontSize: "0.93rem",
                fontWeight: pathname === "/contact" ? 800 : 600,
                color: pathname === "/contact" ? "var(--color-primary-dark)" : "var(--color-secondary)",
                letterSpacing: "0.015em",
                padding: "8px 2px",
                position: "relative",
                whiteSpace: "nowrap",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
            >
              <span>Contact</span>
              {pathname === "/contact" && (
                <span style={{ position: "absolute", bottom: "0px", left: 0, right: 0, height: "2px", background: "var(--color-primary)", borderRadius: "2px" }} />
              )}
            </Link>
          </nav>

          {/* Right Action Icons: Search, Wishlist, Account, Cart */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "#ffffff",
                border: "1.5px solid var(--color-primary-light)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-secondary)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-primary-light)")}
            >
              <Search size={17} />
            </button>

            {/* Wishlist */}
            <Link
              href="/account?tab=wishlist"
              aria-label="Wishlist"
              className="desktop-only-action"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "#ffffff",
                border: "1.5px solid var(--color-primary-light)",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                color: safeWishlistCount > 0 ? "var(--color-error)" : "var(--color-secondary)",
                position: "relative",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-primary-light)")}
            >
              <Heart size={18} fill={safeWishlistCount > 0 ? "var(--color-error)" : "none"} />
              {safeWishlistCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    background: "var(--color-error)",
                    color: "#fff",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(198, 40, 40, 0.4)",
                  }}
                >
                  {safeWishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href={safeUser ? "/account" : "/auth/signin"}
              aria-label="Account"
              className="desktop-only-action"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "#ffffff",
                border: "1.5px solid var(--color-primary-light)",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-secondary)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-primary-light)")}
            >
              <User size={18} />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="header-cart-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                borderRadius: "999px",
                background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "0.92rem",
                letterSpacing: "0.02em",
                boxShadow: "0 4px 14px rgba(197, 139, 46, 0.35)",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <ShoppingBag size={17} />
              <span className="cart-text" style={{ display: "none" }}>Bag</span>
              <span
                style={{
                  background: "#ffffff",
                  color: "var(--color-secondary)",
                  fontSize: "0.78rem",
                  fontWeight: 900,
                  padding: "1px 6px",
                  borderRadius: "999px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                  minWidth: "18px",
                  textAlign: "center",
                }}
              >
                {safeCartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Search Slide Down Drawer */}
        {searchOpen && (
          <div
            style={{
              background: "#ffffff",
              borderTop: "1px solid var(--color-primary-light)",
              borderBottom: "1.5px solid var(--color-primary)",
              padding: "24px 0",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div className="container">
              <div style={{ position: "relative", maxWidth: "640px", margin: "0 auto" }}>
                <Search
                  size={22}
                  style={{
                    position: "absolute",
                    left: "18px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-primary)",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search peanut chikki, kaju katli, badam pak, gift hampers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "16px 48px 16px 54px",
                    borderRadius: "999px",
                    border: "2px solid var(--color-primary)",
                    background: "var(--color-bg)",
                    fontSize: "1.05rem",
                    outline: "none",
                    color: "var(--color-text)",
                  }}
                />
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchOpen(false);
                  }}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-text-light)",
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Live search results */}
              {searchResults.length > 0 && (
                <div
                  style={{
                    maxWidth: "640px",
                    margin: "14px auto 0",
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1.5px solid var(--color-primary-light)",
                    overflow: "hidden",
                    boxShadow: "0 14px 35px rgba(60, 21, 24, 0.12)",
                  }}
                >
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/shop/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "12px 18px",
                        borderBottom: "1px solid var(--color-bg)",
                        textDecoration: "none",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "48px", height: "48px", borderRadius: "10px", objectFit: "cover" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: "1.02rem", color: "var(--color-secondary)" }}>
                          {product.name}
                        </div>
                        <div style={{ fontSize: "0.88rem", color: "var(--color-primary-dark)", fontWeight: 600 }}>
                          {product.categoryLabel} • ₹{product.pricing[product.defaultWeight]?.price}
                        </div>
                      </div>
                      <ChevronRight size={18} style={{ color: "var(--color-primary)" }} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "84%",
              maxWidth: "360px",
              background: "#ffffff",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "10px 0 35px rgba(0,0,0,0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Sparkles size={24} style={{ color: "var(--color-primary)" }} />
                <span style={{ fontFamily: "var(--font-royal)", fontWeight: 800, fontSize: "1.45rem", color: "var(--color-secondary)", letterSpacing: "0.04em" }}>
                  JFM SWEETS
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-secondary)", padding: "4px" }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
              {[
                { name: "Home", href: "/" },
                { name: "Shop All Sweets", href: "/shop" },
                { name: "Build Custom Box", href: "/custom-box" },
                { name: "Custom & Bulk Orders", href: "/custom-orders" },
                { name: "About Us", href: "/about" },
                { name: "Recipes & Blog", href: "/blog" },
                { name: "Contact & Stores", href: "/contact" },
                { name: safeUser ? "My Account" : "Sign In", href: safeUser ? "/account" : "/auth/signin" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: pathname === link.href ? "var(--color-bg)" : "transparent",
                    color: pathname === link.href ? "var(--color-primary-dark)" : "var(--color-secondary)",
                    fontWeight: 700,
                    fontSize: "1.06rem",
                    textDecoration: "none",
                  }}
                >
                  <span>{link.name}</span>
                  <ChevronRight size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modern Sticky Mobile Bottom Navigation Bar (< 768px) */}
      <nav
        className="mobile-bottom-bar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 8900,
          background: "rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1.5px solid rgba(197, 139, 46, 0.3)",
          boxShadow: "0 -4px 20px rgba(54, 18, 22, 0.08)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "8px 12px calc(8px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <Link
          href="/"
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
            color: pathname === "/" ? "var(--color-primary-dark)" : "var(--color-text-light)",
            fontSize: "0.72rem",
            fontWeight: 700,
            textDecoration: "none",
            padding: "4px 0",
          }}
        >
          <Sparkles size={20} />
          <span>Home</span>
        </Link>

        <Link
          href="/shop"
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
            color: pathname.startsWith("/shop") ? "var(--color-primary-dark)" : "var(--color-text-light)",
            fontSize: "0.72rem",
            fontWeight: 700,
            textDecoration: "none",
            padding: "4px 0",
          }}
        >
          <ShoppingBag size={20} />
          <span>Shop</span>
        </Link>

        <Link
          href="/custom-box"
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
            color: pathname === "/custom-box" ? "var(--color-primary-dark)" : "var(--color-text-light)",
            fontSize: "0.72rem",
            fontWeight: 700,
            textDecoration: "none",
            padding: "4px 0",
          }}
        >
          <Gift size={20} />
          <span>Gift Box</span>
        </Link>

        <Link
          href="/account?tab=wishlist"
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
            color: safeWishlistCount > 0 ? "var(--color-error)" : "var(--color-text-light)",
            fontSize: "0.72rem",
            fontWeight: 700,
            textDecoration: "none",
            padding: "4px 0",
            position: "relative",
          }}
        >
          <Heart size={20} fill={safeWishlistCount > 0 ? "var(--color-error)" : "none"} />
          <span>Saved</span>
          {safeWishlistCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "0px",
                right: "calc(50% - 15px)",
                background: "var(--color-error)",
                color: "#fff",
                fontSize: "0.65rem",
                fontWeight: 900,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {safeWishlistCount}
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
            background: "none",
            border: "none",
            color: safeCartCount > 0 ? "var(--color-primary-dark)" : "var(--color-text-light)",
            fontSize: "0.72rem",
            fontWeight: 700,
            cursor: "pointer",
            padding: "4px 0",
            position: "relative",
          }}
        >
          <ShoppingBag size={20} />
          <span>Bag</span>
          {safeCartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "0px",
                right: "calc(50% - 15px)",
                background: "var(--color-primary)",
                color: "#200B0D",
                fontSize: "0.65rem",
                fontWeight: 900,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {safeCartCount}
            </span>
          )}
        </button>
      </nav>

      <style jsx global>{`
        .desktop-only-action {
          display: none !important;
        }
        @media (min-width: 768px) {
          .desktop-only-action {
            display: flex !important;
          }
        }
        .logo-subtitle {
          display: block;
        }
        @media (max-width: 580px) {
          .logo-subtitle {
            display: none !important;
          }
        }
        .header-cart-btn {
          padding: 8px 12px !important;
        }
        @media (min-width: 960px) {
          .header-cart-btn {
            padding: 9px 16px !important;
          }
        }
        .mobile-bottom-bar {
          display: flex !important;
        }
        @media (min-width: 768px) {
          .mobile-bottom-bar {
            display: none !important;
          }
        }
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
          .topbar-left, .topbar-right {
            display: flex !important;
          }
          .cart-text {
            display: inline !important;
          }
        }
      `}</style>
    </>
  );
}
