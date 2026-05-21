import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuth } from "./hooks/useAuth";
import LandingPage from "./landingpage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Sidebar from "./sidebar";
import Dashboard from "./dashboard";
import OrdersPage from "./OrdersPage";
import ProductsPage from "./Productspage";
import TransactionPage from "./Transactionpage";
import SettingsPage from "./SettingsPage";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    style={{ height: "100%", width: "100%" }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const { isAuthenticated, loading, user } = useAuth();
  const [page, setPage] = useState("landing");
  const [authPage, setAuthPage] = useState(null); // null = show landing, "login" or "signup" = show auth

  // Auto-redirect based on auth state
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && page === "landing") {
        setPage("dashboard"); // Auto-redirect authenticated users to dashboard
      } else if (!isAuthenticated && page !== "landing") {
        setPage("landing"); // Redirect non-authenticated users away from dashboard
      }
    }
  }, [isAuthenticated, loading, page]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "var(--bg-primary)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{ display: "inline-block", marginBottom: "1rem" }}
          >
            <Loader size={48} color="var(--accent)" />
          </motion.div>
          <p style={{ color: "var(--text-secondary)" }}>Authenticating...</p>
        </div>
      </motion.div>
    );
  }

  // Redirect to dashboard if authenticated but on landing
  if (isAuthenticated && page === "landing") {
    return (
      <div className="app-shell" style={{ display: "flex", minHeight: "100vh", color: "var(--text-primary)" }}>
        <Sidebar currentPage={page} setPage={setPage} />
        <main style={{ flex: 1, position: "relative", overflowX: "hidden" }}>
          <AnimatePresence mode="wait">
            <PageWrapper key="dashboard">
              <Dashboard />
            </PageWrapper>
          </AnimatePresence>
        </main>
      </div>
    );
  }

  // Landing page (before authentication)
  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        <PageWrapper key="landing">
          {authPage ? (
            // Show auth pages when user clicks sign in/up
            authPage === "login" ? (
              <LoginPage onSwitchToSignup={() => setAuthPage("signup")} />
            ) : (
              <SignupPage onSwitchToLogin={() => setAuthPage("login")} />
            )
          ) : (
            // Show landing page by default
            <LandingPage 
              onEnter={() => setAuthPage("login")} 
              onSignIn={() => setAuthPage("login")}
              onSignUp={() => setAuthPage("signup")}
              isAuthenticated={false}
            />
          )}
        </PageWrapper>
      </AnimatePresence>
    );
  }

  // Dashboard pages (requires authentication)
  return (
    <div className="app-shell" style={{ display: "flex", minHeight: "100vh", color: "var(--text-primary)" }}>
      <Sidebar currentPage={page} setPage={setPage} />
      
      <main style={{ flex: 1, position: "relative", overflowX: "hidden" }}>
        <AnimatePresence mode="wait">
          <PageWrapper key={page}>
            {page === "dashboard" && <Dashboard />}
            {page === "orders" && <OrdersPage />}
            {page === "products" && <ProductsPage />}
            {page === "transactions" && <TransactionPage />}
            {page === "settings" && <SettingsPage />}
          </PageWrapper>
        </AnimatePresence>
      </main>
    </div>
  );
}
  
