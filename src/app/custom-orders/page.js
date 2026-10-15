"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Gift,
  CheckCircle2,
  Calendar,
  Sparkles,
  Send,
  PhoneCall,
  Clock,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CustomOrdersPage() {
  const { addToast } = useCart();
  const [openFaq, setOpenFaq] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "wedding",
    quantity: "100-250",
    budget: "50000-100000",
    date: "",
    preferences: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      addToast("Please fill in your name, email and phone", "error");
      return;
    }
    addToast("Custom Order Inquiry Received! Our Gifting Concierge will call you within 2 hours 🎁", "success");
    setForm({
      name: "",
      email: "",
      phone: "",
      occasion: "wedding",
      quantity: "100-250",
      budget: "50000-100000",
      date: "",
      preferences: "",
    });
  };

  const pastOrdersGallery = [
    {
      title: "Royal Emerald Velvet Wedding Trunks",
      client: "Singhania & Mehta Nuptials, Udaipur",
      boxes: "350 Keepsake Trunks",
      image: "/images/products/wedding-gift-box.png",
    },
    {
      title: "Diwali Corporate Executives Hampers",
      client: "Apex Financial Group, Mumbai",
      boxes: "500 Gold Canister Sets",
      image: "/images/products/festival-hampers.png",
    },
    {
      title: "Silver Jubilee Celebration Box",
      client: "Kalyani Family Foundation, Delhi",
      boxes: "200 Ornate Brass Boxes",
      image: "/images/products/corporate-gift-sets.png",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Bespoke Consultation",
      desc: "Discuss your theme, guest count, and timeline with our dedicated Luxury Gifting Concierge.",
    },
    {
      step: "02",
      title: "Complimentary Tasting Flight",
      desc: "We dispatch a curated sample box of 6 brittle varieties directly to your doorstep for family approval.",
    },
    {
      step: "03",
      title: "Custom Branding & Packaging",
      desc: "Choose between brass clasps, velvet fabrics, embossed foil couple logos, and personalized calligraphic cards.",
    },
    {
      step: "04",
      title: "Small-Batch Roasting & Dispatch",
      desc: "Cooked fresh within 48 hours of your event and delivered with white-glove logistics across multiple city addresses.",
    },
  ];

  const faqs = [
    {
      q: "What is the minimum order quantity (MOQ) for custom gift boxes?",
      a: "Our custom branding (laser-engraved logo, foil embossing) starts at an MOQ of 25 boxes. For non-customized festive assortments, there is no minimum order.",
    },
    {
      q: "Can you ship directly to individual recipient addresses across India and abroad?",
      a: "Yes! Simply share an Excel sheet of your guests or clients. We handle multi-destination express packing, bubble protection, and real-time tracking updates.",
    },
    {
      q: "How far in advance should we place wedding or Diwali orders?",
      a: "For weddings and large corporate orders (100+ boxes), we recommend reaching out 3-4 weeks in advance to allow time for box prototyping and foil plate creation.",
    },
  ];

  return (
    <div style={{ paddingBottom: "90px", background: "var(--color-bg)" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #3C1518 0%, #200B0D 100%)",
          color: "var(--color-bg)",
          padding: "60px 0 50px",
          borderBottom: "2px solid var(--color-primary)",
        }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: "720px" }}>
          <span
            className="badge badge-gold"
            style={{ marginBottom: "14px", letterSpacing: "0.1em" }}
          >
            <Sparkles size={12} /> Bespoke Confectionery Studio
          </span>
          <h1 style={{ fontSize: "clamp(2.3rem, 4.5vw, 3.4rem)", fontFamily: "var(--font-heading)", color: "#fff", lineHeight: 1.15 }}>
            Bespoke Gifting For Weddings & Corporate Banquets
          </h1>
          <p style={{ color: "var(--color-bg-alt)", opacity: 0.9, marginTop: "12px", fontSize: "1.05rem", lineHeight: 1.6 }}>
            Elevate your momentous occasions with handcrafted brass keepsakes, royal velvet trunks, and small-batch roasted brittles customized to your signature aesthetic.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "60px" }}>
        {/* Main 2-Column: Form & Highlights */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "48px", marginBottom: "80px" }} className="custom-order-layout">
          {/* Form */}
          <div
            className="custom-order-form-card"
            style={{
              background: "#ffffff",
              padding: "clamp(20px, 4.5vw, 40px)",
              borderRadius: "20px",
              border: "1.5px solid var(--color-primary)",
              boxShadow: "var(--shadow-md)",
              boxSizing: "border-box",
              width: "100%",
              minWidth: 0,
            }}
          >
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.3rem, 3.5vw, 1.7rem)", color: "var(--color-secondary)", marginBottom: "8px", lineHeight: 1.25 }}>
              Request A Gifting Proposal
            </h2>
            <p style={{ fontSize: "0.92rem", color: "var(--color-text-light)", marginBottom: "24px", lineHeight: 1.6 }}>
              Fill in your event details below and our Concierge will prepare a custom quotation with tasting samples.
            </p>

            <form onSubmit={handleSubmit} style={{ width: "100%", minWidth: 0 }}>
              <div className="form-grid-2-cols">
                <div style={{ minWidth: 0 }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Radhika Singhania"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid var(--color-primary-light)",
                      fontSize: "0.92rem",
                      fontFamily: "var(--font-body), sans-serif",
                      background: "var(--color-bg)",
                      color: "var(--color-text)",
                      outline: "none",
                      minWidth: 0,
                    }}
                  />
                </div>
                <div style={{ minWidth: 0 }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98200 00000"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid var(--color-primary-light)",
                      fontSize: "0.92rem",
                      fontFamily: "var(--font-body), sans-serif",
                      background: "var(--color-bg)",
                      color: "var(--color-text)",
                      outline: "none",
                      minWidth: 0,
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px", minWidth: 0 }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                  Work / Personal Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@company.com"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid var(--color-primary-light)",
                    fontSize: "0.92rem",
                    fontFamily: "var(--font-body), sans-serif",
                    background: "var(--color-bg)",
                    color: "var(--color-text)",
                    outline: "none",
                    minWidth: 0,
                  }}
                />
              </div>

              <div className="form-grid-2-cols">
                <div style={{ minWidth: 0 }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                    Occasion / Event
                  </label>
                  <select
                    value={form.occasion}
                    onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      boxSizing: "border-box",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid var(--color-primary-light)",
                      fontSize: "0.92rem",
                      fontFamily: "var(--font-body), sans-serif",
                      background: "var(--color-bg)",
                      color: "var(--color-text)",
                      outline: "none",
                      minWidth: 0,
                    }}
                  >
                    <option value="wedding">Wedding Invitations / Favors</option>
                    <option value="corporate">Corporate Diwali / Annual Gifting</option>
                    <option value="birthday">Anniversary / Milestone Celebration</option>
                    <option value="vip">VIP Executive Client Hampers</option>
                  </select>
                </div>
                <div style={{ minWidth: 0 }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                    Estimated Boxes
                  </label>
                  <select
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      boxSizing: "border-box",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid var(--color-primary-light)",
                      fontSize: "0.92rem",
                      fontFamily: "var(--font-body), sans-serif",
                      background: "var(--color-bg)",
                      color: "var(--color-text)",
                      outline: "none",
                      minWidth: 0,
                    }}
                  >
                    <option value="25-50">25 – 50 Boxes</option>
                    <option value="50-100">50 – 100 Boxes</option>
                    <option value="100-250">100 – 250 Boxes</option>
                    <option value="250-500">250 – 500 Boxes</option>
                    <option value="500+">500+ Luxury Trunks</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "22px", minWidth: 0 }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                  Specific Sweet Preferences or Packaging Ideas
                </label>
                <textarea
                  rows={3}
                  value={form.preferences}
                  onChange={(e) => setForm({ ...form, preferences: e.target.value })}
                  placeholder="e.g. Prefer Pistachio Brittle, Kaju Katli, gold foil monogram on royal emerald box..."
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid var(--color-primary-light)",
                    fontSize: "0.92rem",
                    fontFamily: "var(--font-body), sans-serif",
                    background: "var(--color-bg)",
                    color: "var(--color-text)",
                    outline: "none",
                    resize: "vertical",
                    lineHeight: 1.6,
                    minWidth: 0,
                  }}
                />
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-light)", marginTop: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Sparkles size={13} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                  <span>Complimentary custom gold foil crest engraving on orders of 50+ boxes.</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{
                  width: "100%",
                  padding: "16px 28px",
                  fontSize: "1.06rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxSizing: "border-box",
                  whiteSpace: "normal",
                  textAlign: "center",
                }}
              >
                Submit For Custom Proposal <Send size={18} />
              </button>
            </form>
          </div>

          {/* Right Highlights */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: 0 }}>
            <div
              className="glass-card-dark"
              style={{
                padding: "clamp(22px, 4vw, 32px)",
                borderRadius: "20px",
                boxSizing: "border-box",
                width: "100%",
                minWidth: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <PhoneCall size={20} style={{ color: "var(--color-primary-light)", flexShrink: 0 }} />
                <h3 style={{ fontFamily: "var(--font-heading)", color: "#fff", fontSize: "1.25rem" }}>
                  Direct Concierge Desk
                </h3>
              </div>
              <p style={{ color: "var(--color-bg)", fontSize: "0.92rem", lineHeight: 1.65, marginBottom: "20px" }}>
                Need urgent consultation or prototype dispatch for an upcoming ceremony? Speak directly to our Head of Gifting.
              </p>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-primary-light)", marginBottom: "6px" }}>
                +91 98200 12345
              </div>
              <div style={{ fontSize: "0.84rem", color: "var(--color-bg-alt)", opacity: 0.85 }}>
                Available Mon–Sat: 9:00 AM – 8:00 PM IST
              </div>
            </div>

            <div
              style={{
                background: "#ffffff",
                padding: "clamp(22px, 4vw, 28px)",
                borderRadius: "20px",
                border: "1.5px solid rgba(212, 168, 83, 0.28)",
                boxSizing: "border-box",
                width: "100%",
                minWidth: 0,
              }}
            >
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", color: "var(--color-secondary)", marginBottom: "16px" }}>
                The JFM Gifting Standard
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.92rem", color: "var(--color-text)", padding: 0 }}>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={17} style={{ color: "var(--color-success)", flexShrink: 0 }} />
                  <span>Certified 90-day shelf life (never perishable)</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={17} style={{ color: "var(--color-success)", flexShrink: 0 }} />
                  <span>Crush-proof nitrogen gold tins</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={17} style={{ color: "var(--color-success)", flexShrink: 0 }} />
                  <span>Custom couple crests & corporate laser tags</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={17} style={{ color: "var(--color-success)", flexShrink: 0 }} />
                  <span>Multi-address doorstep dispatch across India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Process Timeline: How It Works */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-accent)", fontWeight: 800 }}>
              Seamless Experience
            </span>
            <h2 style={{ fontSize: "2.3rem", fontFamily: "var(--font-heading)", color: "var(--color-secondary)", marginTop: "6px" }}>
              How The Custom Process Works
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="luxury-card"
                style={{
                  padding: "28px",
                  border: "1px solid rgba(212, 168, 83, 0.3)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "var(--color-secondary)",
                    color: "var(--color-primary-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    marginBottom: "16px",
                  }}
                >
                  {step.step}
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", color: "var(--color-secondary)", marginBottom: "8px" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery of Past Custom Orders */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-accent)", fontWeight: 800 }}>
              Our Portfolio
            </span>
            <h2 style={{ fontSize: "2.3rem", fontFamily: "var(--font-heading)", color: "var(--color-secondary)", marginTop: "6px" }}>
              Past Royal Commissions
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "28px",
            }}
          >
            {pastOrdersGallery.map((item, idx) => (
              <div key={idx} className="luxury-card">
                <img src={item.image} alt={item.title} style={{ width: "100%", height: "240px", objectFit: "cover" }} />
                <div style={{ padding: "20px" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", color: "var(--color-secondary)", marginBottom: "4px" }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: "0.82rem", color: "var(--color-accent)", fontWeight: 600 }}>{item.client}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--color-text-light)", marginTop: "4px" }}>{item.boxes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-secondary)", marginBottom: "24px", textAlign: "center" }}>
            Custom Orders FAQ
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  borderRadius: "12px",
                  border: openFaq === i ? "1.5px solid var(--color-primary)" : "1px solid rgba(212, 168, 83, 0.25)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "var(--color-secondary)",
                    textAlign: "left",
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 18px", fontSize: "0.88rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
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
        @media (max-width: 860px) {
          .custom-order-layout {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
        @media (max-width: 640px) {
          .form-grid-2-cols {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
