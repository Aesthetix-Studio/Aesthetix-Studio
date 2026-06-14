"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link, useLocation } from "react-router";

const NAV_HEIGHT = 72;

const NAV_LINKS = [
  { label: "Work", href: "#work", isRoute: false },
  { label: "Process", href: "#process", isRoute: false },
  { label: "About", href: "/about", isRoute: true },
  { label: "Journal", href: "/journal", isRoute: true },
];

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.96]);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["work", "process"];
      let found: string | null = null;
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= NAV_HEIGHT + 80) {
          found = id;
          break;
        }
      }
      setCurrentSection(found);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setScrolled(window.scrollY > 60);
  }, [location.pathname]);

  const renderLink = (link: (typeof NAV_LINKS)[0], i: number) => {
    const isActive =
      activeLink === link.label ||
      (isHome && !link.isRoute && currentSection === link.href.replace("#", ""));
    const routeActive = link.isRoute && location.pathname === link.href;

    const baseStyle: React.CSSProperties = {
      fontFamily: "'Inter', sans-serif",
      fontSize: "12px",
      fontWeight: 400,
      color: isActive || routeActive ? "#F0EBE0" : "rgba(240,235,224,0.5)",
      letterSpacing: "0.05em",
      textDecoration: "none",
      transition: "color 0.3s cubic-bezier(0.16,1,0.3,1)",
      position: "relative",
      paddingBottom: "2px",
    };

    const underline = (
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, #C4A46B 0%, transparent 100%)",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isActive || routeActive ? 1 : 0,
          opacity: isActive || routeActive ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    );

    const handleHover = () => setActiveLink(link.label);
    const handleLeave = () => setActiveLink(null);

    if (link.isRoute) {
      return (
        <Link
          key={link.label}
          to={link.href}
          style={baseStyle}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          {link.label}
          {underline}
        </Link>
      );
    }

    return (
      <motion.a
        key={link.label}
        href={link.href}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (isHome) {
            scrollToSection(link.href);
          } else {
            window.location.href = `/${link.href}`;
          }
        }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        style={baseStyle}
      >
        {link.label}
        {underline}
      </motion.a>
    );
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 md:py-6"
      style={{
        backgroundColor: scrolled ? "rgba(8,8,8,0.94)" : "rgba(8,8,8,0.2)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(255,255,255,0.03)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        opacity: navOpacity,
      }}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "28px",
            color: "#F0EBE0",
            letterSpacing: "-0.03em",
            fontStyle: "italic",
            textShadow: "0 0 20px rgba(240,235,224,0.1)",
          }}
        >
          Æ
        </span>
      </Link>

      {/* Links */}
      <div className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((link, i) => renderLink(link, i))}
      </div>

      {/* CTA button */}
      <motion.a
        href="#contact"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (isHome) {
            scrollToSection("#contact");
          } else {
            window.location.href = "/#contact";
          }
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{
          scale: 1.05,
          boxShadow:
            "0 0 0 1px rgba(240,235,224,0.3), 0 4px 16px rgba(196,164,107,0.15)",
        }}
        whileTap={{ scale: 0.98 }}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "10px",
          fontWeight: 500,
          color: "#F0EBE0",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          textDecoration: "none",
          border: "1px solid rgba(255,255,255,0.2)",
          padding: "10px 20px",
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          position: "relative",
          overflow: "hidden",
          display: "inline-block",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#F0EBE0";
          e.currentTarget.style.color = "#080808";
          e.currentTarget.style.borderColor = "#F0EBE0";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#F0EBE0";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        }}
      >
        <span style={{ position: "relative", zIndex: 2 }}>
          Start a Project
        </span>
      </motion.a>
    </motion.nav>
  );
}
