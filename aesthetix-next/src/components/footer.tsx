"use client";
import { motion } from "motion/react";
import { Link } from "react-router";

const SOCIAL_LINKS = [
  { label: "X / Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Dribbble", href: "#" },
];

const NAV_LINKS = [
  { label: "Work", href: "/#work", isRoute: false },
  { label: "Process", href: "/#process", isRoute: false },
  { label: "About", href: "/about", isRoute: true },
  { label: "Journal", href: "/journal", isRoute: true },
  { label: "Contact", href: "/#contact", isRoute: false },
];

export function Footer() {
  return (
    <footer
      className="px-6 md:px-10 py-12 md:py-16 relative"
      style={{
        backgroundColor: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(196,164,107,0.15) 50%, transparent 100%)",
        }}
      />

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-12">
        <div style={{ maxWidth: "280px" }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "inline-block",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "28px",
                fontStyle: "italic",
                color: "#F0EBE0",
                letterSpacing: "-0.025em",
              }}
            >
              Æ
            </span>
          </Link>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 300,
              lineHeight: "1.7",
              color: "rgba(240,235,224,0.25)",
              letterSpacing: "0.01em",
            }}
          >
            A brand and digital studio for companies that compete through category
            design.
          </p>
        </div>

        <div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(240,235,224,0.2)",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Navigation
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {NAV_LINKS.map((link, i) => {
              if (link.isRoute) {
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <Link
                      to={link.href}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "rgba(240,235,224,0.32)",
                        textDecoration: "none",
                        letterSpacing: "0.02em",
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "rgba(240,235,224,0.7)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(240,235,224,0.32)")
                      }
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              }
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "rgba(240,235,224,0.32)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(240,235,224,0.7)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(240,235,224,0.32)")
                  }
                >
                  {link.label}
                </motion.a>
              );
            })}
          </div>
        </div>

        <div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(240,235,224,0.2)",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Connect
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {SOCIAL_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                whileHover={{ x: 4 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "rgba(240,235,224,0.25)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(240,235,224,0.6)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(240,235,224,0.25)")
                }
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              color: "rgba(240,235,224,0.2)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Aesthetix Studio. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "16px" }}>
            <a
              href="#"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "9px",
                fontWeight: 400,
                color: "rgba(240,235,224,0.18)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(240,235,224,0.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(240,235,224,0.18)")
              }
            >
              Privacy
            </a>
            <a
              href="#"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "9px",
                fontWeight: 400,
                color: "rgba(240,235,224,0.18)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(240,235,224,0.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(240,235,224,0.18)")
              }
            >
              Terms
            </a>
          </div>
        </div>
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "13px",
            fontStyle: "italic",
            fontWeight: 400,
            color: "rgba(240,235,224,0.16)",
            letterSpacing: "0.005em",
          }}
        >
          Design is market positioning made visible.
        </span>
      </div>
    </footer>
  );
}
