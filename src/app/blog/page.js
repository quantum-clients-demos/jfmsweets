"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BLOG_POSTS } from "../../data/blog";
import { Search, Sparkles, Clock, Calendar, ArrowRight, User } from "lucide-react";

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", "Heritage & Craft", "Health & Nutrition", "Recipes & Secrets", "Gifting & Weddings"];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      if (selectedCategory !== "all" && post.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div style={{ paddingBottom: "90px", background: "var(--color-bg)" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #3C1518 0%, #200B0D 100%)",
          color: "var(--color-bg)",
          padding: "60px 0 50px",
          borderBottom: "2px solid var(--color-primary)",
        }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: "700px" }}>
          <span className="badge badge-gold" style={{ marginBottom: "14px" }}>
            <Sparkles size={12} /> The Sweet Chronicles
          </span>
          <h1 style={{ fontSize: "clamp(2.3rem, 4.5vw, 3.4rem)", fontFamily: "var(--font-heading)", color: "#fff" }}>
            Recipes, Heritage & Wellness
          </h1>
          <p style={{ color: "var(--color-bg-alt)", opacity: 0.9, marginTop: "12px", fontSize: "1.05rem" }}>
            Explore the science of caramelization, nutritional secrets of sesame and gur, and artisanal master recipes from our kitchens.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "50px" }}>
        {/* Featured Article Hero Card */}
        {featuredPost && (
          <div
            className="luxury-card featured-blog-card"
            style={{
              marginBottom: "56px",
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              border: "2px solid var(--color-primary)",
              overflow: "hidden",
            }}
          >
            <div style={{ height: "100%", minHeight: "360px" }}>
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center", background: "#ffffff" }}>
              <span className="badge badge-gold" style={{ alignSelf: "flex-start", marginBottom: "12px" }}>
                Featured Story • {featuredPost.category}
              </span>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", color: "var(--color-secondary)", marginBottom: "12px", lineHeight: 1.25 }}>
                <Link href={`/blog/${featuredPost.slug}`} style={{ color: "inherit" }}>
                  {featuredPost.title}
                </Link>
              </h2>
              <p style={{ fontSize: "0.92rem", color: "var(--color-text-light)", lineHeight: 1.7, marginBottom: "20px" }}>
                {featuredPost.excerpt}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "0.82rem", color: "var(--color-text-light)", marginBottom: "24px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <User size={14} style={{ color: "var(--color-primary)" }} /> {featuredPost.author}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={14} style={{ color: "var(--color-primary)" }} /> {featuredPost.readTime}
                </span>
              </div>
              <Link href={`/blog/${featuredPost.slug}`} className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start" }}>
                Read Full Story <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* Search & Category Filter Bar */}
        <div
          style={{
            background: "#ffffff",
            padding: "18px 24px",
            borderRadius: "16px",
            border: "1px solid rgba(212, 168, 83, 0.25)",
            marginBottom: "40px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* Category Chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "999px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: isSelected ? "1.5px solid var(--color-primary)" : "1px solid rgba(212, 168, 83, 0.25)",
                    background: isSelected ? "var(--color-secondary)" : "#ffffff",
                    color: isSelected ? "#ffffff" : "var(--color-secondary)",
                    textTransform: "capitalize",
                  }}
                >
                  {cat === "all" ? "All Topics" : cat}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div style={{ position: "relative", minWidth: "240px" }}>
            <Search size={16} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--color-primary)" }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px 8px 34px",
                borderRadius: "999px",
                border: "1px solid var(--color-primary-light)",
                fontSize: "0.85rem",
                outline: "none",
                background: "var(--color-bg)",
              }}
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {filteredPosts.map((post) => (
            <div key={post.slug} className="luxury-card" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ height: "200px", overflow: "hidden" }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                  {post.category}
                </span>

                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", color: "var(--color-secondary)", lineHeight: 1.35, marginBottom: "10px" }}>
                  <Link href={`/blog/${post.slug}`} style={{ color: "inherit" }}>
                    {post.title}
                  </Link>
                </h3>

                <p style={{ fontSize: "0.86rem", color: "var(--color-text-light)", lineHeight: 1.6, marginBottom: "16px", flex: 1 }}>
                  {post.excerpt}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid rgba(212, 168, 83, 0.2)", fontSize: "0.78rem", color: "var(--color-text-light)" }}>
                  <span>{post.readTime}</span>
                  <Link href={`/blog/${post.slug}`} style={{ color: "var(--color-primary-dark)", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                    Read Article →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 860px) {
          .featured-blog-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
