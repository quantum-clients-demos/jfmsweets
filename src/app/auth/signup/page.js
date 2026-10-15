"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { Sparkles, Lock, Mail, User, Phone, ArrowRight } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const { addToast } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast("Please fill in all mandatory fields", "error");
      return;
    }
    if (!agreeTerms) {
      addToast("Please accept the Terms & Conditions", "error");
      return;
    }
    signup(name, email, phone);
    addToast("Account created successfully! Welcome to the JFM Royal Family 🎉", "success");
    router.push("/account");
  };

  return (
    <div style={{ padding: "80px 20px", background: "var(--color-bg)", minHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        className="glass-card"
        style={{
          maxWidth: "460px",
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
            Join JFM Royal Club
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-light)", marginTop: "4px" }}>
            Create an account to unlock 15% off and save your sweet selections
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
              Full Name *
            </label>
            <div style={{ position: "relative" }}>
              <User size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-primary)" }} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ananya Roy"
                style={{ width: "100%", padding: "10px 12px 10px 38px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.88rem", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
              Email Address *
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-primary)" }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                style={{ width: "100%", padding: "10px 12px 10px 38px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.88rem", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
              Mobile Number
            </label>
            <div style={{ position: "relative" }}>
              <Phone size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-primary)" }} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                style={{ width: "100%", padding: "10px 12px 10px 38px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.88rem", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
              Password *
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-primary)" }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: "100%", padding: "10px 12px 10px 38px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.88rem", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "24px" }}>
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              style={{ accentColor: "var(--color-primary)", marginTop: "3px" }}
            />
            <label htmlFor="terms" style={{ fontSize: "0.8rem", color: "var(--color-text)", cursor: "pointer", lineHeight: 1.5 }}>
              I agree to the JFM Sweets Terms of Service, Privacy Policy & consent to receive order updates.
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
            Create Royal Account <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.85rem", color: "var(--color-text-light)" }}>
          Already have an account?{" "}
          <Link href="/auth/signin" style={{ color: "var(--color-primary-dark)", fontWeight: 700 }}>
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
