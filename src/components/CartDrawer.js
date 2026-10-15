"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, Check } from "lucide-react";

export default function CartDrawer() {
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
    grandTotal,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon) return;
    applyCoupon(inputCoupon);
    setInputCoupon("");
  };

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <>
      <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)} />
      <div className="drawer-content">
        {/* Drawer Header */}
        <div
          style={{
            padding: "clamp(16px, 4vw, 22px) clamp(16px, 4vw, 26px)",
            borderBottom: "1px solid #f6eedb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#faf5ed",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
            <ShoppingBag size={22} style={{ color: "var(--color-primary-dark)", flexShrink: 0 }} />
            <h3 style={{ fontFamily: "var(--font-royal)", fontSize: "clamp(1.15rem, 3.5vw, 1.35rem)", fontWeight: 800, margin: 0, color: "var(--color-secondary)", letterSpacing: "0.03em", whiteSpace: "nowrap" }}>
              Your Royal Bag ({cartCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#2c1206",
              padding: "6px",
              borderRadius: "50%",
              display: "flex",
              flexShrink: 0,
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div style={{ padding: "14px clamp(16px, 4vw, 26px)", background: "#fbf8f0", borderBottom: "1px solid #f6eedb" }}>
          <div style={{ fontSize: "clamp(0.82rem, 2.2vw, 0.9rem)", fontWeight: 600, color: "#2c1206", marginBottom: "8px", lineHeight: 1.4 }}>
            {isFreeShipping ? (
              <span style={{ color: "#2a7e58", display: "flex", alignItems: "center", gap: "8px", fontWeight: 700 }}>
                <Check size={18} style={{ flexShrink: 0 }} /> You unlocked FREE Express Shipping across India!
              </span>
            ) : (
              <span>
                Add <strong style={{ color: "#853e0d", fontWeight: 800 }}>₹{remainingForFreeShipping}</strong> more for <strong>FREE Express Shipping</strong>!
              </span>
            )}
          </div>
          <div
            style={{
              width: "100%",
              height: "8px",
              background: "#ede5d8",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: "linear-gradient(90deg, #c9882a 0%, #2a7e58 100%)",
                borderRadius: "999px",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* Cart items list or Empty State */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px clamp(16px, 4vw, 26px)" }}>
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "#fbf8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.4rem",
                  marginBottom: "16px",
                  border: "2px dashed #c9882a",
                }}
              >
                🥜
              </div>
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", marginBottom: "8px", color: "var(--color-secondary)" }}>
                Your cart is empty!
              </h4>
              <p style={{ fontSize: "0.95rem", color: "#6b574a", marginBottom: "22px", lineHeight: 1.6, maxWidth: "280px" }}>
                Experience the handcrafted crunch of pure jaggery brittles & royal gajak.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/shop");
                }}
              >
                Explore Brittles
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "12px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid #f6eedb",
                    alignItems: "center",
                    minWidth: 0,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "12px",
                      objectFit: "cover",
                      border: "1.5px solid #ede3d2",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.98rem", color: "#2c1206", lineHeight: 1.35, wordBreak: "break-word" }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#853e0d", marginTop: "2px" }}>
                      Pack: <strong>{item.weight}</strong>
                      {item.isCustomBox && " • Custom Box"}
                    </div>
                    {item.customData?.brittles && (
                      <div style={{ fontSize: "0.78rem", color: "#6b574a", marginTop: "3px", wordBreak: "break-word" }}>
                        Includes: {item.customData.brittles.map((b) => b.name).join(", ")}
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                      <div style={{ fontWeight: 800, color: "#2c1206", fontSize: "1.05rem", fontFamily: "var(--font-heading)", flexShrink: 0 }}>
                        ₹{item.price * item.quantity}
                      </div>

                      {/* Quantity stepper */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1.5px solid #d5a657",
                          borderRadius: "999px",
                          overflow: "hidden",
                          background: "#fff",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          style={{
                            padding: "4px 8px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#2c1206",
                          }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: "0.88rem", fontWeight: 800, minWidth: "24px", textAlign: "center" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          style={{
                            padding: "4px 8px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#2c1206",
                          }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#9e8779",
                      cursor: "pointer",
                      padding: "6px",
                      flexShrink: 0,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9e8779")}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer with Coupon & Checkout */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "clamp(16px, 4vw, 22px) clamp(16px, 4vw, 26px) calc(16px + env(safe-area-inset-bottom, 0px))",
              background: "#faf5ed",
              borderTop: "1.5px solid rgba(201, 136, 42, 0.25)",
              boxSizing: "border-box",
            }}
          >
            {/* Quick Coupon Input */}
            <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "8px", marginBottom: "16px", width: "100%", boxSizing: "border-box" }}>
              <input
                type="text"
                placeholder="Promo code (CRUNCH20)"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: "9px 12px",
                  borderRadius: "8px",
                  border: "1.5px solid #d5a657",
                  background: "#fff",
                  fontSize: "0.88rem",
                  textTransform: "uppercase",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "9px 16px",
                  background: "#2c1206",
                  color: "#fff",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.88rem",
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
                  background: "#e8f5ee",
                  color: "#16422f",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  marginBottom: "14px",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Tag size={15} /> Code: {couponCode} (-₹{discountAmount})
                </span>
                <button
                  onClick={removeCoupon}
                  style={{ background: "none", border: "none", color: "#16422f", cursor: "pointer", fontSize: "0.85rem", textDecoration: "underline", fontWeight: 600 }}
                >
                  Remove
                </button>
              </div>
            )}

            {/* Calculations breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.98rem", marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#6b574a" }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: "#2c1206" }}>₹{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#2a7e58", fontWeight: 700 }}>
                  <span>Festive Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", color: "#6b574a" }}>
                <span>Express Delivery</span>
                <span>{isFreeShipping ? <strong style={{ color: "#2a7e58" }}>FREE</strong> : "₹79"}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#2c1206",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  paddingTop: "10px",
                  borderTop: "1.5px dashed #d5a657",
                  marginTop: "6px",
                  fontFamily: "var(--font-heading)",
                }}
              >
                <span>Total Amount</span>
                <span style={{ color: "#853e0d" }}>₹{grandTotal}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                className="btn btn-primary"
                style={{ width: "100%", padding: "16px", fontSize: "1.1rem" }}
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/checkout");
                }}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-outline"
                style={{ width: "100%", padding: "12px", fontSize: "0.98rem", fontWeight: 700 }}
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/cart");
                }}
              >
                View Full Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
