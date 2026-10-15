"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Award, ShieldCheck, Heart, CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const timeline = [
    {
      year: "1994",
      title: "The First Brass Wok in Karol Bagh",
      desc: "Mohanlal Sharma founded JFM Sweets with a single brass cauldron, roasting Saurashtra groundnuts and pure Kolhapur gur according to secret family ratios.",
    },
    {
      year: "2005",
      title: "Pioneering the 3mm Ultra-Thin Granite Roll",
      desc: "Perfected the acoustic stone-rolling technique, allowing brittle sheets to shatter cleanly like fine glass without stickiness.",
    },
    {
      year: "2015",
      title: "Royal Dry Fruit Innovation",
      desc: "Introduced Mamra Almond Saffron brittle, Pistachio Cashew Chikki, and zero-added-sugar Turkish fig rolls to high acclaim.",
    },
    {
      year: "2026",
      title: "Pan-India Direct Confectionery Experience",
      desc: "Delivering nationwide with nitrogen-flushed golden tins, bespoke wedding gifting trunks, and sustainable artisanal production.",
    },
  ];

  const teamMembers = [
    {
      name: "Mohanlal Sharma",
      role: "Founder & Master Confectioner",
      bio: "Over 40 years of mastery in caramel temperatures, stone rolling, and ancient sweetcraft traditions.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Suman Sharma",
      role: "Head of Traditional Quality & Recipes",
      bio: "Guards the sacred heirloom ingredient ratios, ensuring zero palm oil and only unrefined Kolhapur organic gur.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Rajesh Sharma",
      role: "Director of Modern Operations",
      bio: "Brings modern hygiene protocols, nitrogen-seal technology, and express pan-India logistics to heritage sweetmaking.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const promises = [
    {
      title: "100% Organic Sugarcane Gur",
      desc: "Sourced directly from certified chemical-free Kolhapur farms without sulphur or synthetic clarifiers.",
    },
    {
      title: "Zero Palm Oil or Glucose Syrup",
      desc: "We exclusively bind our brittles with pure organic jaggery and pure A2 cow desi ghee.",
    },
    {
      title: "60%+ Whole Whole Nuts",
      desc: "We never use broken leftovers or cheap fillers. Every bite has whole roasted nuts.",
    },
    {
      title: "90-Day Acoustic Crunch Seal",
      desc: "Nitrogen-flushed inside airtight gold tins within 2 hours of wok cooking.",
    },
  ];

  return (
    <div style={{ paddingBottom: "90px", background: "var(--color-bg)" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #3C1518 0%, #200B0D 100%)",
          color: "var(--color-bg)",
          padding: "70px 0 60px",
          borderBottom: "2px solid var(--color-primary)",
        }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: "700px" }}>
          <span className="badge badge-gold" style={{ marginBottom: "14px" }}>
            <Sparkles size={12} /> Since 1994
          </span>
          <h1 style={{ fontSize: "clamp(2.3rem, 4.5vw, 3.4rem)", fontFamily: "var(--font-heading)", color: "#fff", lineHeight: 1.15 }}>
            Our 30-Year Heritage of the Royal Acoustic Crunch
          </h1>
          <p style={{ color: "var(--color-bg-alt)", opacity: 0.9, marginTop: "14px", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Three generations dedicated to preserving authentic Indian sweetmaking: open brass woks, pure organic jaggery, and the art of the 3mm granite roll.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "60px" }}>
        {/* Story Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "48px",
            alignItems: "center",
            marginBottom: "80px",
          }}
        >
          <div>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-accent)", fontWeight: 800 }}>
              The Origin Story
            </span>
            <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", fontFamily: "var(--font-heading)", color: "var(--color-secondary)", marginTop: "6px", marginBottom: "18px", lineHeight: 1.25 }}>
              Born From A Brass Wok In Old Delhi
            </h2>
            <p style={{ fontSize: "0.95rem", color: "var(--color-text)", lineHeight: 1.8, marginBottom: "16px" }}>
              In the winter of 1994, our founder Mohanlal Sharma noticed that commercial sweetmakers were abandoning traditional jaggery (gur) in favor of cheap industrial sugar and palm oil. The authentic crunchy crackle that defined Indian winter nostalgia was vanishing.
            </p>
            <p style={{ fontSize: "0.95rem", color: "var(--color-text)", lineHeight: 1.8, marginBottom: "24px" }}>
              Armed with a heavy brass wok and authentic organic jaggery brought from Kolhapur sugarcane farmers, JFM Sweets was born. Over 30 years, our family has never compromised: every brittle is stone-pressed by hand and cooked fresh daily.
            </p>

            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}>
                  30+
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--color-text-light)" }}>Years of Mastery</div>
              </div>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}>
                  100%
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--color-text-light)" }}>Natural & Pure Gur</div>
              </div>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}>
                  50K+
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--color-text-light)" }}>Delighted Families</div>
              </div>
            </div>
          </div>

          <div style={{ borderRadius: "20px", overflow: "hidden", border: "2px solid var(--color-primary)", boxShadow: "var(--shadow-md)" }}>
            <img
              src="/images/products/peanut-chikki.png"
              alt="Artisanal Stone-Rolled Chikki Crafting"
              style={{ width: "100%", height: "420px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* History Timeline */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-accent)", fontWeight: 800 }}>
              Chronicle of Excellence
            </span>
            <h2 style={{ fontSize: "2.3rem", fontFamily: "var(--font-heading)", color: "var(--color-secondary)", marginTop: "6px" }}>
              Our Milestone Journey
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {timeline.map((item) => (
              <div
                key={item.year}
                className="luxury-card"
                style={{
                  padding: "28px",
                  border: "1px solid rgba(212, 168, 83, 0.3)",
                }}
              >
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)", marginBottom: "8px" }}>
                  {item.year}
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", color: "var(--color-secondary)", marginBottom: "8px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Promises */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-accent)", fontWeight: 800 }}>
              Uncompromised Standards
            </span>
            <h2 style={{ fontSize: "2.3rem", fontFamily: "var(--font-heading)", color: "var(--color-secondary)", marginTop: "6px" }}>
              The JFM Quality Vows
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            {promises.map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1.5px solid var(--color-primary-light)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <CheckCircle2 size={20} style={{ color: "var(--color-success)" }} />
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", color: "var(--color-secondary)" }}>
                    {p.title}
                  </h4>
                </div>
                <p style={{ fontSize: "0.88rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-accent)", fontWeight: 800 }}>
              Meet The Artisans
            </span>
            <h2 style={{ fontSize: "2.3rem", fontFamily: "var(--font-heading)", color: "var(--color-secondary)", marginTop: "6px" }}>
              The Guardians of Our Recipes
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "28px",
            }}
          >
            {teamMembers.map((member) => (
              <div key={member.name} className="luxury-card" style={{ textAlign: "center", padding: "32px 24px" }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 16px", border: "2px solid var(--color-primary)" }}
                />
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", color: "var(--color-secondary)", marginBottom: "4px" }}>
                  {member.name}
                </h3>
                <div style={{ fontSize: "0.82rem", color: "var(--color-primary-dark)", fontWeight: 700, marginBottom: "12px" }}>
                  {member.role}
                </div>
                <p style={{ fontSize: "0.88rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="glass-card-dark"
          style={{
            padding: "clamp(32px, 6vw, 48px) clamp(18px, 4vw, 36px)",
            textAlign: "center",
            borderRadius: "24px",
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 4.5vw, 2.2rem)", color: "#fff", marginBottom: "12px", lineHeight: 1.25 }}>
            Experience The Royal Crunch Today
          </h2>
          <p style={{ color: "var(--color-bg)", opacity: 0.9, maxWidth: "520px", margin: "0 auto 24px", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Taste the difference of slow wood-fire roasting and unrefined Kolhapur sugarcane jaggery.
          </p>
          <Link href="/shop" className="btn btn-primary about-cta-btn">
            <span>Shop All Brittles & Sweets</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .about-cta-btn {
          padding: 16px 32px !important;
          font-size: 1.05rem !important;
          white-space: normal !important;
          max-width: 100% !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          text-align: center !important;
          box-sizing: border-box !important;
          line-height: 1.3 !important;
        }
        @media (max-width: 480px) {
          .about-cta-btn {
            width: 100% !important;
            padding: 14px 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
