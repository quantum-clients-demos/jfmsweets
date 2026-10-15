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

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { addToast } = useCart();

  const [email, setEmail] = useState("ashutosh@example.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast("Please enter email and password", "error");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      addToast("Welcome back to JFM Royal Sweets!", "success");
      router.push("/account");
    }, 250);
  };

  const handleQuickDemoLogin = () => {
    setEmail("ashutosh@example.com");
    setPassword("password123");
    login("ashutosh@example.com", "password123");
    addToast("Signed in as Demo Connoisseur!", "success");
    router.push("/account");
  };

  const handleSocialLogin = (provider) => {
    login(`${provider.toLowerCase()}user@jfmsweets.com`, "social");
    addToast(`Signed in with ${provider} successfully!`, "success");
    router.push("/account");
  };

  return (
    <div className="auth-container-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="auth-breadcrumb-bar">
        <Link href="/" className="crumb-link">Home</Link>
        <ChevronRight size={13} className="crumb-sep" />
        <span className="crumb-current">Sign In</span>
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
              Savor the Privileges of Royal Confectionery
            </h3>
            <p className="showcase-subtext">
              Log in to track fresh batches, manage customized brass keepsake hampers, and access connoisseur pricing.
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
                  <h4 className="perk-title">15% Welcome Blessing</h4>
                  <p className="perk-desc">Apply code <strong>ROYAL15</strong> across all artisanal brittles</p>
                </div>
              </div>

              <div className="showcase-perk-item">
                <div className="perk-icon-wrap">
                  <Truck size={15} />
                </div>
                <div>
                  <h4 className="perk-title">Priority Batch Dispatch</h4>
                  <p className="perk-desc">Wok-fresh priority routing for festival & wedding boxes</p>
                </div>
              </div>

              <div className="showcase-perk-item">
                <div className="perk-icon-wrap">
                  <Gift size={15} />
                </div>
                <div>
                  <h4 className="perk-title">Saved Box Recipes</h4>
                  <p className="perk-desc">Re-order your favorite custom 4-treat tins in 1 click</p>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase-bottom">
            <ShieldCheck size={16} className="bottom-shield" />
            <span>100% Organic Kolhapur Gur • Zero Palm Oil • Pure Desi Ghee</span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="auth-right-form">
          {/* Segmented Auth Navigation Tabs */}
          <div className="auth-tabs-row">
            <button
              type="button"
              className="auth-tab active"
              aria-selected="true"
            >
              <Crown size={14} />
              <span>Sign In</span>
            </button>
            <Link
              href="/auth/signup"
              className="auth-tab"
              aria-selected="false"
            >
              <Sparkles size={14} />
              <span>Create Account</span>
            </Link>
          </div>

          <div className="form-heading-group">
            <h1 className="form-main-title">Welcome Back</h1>
            <p className="form-sub-title">
              Sign in to manage your orders, wishlist & addresses
            </p>
          </div>

          {/* Quick Demo Sign In Button */}
          <div className="demo-access-card">
            <div className="demo-access-info">
              <span className="demo-access-badge">EVALUATION DEMO</span>
              <p className="demo-access-text">
                One-click login with pre-configured orders & addresses
              </p>
            </div>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="demo-access-btn"
            >
              <Crown size={13} />
              <span>Instant Demo</span>
            </button>
          </div>

          {/* Social Sign-In Buttons */}
          <div className="social-grid">
            <button
              type="button"
              onClick={() => handleSocialLogin("Google")}
              className="social-btn"
              aria-label="Continue with Google"
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
              onClick={() => handleSocialLogin("Apple")}
              className="social-btn"
              aria-label="Continue with Apple"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="social-svg">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-.93 2.73 1.01.08 2.01-.48 2.63-1.23z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <div className="auth-separator">
            <span className="sep-line" />
            <span className="sep-text">or sign in with email</span>
            <span className="sep-line" />
          </div>

          <form onSubmit={handleSubmit} className="auth-form-body">
            <div className="field-group">
              <label htmlFor="signin-email" className="field-label">
                Email Address
              </label>
              <div className="field-input-box">
                <input
                  id="signin-email"
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
              <div className="field-label-row">
                <label htmlFor="signin-password" className="field-label">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => addToast("Password reset instructions sent to " + (email || "your email"), "info")}
                  className="forgot-action"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="field-input-box">
                <input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
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
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="native-checkbox"
                />
                <span>Remember this device for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary submit-cta-btn"
            >
              <span>{isLoading ? "Signing in..." : "Sign In to Account"}</span>
              <ArrowRight size={17} />
            </button>
          </form>

          {/* Switch Prompt */}
          <div className="auth-switch-box">
            Don&apos;t have a royal account?{" "}
            <Link href="/auth/signup" className="switch-anchor">
              Join the Royal Club
            </Link>
          </div>

          {/* Mobile Perks Strip */}
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

        /* Demo Card */
        .demo-access-card {
          background: linear-gradient(135deg, rgba(201, 136, 42, 0.1) 0%, rgba(201, 136, 42, 0.03) 100%);
          border: 1px solid rgba(201, 136, 42, 0.35);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }
        .demo-access-info {
          min-width: 0;
        }
        .demo-access-badge {
          font-family: var(--font-royal);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--color-accent);
          display: block;
        }
        .demo-access-text {
          font-size: 0.8rem;
          color: var(--color-text);
          margin: 2px 0 0 0;
        }
        .demo-access-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          background: linear-gradient(135deg, #3c1518 0%, #200b0d 100%);
          color: #fce7b0;
          border: 1px solid var(--color-primary);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(32, 11, 13, 0.2);
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .demo-access-btn:hover {
          transform: translateY(-1px);
          background: #4e1c20;
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
        .field-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .forgot-action {
          background: none;
          border: none;
          padding: 0;
          color: var(--color-primary-dark);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
        }
        .forgot-action:hover {
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
          align-items: center;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 0.86rem;
          color: var(--color-text);
          cursor: pointer;
          user-select: none;
        }
        .native-checkbox {
          width: 17px;
          height: 17px;
          accent-color: var(--color-primary);
          cursor: pointer;
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

          .demo-access-card {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }
          .demo-access-btn {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
