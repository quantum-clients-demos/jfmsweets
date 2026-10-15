"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Tag,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Gift
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    cartCount,
    cartSubtotal,
    discountAmount,
    couponCode,
    isFreeShipping,
    freeShippingThreshold,
    remainingForFreeShipping,
    shippingFee,
    grandTotal,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon) return;
    applyCoupon(inputCoupon);
    setInputCoupon("");
  };

  const finalTotal = grandTotal + (giftWrap ? 49 : 0);

  if (cart.length === 0) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center", background: "var(--color-bg)", minHeight: "65vh" }}>
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "#ffffff",
            border: "1.5px dashed var(--color-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.8rem",
            margin: "0 auto 20px",
          }}
        >
          🥜
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-secondary)", marginBottom: "8px" }}>
          Your Royal Bag is Empty
        </h1>
        <p style={{ color: "var(--color-text-light)", maxWidth: "440px", margin: "0 auto 28px", fontSize: "0.95rem" }}>
          Discover our stone-rolled peanut chikkis, saffron almond brittles, and melt-in-mouth Kaju Katli.
        </p>
        <Link href="/shop" className="btn btn-primary btn-lg">
          Explore Handcrafted Sweets <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: "90px", background: "var(--color-bg)", paddingTop: "clamp(24px, 4vw, 40px)" }}>
      <div className="container">
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 5vw, 2.4rem)", color: "var(--color-secondary)", marginBottom: "8px" }}>
          Shopping Bag ({cartCount} {cartCount === 1 ? "item" : "items"})
        </h1>

        {/* Free Shipping Progress */}
        <div
          style={{
            background: "#ffffff",
            padding: "clamp(12px, 3vw, 16px) clamp(14px, 3.5vw, 24px)",
            borderRadius: "14px",
            border: "1px solid var(--color-primary-light)",
            marginBottom: "28px",
            boxShadow: "var(--shadow-sm)",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <div style={{ fontSize: "clamp(0.82rem, 2.2vw, 0.9rem)", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "8px", lineHeight: 1.4 }}>
            {isFreeShipping ? (
              <span style={{ color: "var(--color-success)", display: "flex", alignItems: "center", gap: "6px" }}>
                <CheckCircle2 size={16} style={{ flexShrink: 0 }} /> Congratulations! You unlocked FREE Express Delivery across India.
              </span>
            ) : (
              <span>
                Add <strong style={{ color: "var(--color-primary-dark)" }}>₹{remainingForFreeShipping}</strong> more to qualify for <strong>FREE Express Shipping</strong>!
              </span>
            )}
          </div>
          <div style={{ width: "100%", height: "8px", background: "var(--color-bg)", borderRadius: "999px", overflow: "hidden" }}>
            <div
              style={{
                width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%`,
                height: "100%",
                background: "linear-gradient(90deg, var(--color-primary) 0%, var(--color-success) 100%)",
                borderRadius: "999px",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* 2-Column Cart Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px" }} className="cart-layout">
          {/* Cart Items List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: 0 }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#ffffff",
                  padding: "clamp(14px, 3.5vw, 20px)",
                  borderRadius: "16px",
                  border: "1px solid rgba(212, 168, 83, 0.25)",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  gap: "clamp(12px, 3vw, 18px)",
                  alignItems: "center",
                  boxSizing: "border-box",
                  width: "100%",
                  minWidth: 0,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "clamp(68px, 18vw, 84px)",
                    height: "clamp(68px, 18vw, 84px)",
                    borderRadius: "12px",
                    objectFit: "cover",
                    border: "1px solid var(--color-primary-light)",
                    flexShrink: 0,
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.02rem, 2.8vw, 1.15rem)", color: "var(--color-secondary)", margin: 0, lineHeight: 1.3, wordBreak: "break-word" }}>
                        {item.name}
                      </h3>
                      <div style={{ fontSize: "0.82rem", color: "var(--color-accent)", marginTop: "3px", fontWeight: 600 }}>
                        Pack: {item.weight} {item.isCustomBox && "• Custom Box"}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-light)", padding: "4px", flexShrink: 0 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-error)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-light)")}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginTop: "14px" }}>
                    {/* Stepper */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1.5px solid var(--color-primary)",
                        borderRadius: "999px",
                        overflow: "hidden",
                        background: "#fff",
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        style={{ padding: "5px 12px", background: "none", border: "none", cursor: "pointer", color: "var(--color-secondary)", fontSize: "0.95rem" }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontWeight: 800, minWidth: "28px", textAlign: "center", fontSize: "0.9rem", color: "var(--color-secondary)" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        style={{ padding: "5px 12px", background: "none", border: "none", cursor: "pointer", color: "var(--color-secondary)", fontSize: "0.95rem" }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <span style={{ fontSize: "clamp(1.05rem, 3vw, 1.2rem)", fontWeight: 800, color: "var(--color-secondary)" }}>
                        ₹{item.price * item.quantity}
                      </span>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-light)" }}>
                        (₹{item.price} each)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Gift Wrap Addon Option */}
            <div
              style={{
                background: "#ffffff",
                padding: "clamp(14px, 3vw, 18px) clamp(16px, 3.5vw, 24px)",
                borderRadius: "16px",
                border: "1px solid rgba(212, 168, 83, 0.25)",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", fontWeight: 700, fontSize: "clamp(0.85rem, 2.2vw, 0.92rem)", color: "var(--color-secondary)", lineHeight: 1.4 }}>
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  style={{ accentColor: "var(--color-primary)", width: "18px", height: "18px", marginTop: "2px", flexShrink: 0 }}
                />
                <span style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                  <Gift size={18} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                  Add Royal Satin Ribbon & Personalized Handwritten Card (+₹49)
                </span>
              </label>

              {giftWrap && (
                <textarea
                  placeholder="Write your personal gift message to the recipient..."
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    marginTop: "12px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid var(--color-primary-light)",
                    fontSize: "0.85rem",
                    outline: "none",
                    height: "70px",
                  }}
                />
              )}
            </div>

            <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--color-primary-dark)", fontWeight: 700, fontSize: "0.92rem", marginTop: "4px" }}>
              <ArrowLeft size={16} /> Continue Shopping For More Sweets
            </Link>
          </div>

          {/* Right Summary Sidebar */}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                background: "#ffffff",
                padding: "clamp(18px, 4vw, 28px)",
                borderRadius: "18px",
                border: "1.5px solid var(--color-primary)",
                boxShadow: "var(--shadow-md)",
                position: "sticky",
                top: "100px",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.15rem, 3vw, 1.3rem)", color: "var(--color-secondary)", marginBottom: "18px" }}>
                Order Summary
              </h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "8px", marginBottom: "18px", width: "100%", boxSizing: "border-box" }}>
                <input
                  type="text"
                  placeholder="Promo Code (CRUNCH20)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--color-primary-light)",
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    outline: "none",
                    background: "var(--color-bg)",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "10px 16px",
                    background: "var(--color-secondary)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Apply
                </button>
              </form>

              {couponCode && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#E8F5EE",
                    color: "var(--color-success)",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: "16px",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Tag size={14} /> Coupon {couponCode} (-₹{discountAmount})
                  </span>
                  <button onClick={removeCoupon} style={{ background: "none", border: "none", color: "var(--color-success)", cursor: "pointer", fontSize: "0.78rem", textDecoration: "underline" }}>
                    Remove
                  </button>
                </div>
              )}

              {/* Calculation Rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.92rem", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-light)" }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 600, color: "var(--color-secondary)" }}>₹{cartSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-success)", fontWeight: 700 }}>
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                {giftWrap && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-light)" }}>
                    <span>Royal Gift Wrap</span>
                    <span style={{ fontWeight: 600 }}>₹49</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-light)" }}>
                  <span>Express Insured Shipping</span>
                  <span>{isFreeShipping ? <strong style={{ color: "var(--color-success)" }}>FREE</strong> : `₹${shippingFee}`}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "14px",
                    borderTop: "1.5px dashed var(--color-primary-light)",
                    fontSize: "clamp(1.1rem, 3vw, 1.25rem)",
                    fontWeight: 800,
                    color: "var(--color-secondary)",
                  }}
                >
                  <span>Grand Total</span>
                  <span style={{ color: "var(--color-primary-dark)" }}>₹{finalTotal}</span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="btn btn-primary"
                style={{ width: "100%", padding: "15px", fontSize: "clamp(1rem, 2.5vw, 1.05rem)", justifyContent: "center" }}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px", fontSize: "0.78rem", color: "var(--color-text-light)", textAlign: "center" }}>
                <ShieldCheck size={16} style={{ color: "var(--color-success)", flexShrink: 0 }} />
                <span>256-Bit SSL Encrypted & 100% Fresh Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
