"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import {
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Crown,
  Gift,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Star
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const { addToast } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast("Please fill in all mandatory fields", "error");
      return;
    }
    if (password.length < 6) {
      addToast("Password should be at least 6 characters", "error");
      return;
    }
    if (!agreeTerms) {
      addToast("Please accept the Terms & Conditions to join", "error");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      signup(name, email, phone);
      addToast("Account created successfully! Welcome to the JFM Royal Family 🎉", "success");
      router.push("/account");
    }, 300);
  };

  const handleSocialSignup = (provider) => {
    signup(`${provider} Connoisseur`, `${provider.toLowerCase()}user@jfmsweets.com`, "+91 98765 00000");
    addToast(`Signed up with ${provider} successfully! Welcome!`, "success");
    router.push("/account");
  };

  return (
    <div className="auth-container-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="auth-breadcrumb-bar">
        <Link href="/" className="crumb-link">Home</Link>
        <ChevronRight size={13} className="crumb-sep" />
        <span className="crumb-current">Create Account</span>
      </div>

      <div className="auth-master-card">
        {/* Left Brand Showcase Panel (Desktop) */}
        <div className="auth-left-showcase">
          <div className="showcase-glow" />

          <div className="showcase-top">
            <div className="showcase-emblem">
              <Sparkles size={20} className="emblem-sparkle" />
            </div>
            <div>
              <span className="showcase-tag">EST. 1996 • RAJKOT</span>
              <h2 className="showcase-brand">JFM ROYAL SWEETS</h2>
            </div>
          </div>

          <div className="showcase-hero">
            <h3 className="showcase-headline">
              Begin Your Journey of Royal Confectionery
            </h3>
            <p className="showcase-subtext">
              Join our private connoisseur circle to unlock privileged discounts, early festival reserves, and bespoke gift trunk tracking.
            </p>

            {/* Rating Social Proof */}
            <div className="showcase-rating-pill">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="#d4a853" color="#d4a853" />
                ))}
              </div>
              <span className="rating-text">4.96/5 from 12,000+ Connoisseurs</span>
            </div>

            {/* Perks List */}
            <div className="showcase-perks-list">
              <div className="showcase-perk-item">
                <div className="perk-icon-wrap">
                  <Crown size={15} />
                </div>
                <div>
                  <h4 className="perk-title">Instant 15% Welcome Blessing</h4>
                  <p className="perk-desc">Apply coupon <strong>ROYAL15</strong> across all artisanal brittles</p>
                </div>
              </div>

              <div className="showcase-perk-item">
                <div className="perk-icon-wrap">
                  <Gift size={15} />
                </div>
                <div>
                  <h4 className="perk-title">Bespoke Box Memory</h4>
                  <p className="perk-desc">Save personalized 4-treat & 6-treat tins to re-order anytime in 1 tap</p>
                </div>
              </div>

              <div className="showcase-perk-item">
                <div className="perk-icon-wrap">
                  <Truck size={15} />
                </div>
                <div>
                  <h4 className="perk-title">Complimentary Express Dispatch</h4>
                  <p className="perk-desc">Free temperature-sealed express delivery on orders over ₹999</p>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase-bottom">
            <ShieldCheck size={16} className="bottom-shield" />
            <span>Pure Stone-Rolled Recipes • 0% Chemicals • Desi A2 Cow Ghee</span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="auth-right-form">
          {/* Segmented Auth Navigation Tabs */}
          <div className="auth-tabs-row">
            <Link
              href="/auth/signin"
              className="auth-tab"
              aria-selected="false"
            >
              <Crown size={14} />
              <span>Sign In</span>
            </Link>
            <button
              type="button"
              className="auth-tab active"
              aria-selected="true"
            >
              <Sparkles size={14} />
              <span>Create Account</span>
            </button>
          </div>

          <div className="form-heading-group">
            <h1 className="form-main-title">Create Royal Account</h1>
            <p className="form-sub-title">
              Join thousands of connoisseurs savoring authentic Indian craft
            </p>
          </div>

          {/* Social Sign-Up Buttons */}
          <div className="social-grid">
            <button
              type="button"
              onClick={() => handleSocialSignup("Google")}
              className="social-btn"
              aria-label="Sign up with Google"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" className="social-svg">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignup("Apple")}
              className="social-btn"
              aria-label="Sign up with Apple"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="social-svg">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-.93 2.73 1.01.08 2.01-.48 2.63-1.23z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <div className="auth-separator">
            <span className="sep-line" />
            <span className="sep-text">or register with details</span>
            <span className="sep-line" />
          </div>

          <form onSubmit={handleSubmit} className="auth-form-body">
            <div className="field-group">
              <label htmlFor="signup-name" className="field-label">
                Full Name *
              </label>
              <div className="field-input-box">
                <input
                  id="signup-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="native-input"
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="signup-email" className="field-label">
                Email Address *
              </label>
              <div className="field-input-box">
                <input
                  id="signup-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="native-input"
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="signup-phone" className="field-label">
                Mobile Number (for delivery tracking)
              </label>
              <div className="field-input-box">
                <input
                  id="signup-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="native-input"
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="signup-password" className="field-label">
                Password * (min 6 characters)
              </label>
              <div className="field-input-box">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="native-input has-toggle"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="toggle-visibility-btn"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="checkbox-wrap">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="native-checkbox"
                />
                <span>
                  I agree to the JFM Sweets Terms of Service, Privacy Policy & consent to receive dispatch updates.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary submit-cta-btn"
            >
              <span>{isLoading ? "Creating Royal Account..." : "Create Royal Account"}</span>
              <ArrowRight size={17} />
            </button>
          </form>

          {/* Switch Prompt */}
          <div className="auth-switch-box">
            Already have an account?{" "}
            <Link href="/auth/signin" className="switch-anchor">
              Sign In Here
            </Link>
          </div>

          {/* Mobile Ribbon */}
          <div className="mobile-ribbon-perks">
            <div className="ribbon-chip">
              <CheckCircle2 size={13} className="chip-ico" />
              <span>15% Off 1st Order</span>
            </div>
            <div className="ribbon-chip">
              <CheckCircle2 size={13} className="chip-ico" />
              <span>Priority Dispatch</span>
            </div>
            <div className="ribbon-chip">
              <CheckCircle2 size={13} className="chip-ico" />
              <span>Saved Tins</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-container-wrapper {
          min-height: 84vh;
          padding: 24px 20px 64px 20px;
          background: radial-gradient(circle at 50% 15%, rgba(212, 168, 83, 0.08) 0%, rgba(253, 251, 247, 0) 65%), var(--color-bg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        /* Breadcrumb Bar */
        .auth-breadcrumb-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          margin-bottom: 24px;
          color: var(--color-text-light);
          width: 100%;
          max-width: 1040px;
          box-sizing: border-box;
        }
        .crumb-link {
          color: var(--color-primary-dark);
          text-decoration: none;
          font-weight: 700;
        }
        .crumb-sep {
          color: #c9a050;
        }
        .crumb-current {
          color: var(--color-secondary);
          font-weight: 700;
        }

        /* Master Dual-Panel Card */
        .auth-master-card {
          width: 100%;
          max-width: 1040px;
          background: #ffffff;
          border-radius: 24px;
          border: 1.5px solid rgba(212, 168, 83, 0.32);
          box-shadow: 0 18px 52px rgba(60, 21, 24, 0.08);
          display: grid;
          grid-template-columns: 1fr 1.18fr;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* Left Showcase Panel */
        .auth-left-showcase {
          background: linear-gradient(150deg, #240c10 0%, #140507 100%);
          color: #ffffff;
          padding: 44px 38px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          position: relative;
          overflow: hidden;
          border-right: 1.5px solid rgba(212, 168, 83, 0.22);
        }

        .showcase-glow {
          position: absolute;
          top: -70px;
          right: -70px;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201, 136, 42, 0.25) 0%, transparent 70%);
          pointer-events: none;
        }

        .showcase-top {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 2;
        }

        .showcase-emblem {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(201, 136, 42, 0.25) 0%, rgba(201, 136, 42, 0.08) 100%);
          border: 1.5px solid rgba(201, 136, 42, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fce7b0;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
          flex-shrink: 0;
        }
        .emblem-sparkle {
          color: #e5b35d;
        }

        .showcase-tag {
          font-family: var(--font-royal);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #d4a853;
          display: block;
        }
        .showcase-brand {
          font-family: var(--font-royal);
          font-size: 1.12rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.05em;
          margin: 1px 0 0 0;
        }

        .showcase-hero {
          margin: 32px 0;
          position: relative;
          z-index: 2;
        }

        .showcase-headline {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          line-height: 1.25;
          color: #ffffff;
          margin: 0 0 10px 0;
        }

        .showcase-subtext {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #ded1c8;
          margin: 0 0 20px 0;
        }

        .showcase-rating-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(201, 136, 42, 0.15);
          border: 1px solid rgba(201, 136, 42, 0.35);
          padding: 5px 12px;
          border-radius: 999px;
          margin-bottom: 26px;
        }
        .rating-stars {
          display: flex;
          gap: 2px;
        }
        .rating-text {
          font-size: 0.78rem;
          font-weight: 700;
          color: #fce7b0;
          letter-spacing: 0.01em;
        }

        .showcase-perks-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .showcase-perk-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .perk-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(201, 136, 42, 0.2);
          border: 1px solid rgba(201, 136, 42, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fce7b0;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .perk-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 2px 0;
        }

        .perk-desc {
          font-size: 0.82rem;
          color: #c9b8ad;
          line-height: 1.45;
          margin: 0;
        }
        .perk-desc strong {
          color: #fce7b0;
        }

        .showcase-bottom {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          color: #ded1c8;
          border-top: 1px solid rgba(212, 168, 83, 0.2);
          padding-top: 18px;
          position: relative;
          z-index: 2;
        }
        .bottom-shield {
          color: #e5b35d;
          flex-shrink: 0;
        }

        /* Right Form Panel */
        .auth-right-form {
          padding: 38px 40px;
          display: flex;
          flex-direction: column;
          justifyContent: center;
          box-sizing: border-box;
          background: #ffffff;
        }

        /* Segmented Tabs */
        .auth-tabs-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          background: var(--color-bg);
          border: 1px solid rgba(201, 136, 42, 0.25);
          padding: 4px;
          border-radius: 12px;
          margin-bottom: 22px;
        }

        .auth-tab {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 9px;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          color: var(--color-text-light);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .auth-tab :global(svg) {
          flex-shrink: 0;
        }
        .auth-tab:hover {
          color: var(--color-secondary);
        }
        .auth-tab.active {
          background: #ffffff;
          color: var(--color-secondary);
          box-shadow: 0 2px 8px rgba(60, 21, 24, 0.08);
          border: 1px solid rgba(201, 136, 42, 0.2);
        }

        .form-heading-group {
          margin-bottom: 20px;
        }
        .form-main-title {
          font-family: var(--font-heading);
          font-size: 1.95rem;
          color: var(--color-secondary);
          line-height: 1.2;
          margin: 0 0 4px 0;
        }
        .form-sub-title {
          font-size: 0.92rem;
          color: var(--color-text-light);
          margin: 0;
          line-height: 1.5;
        }

        /* Social Auth */
        .social-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 18px;
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1.5px solid rgba(212, 168, 83, 0.32);
          background: #ffffff;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.88rem;
          color: var(--color-secondary);
          transition: all 0.2s ease;
        }
        .social-btn:hover {
          border-color: var(--color-primary);
          background: rgba(201, 136, 42, 0.05);
          transform: translateY(-1px);
        }
        .social-svg {
          flex-shrink: 0;
        }

        /* Separator */
        .auth-separator {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .sep-line {
          flex: 1;
          height: 1px;
          background: rgba(212, 168, 83, 0.25);
        }
        .sep-text {
          font-size: 0.78rem;
          color: var(--color-text-light);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Form Body */
        .auth-form-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .field-label {
          font-size: 0.86rem;
          font-weight: 700;
          color: var(--color-secondary);
        }

        .field-input-box {
          position: relative;
          width: 100%;
        }

        .native-input {
          width: 100%;
          box-sizing: border-box;
          height: 48px;
          padding: 12px 16px;
          border-radius: 11px;
          border: 1.5px solid rgba(201, 136, 42, 0.28);
          background: #fdfcf9;
          font-size: 1rem; /* >= 16px prevents iOS Safari auto-zoom */
          color: var(--color-secondary);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .native-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3.5px rgba(201, 136, 42, 0.18);
          background: #ffffff;
        }
        .native-input.has-toggle {
          padding-right: 48px;
        }

        .toggle-visibility-btn {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          color: #8c7a6b;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: color 0.15s ease, background-color 0.15s ease;
        }
        .toggle-visibility-btn:hover {
          color: var(--color-secondary);
          background: rgba(201, 136, 42, 0.08);
        }

        .checkbox-wrap {
          display: flex;
          align-items: flex-start;
        }
        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 0.82rem;
          color: var(--color-text);
          cursor: pointer;
          user-select: none;
          line-height: 1.45;
        }
        .native-checkbox {
          width: 17px;
          height: 17px;
          accent-color: var(--color-primary);
          cursor: pointer;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .submit-cta-btn {
          width: 100%;
          height: 50px;
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 12px;
          margin-top: 4px;
        }

        .auth-switch-box {
          text-align: center;
          margin-top: 20px;
          font-size: 0.9rem;
          color: var(--color-text-light);
        }
        .switch-anchor {
          color: var(--color-primary-dark);
          font-weight: 800;
          text-decoration: underline;
        }
        .switch-anchor:hover {
          color: var(--color-secondary);
        }

        /* Mobile Ribbon */
        .mobile-ribbon-perks {
          display: none;
          margin-top: 22px;
          padding-top: 16px;
          border-top: 1px solid rgba(212, 168, 83, 0.2);
          gap: 6px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .ribbon-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--color-secondary);
          background: rgba(201, 136, 42, 0.1);
          border: 1px solid rgba(201, 136, 42, 0.25);
          padding: 3px 9px;
          border-radius: 999px;
        }
        .chip-ico {
          color: #1e5a39;
        }

        /* ========================================================
           RESPONSIVE BREAKPOINTS
           ======================================================== */
        @media (max-width: 920px) {
          .auth-master-card {
            grid-template-columns: 1fr;
            max-width: 520px;
            border-radius: 20px;
          }

          .auth-left-showcase {
            display: none;
          }

          .auth-right-form {
            padding: 32px 24px;
          }

          .mobile-ribbon-perks {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .auth-container-wrapper {
            padding: 16px 12px 48px 12px;
          }

          .auth-breadcrumb-bar {
            margin-bottom: 16px;
          }

          .auth-right-form {
            padding: 24px 18px;
          }

          .form-main-title {
            font-size: 1.7rem;
          }

          .social-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
