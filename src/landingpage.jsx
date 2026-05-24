import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Moon, PackageCheck, ReceiptText, Sun, TrendingUp } from "lucide-react";
import { Button } from "./components/UI";
import { useTheme } from "./context/ThemeContext";

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease } }
};

const floatIn = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.18 } }
};

const metrics = [
  { label: "Revenue", value: "$138.4k", hint: "+12.7% this week" },
  { label: "Orders", value: "278", hint: "18 pending" },
  { label: "Inventory", value: "5,240", hint: "Auto-sync" }
];

const orders = [
  ["Aarika Shah", "Silk scarf", "Paid"],
  ["Mina Rao", "Linen set", "Packed"],
  ["Tara Iyer", "Gold hoops", "New"]
];

const features = [
  {
    icon: PackageCheck,
    title: "Inventory that stays honest",
    desc: "Track stock as orders move, so your stories never sell what you cannot ship."
  },
  {
    icon: ReceiptText,
    title: "Orders without tab-hopping",
    desc: "Turn DMs into a clean fulfillment queue with payment, packing, and delivery status."
  },
  {
    icon: TrendingUp,
    title: "Revenue you can read fast",
    desc: "See what sold, what is pending, and where margin is improving at a glance."
  }
];

const LandingPage = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="landing-page">
      <div className="landing-page__background" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <motion.nav
        className="landing-nav"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
      >
        <div className="landing-brand">
          <span />
          SellerSync
        </div>
        <div className="landing-nav__links">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="landing-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? "Light" : "Dark"}
          </Button>
          <a href="#features">Features</a>
          <a href="#preview">Preview</a>
          <Link to="/login"><Button size="sm" variant="ghost">Log in</Button></Link>
          <Link to="/signup"><Button size="sm">Sign up</Button></Link>
        </div>
      </motion.nav>

      <main className="landing-main">
        <section className="landing-hero">
          <motion.div
            className="landing-copy"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="landing-eyebrow" variants={fadeUp}>
              Commerce operations for Instagram sellers
            </motion.p>

            <motion.h1 className="landing-headline" variants={fadeUp}>
              Sell beautifully. Operate without chaos.
            </motion.h1>

            <motion.p className="landing-description" variants={fadeUp}>
              SellerSync brings orders, inventory, fulfillment, and revenue into one focused workspace built for sellers who move fast.
            </motion.p>

            <motion.div className="landing-actions" variants={fadeUp}>
              <Link to="/login" className="landing-hero__primary-link">
                <motion.span
                  whileHover={{ backgroundColor: "var(--accent-hover)", y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="landing-hero__primary"
                >
                  Get started
                  <ArrowRight size={18} strokeWidth={2.5} />
                </motion.span>
              </Link>

              <Link to="/signup" className="landing-hero__secondary-link">
                <motion.span
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.92)", color: "var(--text-primary)", y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="landing-hero__secondary"
                >
                  Sign up free
                </motion.span>
              </Link>
            </motion.div>

            <motion.div className="landing-proof" variants={fadeUp}>
              {["No spreadsheets", "Live inventory", "Built for repeat selling"].map((item) => (
                <span key={item}>
                  <Check size={14} />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            id="preview"
            className="landing-preview"
            variants={floatIn}
            initial="hidden"
            animate="visible"
          >
            <div className="landing-product">
              <aside className="landing-product__sidebar">
                <div className="landing-product__brand">
                  <span />
                  SellerSync
                </div>
                {["Dashboard", "Orders", "Products", "Revenue"].map((item) => (
                  <div className={item === "Dashboard" ? "is-active" : ""} key={item}>{item}</div>
                ))}
              </aside>

              <main className="landing-product__main">
                <div className="landing-product__topbar">
                  <span>Today</span>
                  <span>Instagram shop</span>
                </div>

                <div className="landing-product__heading">
                  <p className="caption">Command center</p>
                  <h2>Today&apos;s selling flow</h2>
                </div>

                <div className="landing-product__metrics">
                  {metrics.map(({ label, value, hint }) => (
                    <div className="landing-product__metric" key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                      <small>{hint}</small>
                    </div>
                  ))}
                </div>

                <div className="landing-product__workspace">
                  <section className="landing-product__panel landing-product__orders">
                    <div className="landing-product__panel-title">Recent orders</div>
                    {orders.map(([name, item, status]) => (
                      <div className="landing-product__row" key={name}>
                        <span>{name}</span>
                        <span>{item}</span>
                        <strong>{status}</strong>
                      </div>
                    ))}
                  </section>

                  <section className="landing-product__panel landing-product__chart">
                    <div className="landing-product__panel-title">Sales momentum</div>
                    <div className="landing-product__bars">
                      {[38, 52, 44, 68, 58, 82, 76, 94].map((height, index) => (
                        <span style={{ height: `${height}%` }} key={index} />
                      ))}
                    </div>
                  </section>
                </div>
              </main>
            </div>
          </motion.div>
        </section>

        <motion.section
          id="features"
          className="landing-features"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div className="landing-section-heading" variants={fadeUp}>
            <p className="caption">Why teams trust it</p>
            <h2>Everything important stays visible.</h2>
          </motion.div>

          <motion.div className="landing-features__panel" variants={fadeUp}>
            <div className="landing-features__deck">
              {features.map(({ icon: Icon, title, desc }) => (
                <div className="landing-feature" key={title}>
                  <div className="landing-feature__head">
                    <Icon size={20} strokeWidth={2.1} />
                    <h3>{title}</h3>
                  </div>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </main>

      <footer className="landing-footer">
        <span className="caption">(c) 2025 SellerSync. Minimal. Powerful. Personal.</span>
      </footer>
    </div>
  );
};

export default LandingPage;
