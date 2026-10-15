"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BLOG_POSTS } from "../../../data/blog";
import {
  Calendar,
  Clock,
  User,
  Share2,
  ChevronRight
} from "lucide-react";
import { useCart } from "../../../context/CartContext";

function BlogPostDetailContent() {
  const params = useParams();
  const { addToast } = useCart();
  const slug = params?.slug;

  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast("Article link copied to clipboard!", "info");
    }
  };

  return (
    <div style={{ paddingBottom: "90px", background: "var(--color-bg)" }}>
      {/* Breadcrumb */}
      <div style={{ background: "var(--color-bg-alt)", padding: "14px 0", borderBottom: "1px solid rgba(212, 168, 83, 0.2)" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--color-text-light)" }}>
            <Link href="/" style={{ color: "var(--color-primary-dark)", fontWeight: 600 }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/blog" style={{ color: "var(--color-primary-dark)", fontWeight: 600 }}>Recipes & Blog</Link>
            <ChevronRight size={14} />
            <span style={{ color: "var(--color-secondary)", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {post.title}
            </span>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: "860px", paddingTop: "40px" }}>
        {/* Post Header */}
        <div style={{ marginBottom: "28px" }}>
          <span className="badge badge-gold" style={{ marginBottom: "14px" }}>
            {post.category}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              color: "var(--color-secondary)",
              lineHeight: 1.22,
              marginBottom: "18px",
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "14px",
              paddingBottom: "20px",
              borderBottom: "1px solid rgba(212, 168, 83, 0.25)",
              fontSize: "0.88rem",
              color: "var(--color-text-light)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <User size={15} style={{ color: "var(--color-primary)" }} /> {post.author}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Calendar size={15} style={{ color: "var(--color-primary)" }} /> {post.date}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={15} style={{ color: "var(--color-primary)" }} /> {post.readTime}
              </span>
            </div>

            <button
              onClick={handleShare}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#ffffff",
                border: "1px solid var(--color-primary-light)",
                borderRadius: "999px",
                padding: "6px 14px",
                cursor: "pointer",
                color: "var(--color-secondary)",
                fontWeight: 600,
                fontSize: "0.82rem",
              }}
            >
              <Share2 size={14} /> Share Article
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            border: "2px solid var(--color-primary)",
            marginBottom: "36px",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <img src={post.image} alt={post.title} style={{ width: "100%", height: "420px", objectFit: "cover" }} />
        </div>

        {/* Article Body */}
        <div
          style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid rgba(212, 168, 83, 0.25)",
            boxShadow: "var(--shadow-sm)",
            lineHeight: 1.85,
            fontSize: "1.05rem",
            color: "var(--color-text)",
            marginBottom: "50px",
          }}
        >
          <p style={{ fontStyle: "italic", fontSize: "1.15rem", color: "var(--color-secondary)", marginBottom: "24px", borderLeft: "3px solid var(--color-primary)", paddingLeft: "16px" }}>
            {post.excerpt}
          </p>

          <div style={{ whiteSpace: "pre-line" }}>
            {post.content}
          </div>
        </div>

        {/* Author Bio Box */}
        <div
          style={{
            background: "var(--color-bg-alt)",
            padding: "24px",
            borderRadius: "16px",
            border: "1.5px solid var(--color-primary-light)",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "60px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "var(--color-secondary)",
              color: "var(--color-primary-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: 800,
              fontFamily: "var(--font-heading)",
            }}
          >
            {post.author.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--color-secondary)" }}>
              {post.author}
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--color-accent)", marginBottom: "4px" }}>
              {post.authorRole}
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-light)", margin: 0 }}>
              Dedicated to chronicling traditional Indian sweetcraft and spreading ancient nutritional wellness.
            </p>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-secondary)", marginBottom: "20px" }}>
              Related Stories & Recipes
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {relatedPosts.map((r) => (
                <div key={r.slug} className="luxury-card" style={{ padding: "20px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-accent)", textTransform: "uppercase" }}>
                    {r.category}
                  </span>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", color: "var(--color-secondary)", marginTop: "4px", marginBottom: "8px" }}>
                    <Link href={`/blog/${r.slug}`} style={{ color: "inherit" }}>
                      {r.title}
                    </Link>
                  </h4>
                  <Link href={`/blog/${r.slug}`} style={{ fontSize: "0.82rem", color: "var(--color-primary-dark)", fontWeight: 700 }}>
                    Read Story →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogPostDetailPage() {
  return (
    <Suspense fallback={<div style={{ padding: "80px 20px", textAlign: "center" }}>Loading article...</div>}>
      <BlogPostDetailContent />
    </Suspense>
  );
}
