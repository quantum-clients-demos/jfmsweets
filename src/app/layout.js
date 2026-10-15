import "./globals.css";
import React, { Suspense } from "react";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import ToastContainer from "../components/ToastContainer";

export const metadata = {
  title: "JFM SWEETS | Royal Artisanal Brittles, Chikki & Dry Fruit Sweets",
  description: "Experience the royal crunch of authentic artisanal brittles, chikkis, and gourmet gift hampers handcrafted with pure organic jaggery, roasted nuts, and heritage recipes.",
  keywords: "brittle sweet, chikki, kaju katli, peanut chikki, dry fruit sweets, luxury gift hampers, organic jaggery sweets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;0,900;1,600;1,700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<div style={{ height: "80px" }} />}>
              <Header />
            </Suspense>
            <main style={{ minHeight: "calc(100vh - 420px)", display: "flex", flexDirection: "column", width: "100%" }}>
              {children}
            </main>
            <CartDrawer />
            <ToastContainer />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
