"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function ContactPage() {
  const { addToast } = useCart();
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast("Please fill in your name, email, and message", "error");
      return;
    }
    addToast("Message received! Our team will get back to you within 4 hours.", "success");
    setForm({ name: "", email: "", phone: "", subject: "general", message: "" });
  };

  const contactFaqs = [
    {
      q: "Where is your flagship sweet shop located?",
      a: "Our flagship kitchen and tasting store is located at 14 Heritage Sweet Lane, Karol Bagh, New Delhi 110005. Visitors can watch our master karigars roll hot jaggery brittle on granite slabs.",
    },
    {
      q: "Do you offer doorstep delivery in Delhi NCR on the same day?",
      a: "Yes! For addresses in Delhi, Gurgaon, and Noida, orders placed before 1:00 PM are eligible for same-day evening delivery via our dedicated courier fleet.",
    },
    {
      q: "Can I place phone or WhatsApp orders directly?",
      a: "Absolutely! You can call or WhatsApp our order concierge at +91 98200 12345 anytime between 9:00 AM and 8:00 PM IST.",
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
        <div className="container" style={{ textAlign: "center", maxWidth: "680px" }}>
          <span className="badge badge-gold" style={{ marginBottom: "14px" }}>
            <Sparkles size={12} /> We Are Here For You
          </span>
          <h1 style={{ fontSize: "clamp(2.3rem, 4.5vw, 3.4rem)", fontFamily: "var(--font-heading)", color: "#fff" }}>
            Contact & Store Locations
          </h1>
          <p style={{ color: "var(--color-bg-alt)", opacity: 0.9, marginTop: "12px", fontSize: "1.05rem" }}>
            Reach out for orders, bulk gifting queries, wedding consultations, or visit our flagship brass-wok kitchen.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "60px" }}>
        {/* Contact Info Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            marginBottom: "60px",
          }}
        >
          <div className="luxury-card" style={{ padding: "28px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", marginBottom: "16px" }}>
              <MapPin size={22} />
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", color: "var(--color-secondary)", marginBottom: "6px" }}>
              Flagship Tasting Store
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>
              14 Heritage Sweet Lane, Karol Bagh, New Delhi 110005, India
            </p>
          </div>

          <div className="luxury-card" style={{ padding: "28px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", marginBottom: "16px" }}>
              <Phone size={22} />
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", color: "var(--color-secondary)", marginBottom: "6px" }}>
              Order Concierge
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>
              +91 98200 12345<br />
              011-28759900 (Store Desk)
            </p>
          </div>

          <div className="luxury-card" style={{ padding: "28px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", marginBottom: "16px" }}>
              <Mail size={22} />
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", color: "var(--color-secondary)", marginBottom: "6px" }}>
              Email Inquiries
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>
              orders@jfmsweets.com<br />
              weddings@jfmsweets.com
            </p>
          </div>

          <div className="luxury-card" style={{ padding: "28px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", marginBottom: "16px" }}>
              <Clock size={22} />
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", color: "var(--color-secondary)", marginBottom: "6px" }}>
              Store Hours
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>
              Open 7 Days a Week<br />
              8:30 AM – 9:30 PM IST
            </p>
          </div>
        </div>

        {/* 2-Column: Form & Map Representation */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "80px" }} className="contact-layout">
          {/* Form */}
          <div
            style={{
              background: "#ffffff",
              padding: "36px",
              borderRadius: "20px",
              border: "1.5px solid var(--color-primary-light)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", color: "var(--color-secondary)", marginBottom: "8px" }}>
              Send Us A Message
            </h2>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-light)", marginBottom: "24px" }}>
              Have questions regarding an order, ingredients, or corporate inquiries? We are pleased to assist.
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
                    Phone Number
                  </label>
                  <input
                    type="tel"
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

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ width: "100%", padding: "11px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.88rem", outline: "none" }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={{ width: "100%", padding: "11px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.88rem", background: "#fff" }}
                >
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Tracking & Delivery Status</option>
                  <option value="bulk">Bulk / Corporate Gifting</option>
                  <option value="feedback">Feedback / Recipe Praise</option>
                </select>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "6px" }}>
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How may our sweetmakers assist you today?"
                  style={{ width: "100%", padding: "11px", borderRadius: "8px", border: "1px solid var(--color-primary-light)", fontSize: "0.88rem" }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }}>
                Send Message <Send size={16} />
              </button>
            </form>
          </div>

          {/* Interactive Map Visual */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              border: "1.5px solid var(--color-primary-light)",
              overflow: "hidden",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: "320px",
                background: "linear-gradient(135deg, #f4ece1 0%, #ede3d2 100%)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "var(--color-secondary)",
                  color: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 20px rgba(60, 21, 24, 0.3)",
                  marginBottom: "12px",
                }}
              >
                <MapPin size={28} />
              </div>
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", color: "var(--color-secondary)" }}>
                JFM Sweets Flagship Kitchen
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-light)", maxWidth: "340px", marginTop: "4px" }}>
                14 Heritage Sweet Lane, Karol Bagh, New Delhi (Opposite Heritage Market)
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ marginTop: "14px" }}
              >
                Open in Google Maps ↗
              </a>
            </div>

            <div style={{ padding: "24px", background: "#fff", flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--color-secondary)", marginBottom: "8px" }}>
                Live In-Store Demonstrations Daily
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>
                Experience the live aroma of Gujarat groundnuts being wood-roasted and hot cane jaggery rolling between 11:00 AM and 5:00 PM daily. Complimentary fresh warm tastings for all visitors!
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-secondary)", marginBottom: "24px", textAlign: "center" }}>
            Customer Care Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {contactFaqs.map((faq, i) => (
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
          .contact-layout {
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
