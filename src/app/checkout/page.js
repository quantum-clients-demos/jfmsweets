"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck,
  CreditCard,
  Building,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import confetti from "canvas-confetti";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, discountAmount, grandTotal, shippingFee, clearCart, addToast } = useCart();
  const { user, addOrder } = useAuth();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: user?.name || "Ashutosh Sharma",
    email: user?.email || "ashutosh@example.com",
    phone: user?.phone || "+91 98765 43210",
    address: "Flat 402, Royal Palms Residency, MG Road",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    deliveryType: "express",
    paymentMethod: "upi",
    upiId: "ashutosh@okhdfcbank",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
        addToast("Please fill in all mandatory delivery fields", "error");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4A853", "#3C1518", "#F0D48A", "#2D6A4F"],
      });
    } catch (e) {}

    const placedOrder = addOrder({
      customer: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      deliveryType: formData.deliveryType === "express" ? "Express 24-48h Dispatch" : "Standard Courier",
      paymentMethod: formData.paymentMethod.toUpperCase(),
      items: cart.map((i) => ({ name: i.name, weight: i.weight, qty: i.quantity, price: i.price })),
      total: grandTotal,
    });

    clearCart();
    addToast("Order placed successfully! Royal congratulations 🎉", "success");
    router.push(`/order-success?orderId=${placedOrder.id}`);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center", background: "var(--color-bg)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--color-secondary)", marginBottom: "12px" }}>
          Your bag is empty
        </h2>
        <Link href="/shop" className="btn btn-primary">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: "90px", background: "var(--color-bg)", paddingTop: "clamp(24px, 4vw, 40px)" }}>
      <div className="container">
        {/* Progress Stepper Indicator */}
        <div style={{ marginBottom: "32px", padding: "0 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative", maxWidth: "540px", margin: "0 auto" }}>
            {/* Step Line */}
            <div
              style={{
                position: "absolute",
                top: "18px",
                left: "15%",
                right: "15%",
                height: "3px",
                background: "rgba(212, 168, 83, 0.3)",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "var(--color-primary)",
                  width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
                  transition: "width 0.3s ease",
                }}
              />
            </div>

            {[
              { num: 1, title: "Shipping Address", shortTitle: "Shipping" },
              { num: 2, title: "Payment Method", shortTitle: "Payment" },
              { num: 3, title: "Review & Confirm", shortTitle: "Review" },
            ].map((s) => {
              const isPassed = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 2, minWidth: "70px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: isCurrent || isPassed ? "var(--color-secondary)" : "#ffffff",
                      border: "2px solid var(--color-primary)",
                      color: isCurrent || isPassed ? "#ffffff" : "var(--color-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                    }}
                  >
                    {isPassed ? <CheckCircle2 size={18} style={{ color: "var(--color-primary-light)" }} /> : s.num}
                  </div>
                  <span style={{ fontSize: "clamp(0.72rem, 2.2vw, 0.82rem)", fontWeight: isCurrent ? 700 : 500, color: isCurrent ? "var(--color-secondary)" : "var(--color-text-light)", marginTop: "6px", textAlign: "center" }}>
                    <span className="step-title-full">{s.title}</span>
                    <span className="step-title-short">{s.shortTitle}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px" }} className="checkout-layout">
          {/* Left: Interactive Multi-Step Form */}
          <div
            style={{
              background: "#ffffff",
              padding: "clamp(20px, 4vw, 36px)",
              borderRadius: "20px",
              border: "1px solid rgba(212, 168, 83, 0.25)",
              boxShadow: "var(--shadow-sm)",
              boxSizing: "border-box",
              width: "100%",
              minWidth: 0,
            }}
          >
            {/* Step 1: Shipping */}
            {step === 1 && (
              <form onSubmit={handleNextStep}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.25rem, 3.5vw, 1.45rem)", color: "var(--color-secondary)", marginBottom: "20px" }}>
                  Delivery & Contact Information
                </h2>

                <div className="form-grid-2-cols">
                  <div style={{ minWidth: 0 }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.95rem", outline: "none", minWidth: 0 }}
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                      Phone (for Delivery SMS) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.95rem", outline: "none", minWidth: 0 }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "16px", minWidth: 0 }}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.95rem", outline: "none", minWidth: 0 }}
                  />
                </div>

                <div style={{ marginBottom: "16px", minWidth: 0 }}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                    Street Address, Flat / House No *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.95rem", outline: "none", minWidth: 0 }}
                  />
                </div>

                <div className="form-grid-3-cols">
                  <div style={{ minWidth: 0 }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.95rem", outline: "none", minWidth: 0 }}
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.95rem", outline: "none", minWidth: 0 }}
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.95rem", outline: "none", minWidth: 0 }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center", padding: "15px" }}>
                  Continue to Payment Options <ArrowRight size={18} />
                </button>
              </form>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.25rem, 3.5vw, 1.45rem)", color: "var(--color-secondary)", marginBottom: "20px" }}>
                  Select Payment Method
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                  {[
                    { id: "upi", title: "Instant UPI (GPay, PhonePe, Paytm, QR)", icon: "⚡" },
                    { id: "card", title: "Credit & Debit Cards (Visa, Mastercard, RuPay)", icon: "💳" },
                    { id: "netbanking", title: "Netbanking (All Major Indian Banks)", icon: "🏛️" },
                    { id: "cod", title: "Cash On Delivery (Verified with OTP)", icon: "💵" },
                  ].map((method) => {
                    const isSelected = formData.paymentMethod === method.id;
                    return (
                      <label
                        key={method.id}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          padding: "14px 16px",
                          borderRadius: "12px",
                          border: isSelected ? "2px solid var(--color-primary)" : "1px solid var(--color-primary-light)",
                          background: isSelected ? "var(--color-bg)" : "#ffffff",
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: "0.92rem",
                          color: "var(--color-secondary)",
                          lineHeight: 1.4,
                          boxSizing: "border-box",
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={isSelected}
                          onChange={handleChange}
                          style={{ accentColor: "var(--color-primary)", width: "18px", height: "18px", marginTop: "2px", flexShrink: 0 }}
                        />
                        <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{method.icon}</span>
                        <span style={{ wordBreak: "break-word" }}>{method.title}</span>
                      </label>
                    );
                  })}
                </div>

                {formData.paymentMethod === "upi" && (
                  <div style={{ background: "var(--color-bg-alt)", padding: "16px", borderRadius: "10px", marginBottom: "24px", boxSizing: "border-box" }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                      Enter your UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="mobile@upi or user@okhdfcbank"
                      style={{ width: "100%", boxSizing: "border-box", padding: "11px 13px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", background: "#fff", fontSize: "0.95rem" }}
                    />
                  </div>
                )}

                <div className="checkout-step-actions">
                  <button onClick={() => setStep(1)} className="btn btn-outline" style={{ flex: 1, padding: "14px", justifyContent: "center" }}>
                    <ArrowLeft size={16} /> Back to Shipping
                  </button>
                  <button onClick={() => setStep(3)} className="btn btn-primary" style={{ flex: 2, padding: "14px", justifyContent: "center" }}>
                    Review Order Summary <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Place */}
            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.25rem, 3.5vw, 1.45rem)", color: "var(--color-secondary)", marginBottom: "16px" }}>
                  Review Your Order Details
                </h2>

                <div style={{ background: "var(--color-bg-alt)", padding: "clamp(14px, 3vw, 18px) clamp(14px, 3.5vw, 20px)", borderRadius: "12px", border: "1px solid rgba(212, 168, 83, 0.25)", marginBottom: "18px" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--color-secondary)", marginBottom: "6px" }}>
                    Shipping To:
                  </div>
                  <div style={{ fontSize: "0.88rem", color: "var(--color-text)", lineHeight: 1.5, wordBreak: "break-word" }}>
                    {formData.fullName} ({formData.phone})<br />
                    {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                  </div>
                  <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "var(--color-primary-dark)", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, marginTop: "8px", textDecoration: "underline" }}>
                    Edit Address
                  </button>
                </div>

                <div style={{ background: "var(--color-bg-alt)", padding: "clamp(14px, 3vw, 18px) clamp(14px, 3.5vw, 20px)", borderRadius: "12px", border: "1px solid rgba(212, 168, 83, 0.25)", marginBottom: "24px" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--color-secondary)", marginBottom: "6px" }}>
                    Payment Mode:
                  </div>
                  <div style={{ fontSize: "0.88rem", color: "var(--color-text)", wordBreak: "break-word" }}>
                    {formData.paymentMethod.toUpperCase()} {formData.paymentMethod === "upi" ? `(${formData.upiId})` : ""}
                  </div>
                  <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: "var(--color-primary-dark)", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, marginTop: "8px", textDecoration: "underline" }}>
                    Change Payment
                  </button>
                </div>

                <div className="checkout-step-actions">
                  <button onClick={() => setStep(2)} className="btn btn-outline" style={{ flex: 1, padding: "14px", justifyContent: "center" }}>
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="btn btn-primary"
                    style={{ flex: 2, padding: "15px", fontSize: "clamp(0.98rem, 2.5vw, 1.05rem)", justifyContent: "center" }}
                  >
                    Confirm & Place Order (₹{grandTotal})
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary Sidebar */}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                background: "#ffffff",
                padding: "clamp(18px, 4vw, 24px)",
                borderRadius: "18px",
                border: "1.5px solid var(--color-primary)",
                boxShadow: "var(--shadow-sm)",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.15rem, 3vw, 1.25rem)", color: "var(--color-secondary)", marginBottom: "16px" }}>
                Items in Order ({cart.length})
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px", maxHeight: "280px", overflowY: "auto" }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: "12px", alignItems: "center", borderBottom: "1px solid var(--color-bg)", paddingBottom: "10px" }}>
                    <img src={item.image} alt={item.name} style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--color-secondary)", wordBreak: "break-word" }}>{item.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-light)" }}>Qty: {item.quantity} • {item.weight}</div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--color-secondary)", flexShrink: 0 }}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem", borderTop: "1px solid rgba(212, 168, 83, 0.2)", paddingTop: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-success)", fontWeight: 700 }}>
                    <span>Festive Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong style={{ color: "var(--color-success)" }}>FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "clamp(1.1rem, 3vw, 1.25rem)",
                    fontWeight: 800,
                    color: "var(--color-secondary)",
                    paddingTop: "10px",
                    borderTop: "1px dashed var(--color-primary-light)",
                  }}
                >
                  <span>Grand Total</span>
                  <span style={{ color: "var(--color-primary-dark)" }}>₹{grandTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .form-grid-2-cols {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 16px;
        }
        .form-grid-3-cols {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 24px;
        }
        .step-title-short {
          display: none;
        }

        .checkout-step-actions {
          display: flex;
          gap: 12px;
        }

        @media (max-width: 860px) {
          .checkout-layout {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 640px) {
          .form-grid-2-cols, .form-grid-3-cols {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
        @media (max-width: 580px) {
          .step-title-full {
            display: none;
          }
          .step-title-short {
            display: inline;
          }
          .checkout-step-actions {
            flex-direction: column-reverse;
            gap: 10px;
          }
          .checkout-step-actions .btn {
            width: 100% !important;
            flex: none !important;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
