"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { addToast } = useCart();

  const [email, setEmail] = useState("ashutosh@example.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast("Please enter email and password", "error");
      return;
    }
    login(email, password);
    addToast("Welcome back to JFM Royal Sweets!", "success");
    router.push("/account");
  };

  const handleSocialLogin = (provider) => {
    login(`${provider.toLowerCase()}user@jfmsweets.com`, "social");
    addToast(`Signed in with ${provider} successfully!`, "success");
    router.push("/account");
  };

  return (
    <div style={{ padding: "80px 20px", background: "var(--color-bg)", minHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        className="glass-card"
        style={{
          maxWidth: "440px",
          width: "100%",
          background: "#ffffff",
          padding: "40px",
          border: "1.5px solid var(--color-primary)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, var(--color-secondary) 0%, #200B0D 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-primary)",
              margin: "0 auto 12px",
            }}
          >
            <Sparkles size={22} />
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", color: "var(--color-secondary)" }}>
            Royal Member Sign In
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-light)", marginTop: "4px" }}>
            Access your order tracking, custom gift boxes & exclusive perks
          </p>
        </div>

        {/* Social Sign In Buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            type="button"
            onClick={() => handleSocialLogin("Google")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid rgba(212, 168, 83, 0.3)",
              background: "#ffffff",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.82rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("Apple")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid rgba(212, 168, 83, 0.3)",
              background: "#ffffff",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.82rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <span>Apple</span>
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", color: "var(--color-text-light)", fontSize: "0.78rem" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(212, 168, 83, 0.2)" }} />
          <span>or sign in with email</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(212, 168, 83, 0.2)" }} />
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-primary)" }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "10px 12px 10px 38px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.88rem", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)" }}>
                Password
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); addToast("Password reset instructions sent to your email", "info"); }} style={{ fontSize: "0.78rem", color: "var(--color-primary-dark)", textDecoration: "underline" }}>
                Forgot Password?
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-primary)" }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "10px 12px 10px 38px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.88rem", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ accentColor: "var(--color-primary)" }}
            />
            <label htmlFor="remember" style={{ fontSize: "0.82rem", color: "var(--color-text)", cursor: "pointer" }}>
              Keep me signed in on this device
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
            Sign In to Account <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.85rem", color: "var(--color-text-light)" }}>
          Don&apos;t have an account yet?{" "}
          <Link href="/auth/signup" style={{ color: "var(--color-primary-dark)", fontWeight: 700 }}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
