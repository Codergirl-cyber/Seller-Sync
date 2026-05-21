import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  ReceiptIndianRupee, 
  Settings,
  LogOut
} from "lucide-react";
import { useAuth } from "./hooks/useAuth";

const transition = { duration: 0.15, ease: [0.22, 1, 0.36, 1] };

const Sidebar = ({ currentPage, setPage }) => {
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      setPage("landing");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "transactions", label: "Transactions", icon: ReceiptIndianRupee },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside style={{
      width: "236px",
      background: "linear-gradient(180deg, rgba(255, 253, 247, 0.96), rgba(238, 241, 231, 0.9))",
      borderRight: "1px solid rgba(95, 111, 63, 0.16)",
      display: "flex",
      flexDirection: "column",
      padding: "32px 16px",
      height: "100vh",
      position: "sticky",
      top: 0,
      boxShadow: "12px 0 34px rgba(31, 33, 25, 0.04)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "42px", padding: "0 8px" }}>
        <div className="brand-mark" style={{ width: "24px", height: "24px", borderRadius: "5px" }} />
        <span style={{ fontSize: "16px", fontWeight: "800", letterSpacing: 0 }}>SellerSync</span>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {menuItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              onClick={() => setPage(item.id)}
              whileHover={{ backgroundColor: isActive ? "var(--accent-hover)" : "rgba(95, 111, 63, 0.08)" }}
              whileTap={{ scale: 0.98 }}
              transition={transition}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "var(--radius-md)",
                border: isActive ? "1px solid rgba(38, 48, 24, 0.2)" : "1px solid transparent",
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "#ffffff" : "var(--text-secondary)",
                cursor: "pointer",
                textAlign: "left",
                fontWeight: isActive ? "700" : "500",
                boxShadow: isActive ? "0 12px 26px rgba(70, 84, 45, 0.18)" : "none"
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
              <span style={{ fontSize: "13px" }}>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", padding: "16px 8px", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ fontSize: "12px", fontWeight: "750", marginBottom: "8px" }}>{user?.email || "User"}</div>
        <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "12px" }}>Professional Plan</div>
        
        <motion.button
          onClick={handleLogout}
          whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          transition={transition}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 12px",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            background: "transparent",
            color: "#dc2626",
            cursor: "pointer",
            textAlign: "left",
            fontWeight: "500",
            width: "100%",
            fontSize: "13px"
          }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </motion.button>
      </div>
    </aside>
  );
};

export default Sidebar;
