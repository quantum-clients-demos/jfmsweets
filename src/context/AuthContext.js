"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      try {
        const savedUser = localStorage.getItem("jfm_user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          // Default guest user profile for demo experience
          const demoUser = {
            name: "Ashutosh Sharma",
            email: "ashutosh@example.com",
            phone: "+91 98765 43210",
            memberSince: "2024",
            tier: "Royal Connoisseur (Gold)",
            addresses: [
              {
                id: "addr-1",
                type: "Home",
                fullName: "Ashutosh Sharma",
                addressLine: "Flat 402, Royal Palms Residency, MG Road",
                city: "New Delhi",
                state: "Delhi",
                pincode: "110001",
                isDefault: true,
              },
            ],
          };
          setUser(demoUser);
          localStorage.setItem("jfm_user", JSON.stringify(demoUser));
        }

        const savedOrders = localStorage.getItem("jfm_orders");
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        } else {
          // Pre-populate realistic sample order
          const initialOrders = [
            {
              id: "JFM-92841",
              date: "12 Oct 2026",
              status: "Delivered",
              total: 1398,
              items: [
                { name: "Peanut Chikki", weight: "500g", qty: 2, price: 329 },
                { name: "Kaju Katli", weight: "500g", qty: 1, price: 649 },
              ],
              trackingNumber: "DTDC-77492019",
            },
          ];
          setOrders(initialOrders);
          localStorage.setItem("jfm_orders", JSON.stringify(initialOrders));
        }
      } catch (e) {
        console.error(e);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const login = (email, password) => {
    const existing = user || {};
    const updated = {
      ...existing,
      email,
      name: email.split("@")[0].toUpperCase(),
      tier: "Royal Connoisseur (Gold)",
    };
    setUser(updated);
    try {
      localStorage.setItem("jfm_user", JSON.stringify(updated));
    } catch (e) {}
    return { success: true };
  };

  const signup = (name, email, phone) => {
    const newUser = {
      name,
      email,
      phone,
      memberSince: "2026",
      tier: "Royal Connoisseur (Silver)",
      addresses: [],
    };
    setUser(newUser);
    try {
      localStorage.setItem("jfm_user", JSON.stringify(newUser));
    } catch (e) {}
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("jfm_user");
    } catch (e) {}
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: `JFM-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      status: "Confirmed & In Wok Roasting",
      ...orderData,
    };
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem("jfm_orders", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return newOrder;
  };

  return (
    <AuthContext.Provider value={{ user, orders, login, signup, logout, addOrder, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
