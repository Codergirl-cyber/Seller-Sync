import { motion } from "framer-motion";
import { ArrowRight, Check, PackageCheck, ReceiptText, TrendingUp } from "lucide-react";
import { Button } from "./components/UI";

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
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease } }
};

const preview = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease, delay: 0.2 } }
};

const metrics = [
  { label: "Revenue today", value: "$8,420", change: "+12.4%" },
  { label: "Orders open", value: "136", change: "24 ready" },
  { label: "Stock synced", value: "742", change: "Live" }
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

const LandingPage = ({ onEnter, onSignIn, onSignUp, isAuthenticated }) => {
  return (
    <div className="landing-page">
      <div className="landing-background" aria-hidden="true">
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
          <a href="#features">Features</a>
          <a href="#preview">Preview</a>
          {isAuthenticated ? (
            <Button size="sm" onClick={onEnter}>Go to Dashboard</Button>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={onSignIn}>Sign In</Button>
              <Button size="sm" onClick={onSignUp}>Sign Up</Button>
            </>
          )}
        </div>
      </motion.nav>

      <main>
        <section className="landing-hero">
          <div className="landing-hero__glow" />

          <motion.div
            className="landing-hero__content"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="landing-hero__eyebrow" variants={fadeUp}>
              Commerce operations for Instagram sellers
            </motion.p>

            <motion.h1 className="landing-hero__headline" variants={fadeUp}>
              Sell beautifully. Operate without chaos.
            </motion.h1>

            <motion.p className="landing-hero__subtext" variants={fadeUp}>
              SellerSync brings orders, inventory, fulfillment, and revenue into one focused workspace built for sellers who move fast.
            </motion.p>

            <motion.div className="landing-hero__actions" variants={fadeUp}>
              <motion.button
                onClick={onEnter}
                whileHover={{ backgroundColor: "var(--accent-hover)", y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="landing-hero__primary"
              >
                Open Dashboard
                <ArrowRight size={18} strokeWidth={2.5} />
              </motion.button>

              <motion.button
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.92)", color: "var(--text-primary)", y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="landing-hero__secondary"
              >
                View Demo
              </motion.button>
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
            variants={preview}
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
                  {metrics.map(({ label, value, change }) => (
                    <div className="landing-product__metric" key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                      <small>{change}</small>
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

          <div className="landing-features__grid">
            {features.map(({ icon: Icon, title, desc }) => (
              <motion.div className="landing-feature" key={title} variants={fadeUp}>
                <Icon size={20} strokeWidth={2.1} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <footer className="landing-footer">
        <span className="caption">(c) 2025 SellerSync. Minimal. Powerful. Personal.</span>
      </footer>
    </div>
  );
};

export default LandingPage;
