"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      try {
        const savedCart = localStorage.getItem("jfm_cart");
        if (savedCart) setCart(JSON.parse(savedCart));

        const savedWishlist = localStorage.getItem("jfm_wishlist");
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

        const savedCoupon = localStorage.getItem("jfm_coupon");
        if (savedCoupon) {
          const { code, percent } = JSON.parse(savedCoupon);
          setCouponCode(code);
          setDiscountPercent(percent);
        }
      } catch (e) {
        console.error("Failed to load state from localStorage", e);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("jfm_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("jfm_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist, isMounted]);

  // Toast notification system
  const addToast = (message, type = "success") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add to cart
  const addToCart = (product, weight = null, quantity = 1, customData = null) => {
    const selectedWeight = weight || product.defaultWeight || "500g";
    const pricingObj = product.pricing?.[selectedWeight] || { price: 499, originalPrice: 599 };
    const cartItemId = customData ? `custom-${Date.now()}` : `${product.id}-${selectedWeight}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            name: product.name,
            weight: selectedWeight,
            price: pricingObj.price,
            originalPrice: pricingObj.originalPrice,
            image: product.image,
            categoryLabel: product.categoryLabel,
            quantity: quantity,
            isCustomBox: !!customData,
            customData: customData || null
          }
        ];
      }
    });

    addToast(`Added "${product.name} (${selectedWeight})" to your cart!`, "success");
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast("Item removed from cart", "info");
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode("");
    setDiscountPercent(0);
    try {
      localStorage.removeItem("jfm_coupon");
    } catch (e) {}
  };

  // Wishlist actions
  const toggleWishlist = (productId, productName = "Item") => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast(`Removed ${productName} from wishlist`, "info");
        return prev.filter((id) => id !== productId);
      } else {
        addToast(`Saved ${productName} to wishlist ❤️`, "success");
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => isMounted && wishlist.includes(productId);

  // Coupon handling
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "CRUNCH20") {
      setCouponCode("CRUNCH20");
      setDiscountPercent(20);
      try {
        localStorage.setItem("jfm_coupon", JSON.stringify({ code: "CRUNCH20", percent: 20 }));
      } catch (e) {}
      addToast("Coupon 'CRUNCH20' applied! 20% discount unlocked 🎉", "success");
      return { success: true, message: "20% discount applied!" };
    } else if (cleanCode === "SWEET10") {
      setCouponCode("SWEET10");
      setDiscountPercent(10);
      try {
        localStorage.setItem("jfm_coupon", JSON.stringify({ code: "SWEET10", percent: 10 }));
      } catch (e) {}
      addToast("Coupon 'SWEET10' applied! 10% discount unlocked 🎉", "success");
      return { success: true, message: "10% discount applied!" };
    } else {
      addToast("Invalid promo code. Try 'CRUNCH20' or 'SWEET10'", "error");
      return { success: false, message: "Invalid promo code." };
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountPercent(0);
    try {
      localStorage.removeItem("jfm_coupon");
    } catch (e) {}
    addToast("Coupon removed", "info");
  };

  // Derived calculations
  const cartCount = isMounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const freeShippingThreshold = 999;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingFee = cartSubtotal === 0 || isFreeShipping ? 0 : 79;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        discountAmount,
        discountPercent,
        couponCode,
        isFreeShipping,
        freeShippingThreshold,
        remainingForFreeShipping,
        shippingFee,
        grandTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        wishlistCount: isMounted ? wishlist.length : 0,
        toggleWishlist,
        isWishlisted,
        applyCoupon,
        removeCoupon,
        toasts,
        addToast,
        removeToast,
        isMounted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
