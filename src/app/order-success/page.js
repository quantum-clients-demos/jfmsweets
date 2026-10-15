"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, Sparkles, ArrowRight, Truck, Clock } from "lucide-react";
import confetti from "canvas-confetti";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "JFM-892401";

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4A853", "#3C1518", "#F0D48A", "#2D6A4F"],
      });
    } catch (e) {}
  }, []);

  return (
    <div style={{ padding: "80px 20px", background: "var(--color-bg)", minHeight: "75vh" }}>
      <div
        className="glass-card"
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "48px 36px",
          textAlign: "center",
          border: "2px solid var(--color-primary)",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "#E8F5EE",
            color: "var(--color-success)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <CheckCircle2 size={44} />
        </div>

        <span className="badge badge-gold" style={{ marginBottom: "14px" }}>
          Order Confirmed & In Wok
        </span>

        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2.2rem", color: "var(--color-secondary)", marginBottom: "10px" }}>
          Thank You For Savoring Royalty!
        </h1>

        <p style={{ color: "var(--color-text-light)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "28px" }}>
          Your order <strong style={{ color: "var(--color-secondary)" }}>#{orderId}</strong> has been received by our master karigars. Your brittles are being freshly roasted and sealed in golden airtight tins.
        </p>

        {/* Status Stepper */}
        <div
          style={{
            background: "var(--color-bg-alt)",
            padding: "20px",
            borderRadius: "14px",
            border: "1px solid rgba(212, 168, 83, 0.25)",
            marginBottom: "32px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            textAlign: "center",
          }}
        >
          <div>
            <div style={{ color: "var(--color-success)", fontWeight: 800, fontSize: "0.88rem" }}>✓ Order Received</div>
            <div style={{ fontSize: "0.74rem", color: "var(--color-text-light)" }}>Just now</div>
          </div>
          <div>
            <div style={{ color: "var(--color-primary-dark)", fontWeight: 800, fontSize: "0.88rem" }}>⚡ Wok Roasting</div>
            <div style={{ fontSize: "0.74rem", color: "var(--color-text-light)" }}>In progress</div>
          </div>
          <div>
            <div style={{ color: "var(--color-text-light)", fontWeight: 600, fontSize: "0.88rem" }}>🚚 Express Delivery</div>
            <div style={{ fontSize: "0.74rem", color: "var(--color-text-light)" }}>Within 24-48 Hours</div>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
          <Link href="/account?tab=orders" className="btn btn-secondary">
            View In Order History
          </Link>
          <Link href="/shop" className="btn btn-primary">
            Continue Savoring <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: "80px 20px", textAlign: "center" }}>Loading receipt...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
