"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "../../data/products";
import { useCart } from "../../context/CartContext";
import {
  Gift,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Plus,
  Trash2,
  ShoppingBag,
  Award
} from "lucide-react";

export default function CustomBoxPage() {
  const router = useRouter();
  const { addToCart, addToast } = useCart();

  const boxOptions = [
    {
      id: "box-4",
      title: "Royal Keepsake 4-Piece Box",
      slots: 4,
      price: 899,
      image: "/images/products/wedding-gift-box.png",
      desc: "Rigid gold-leaf embossed box with magnetic clasp and satin pull ribbon.",
    },
    {
      id: "box-6",
      title: "Festive Grand 6-Piece Box",
      slots: 6,
      price: 1399,
      image: "/images/products/festival-hampers.png",
      desc: "Opulent gift box with 6 individual airtight golden canisters.",
    },
    {
      id: "box-9",
      title: "Maharaja 9-Compartment Velvet Trunk",
      slots: 9,
      price: 2499,
      image: "/images/products/custom-assortment-box.png",
      desc: "Handcrafted royal emerald velvet trunk with antique brass fittings and sealing wax.",
    },
  ];

  const [selectedBox, setSelectedBox] = useState(boxOptions[0]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customGreeting, setCustomGreeting] = useState("");

  const handleToggleItem = (product) => {
    if (selectedItems.some((item) => item.id === product.id)) {
      setSelectedItems(selectedItems.filter((item) => item.id !== product.id));
    } else {
      if (selectedItems.length >= selectedBox.slots) {
        addToast(`All ${selectedBox.slots} slots in this box are full! Remove an item first.`, "info");
        return;
      }
      setSelectedItems([...selectedItems, product]);
    }
  };

  const handleAddCustomBoxToCart = () => {
    if (selectedItems.length < selectedBox.slots) {
      addToast(`Please choose ${selectedBox.slots - selectedItems.length} more sweet(s) to complete your box.`, "info");
      return;
    }

    addToCart(
      {
        id: `custom-box-${Date.now()}`,
        name: selectedBox.title,
        defaultWeight: `${selectedBox.slots * 150}g Assortment`,
        pricing: {
          [`${selectedBox.slots * 150}g Assortment`]: {
            price: selectedBox.price,
            originalPrice: selectedBox.price + 300,
          },
        },
        image: selectedBox.image,
        categoryLabel: "Custom Hamper",
      },
      `${selectedBox.slots * 150}g Assortment`,
      1,
      {
        boxType: selectedBox.title,
        brittles: selectedItems.map((b) => ({ name: b.name })),
        greeting: customGreeting,
      }
    );

    addToast(`Added ${selectedBox.title} to your bag!`, "success");
    router.push("/cart");
  };

  const isFull = selectedItems.length === selectedBox.slots;

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
          <span className="badge badge-gold" style={{ marginBottom: "14px" }}>
            <Sparkles size={12} /> Interactive Gift Studio
          </span>
          <h1 style={{ fontSize: "clamp(2.3rem, 4.5vw, 3.4rem)", fontFamily: "var(--font-heading)", color: "#fff" }}>
            Build Your Own Royal Sweet Box
          </h1>
          <p style={{ color: "var(--color-bg-alt)", opacity: 0.9, marginTop: "12px", fontSize: "1.05rem" }}>
            Select your keepsake box style, choose your favorite brittles and dry fruit delicacies, and add a custom wax-sealed greeting card.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "50px" }}>
        {/* Step 1: Select Box Size */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--color-secondary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.1rem", flexShrink: 0 }}>
              1
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.25rem, 3.5vw, 1.7rem)", color: "var(--color-secondary)" }}>
              Choose Keepsake Box Size
            </h2>
          </div>

          <div className="grid-3-cols">
            {boxOptions.map((box) => {
              const isSelected = selectedBox.id === box.id;
              return (
                <div
                  key={box.id}
                  onClick={() => {
                    setSelectedBox(box);
                    setSelectedItems([]);
                  }}
                  className="luxury-card"
                  style={{
                    padding: "24px",
                    cursor: "pointer",
                    border: isSelected ? "2.5px solid var(--color-primary)" : "1.5px solid rgba(212, 168, 83, 0.25)",
                    background: isSelected ? "var(--color-bg-alt)" : "#ffffff",
                    transform: isSelected ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <img src={box.image} alt={box.title} style={{ width: "100%", height: "190px", objectFit: "cover", borderRadius: "12px", marginBottom: "16px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", color: "var(--color-secondary)" }}>
                      {box.title}
                    </h3>
                    <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}>
                      ₹{box.price}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.95rem", color: "var(--color-text-light)", lineHeight: 1.6, marginBottom: "14px" }}>
                    {box.desc}
                  </p>
                  <span className="badge badge-gold" style={{ fontSize: "0.82rem", padding: "5px 12px" }}>
                    {box.slots} Compartments
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Slot Progress & Selection */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "14px", marginBottom: "22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--color-secondary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.1rem", flexShrink: 0 }}>
                2
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.25rem, 3.5vw, 1.7rem)", color: "var(--color-secondary)" }}>
                Select {selectedBox.slots} Sweets ({selectedItems.length}/{selectedBox.slots} Chosen)
              </h2>
            </div>
            {isFull && (
              <span style={{ color: "var(--color-success)", fontWeight: 700, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={18} /> All {selectedBox.slots} compartments filled!
              </span>
            )}
          </div>

          {/* Sweets Grid for Picking */}
          <div className="grid-4-cols">
            {PRODUCTS.filter((p) => p.category !== "custom-bulk-orders").map((product) => {
              const isSelected = selectedItems.some((i) => i.id === product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => handleToggleItem(product)}
                  style={{
                    background: isSelected ? "var(--color-bg)" : "#ffffff",
                    borderRadius: "16px",
                    border: isSelected ? "2.5px solid var(--color-primary)" : "1.5px solid rgba(212, 168, 83, 0.25)",
                    padding: "18px",
                    cursor: "pointer",
                    boxShadow: isSelected ? "var(--shadow-md)" : "var(--shadow-sm)",
                    position: "relative",
                  }}
                >
                  <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px", marginBottom: "12px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <div>
                      <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", color: "var(--color-secondary)" }}>
                        {product.name}
                      </h4>
                      <div style={{ fontFamily: "var(--font-royal)", fontSize: "0.82rem", color: "var(--color-accent)", marginTop: "3px", fontWeight: 800 }}>
                        {product.categoryLabel}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: isSelected ? "var(--color-primary)" : "#f6eedb",
                        color: isSelected ? "#fff" : "var(--color-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {isSelected ? <CheckCircle2 size={20} /> : <Plus size={18} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Greeting & Add to Cart */}
        <div
          className="custom-box-step3-card"
          style={{
            background: "#ffffff",
            padding: "clamp(20px, 5vw, 40px)",
            borderRadius: "24px",
            border: "2px solid var(--color-primary)",
            boxShadow: "0 18px 45px rgba(60, 21, 24, 0.1)",
            maxWidth: "720px",
            margin: "0 auto",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--color-secondary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.1rem", flexShrink: 0 }}>
              3
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.2rem, 3.5vw, 1.6rem)", color: "var(--color-secondary)", lineHeight: 1.3 }}>
              Add A Personal Greeting Note (Complimentary)
            </h2>
          </div>

          <textarea
            rows={3}
            placeholder="e.g. Wishing you a joyous festive season full of royal crunch and happiness! With love, The Sharmas."
            value={customGreeting}
            onChange={(e) => setCustomGreeting(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1.5px solid var(--color-primary-light)",
              fontFamily: "var(--font-body), -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "0.96rem",
              marginBottom: "8px",
              outline: "none",
              lineHeight: 1.6,
              background: "var(--color-bg)",
              color: "var(--color-text)",
              resize: "vertical",
            }}
          />
          <div
            style={{
              fontSize: "0.82rem",
              color: "var(--color-text-light)",
              marginBottom: "22px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Sparkles size={13} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
            <span>Complimentary gold-foil stamped greeting card included inside the keepsake box.</span>
          </div>

          <div
            className="custom-box-action-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "18px",
              paddingTop: "20px",
              borderTop: "1.5px solid rgba(212, 168, 83, 0.25)",
            }}
          >
            <div className="custom-box-price-wrap" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.88rem", color: "var(--color-text-light)", fontWeight: 600 }}>Box Total:</span>
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "999px",
                    background: isFull ? "rgba(37, 107, 69, 0.12)" : "rgba(197, 139, 46, 0.14)",
                    color: isFull ? "var(--color-success)" : "var(--color-primary-dark)",
                  }}
                >
                  {selectedItems.length}/{selectedBox.slots} Chosen
                </span>
              </div>
              <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--color-secondary)", fontFamily: "var(--font-heading)", lineHeight: 1.2 }}>
                ₹{selectedBox.price}
              </div>
            </div>

            <button
              onClick={handleAddCustomBoxToCart}
              className="btn btn-primary custom-box-submit-btn"
              style={{
                padding: "16px 32px",
                fontSize: "1.06rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <ShoppingBag size={20} />
              <span>{isFull ? "Add Custom Box to Cart" : `Add Box (${selectedItems.length}/${selectedBox.slots} Picked)`}</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .custom-box-action-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
          }
          .custom-box-price-wrap {
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            width: 100% !important;
          }
          .custom-box-submit-btn {
            width: 100% !important;
            padding: 14px 20px !important;
            font-size: 1.02rem !important;
            white-space: normal !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}
