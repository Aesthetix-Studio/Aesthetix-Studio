import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MagneticAnchor } from "./magnetic-button";

const NAV_LINKS = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Work", href: "#work" },
  { label: "Perspective", href: "#perspective" },
  { label: "Practice", href: "#practice" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
      style={{
        backgroundColor: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <a
        href="#top"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "baseline",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "22px",
            color: "#F0EBE0",
            letterSpacing: "0",
            fontStyle: "italic",
          }}
        >
          Æ
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            color: "rgba(240,235,224,0.4)",
            letterSpacing: "0",
            textTransform: "uppercase",
          }}
        >
          Aesthetix
        </span>
      </a>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 400,
              color: "rgba(240,235,224,0.5)",
              letterSpacing: "0",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F0EBE0")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(240,235,224,0.5)")
            }
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <MagneticAnchor
        href="#contact"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          color: "#F0EBE0",
          letterSpacing: "0",
          textTransform: "uppercase",
          textDecoration: "none",
          border: "1px solid rgba(255,255,255,0.18)",
          padding: "8px 18px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#F0EBE0";
          e.currentTarget.style.color = "#080808";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#F0EBE0";
        }}
      >
        Inquire
      </MagneticAnchor>
    </motion.nav>
  );
}
