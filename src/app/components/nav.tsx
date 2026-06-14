import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router";

const NAV_HEIGHT = 72;

const NAV_LINKS = [
  { label: "Work", href: "/work", isRoute: true },
  { label: "Process", href: "/#process", isRoute: false },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.96]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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

  const handleLinkClick = (link: (typeof NAV_LINKS)[0]) => {
    setMobileOpen(false);
    if (link.isRoute) {
      navigate(link.href);
    } else if (isHome) {
      scrollToSection(link.href);
    } else {
      window.location.href = `/${link.href}`;
    }
  };

  const handleCTAClick = () => {
    setMobileOpen(false);
    if (isHome) {
      scrollToSection("#contact");
    } else {
      window.location.href = "/#contact";
    }
  };

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
          handleLinkClick(link);
        }}
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
    <>
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

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link, i) => renderLink(link, i))}
        </div>

        {/* Desktop CTA button */}
        <motion.a
          href="#contact"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            handleCTAClick();
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
          className="hidden md:inline-block"
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col justify-center items-center"
          style={{
            width: "36px",
            height: "36px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px",
            gap: "5px",
          }}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{
              rotate: mobileOpen ? 45 : 0,
              y: mobileOpen ? 7 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "20px",
              height: "1px",
              background: "#F0EBE0",
              display: "block",
              transformOrigin: "center",
            }}
          />
          <motion.span
            animate={{ opacity: mobileOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            style={{
              width: "20px",
              height: "1px",
              background: "#F0EBE0",
              display: "block",
            }}
          />
          <motion.span
            animate={{
              rotate: mobileOpen ? -45 : 0,
              y: mobileOpen ? -7 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "20px",
              height: "1px",
              background: "#F0EBE0",
              display: "block",
              transformOrigin: "center",
            }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40"
            style={{
              backgroundColor: "rgba(8,8,8,0.98)",
              backdropFilter: "blur(20px)",
              paddingTop: "120px",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
            onClick={() => setMobileOpen(false)}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => handleLinkClick(link)}
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: "32px",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: "#F0EBE0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "12px 0",
                      letterSpacing: "-0.02em",
                      textAlign: "left",
                      width: "100%",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C4A46B";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#F0EBE0";
                    }}
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{ marginTop: "48px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCTAClick}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#080808",
                  backgroundColor: "#F0EBE0",
                  border: "none",
                  padding: "14px 28px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#F0EBE0";
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F0EBE0";
                  e.currentTarget.style.color = "#080808";
                  e.currentTarget.style.border = "none";
                }}
              >
                Start a Project
              </button>
            </motion.div>

            {/* Mobile footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{
                position: "absolute",
                bottom: "40px",
                left: "24px",
                right: "24px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10px",
                  color: "rgba(240,235,224,0.2)",
                  letterSpacing: "0.06em",
                }}
              >
                Aesthetix Studio · Hyderabad
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
