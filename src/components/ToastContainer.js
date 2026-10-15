"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-wrapper">
      {toasts.map((toast) => {
        let IconComp = CheckCircle2;
        let iconColor = "#2a7e58";

        if (toast.type === "error") {
          IconComp = AlertCircle;
          iconColor = "#dc2626";
        } else if (toast.type === "info") {
          IconComp = Info;
          iconColor = "#c9882a";
        }

        return (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            <IconComp size={18} style={{ color: iconColor, flexShrink: 0 }} />
            <div style={{ flex: 1, fontSize: "0.88rem", fontWeight: 500 }}>
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9e8779",
                padding: "2px",
                display: "flex",
              }}
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
