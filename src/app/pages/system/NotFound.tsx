import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Home, Phone } from "lucide-react";
import { AesthetixMark } from "../../components/AesthetixMark";

const links = [
  { label: "Homepage", href: "/", desc: "Back to where it all starts" },
  { label: "Our Work", href: "/portfolio", desc: "See what we've built" },
  { label: "Services", href: "/services", desc: "What we offer" },
  { label: "Contact", href: "/contact", desc: "Get in touch" },
];

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 py-20 text-center relative overflow-hidden"
      style={{ background: "var(--background)", fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif" }}
    >
      {/* Background mark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <div style={{ opacity: 0.03 }}>
          <AesthetixMark size={480} color="var(--foreground)" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 max-w-lg"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-warning" />
          <span className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 500 }}>Error 404 — Page not found</span>
        </motion.div>

        {/* Big number */}
        <div
          className="text-foreground mb-2 select-none"
          style={{
            fontSize: "clamp(80px,18vw,140px)",
            fontWeight: 900,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            opacity: 0.07,
            fontFamily: "'Plus Jakarta Sans',sans-serif",
          }}
          aria-hidden
        >
          404
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="-mt-4 space-y-4"
        >
          <h1 className="text-foreground" style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.025em" }}>
            This page doesn't exist.
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: "16px", lineHeight: 1.65, maxWidth: "380px", margin: "0 auto" }}>
            It may have been moved, deleted, or you might have followed a bad link. Let's get you somewhere useful.
          </p>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 grid grid-cols-2 gap-3 text-left"
        >
          {links.map(({ label, href, desc }) => (
            <Link
              key={label}
              to={href}
              className="group flex flex-col gap-0.5 px-4 py-3 rounded-xl border border-border bg-card hover:border-brand/40 hover:bg-brand-muted transition-all no-underline"
            >
              <span className="text-foreground group-hover:text-brand transition-colors" style={{ fontSize: "13px", fontWeight: 600 }}>{label}</span>
              <span className="text-muted-foreground" style={{ fontSize: "12px" }}>{desc}</span>
            </Link>
          ))}
        </motion.div>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="flex items-center justify-center gap-3 mt-8 flex-wrap"
        >
          <Link
            to="/"
            className="flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-xl no-underline hover:bg-foreground/90 transition-all"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            <Home className="w-4 h-4" /> Go home
          </Link>
          <Link
            to="/discovery-call"
            className="flex items-center gap-2 text-brand border border-brand/30 bg-brand-muted px-5 py-2.5 rounded-xl no-underline hover:bg-brand/10 transition-all"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            <Phone className="w-4 h-4" /> Book a call
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
