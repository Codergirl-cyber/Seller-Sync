import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button, Input, Badge } from "./components/UI";
import { User, CreditCard, Lock, Bell, ChevronRight, Save } from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [storeInfo, setStoreInfo] = useState({
    name: 'InstaDash Shop',
    email: 'shruti@store.com',
    currency: 'INR (Rs)'
  });

  useEffect(() => {
    const saved = localStorage.getItem('store_settings');
    if (saved) setStoreInfo(JSON.parse(saved));
  }, []);

  const tabs = [
    { id: 'profile', label: 'Store Profile', icon: User },
    { id: 'billing', label: 'Plans & Billing', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const handleSave = () => {
    localStorage.setItem('store_settings', JSON.stringify(storeInfo));
    alert('Settings synchronized.');
  };

  return (
    <div className="page-shell" style={{ maxWidth: "1040px" }}>
      <header style={{ marginBottom: "var(--space-12)" }}>
        <h1 className="h1">Settings</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "4px" }}>Manage your account, billing, and preferences.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "var(--space-12)", alignItems: "start" }}>
        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                border: activeTab === tab.id ? "1px solid rgba(38, 48, 24, 0.2)" : "1px solid transparent",
                background: activeTab === tab.id ? "var(--accent)" : "transparent",
                color: activeTab === tab.id ? "#ffffff" : "var(--text-secondary)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                fontWeight: activeTab === tab.id ? "600" : "500"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <tab.icon size={16} />
                <span style={{ fontSize: "14px", fontWeight: activeTab === tab.id ? "600" : "500" }}>{tab.label}</span>
              </div>
              {activeTab === tab.id && <ChevronRight size={14} />}
            </button>
          ))}
        </nav>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'profile' && (
              <Card>
                <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "var(--space-8)" }}>Store Profile</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", maxWidth: "480px" }}>
                  <Input label="Store Name" value={storeInfo.name} onChange={e => setStoreInfo(p => ({ ...p, name: e.target.value }))} />
                  <Input label="Contact Email" value={storeInfo.email} onChange={e => setStoreInfo(p => ({ ...p, email: e.target.value }))} />
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", marginBottom: "var(--space-2)", textTransform: "uppercase" }}>Currency</label>
                    <select value={storeInfo.currency} onChange={e => setStoreInfo(p => ({ ...p, currency: e.target.value }))} style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "12px", color: "var(--text-primary)", outline: "none" }}>
                      <option>INR (Rs)</option>
                      <option>USD ($)</option>
                    </select>
                  </div>
                  <Button onClick={handleSave} style={{ alignSelf: "start", marginTop: "var(--space-4)" }}>
                    <Save size={16} />
                    Save Changes
                  </Button>
                </div>
              </Card>
            )}

            {activeTab === 'billing' && (
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-8)" }}>
                  <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Subscription</h2>
                  <Badge status="success">Active</Badge>
                </div>
                <div style={{ padding: "var(--space-6)", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-8)" }}>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "4px" }}>CURRENT PLAN</div>
                  <div style={{ fontSize: "24px", fontWeight: "800" }}>Professional</div>
                  <div style={{ fontSize: "14px", color: "var(--primary)", marginTop: "8px", fontWeight: "600" }}>Rs 1,499 / month</div>
                </div>
                <Button variant="secondary">Upgrade Plan</Button>
              </Card>
            )}

            {activeTab !== 'profile' && activeTab !== 'billing' && (
              <Card style={{ padding: "var(--space-12)", textAlign: "center" }}>
                <div style={{ fontSize: "40px", marginBottom: "var(--space-4)" }}>🏗️</div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>Module Under Construction</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>We're refining the {activeTab} experience.</p>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SettingsPage;
