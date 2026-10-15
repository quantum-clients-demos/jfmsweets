"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail, ShieldCheck, Send } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Footer() {
  const { addToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      addToast("Please enter a valid email address", "error");
      return;
    }
    addToast("Welcome to the JFM Royal Club! 15% off code sent to your inbox 🎁", "success");
    setNewsletterEmail("");
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Trust Pillars Banner */}
        <div className="footer-trust-grid">
          <div className="footer-trust-card">
            <div className="footer-trust-icon">🌿</div>
            <div className="footer-trust-info">
              <div className="footer-trust-title">100% Organic Gur</div>
              <div className="footer-trust-sub">Zero refined white sugar</div>
            </div>
          </div>

          <div className="footer-trust-card">
            <div className="footer-trust-icon">🥜</div>
            <div className="footer-trust-info">
              <div className="footer-trust-title">60%+ Whole Nuts</div>
              <div className="footer-trust-sub">Mamra, Pista & Cashews</div>
            </div>
          </div>

          <div className="footer-trust-card">
            <div className="footer-trust-icon">⚡</div>
            <div className="footer-trust-info">
              <div className="footer-trust-title">Acoustic Crunch</div>
              <div className="footer-trust-sub">3mm crisp glass snap</div>
            </div>
          </div>

          <div className="footer-trust-card">
            <div className="footer-trust-icon">🛡️</div>
            <div className="footer-trust-info">
              <div className="footer-trust-title">Crush-Proof Tins</div>
              <div className="footer-trust-sub">Nitrogen sealed keepsake</div>
            </div>
          </div>
        </div>

        {/* Main Footer Layout */}
        <div className="footer-main-grid">
          {/* Column 1: Brand Story & Certifications */}
          <div className="footer-brand-col">
            <Link href="/" className="footer-brand-header">
              <div className="footer-brand-logo">
                <Sparkles size={20} />
              </div>
              <div>
                <span className="footer-brand-name">JFM SWEETS</span>
                <span className="footer-brand-tagline">Royal Confectionery • Est. 1994</span>
              </div>
            </Link>

            <p className="footer-brand-desc">
              Purveyors of royal artisanal brittles, chikkis, and festive confectionery. Handcrafted in small brass cauldrons using organic sugarcane jaggery and sun-roasted whole nuts.
            </p>

            <div className="footer-badges-row">
              <span className="footer-badge veg-badge">
                <span className="veg-dot" />
                100% Pure Veg
              </span>
              <span className="footer-badge fssai-badge">
                <ShieldCheck size={13} style={{ color: "#d5a657", flexShrink: 0 }} />
                FSSAI Lic. #10022022000452
              </span>
            </div>
          </div>

          {/* Links Wrapper (Displays side-by-side 2-col on mobile, normal grid items on desktop) */}
          <div className="footer-links-wrapper">
            {/* Column 2: Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col-heading">Explore</h4>
              <ul className="footer-links-list">
                <li>
                  <Link href="/shop" className="footer-link">
                    All Handcrafted Brittles
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=dry-fruit" className="footer-link">
                    Pistachio & Cashew
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=peanut" className="footer-link">
                    Maharaja Peanut Chikki
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=sesame-gajak" className="footer-link">
                    Shahi Til & Gud Gajak
                  </Link>
                </li>
                <li>
                  <Link href="/custom-box" className="footer-link highlight">
                    🎁 Build Gift Box
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=sugar-free" className="footer-link">
                    Sugar-Free & Keto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Care & Heritage */}
            <div className="footer-col">
              <h4 className="footer-col-heading">Customer Care</h4>
              <ul className="footer-links-list">
                <li>
                  <Link href="/about" className="footer-link">
                    30-Year Heritage
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="footer-link">
                    Corporate & Weddings
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="footer-link">
                    Delivery & FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist" className="footer-link">
                    Saved Favorites
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="footer-link">
                    Shopping Bag
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="footer-link">
                    My Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Newsletter & Flagship Contact */}
          <div className="footer-newsletter-col">
            <h4 className="footer-col-heading">Join the Royal Club</h4>
            <p className="footer-newsletter-sub">
              Subscribe for exclusive secret-batch releases, festive hampers, and 15% off your first order.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
              <input
                type="email"
                placeholder="Enter email for 15% off..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="footer-email-input"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="footer-submit-btn" aria-label="Subscribe to newsletter">
                <Send size={16} />
              </button>
            </form>

            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MapPin size={16} className="footer-contact-icon" />
                <span>14 Heritage Sweet Lane, Karol Bagh, New Delhi</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <span>+91 98200 12345 / 011-28759900</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} className="footer-contact-icon" />
                <span>orders@jfmsweets.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © 2026 JFM SWEETS PRIVATE LIMITED. All rights reserved. Handcrafted with pride.
          </div>
          <div className="footer-payment-line">
            <span className="footer-payment-badges">UPI • GPay • Visa • Mastercard • COD</span>
            <span className="footer-express-badge">✦ Pan-India Express Delivery</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .site-footer {
          background: linear-gradient(180deg, #241107 0%, #150601 100%);
          color: #f6eedb;
          border-top: 2px solid #c9882a;
          padding-top: 48px;
          padding-bottom: 32px;
          margin-top: auto;
          position: relative;
        }

        /* Top Trust Pillars Grid */
        .footer-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          width: 100%;
          box-sizing: border-box;
          padding-bottom: 36px;
          border-bottom: 1px solid rgba(201, 136, 42, 0.2);
          margin-bottom: 44px;
        }
        .footer-trust-card {
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(201, 136, 42, 0.16);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .footer-trust-card:hover {
          border-color: rgba(201, 136, 42, 0.35);
          transform: translateY(-2px);
        }
        .footer-trust-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(201, 136, 42, 0.14);
          border: 1.5px solid #c9882a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          flex-shrink: 0;
        }
        .footer-trust-info {
          min-width: 0;
          width: 100%;
        }
        .footer-trust-title {
          font-weight: 700;
          font-size: 0.94rem;
          color: #fbf8f0;
          line-height: 1.3;
        }
        .footer-trust-sub {
          font-size: 0.78rem;
          color: #b5a397;
          margin-top: 2px;
          line-height: 1.3;
        }

        /* Main Footer Grid */
        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr 1fr 1.35fr;
          gap: 36px;
          margin-bottom: 40px;
        }
        .footer-links-wrapper {
          display: contents;
        }

        /* Brand Column */
        .footer-brand-col {
          display: flex;
          flex-direction: column;
        }
        .footer-brand-header {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
          text-decoration: none;
        }
        .footer-brand-logo {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #c9882a 0%, #853e0d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 4px 12px rgba(201, 136, 42, 0.3);
          flex-shrink: 0;
        }
        .footer-brand-name {
          font-family: var(--font-royal);
          font-size: 1.45rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #fbf8f0;
          display: block;
          line-height: 1.1;
        }
        .footer-brand-tagline {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #d5a657;
          font-weight: 600;
          display: block;
          margin-top: 2px;
        }
        .footer-brand-desc {
          font-size: 0.92rem;
          color: #c4b5a8;
          line-height: 1.65;
          margin-bottom: 18px;
        }
        .footer-badges-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          padding: 4px 9px;
          border-radius: 6px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .veg-badge {
          color: #86efac;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        .veg-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
        }
        .fssai-badge {
          color: #fde047;
          background: rgba(201, 136, 42, 0.14);
          border: 1px solid rgba(201, 136, 42, 0.3);
        }

        /* Column Headings */
        .footer-col-heading {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          color: var(--color-primary-light, #e2b46a);
          margin-bottom: 16px;
          letter-spacing: 0.02em;
          font-weight: 700;
        }

        /* Link Lists */
        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 0;
          margin: 0;
        }
        .footer-link {
          color: #c4b5a8;
          font-size: 0.92rem;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
          line-height: 1.4;
        }
        .footer-link:hover {
          color: #d5a657;
          transform: translateX(2px);
        }
        .footer-link.highlight {
          color: #d5a657;
          font-weight: 700;
        }

        /* Newsletter & Contact */
        .footer-newsletter-col {
          display: flex;
          flex-direction: column;
        }
        .footer-newsletter-sub {
          font-size: 0.88rem;
          color: #c4b5a8;
          margin-bottom: 14px;
          line-height: 1.55;
        }
        .footer-newsletter-form {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .footer-email-input {
          flex: 1;
          min-width: 0;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid rgba(201, 136, 42, 0.4);
          background: rgba(255, 255, 255, 0.07);
          color: #fff;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .footer-email-input:focus {
          border-color: #d5a657;
          box-shadow: 0 0 0 2px rgba(213, 166, 87, 0.2);
        }
        .footer-email-input::placeholder {
          color: #8c7c70;
        }
        .footer-submit-btn {
          background: #c9882a;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .footer-submit-btn:hover {
          background: #d5a657;
          transform: scale(1.03);
        }

        /* Contact Details */
        .footer-contact-list {
          font-size: 0.88rem;
          color: #c4b5a8;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.45;
        }
        .footer-contact-icon {
          color: #c9882a;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Bottom Bar */
        .footer-bottom-bar {
          padding-top: 22px;
          border-top: 1px solid rgba(201, 136, 42, 0.2);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          font-size: 0.86rem;
          color: #b5a397;
        }
        .footer-copyright {
          line-height: 1.5;
        }
        .footer-payment-line {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .footer-payment-badges {
          color: #c4b5a8;
        }
        .footer-express-badge {
          color: #d5a657;
          font-weight: 700;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
          .footer-trust-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
            width: 100%;
            box-sizing: border-box;
          }
        }

        @media (max-width: 680px) {
          .site-footer {
            padding-top: 32px;
            /* Extra bottom padding to sit comfortably above fixed mobile bottom bar */
            padding-bottom: 96px;
            overflow-x: clip;
          }

          /* Trust grid becomes a sleek 2x2 badge grid with zero overflow */
          .footer-trust-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
            padding-bottom: 20px;
            margin-bottom: 24px;
            width: 100%;
            box-sizing: border-box;
          }
          .footer-trust-card {
            min-width: 0;
            width: 100%;
            box-sizing: border-box;
            flex-direction: column;
            text-align: center;
            align-items: center;
            justify-content: center;
            padding: 12px 8px;
            gap: 6px;
            border-radius: 10px;
          }
          .footer-trust-icon {
            width: 36px;
            height: 36px;
            font-size: 1.15rem;
            margin: 0 auto;
          }
          .footer-trust-info {
            min-width: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .footer-trust-title {
            font-size: 0.82rem;
            font-weight: 700;
            color: #fbf8f0;
            line-height: 1.25;
            text-align: center;
          }
          .footer-trust-sub {
            font-size: 0.7rem;
            color: #b5a397;
            margin-top: 2px;
            line-height: 1.25;
            text-align: center;
          }

          /* Main footer switches to clean stacked sections */
          .footer-main-grid {
            display: flex;
            flex-direction: column;
            gap: 24px;
            margin-bottom: 26px;
          }

          .footer-brand-desc {
            font-size: 0.88rem;
            line-height: 1.55;
            margin-bottom: 12px;
          }

          /* Links wrapper turns into a 2-column side-by-side grid */
          .footer-links-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            padding: 16px 0;
            border-top: 1px solid rgba(201, 136, 42, 0.12);
            border-bottom: 1px solid rgba(201, 136, 42, 0.12);
          }
          .footer-col-heading {
            font-size: 1.02rem;
            margin-bottom: 12px;
          }
          .footer-links-list {
            gap: 8px;
          }
          .footer-link {
            font-size: 0.84rem;
            line-height: 1.35;
          }

          /* Newsletter & Contact */
          .footer-newsletter-col {
            padding-top: 4px;
          }
          .footer-newsletter-sub {
            font-size: 0.84rem;
            margin-bottom: 12px;
          }
          .footer-email-input {
            padding: 10px 12px;
            font-size: 0.86rem;
          }
          .footer-contact-list {
            font-size: 0.82rem;
            gap: 8px;
          }

          /* Bottom bar centered and spaced cleanly */
          .footer-bottom-bar {
            flex-direction: column;
            text-align: center;
            gap: 10px;
            padding-top: 18px;
          }
          .footer-copyright {
            font-size: 0.8rem;
          }
          .footer-payment-line {
            flex-direction: column;
            gap: 6px;
            text-align: center;
            justify-content: center;
            font-size: 0.78rem;
          }
        }
      `}</style>
    </footer>
  );
}
