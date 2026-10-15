"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, PRODUCTS } from "../../data/products";
import ProductCard from "../../components/ProductCard";
import QuickViewModal from "../../components/QuickViewModal";
import { Search, Filter, SlidersHorizontal, X, Sparkles, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const queryParam = searchParams.get("q");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [searchQuery, setSearchQuery] = useState(queryParam || "");
  const [maxPrice, setMaxPrice] = useState(3500);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const itemsPerPage = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (categoryParam) setSelectedCategory(categoryParam);
    }, 0);
    return () => clearTimeout(timer);
  }, [categoryParam]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (queryParam) setSearchQuery(queryParam);
    }, 0);
    return () => clearTimeout(timer);
  }, [queryParam]);

  // Filtering
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Price range
      const basePrice = product.pricing[product.defaultWeight]?.price || 0;
      if (basePrice > maxPrice) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.categoryLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.pricing[a.defaultWeight]?.price || 0;
      const priceB = b.pricing[b.defaultWeight]?.price || 0;
      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }, [selectedCategory, maxPrice, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setMaxPrice(3500);
    setSortBy("featured");
    setCurrentPage(1);
  };

  return (
    <div style={{ paddingBottom: "90px", background: "var(--color-bg)" }}>
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #3C1518 0%, #200B0D 100%)",
          color: "var(--color-bg)",
          padding: "60px 0 50px",
          borderBottom: "2px solid var(--color-primary)",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <span
            style={{
              fontSize: "0.92rem",
              fontFamily: "var(--font-royal)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--color-primary-light)",
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Sparkles size={16} style={{ color: "var(--color-primary)" }} /> The Royal Store
          </span>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)",
              fontFamily: "var(--font-heading)",
              marginTop: "10px",
              color: "#fff",
            }}
          >
            All Handcrafted Sweets & Brittles
          </h1>
          <p style={{ color: "var(--color-bg-alt)", opacity: 0.95, maxWidth: "680px", margin: "14px auto 0", fontSize: "1.1rem", lineHeight: 1.7 }}>
            Freshly prepared in brass cauldrons with 100% organic Kolhapur jaggery, pure A2 desi ghee, and premium sun-roasted whole nuts.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "40px" }}>
        {/* Category Chips Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "center",
            marginBottom: "36px",
            paddingBottom: "18px",
            borderBottom: "1px solid rgba(212, 168, 83, 0.25)",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage(1);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 20px",
                  borderRadius: "999px",
                  fontSize: "0.96rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: isSelected ? "2px solid var(--color-primary)" : "1px solid rgba(212, 168, 83, 0.35)",
                  background: isSelected ? "var(--color-secondary)" : "#ffffff",
                  color: isSelected ? "#ffffff" : "var(--color-text)",
                  boxShadow: isSelected ? "0 4px 14px rgba(60, 21, 24, 0.2)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    background: isSelected ? "var(--color-primary)" : "var(--color-bg-alt)",
                    color: isSelected ? "#200B0D" : "var(--color-text-light)",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    fontWeight: 800,
                  }}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Layout: Sidebar Filters + Products Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "40px" }} className="shop-layout">
          {/* Filter Sidebar */}
          <aside
            style={{
              background: "#ffffff",
              padding: "26px",
              borderRadius: "20px",
              border: "1.5px solid rgba(212, 168, 83, 0.25)",
              height: "fit-content",
              boxShadow: "0 8px 24px rgba(60, 21, 24, 0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 800, fontSize: "1.15rem", color: "var(--color-secondary)", fontFamily: "var(--font-royal)" }}>
                <SlidersHorizontal size={20} style={{ color: "var(--color-primary)" }} /> Filters
              </div>
              <button
                onClick={clearAllFilters}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-primary-dark)",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Reset All
              </button>
            </div>

            {/* Search Box */}
            <div style={{ marginBottom: "26px" }}>
              <label style={{ display: "block", fontSize: "0.92rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "10px" }}>
                Search Sweets
              </label>
              <div style={{ position: "relative" }}>
                <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-primary)" }} />
                <input
                  type="text"
                  placeholder="e.g. Peanut, Kaju..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    width: "100%",
                    padding: "11px 14px 11px 38px",
                    borderRadius: "10px",
                    border: "1.5px solid var(--color-primary-light)",
                    fontSize: "0.95rem",
                    outline: "none",
                    background: "var(--color-bg)",
                  }}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: "26px" }}>
              <label style={{ display: "block", fontSize: "0.92rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "12px" }}>
                Category
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      color: selectedCategory === cat.id ? "var(--color-primary-dark)" : "var(--color-text)",
                      fontWeight: selectedCategory === cat.id ? 700 : 500,
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.id}
                        onChange={() => {
                          setSelectedCategory(cat.id);
                          setCurrentPage(1);
                        }}
                      />
                      <span>{cat.name}</span>
                    </span>
                    <span style={{ fontSize: "0.85rem", color: "var(--color-text-light)" }}>({cat.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div style={{ marginBottom: "26px", paddingTop: "18px", borderTop: "1px solid rgba(212, 168, 83, 0.25)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--color-secondary)" }}>
                  Max Price
                </label>
                <span style={{ fontSize: "0.98rem", fontWeight: 800, color: "var(--color-secondary)", fontFamily: "var(--font-heading)" }}>
                  ₹{maxPrice}
                </span>
              </div>
              <input
                type="range"
                min={150}
                max={3500}
                step={50}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{ width: "100%", accentColor: "var(--color-primary)", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--color-text-light)", marginTop: "6px" }}>
                <span>₹150</span>
                <span>₹3,500</span>
              </div>
            </div>

            {/* Dietary Trust Box */}
            <div
              style={{
                background: "var(--color-bg)",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid rgba(212, 168, 83, 0.25)",
                fontSize: "0.88rem",
                color: "var(--color-text)",
                lineHeight: 1.5,
              }}
            >
              <div style={{ fontWeight: 800, color: "var(--color-secondary)", marginBottom: "4px" }}>
                🌿 Pure Organic Guarantee
              </div>
              Zero palm oil, zero chemical preservatives, 100% vegetarian.
            </div>
          </aside>

          {/* Products Column */}
          <div>
            {/* Top Toolbar: Count & Sort */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px",
                marginBottom: "28px",
                background: "#ffffff",
                padding: "14px 24px",
                borderRadius: "14px",
                border: "1.5px solid rgba(212, 168, 83, 0.25)",
              }}
            >
              <div style={{ fontSize: "0.98rem", color: "var(--color-text-light)" }}>
                Showing <strong>{filteredProducts.length}</strong> delicacies found
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "0.92rem", color: "var(--color-text-light)", fontWeight: 600 }}>Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid var(--color-primary-light)",
                    background: "#ffffff",
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    color: "var(--color-secondary)",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated ★</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 20px",
                  background: "#ffffff",
                  borderRadius: "18px",
                  border: "1px dashed var(--color-primary)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", color: "var(--color-secondary)", marginBottom: "8px" }}>
                  No sweets match your selected filters
                </h3>
                <p style={{ color: "var(--color-text-light)", maxWidth: "420px", margin: "0 auto 24px", fontSize: "0.92rem" }}>
                  Try adjusting the price slider, changing category, or searching for other items like &ldquo;chikki&rdquo; or &ldquo;kaju&rdquo;.
                </p>
                <button onClick={clearAllFilters} className="btn btn-primary">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "24px",
                }}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "48px",
                }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid var(--color-primary-light)",
                    background: "#ffffff",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === 1 ? 0.4 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ChevronLeft size={18} />
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: isActive ? "1.5px solid var(--color-primary)" : "1px solid rgba(212, 168, 83, 0.25)",
                        background: isActive ? "var(--color-secondary)" : "#ffffff",
                        color: isActive ? "#ffffff" : "var(--color-secondary)",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        cursor: "pointer",
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid var(--color-primary-light)",
                    background: "#ffffff",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    opacity: currentPage === totalPages ? 0.4 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 860px) {
          .shop-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ padding: "80px 20px", textAlign: "center" }}>Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
