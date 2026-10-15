"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Sparkles,
  PhoneCall,
  HelpCircle,
  ArrowRight,
  Search,
  X,
  MessageCircle,
  Package,
  ShieldCheck,
  Gift,
  Clock
} from "lucide-react";
import { FAQS } from "../../data/products";

const ALL_FAQS = [
  {
    category: "quality",
    categoryLabel: "Ingredients & Quality",
    question: "What makes JFM Sweets chikki different from market chikki?",
    answer: "Unlike factory-produced chikki that uses refined white sugar, high-fructose corn syrup, and palm oil, JFM Sweets crafts every batch in small brass cauldrons using 100% natural Kolhapur sugarcane jaggery, A2 cow desi ghee, and premium whole nuts (60-65% nut ratio). Our secret stone-rolling technique produces an ultra-thin 3mm glass-like snap that never sticks to your teeth.",
  },
  {
    category: "storage",
    categoryLabel: "Shelf Life & Storage",
    question: "How long is the shelf life and how should I store them?",
    answer: "Our brittles and dry fruit sweets stay fresh, crunchy, and aromatic for 90 to 120 days from the date of manufacture. Store in a cool, dry place. Once opened, keep them tightly sealed in the complimentary nitrogen-flushed golden tin provided with your order.",
  },
  {
    category: "shipping",
    categoryLabel: "Shipping & Delivery",
    question: "Do you ship across India and internationally?",
    answer: "Yes! We ship all across India with express delivery (24-48 hours in metro cities). Every tin is bubble-wrapped and packaged in sturdy crush-proof shipping boxes to ensure your brittles arrive whole, crisp, and fresh.",
  },
  {
    category: "gifting",
    categoryLabel: "Corporate & Gifting",
    question: "Can I customize gift hampers for weddings and corporate events?",
    answer: "Absolutely! Our interactive 'Custom Orders' page allows you to select custom boxes and personalized cards. For bulk corporate orders or wedding invitations (25+ boxes), visit our Custom Orders page or contact our gifting concierge for custom logo embossing and bespoke ribbons.",
  },
  {
    category: "quality",
    categoryLabel: "Ingredients & Quality",
    question: "Are your sweets 100% vegetarian and gelatin-free?",
    answer: "Yes, 100% of JFM Sweets products are strictly vegetarian, free from animal gelatin, artificial colorings, and chemical preservatives. All our items are FSSAI certified and crafted in a sanitized, state-of-the-art facility.",
  },
  {
    category: "shipping",
    categoryLabel: "Shipping & Delivery",
    question: "What is your return & damage replacement policy?",
    answer: "Every JFM Sweets parcel is insured and packed inside crush-proof shipping containers. In the rare event of transit damage, simply take a photo and WhatsApp us at +91 98200 12345 within 24 hours of delivery. We will dispatch an immediate replacement or issue a full refund.",
  },
  {
    category: "shipping",
    categoryLabel: "Shipping & Delivery",
    question: "How can I track my shipment once dispatched?",
    answer: "As soon as your order is packaged and picked up by our courier partners (BlueDart, DTDC, Delhivery), you receive an SMS and email notification with a live tracking link. You can also view real-time tracking anytime inside your JFM Account dashboard.",
  },
  {
    category: "gifting",
    categoryLabel: "Corporate & Gifting",
    question: "Do you offer corporate invoices with GST credit?",
    answer: "Yes! All bulk and corporate orders include tax invoices with your business GSTIN number for tax deduction and input credit purposes. Mention your GST number at checkout or email orders@jfmsweets.com.",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "quality", label: "Ingredients & Quality" },
  { id: "shipping", label: "Shipping & Delivery" },
  { id: "storage", label: "Shelf Life & Storage" },
  { id: "gifting", label: "Gifting & Corporate" },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFaqs = useMemo(() => {
    return ALL_FAQS.filter((faq) => {
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="faq-page-wrapper">
      {/* Hero Section */}
      <div className="faq-hero">
        <div className="container" style={{ textAlign: "center", maxWidth: "680px" }}>
          <div className="faq-badge-wrap">
            <span className="faq-header-badge">
              <HelpCircle size={14} /> Knowledge Base & FAQs
            </span>
          </div>
          <h1 className="faq-hero-title">Frequently Asked Questions</h1>
          <p className="faq-hero-sub">
            Everything you need to know about our artisanal ingredients, shelf life, delivery speeds, and bespoke hampers.
          </p>

          {/* Live Mobile Search Box */}
          <div className="faq-search-box">
            <Search size={18} className="faq-search-icon" />
            <input
              type="text"
              placeholder="Search e.g. shelf life, delivery, gur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
              aria-label="Search FAQs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="faq-search-clear"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: "880px", paddingTop: "28px" }}>
        {/* Category Filter Pills (Horizontal scrolling on mobile) */}
        <div className="faq-categories-track">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setOpenIndex(0);
              }}
              className={`faq-cat-pill ${selectedCategory === cat.id ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count indicator when searching */}
        {searchQuery && (
          <div className="faq-search-count">
            Found {filteredFaqs.length} answer{filteredFaqs.length === 1 ? "" : "s"} for &ldquo;{searchQuery}&rdquo;
          </div>
        )}

        {/* FAQ Accordion List */}
        <div className="faq-accordion-list">
          {filteredFaqs.length === 0 ? (
            <div className="faq-no-results">
              <p>No questions matched your search query.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="btn btn-primary btn-sm"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`faq-card ${isOpen ? "faq-card-open" : ""}`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="faq-question-btn"
                    aria-expanded={isOpen}
                  >
                    <div className="faq-question-content">
                      <span className="faq-category-mini">{faq.categoryLabel}</span>
                      <span className="faq-question-text">{faq.question}</span>
                    </div>
                    <div className={`faq-chevron-wrap ${isOpen ? "chevron-open" : ""}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-box">
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions? Help Desk Banner */}
        <div className="faq-concierge-card">
          <div className="faq-concierge-inner">
            <span className="faq-concierge-badge">
              <Sparkles size={14} /> Royal Concierge Desk
            </span>
            <h3 className="faq-concierge-title">Still Have Questions?</h3>
            <p className="faq-concierge-sub">
              Our sweet connoisseurs are available 7 days a week (9 AM – 9 PM) to assist with order tracking, custom hampers, and dietary advice.
            </p>
            <div className="faq-concierge-actions">
              <Link href="/contact" className="faq-btn-primary">
                <MessageCircle size={16} /> Contact Desk
              </Link>
              <a href="tel:+919820012345" className="faq-btn-outline">
                <PhoneCall size={16} /> Call +91 98200 12345
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .faq-page-wrapper {
          padding-bottom: 90px;
          background: var(--color-bg);
          min-height: 80vh;
        }

        /* Hero */
        .faq-hero {
          background: linear-gradient(135deg, #241107 0%, #150601 100%);
          color: #fbf8f0;
          padding: 50px 16px 42px;
          border-bottom: 2px solid #c9882a;
          box-sizing: border-box;
        }
        .faq-badge-wrap {
          margin-bottom: 12px;
        }
        .faq-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(201, 136, 42, 0.2);
          border: 1px solid rgba(201, 136, 42, 0.4);
          color: #fce7b0;
          letter-spacing: 0.03em;
        }
        .faq-hero-title {
          font-size: clamp(1.8rem, 4.5vw, 2.8rem);
          font-family: var(--font-heading);
          color: #ffffff;
          margin: 0 0 10px 0;
          line-height: 1.2;
        }
        .faq-hero-sub {
          color: #c4b5a8;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0 auto 20px;
          max-width: 580px;
        }

        /* Live Search Box */
        .faq-search-box {
          position: relative;
          max-width: 520px;
          margin: 0 auto;
        }
        .faq-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #c9882a;
          pointer-events: none;
        }
        .faq-search-input {
          width: 100%;
          padding: 12px 42px 12px 42px;
          border-radius: 999px;
          border: 1.5px solid rgba(201, 136, 42, 0.45);
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          font-size: 0.94rem;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .faq-search-input:focus {
          border-color: #d5a657;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 3px rgba(213, 166, 87, 0.2);
        }
        .faq-search-input::placeholder {
          color: #9c8a7d;
        }
        .faq-search-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #c4b5a8;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        /* Categories Track */
        .faq-categories-track {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 6px;
          margin-bottom: 22px;
        }
        .faq-categories-track::-webkit-scrollbar {
          display: none;
        }
        .faq-cat-pill {
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid rgba(201, 136, 42, 0.25);
          background: #ffffff;
          color: var(--color-secondary);
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .faq-cat-pill:hover {
          border-color: var(--color-primary);
        }
        .faq-cat-pill.active {
          background: var(--color-secondary);
          color: #ffffff;
          border-color: var(--color-primary);
          box-shadow: 0 3px 10px rgba(60, 21, 24, 0.12);
        }

        .faq-search-count {
          font-size: 0.84rem;
          color: var(--color-text-light);
          margin-bottom: 14px;
          padding-left: 4px;
        }

        /* Accordion Cards */
        .faq-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 44px;
        }
        .faq-card {
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid rgba(212, 168, 83, 0.22);
          box-shadow: 0 2px 10px rgba(60, 21, 24, 0.03);
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .faq-card-open {
          border-color: #c9882a;
          border-left: 3.5px solid #c9882a;
          box-shadow: 0 4px 16px rgba(60, 21, 24, 0.06);
        }
        .faq-question-btn {
          width: 100%;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 12px;
        }
        .faq-question-content {
          min-width: 0;
          flex: 1;
        }
        .faq-category-mini {
          display: block;
          font-size: 0.72rem;
          color: #925c0e;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 3px;
        }
        .faq-question-text {
          font-family: var(--font-heading);
          font-size: 1.02rem;
          color: var(--color-secondary);
          font-weight: 700;
          line-height: 1.35;
          display: block;
        }
        .faq-chevron-wrap {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(201, 136, 42, 0.1);
          color: #c9882a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .chevron-open {
          transform: rotate(180deg);
          background: #c9882a;
          color: #ffffff;
        }
        .faq-answer-box {
          padding: 0 20px 18px 20px;
          border-top: 1px solid rgba(212, 168, 83, 0.12);
          padding-top: 14px;
        }
        .faq-answer-text {
          font-size: 0.9rem;
          color: var(--color-text-light);
          line-height: 1.7;
          margin: 0;
        }

        .faq-no-results {
          background: #ffffff;
          padding: 36px 20px;
          border-radius: 14px;
          text-align: center;
          border: 1px dashed rgba(201, 136, 42, 0.3);
          color: var(--color-text-light);
        }

        /* Concierge Help Card */
        .faq-concierge-card {
          background: linear-gradient(135deg, #241107 0%, #170702 100%);
          border-radius: 20px;
          padding: 36px 28px;
          color: #fbf8f0;
          border: 1.5px solid #c9882a;
          text-align: center;
          box-shadow: 0 10px 30px rgba(36, 17, 7, 0.15);
          margin-bottom: 30px;
        }
        .faq-concierge-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(201, 136, 42, 0.2);
          border: 1px solid rgba(201, 136, 42, 0.4);
          color: #fce7b0;
          margin-bottom: 12px;
          letter-spacing: 0.03em;
        }
        .faq-concierge-title {
          font-family: var(--font-heading);
          color: #ffffff;
          font-size: 1.6rem;
          margin: 0 0 8px 0;
          font-weight: 700;
        }
        .faq-concierge-sub {
          color: #c4b5a8;
          font-size: 0.92rem;
          line-height: 1.6;
          max-width: 500px;
          margin: 0 auto 24px;
        }
        .faq-concierge-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .faq-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 12px;
          background: linear-gradient(135deg, #d5a657 0%, #b87a1d 100%);
          color: #ffffff;
          text-decoration: none;
          font-size: 0.94rem;
          font-weight: 700;
          box-shadow: 0 4px 16px rgba(201, 136, 42, 0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .faq-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(201, 136, 42, 0.5);
        }
        .faq-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 12px;
          border: 1.5px solid rgba(201, 136, 42, 0.5);
          background: rgba(255, 255, 255, 0.08);
          color: #fbf8f0;
          text-decoration: none;
          font-size: 0.94rem;
          font-weight: 700;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
          white-space: nowrap;
        }
        .faq-btn-outline:hover {
          background: rgba(201, 136, 42, 0.2);
          border-color: #d5a657;
          transform: translateY(-2px);
        }

        /* Mobile Breakpoints */
        @media (max-width: 680px) {
          .faq-page-wrapper {
            padding-bottom: 110px;
          }
          .faq-hero {
            padding: 36px 14px 28px;
          }
          .faq-hero-title {
            font-size: 1.65rem;
          }
          .faq-hero-sub {
            font-size: 0.86rem;
            margin-bottom: 16px;
          }
          .faq-search-input {
            padding: 10px 36px 10px 36px;
            font-size: 0.86rem;
          }
          .faq-cat-pill {
            padding: 7px 13px;
            font-size: 0.78rem;
          }
          .faq-question-btn {
            padding: 14px 16px;
            gap: 10px;
          }
          .faq-question-text {
            font-size: 0.94rem;
          }
          .faq-answer-box {
            padding: 0 16px 14px 16px;
          }
          .faq-answer-text {
            font-size: 0.84rem;
          }
          .faq-concierge-card {
            padding: 24px 18px;
            border-radius: 16px;
            margin-bottom: 20px;
          }
          .faq-concierge-title {
            font-size: 1.35rem;
          }
          .faq-concierge-sub {
            font-size: 0.85rem;
            margin-bottom: 18px;
          }
          .faq-concierge-actions {
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }
          .faq-btn-primary, .faq-btn-outline {
            width: 100%;
            box-sizing: border-box;
            padding: 13px 18px;
            font-size: 0.9rem;
            border-radius: 12px;
            justify-content: center;
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}
