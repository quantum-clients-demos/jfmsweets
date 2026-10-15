"use client";

import React from "react";
import { Sparkles, Leaf, CheckCircle2, Quote } from "lucide-react";
import { getProductBenefits } from "../data/productBenefits";

export default function ProductBenefitsSection({ product }) {
  const data = getProductBenefits(product);
  if (!data) return null;

  return (
    <div className="product-benefits-card">
      {/* Top Header with Wellness Emblem */}
      <div className="benefits-header">
        <div className="benefits-emblem">
          <Leaf size={18} className="emblem-icon" />
        </div>
        <div className="benefits-titles">
          <span className="benefits-eyebrow">{data.eyebrow}</span>
          <h3 className="benefits-title">{data.title}</h3>
        </div>
      </div>

      {/* Short Benefits Paragraph */}
      <p className="benefits-paragraph">{data.paragraph}</p>

      {/* Quick Highlight Pills */}
      {data.highlights && data.highlights.length > 0 && (
        <div className="benefits-highlights-row">
          {data.highlights.map((item, idx) => (
            <span key={idx} className="benefit-pill">
              <CheckCircle2 size={13} className="pill-check-icon" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      )}

      {/* Related Heritage / Nutritional Quote Box */}
      {data.quote && (
        <div className="benefits-quote-box">
          <div className="quote-top-row">
            <div className="quote-icon-wrap">
              <Quote size={18} className="quote-icon" />
            </div>
            {data.quote.badge && (
              <span className="quote-badge">
                <Sparkles size={11} /> {data.quote.badge}
              </span>
            )}
          </div>
          <p className="quote-text">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.author && (
            <div className="quote-author-line">
              <span className="author-dash">—</span>
              <span className="author-name">{data.quote.author}</span>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .product-benefits-card {
          background: linear-gradient(150deg, #ffffff 0%, #fdfbf7 100%);
          border-radius: 20px;
          border: 1.5px solid rgba(212, 168, 83, 0.32);
          box-shadow: 0 8px 28px rgba(60, 21, 24, 0.05);
          padding: clamp(18px, 3vw, 24px);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          width: 100%;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .product-benefits-card:hover {
          border-color: rgba(201, 136, 42, 0.55);
          box-shadow: 0 12px 34px rgba(60, 21, 24, 0.08);
        }

        /* Subtle top gold accent glow */
        .product-benefits-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #c9882a 0%, #e8c57d 50%, #c9882a 100%);
        }

        .benefits-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .benefits-emblem {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: linear-gradient(135deg, rgba(201, 136, 42, 0.16) 0%, rgba(201, 136, 42, 0.06) 100%);
          border: 1px solid rgba(201, 136, 42, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(201, 136, 42, 0.12);
        }

        .emblem-icon {
          color: #b07722;
        }

        .benefits-titles {
          min-width: 0;
        }

        .benefits-eyebrow {
          display: block;
          font-family: var(--font-royal);
          font-size: 0.74rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent);
          line-height: 1.2;
          margin-bottom: 2px;
        }

        .benefits-title {
          font-family: var(--font-heading);
          font-size: clamp(1.15rem, 2.2vw, 1.35rem);
          font-weight: 700;
          color: var(--color-secondary);
          line-height: 1.25;
          margin: 0;
        }

        .benefits-paragraph {
          font-size: clamp(0.9rem, 1.8vw, 0.95rem);
          color: var(--color-text);
          line-height: 1.68;
          margin: 0 0 16px 0;
        }

        .benefits-highlights-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }

        .benefit-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-secondary);
          background: rgba(201, 136, 42, 0.09);
          border: 1px solid rgba(201, 136, 42, 0.26);
          padding: 4px 10px;
          border-radius: 999px;
          letter-spacing: 0.01em;
        }

        .pill-check-icon {
          color: #1e5a39;
          flex-shrink: 0;
        }

        /* Royal Quote Box */
        .benefits-quote-box {
          background: linear-gradient(135deg, rgba(60, 21, 24, 0.04) 0%, rgba(212, 168, 83, 0.1) 100%);
          border-left: 3.5px solid var(--color-primary);
          border-radius: 12px;
          padding: 14px 16px;
          position: relative;
        }

        .quote-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          gap: 10px;
        }

        .quote-icon-wrap {
          display: flex;
          align-items: center;
        }

        .quote-icon {
          color: var(--color-primary-dark);
          opacity: 0.85;
        }

        .quote-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #7b4c0b;
          background: rgba(201, 136, 42, 0.14);
          border: 1px solid rgba(201, 136, 42, 0.3);
          padding: 2px 8px;
          border-radius: 999px;
        }

        .quote-text {
          font-family: var(--font-royal), "Cormorant Garamond", serif;
          font-style: italic;
          font-size: clamp(0.94rem, 1.9vw, 1.04rem);
          color: var(--color-secondary);
          line-height: 1.6;
          margin: 0 0 8px 0;
          font-weight: 600;
        }

        .quote-author-line {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--color-primary-dark);
          font-weight: 700;
        }

        .author-dash {
          color: var(--color-primary);
        }

        .author-name {
          letter-spacing: 0.02em;
        }
      `}</style>
    </div>
  );
}
