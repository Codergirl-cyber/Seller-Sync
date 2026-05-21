import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { Skeleton, springConfig } from "./components/UI";
import { motion } from "framer-motion";

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    console.warn('No user authenticated');
                    setLoading(false);
                    return;
                }

                const [ordersRes, productsRes, transRes] = await Promise.all([
                    supabase.from("orders").select("id, payment_status, delivery_status").eq("user_id", user.id),
                    supabase.from("products").select("id", { count: "exact" }).eq("user_id", user.id),
                    supabase.from("transactions").select("amount, type").eq("user_id", user.id)
                ]);

                const revenue = transRes.data?.reduce((acc, t) => t.type === "sale" ? acc + (t.amount || 0) : acc - (t.amount || 0), 0) || 0;
                const ordersCount = ordersRes.data?.length || 0;
                const productsCount = productsRes.count || 0;
                const pendingCount = ordersRes.data?.filter(o => o.delivery_status === "pending").length || 0;

                setStats([
                    { label: "Revenue", value: revenue, prefix: "Rs " },
                    { label: "Orders", value: ordersCount },
                    { label: "Products", value: productsCount },
                    { label: "Pending", value: pendingCount },
                ]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="page-shell">
            <header style={{ marginBottom: "56px" }}>
                <h1 className="h1">Dashboard</h1>
                <p className="subheading" style={{ marginTop: "8px" }}>Your business performance at a glance.</p>
            </header>

            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "16px", marginBottom: "64px" }}
            >
                {loading ? Array(4).fill(0).map((_, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                        <div className="skeleton" style={{ width: "60px", height: "12px", marginBottom: "12px" }} />
                        <div className="skeleton" style={{ width: "100px", height: "28px" }} />
                    </motion.div>
                )) : stats.map((s, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...springConfig, delay: i * 0.05 }}
                        whileHover={{ y: -2 }}
                        style={{
                            background: "rgba(255, 253, 247, 0.78)",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: "var(--radius-lg)",
                            boxShadow: "var(--shadow-sm)",
                            cursor: "default",
                            minHeight: "126px",
                            padding: "22px",
                            transition: "box-shadow 0.2s ease",
                        }}
                        onHoverStart={(e) => {
                            if (e?.currentTarget) e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                        }}
                        onHoverEnd={(e) => {
                            if (e?.currentTarget) e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                        }}
                    >
                        <div className="caption" style={{ marginBottom: "12px" }}>{s.label}</div>
                        <div className="h2">
                            {s.prefix}{typeof s.value === 'number' ? s.value.toLocaleString() : s.value}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div 
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}
            >
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, x: 0 } }}
                >
                    <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)", padding: "28px" }}>
                    <h3 className="caption" style={{ marginBottom: "32px", color: "var(--text-primary)" }}>7-Day Performance</h3>
                    {loading ? (
                        <div style={{ height: "220px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "flex-end", gap: "10px" }}>
                            {[30, 50, 40, 70, 45, 90, 60].map((_, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0.6 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: i * 0.05
                                    }}
                                    style={{ 
                                        flex: 1, 
                                        height: "100%",
                                        background: "var(--border-subtle)", 
                                        borderRadius: "2px 2px 0 0" 
                                    }} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div style={{ height: "200px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "flex-end", gap: "10px" }}>
                            {[30, 50, 40, 70, 45, 90, 60].map((h, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ 
                                        duration: 0.6,
                                        delay: i * 0.05,
                                        ease: "easeOut"
                                    }}
                                    style={{ 
                                        flex: 1, 
                                        background: i === 5 ? "linear-gradient(180deg, var(--accent), var(--accent-hover))" : "var(--surface-hover)", 
                                        borderRadius: "2px 2px 0 0" 
                                    }} 
                                />
                            ))}
                        </div>
                    )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={springConfig}
                >
                    <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)", padding: "28px", minHeight: "318px" }}>
                    <h3 className="caption" style={{ marginBottom: "32px", color: "var(--text-primary)" }}>Recent Activity</h3>
                    <motion.div 
                        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
                        initial="hidden"
                        animate="visible"
                        variants={{ 
                            visible: { 
                                transition: { 
                                    staggerChildren: 0.08 
                                } 
                            } 
                        }}
                    >
                        {loading ? (
                            <>
                                {[1, 2, 3].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1 }
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Skeleton height="40px" />
                                    </motion.div>
                                ))}
                            </>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                                className="body" 
                                style={{ color: "var(--text-muted)", textAlign: "center", padding: "40px", border: "1px dashed var(--border)", borderRadius: "var(--radius-md)", background: "var(--surface-raised)" }}
                            >
                                No recent activity to show.
                            </motion.div>
                        )}
                    </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
