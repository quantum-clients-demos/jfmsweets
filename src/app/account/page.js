"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { PRODUCTS } from "../../data/products";
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
  Clock,
  Trash2,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  Plus
} from "lucide-react";

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const { user, orders, logout } = useAuth();
  const { wishlist, toggleWishlist, addToCart, addToast } = useCart();

  const [activeTab, setActiveTab] = useState(tabParam || "profile");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (tabParam) setActiveTab(tabParam);
    }, 0);
    return () => clearTimeout(timer);
  }, [tabParam]);

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleLogout = () => {
    logout();
    addToast("Signed out successfully", "info");
    router.push("/");
  };

  const tabs = [
    { id: "profile", label: "My Profile", icon: User, count: null },
    { id: "orders", label: "Orders", icon: Package, count: orders?.length ?? 0 },
    { id: "addresses", label: "Address Book", icon: MapPin, count: 1 },
    { id: "wishlist", label: "Wishlist", icon: Heart, count: wishlist?.length ?? 0 },
  ];

  return (
    <div className="account-page-wrapper">
      <div className="container">
        {/* Account Header Banner */}
        <div className="account-hero-banner">
          <div className="account-hero-left">
            <div className="account-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              <div className="account-avatar-badge" title="Royal Connoisseur">
                <Sparkles size={12} />
              </div>
            </div>
            <div className="account-user-meta">
              <div className="account-user-title-row">
                <h1 className="account-user-name">
                  {user?.name || "Royal Connoisseur"}
                </h1>
                <span className="account-tier-badge">
                  👑 {user?.tier || "Gold Member"}
                </span>
              </div>
              <div className="account-user-sub">
                <span>{user?.email || "ashutosh@example.com"}</span>
                <span className="account-sub-separator">•</span>
                <span>Member since {user?.memberSince || "2024"}</span>
              </div>
            </div>
          </div>

          <button onClick={handleLogout} className="account-signout-btn" aria-label="Sign out">
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Quick Stats Strip (Mobile Friendly) */}
        <div className="account-quick-stats">
          <button
            onClick={() => setActiveTab("orders")}
            className={`stat-pill ${activeTab === "orders" ? "active" : ""}`}
          >
            <Package size={15} />
            <span>{orders.length} Orders</span>
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`stat-pill ${activeTab === "wishlist" ? "active" : ""}`}
          >
            <Heart size={15} />
            <span>{wishlist.length} Saved</span>
          </button>
          <div className="stat-pill tier">
            <ShieldCheck size={15} />
            <span>10% VIP Privilege</span>
          </div>
        </div>

        {/* 2-Column Tabs Layout */}
        <div className="account-main-layout">
          {/* Tabs Navigation (Vertical sidebar on desktop, horizontal scrollbar on mobile) */}
          <div className="account-tabs-nav">
            {tabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`account-tab-btn ${isActive ? "active" : ""}`}
                >
                  <IconComp size={17} className="tab-btn-icon" />
                  <span className="tab-btn-label">{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`tab-btn-counter ${isActive ? "counter-active" : ""}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Panel */}
          <div className="account-content-card">
            {/* 1. Profile Tab */}
            {activeTab === "profile" && (
              <div className="tab-pane">
                <div className="tab-pane-header">
                  <h2 className="tab-pane-title">Profile Information</h2>
                  <span className="tab-pane-subtitle">Manage personal information and membership perks</span>
                </div>

                <div className="profile-fields-grid">
                  <div className="profile-field-box">
                    <div className="profile-field-label">
                      <User size={13} /> Full Name
                    </div>
                    <div className="profile-field-value">{user?.name || "Ashutosh Sharma"}</div>
                  </div>

                  <div className="profile-field-box">
                    <div className="profile-field-label">
                      <Mail size={13} /> Email Address
                    </div>
                    <div className="profile-field-value">{user?.email || "ashutosh@example.com"}</div>
                  </div>

                  <div className="profile-field-box">
                    <div className="profile-field-label">
                      <Phone size={13} /> Phone Number
                    </div>
                    <div className="profile-field-value">{user?.phone || "+91 98765 43210"}</div>
                  </div>

                  <div className="profile-field-box">
                    <div className="profile-field-label">
                      <Sparkles size={13} /> Membership Tier
                    </div>
                    <div className="profile-field-value gold-text">
                      {user?.tier || "Royal Connoisseur (Gold)"}
                    </div>
                  </div>
                </div>

                {/* VIP Perks Card */}
                <div className="vip-perks-box">
                  <div className="vip-perks-header">
                    <span className="vip-crown">👑</span>
                    <div>
                      <div className="vip-perks-title">Gold Tier Privileges Active</div>
                      <div className="vip-perks-subtitle">Thank you for being our esteemed patron</div>
                    </div>
                  </div>
                  <ul className="vip-perks-list">
                    <li>✦ Automatic 10% discount on all festive hampers and dry fruit boxes</li>
                    <li>✦ Complimentary hand-rolled sample brittle with every order</li>
                    <li>✦ Priority express packing and dispatch within 12 hours</li>
                    <li>✦ Exclusive preview access to seasonal harvest batches</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 2. Order History Tab */}
            {activeTab === "orders" && (
              <div className="tab-pane">
                <div className="tab-pane-header">
                  <h2 className="tab-pane-title">Order History ({orders.length})</h2>
                  <span className="tab-pane-subtitle">Track, view invoice, and reorder your favorites</span>
                </div>

                {orders.length === 0 ? (
                  <div className="empty-tab-state">
                    <div className="empty-state-icon">
                      <Package size={40} />
                    </div>
                    <h3 className="empty-state-title">No Orders Placed Yet</h3>
                    <p className="empty-state-desc">Your order history is empty. Treat yourself to our slow-caramelized royal brittles.</p>
                    <Link href="/shop" className="btn btn-primary btn-sm">
                      Browse Confectionery
                    </Link>
                  </div>
                ) : (
                  <div className="orders-stack">
                    {orders.map((order) => (
                      <div key={order.id} className="order-receipt-card">
                        <div className="order-card-header">
                          <div>
                            <div className="order-id">Order #{order.id}</div>
                            <div className="order-date">Placed on {order.date}</div>
                          </div>
                          <span className="order-status-badge">
                            <CheckCircle2 size={13} />
                            {order.status || "Confirmed"}
                          </span>
                        </div>

                        <div className="order-items-list">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="order-item-row">
                              <div className="order-item-desc">
                                <span className="order-item-qty">{item.qty}x</span>
                                <span className="order-item-name">{item.name}</span>
                                {item.weight && <span className="order-item-weight">({item.weight})</span>}
                              </div>
                              <span className="order-item-price">₹{item.price * item.qty}</span>
                            </div>
                          ))}
                        </div>

                        <div className="order-card-footer">
                          <div className="order-total-block">
                            <span className="order-total-label">Total Paid:</span>
                            <span className="order-total-val">₹{order.total}</span>
                          </div>
                          <div className="order-track-block">
                            <Clock size={13} />
                            <span>{order.trackingNumber ? `Track: ${order.trackingNumber}` : "Express Dispatch within 24h"}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Address Book Tab */}
            {activeTab === "addresses" && (
              <div className="tab-pane">
                <div className="tab-pane-header flex-header">
                  <div>
                    <h2 className="tab-pane-title">Saved Delivery Addresses</h2>
                    <span className="tab-pane-subtitle">Manage where your gourmet sweets are shipped</span>
                  </div>
                </div>

                <div className="address-cards-grid">
                  <div className="address-card default-address">
                    <div className="address-card-top">
                      <div className="address-name-row">
                        <span className="address-name">{user?.name || "Ashutosh Sharma"}</span>
                        <span className="default-pill">Default Home</span>
                      </div>
                    </div>
                    <div className="address-body">
                      Flat 402, Royal Palms Residency, MG Road<br />
                      New Delhi, Delhi - 110001<br />
                      <strong>Phone:</strong> {user?.phone || "+91 98765 43210"}
                    </div>
                  </div>

                  <div className="address-card secondary-address">
                    <div className="address-card-top">
                      <div className="address-name-row">
                        <span className="address-name">Ashutosh Sharma (Office)</span>
                        <span className="address-type-pill">Work</span>
                      </div>
                    </div>
                    <div className="address-body">
                      Suite 804, Tech Park Towers, Cyber City<br />
                      Gurugram, Haryana - 122002<br />
                      <strong>Phone:</strong> {user?.phone || "+91 98765 43210"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="tab-pane">
                <div className="tab-pane-header">
                  <h2 className="tab-pane-title">Saved Favorites ({wishlistedProducts.length})</h2>
                  <span className="tab-pane-subtitle">Handcrafted sweets you have shortlisted for later</span>
                </div>

                {wishlistedProducts.length === 0 ? (
                  <div className="empty-tab-state">
                    <div className="empty-state-icon">
                      <Heart size={40} />
                    </div>
                    <h3 className="empty-state-title">Your Wishlist is Empty</h3>
                    <p className="empty-state-desc">Tap the heart icon on any sweet to save it here for festive celebrations or quick reordering.</p>
                    <Link href="/shop" className="btn btn-primary btn-sm">
                      Discover Sweets
                    </Link>
                  </div>
                ) : (
                  <div className="wishlist-products-grid">
                    {wishlistedProducts.map((p) => {
                      const defWeight = p.defaultWeight || Object.keys(p.pricing)[0];
                      const priceObj = p.pricing[defWeight];
                      return (
                        <div key={p.id} className="wishlist-product-card">
                          <div className="wishlist-img-box">
                            <img src={p.image} alt={p.name} className="wishlist-img" />
                            <button
                              onClick={() => toggleWishlist(p.id, p.name)}
                              className="wishlist-remove-btn"
                              title="Remove from wishlist"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="wishlist-card-details">
                            <Link href={`/product/${p.id}`} className="wishlist-title-link">
                              <h4 className="wishlist-prod-name">{p.name}</h4>
                            </Link>
                            <div className="wishlist-price-row">
                              <span className="wishlist-price">₹{priceObj?.price}</span>
                              <span className="wishlist-weight-chip">{defWeight}</span>
                            </div>
                            <button
                              onClick={() => addToCart(p, defWeight, 1)}
                              className="wishlist-add-btn"
                            >
                              <ShoppingBag size={14} />
                              <span>Add to Bag</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .account-page-wrapper {
          padding-top: 36px;
          padding-bottom: 90px;
          background: var(--color-bg);
          min-height: 80vh;
        }

        /* Hero Banner */
        .account-hero-banner {
          background: linear-gradient(135deg, #241107 0%, #170702 100%);
          border-radius: 18px;
          padding: 24px 28px;
          color: #fbf8f0;
          border: 1.5px solid #c9882a;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          box-shadow: 0 8px 24px rgba(36, 17, 7, 0.12);
          box-sizing: border-box;
          width: 100%;
        }
        .account-hero-left {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
          flex: 1;
        }
        .account-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9882a 0%, #853e0d 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          font-weight: 800;
          font-family: var(--font-heading);
          border: 2px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 14px rgba(201, 136, 42, 0.35);
          position: relative;
          flex-shrink: 0;
        }
        .account-avatar-badge {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #d5a657;
          color: #241107;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #241107;
        }
        .account-user-meta {
          min-width: 0;
          flex: 1;
        }
        .account-user-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 4px;
        }
        .account-user-name {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          color: #ffffff;
          line-height: 1.2;
          margin: 0;
          font-weight: 700;
        }
        .account-tier-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.74rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(201, 136, 42, 0.22);
          border: 1px solid rgba(201, 136, 42, 0.5);
          color: #fce7b0;
          letter-spacing: 0.02em;
        }
        .account-user-sub {
          font-size: 0.82rem;
          color: #c4b5a8;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .account-sub-separator {
          opacity: 0.6;
        }
        .account-signout-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid rgba(201, 136, 42, 0.4);
          background: rgba(255, 255, 255, 0.06);
          color: #fbf8f0;
          cursor: pointer;
          font-size: 0.84rem;
          font-weight: 600;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .account-signout-btn:hover {
          background: rgba(201, 136, 42, 0.25);
          border-color: #d5a657;
        }

        /* Quick Stats Strip */
        .account-quick-stats {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 2px;
        }
        .account-quick-stats::-webkit-scrollbar {
          display: none;
        }
        .stat-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 700;
          background: #ffffff;
          border: 1px solid rgba(201, 136, 42, 0.25);
          color: var(--color-secondary);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .stat-pill:hover, .stat-pill.active {
          background: var(--color-secondary);
          color: #ffffff;
          border-color: var(--color-primary);
        }
        .stat-pill.tier {
          background: rgba(201, 136, 42, 0.12);
          border-color: rgba(201, 136, 42, 0.35);
          color: #925c0e;
          cursor: default;
        }

        /* Main 2-Column Tabs Layout */
        .account-main-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 28px;
          align-items: start;
        }

        /* Tabs Nav (Desktop Sidebar) */
        .account-tabs-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: sticky;
          top: 100px;
        }
        .account-tab-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 18px;
          border-radius: 12px;
          border: 1px solid rgba(212, 168, 83, 0.2);
          background: #ffffff;
          color: var(--color-secondary);
          cursor: pointer;
          font-weight: 700;
          font-size: 0.92rem;
          text-align: left;
          transition: all 0.2s ease;
          width: 100%;
        }
        .account-tab-btn:hover {
          border-color: var(--color-primary);
          transform: translateX(2px);
        }
        .account-tab-btn.active {
          background: var(--color-secondary);
          color: #ffffff;
          border-color: var(--color-primary);
          box-shadow: 0 4px 14px rgba(60, 21, 24, 0.15);
        }
        .tab-btn-icon {
          color: var(--color-primary);
          flex-shrink: 0;
        }
        .account-tab-btn.active .tab-btn-icon {
          color: var(--color-primary-light);
        }
        .tab-btn-label {
          flex: 1;
        }
        .tab-btn-counter {
          font-size: 0.72rem;
          padding: 2px 8px;
          border-radius: 999px;
          background: rgba(201, 136, 42, 0.15);
          color: var(--color-secondary);
          font-weight: 800;
        }
        .counter-active {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        /* Content Panel Card */
        .account-content-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 28px;
          border: 1.5px solid rgba(212, 168, 83, 0.25);
          box-shadow: 0 4px 20px rgba(60, 21, 24, 0.04);
          min-height: 440px;
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
        }
        .tab-pane-header {
          margin-bottom: 22px;
          border-bottom: 1px solid rgba(212, 168, 83, 0.15);
          padding-bottom: 14px;
        }
        .tab-pane-title {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          color: var(--color-secondary);
          margin: 0 0 4px 0;
          font-weight: 700;
        }
        .tab-pane-subtitle {
          font-size: 0.84rem;
          color: var(--color-text-light);
        }

        /* Profile Grid */
        .profile-fields-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 22px;
        }
        .profile-field-box {
          background: var(--color-bg);
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid rgba(201, 136, 42, 0.2);
        }
        .profile-field-label {
          font-size: 0.74rem;
          color: var(--color-text-light);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 4px;
        }
        .profile-field-value {
          font-size: 0.98rem;
          font-weight: 800;
          color: var(--color-secondary);
          word-break: break-word;
        }
        .profile-field-value.gold-text {
          color: #925c0e;
        }

        /* VIP Perks Box */
        .vip-perks-box {
          background: linear-gradient(135deg, rgba(201, 136, 42, 0.08) 0%, rgba(246, 238, 219, 0.6) 100%);
          padding: 18px 20px;
          border-radius: 14px;
          border: 1px solid rgba(201, 136, 42, 0.35);
        }
        .vip-perks-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .vip-crown {
          font-size: 1.5rem;
        }
        .vip-perks-title {
          font-weight: 800;
          font-size: 0.95rem;
          color: var(--color-secondary);
        }
        .vip-perks-subtitle {
          font-size: 0.78rem;
          color: var(--color-text-light);
        }
        .vip-perks-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--color-secondary);
          line-height: 1.45;
        }

        /* Order Cards */
        .orders-stack {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .order-receipt-card {
          background: var(--color-bg);
          border-radius: 14px;
          padding: 16px 18px;
          border: 1px solid rgba(201, 136, 42, 0.25);
          transition: box-shadow 0.2s ease;
        }
        .order-receipt-card:hover {
          box-shadow: 0 4px 16px rgba(60, 21, 24, 0.06);
        }
        .order-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px dashed rgba(201, 136, 42, 0.2);
        }
        .order-id {
          font-weight: 800;
          font-size: 1.0rem;
          color: var(--color-secondary);
        }
        .order-date {
          font-size: 0.76rem;
          color: var(--color-text-light);
          margin-top: 2px;
        }
        .order-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.74rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.12);
          color: #15803d;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        .order-items-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }
        .order-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.86rem;
          gap: 8px;
        }
        .order-item-desc {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
          color: var(--color-text);
        }
        .order-item-qty {
          font-weight: 700;
          color: var(--color-secondary);
          flex-shrink: 0;
        }
        .order-item-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .order-item-weight {
          font-size: 0.76rem;
          color: var(--color-text-light);
          flex-shrink: 0;
        }
        .order-item-price {
          font-weight: 700;
          color: var(--color-secondary);
          flex-shrink: 0;
        }
        .order-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          padding-top: 10px;
          border-top: 1px solid rgba(201, 136, 42, 0.2);
          font-size: 0.82rem;
        }
        .order-total-block {
          color: var(--color-text);
        }
        .order-total-label {
          color: var(--color-text-light);
          margin-right: 6px;
        }
        .order-total-val {
          font-weight: 800;
          font-size: 0.98rem;
          color: var(--color-secondary);
        }
        .order-track-block {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #925c0e;
          font-weight: 700;
        }

        /* Address Cards */
        .address-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
        }
        .address-card {
          background: var(--color-bg);
          border-radius: 14px;
          padding: 18px;
          border: 1px solid rgba(201, 136, 42, 0.25);
        }
        .address-card.default-address {
          border: 1.5px solid #c9882a;
          background: #ffffff;
          box-shadow: 0 4px 14px rgba(201, 136, 42, 0.08);
        }
        .address-card-top {
          margin-bottom: 10px;
        }
        .address-name-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }
        .address-name {
          font-weight: 800;
          font-size: 0.96rem;
          color: var(--color-secondary);
        }
        .default-pill {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
          background: rgba(201, 136, 42, 0.18);
          color: #925c0e;
          border: 1px solid rgba(201, 136, 42, 0.35);
        }
        .address-type-pill {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.05);
          color: var(--color-text-light);
        }
        .address-body {
          font-size: 0.85rem;
          color: var(--color-text);
          line-height: 1.6;
        }

        /* Wishlist Grid (2-columns on mobile!) */
        .wishlist-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }
        .wishlist-product-card {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid rgba(201, 136, 42, 0.2);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .wishlist-product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(60, 21, 24, 0.08);
        }
        .wishlist-img-box {
          position: relative;
          width: 100%;
          height: 140px;
          background: #fbf8f0;
          overflow: hidden;
        }
        .wishlist-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .wishlist-remove-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #dc2626;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .wishlist-remove-btn:hover {
          background: #dc2626;
          color: #ffffff;
        }
        .wishlist-card-details {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .wishlist-title-link {
          text-decoration: none;
          color: inherit;
        }
        .wishlist-prod-name {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          color: var(--color-secondary);
          margin: 0 0 6px 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 2.4em;
        }
        .wishlist-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .wishlist-price {
          font-weight: 800;
          font-size: 0.96rem;
          color: var(--color-secondary);
        }
        .wishlist-weight-chip {
          font-size: 0.7rem;
          color: var(--color-text-light);
          background: var(--color-bg);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .wishlist-add-btn {
          margin-top: auto;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 10px;
          border-radius: 8px;
          background: #c9882a;
          color: #ffffff;
          border: none;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .wishlist-add-btn:hover {
          background: #d5a657;
        }

        /* Empty State */
        .empty-tab-state {
          text-align: center;
          padding: 40px 16px;
        }
        .empty-state-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(201, 136, 42, 0.12);
          color: #c9882a;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px;
        }
        .empty-state-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--color-secondary);
          margin: 0 0 6px 0;
        }
        .empty-state-desc {
          font-size: 0.85rem;
          color: var(--color-text-light);
          max-width: 380px;
          margin: 0 auto 16px;
          line-height: 1.5;
        }

        /* Responsive Breakpoints */
        @media (max-width: 860px) {
          .account-page-wrapper {
            padding-top: 20px;
            padding-bottom: 110px;
          }
          .account-hero-banner {
            padding: 18px 16px;
            border-radius: 14px;
          }
          .account-avatar {
            width: 50px;
            height: 50px;
            font-size: 1.35rem;
          }
          .account-user-name {
            font-size: 1.2rem;
          }
          .account-main-layout {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          /* Switch vertical nav into horizontal scrollable pill bar */
          .account-tabs-nav {
            flex-direction: row;
            overflow-x: auto;
            scrollbar-width: none;
            position: static;
            padding-bottom: 4px;
            gap: 8px;
            margin: 0 -4px;
            padding: 0 4px 6px;
          }
          .account-tabs-nav::-webkit-scrollbar {
            display: none;
          }
          .account-tab-btn {
            width: auto;
            white-space: nowrap;
            padding: 9px 14px;
            border-radius: 999px;
            font-size: 0.84rem;
            gap: 6px;
            flex-shrink: 0;
          }
          .account-tab-btn:hover {
            transform: none;
          }
          .account-content-card {
            padding: 18px 16px;
            border-radius: 14px;
            min-height: auto;
          }
          .tab-pane-title {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 580px) {
          .account-hero-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
          .account-hero-left {
            width: 100%;
          }
          .account-signout-btn {
            width: 100%;
            justify-content: center;
            padding: 9px;
          }
          .profile-fields-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          /* 2-column compact cards for wishlist on mobile */
          .wishlist-products-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }
          .wishlist-img-box {
            height: 110px;
          }
          .wishlist-card-details {
            padding: 8px;
          }
          .wishlist-prod-name {
            font-size: 0.8rem;
            min-height: 2.2em;
          }
          .wishlist-price {
            font-size: 0.88rem;
          }
          .wishlist-add-btn {
            font-size: 0.74rem;
            padding: 6px 8px;
            gap: 4px;
          }
          .address-cards-grid {
            grid-template-columns: 1fr;
          }
          .order-item-row {
            font-size: 0.8rem;
          }
          .order-card-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
        }
      `}</style>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div style={{ padding: "80px 20px", textAlign: "center" }}>Loading account...</div>}>
      <AccountContent />
    </Suspense>
  );
}
