const SOCIAL_LINKS = [
  { label: "X / Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Dribbble", href: "#" },
];

const NAV_LINKS = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Work", href: "#work" },
  { label: "Perspective", href: "#perspective" },
  { label: "Practice", href: "#practice" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer
      className="px-6 md:px-10 py-10 md:py-12"
      style={{
        backgroundColor: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
          <span
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "20px",
              fontStyle: "italic",
              color: "#F0EBE0",
              letterSpacing: "0",
            }}
          >
            Æ
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              color: "rgba(240,235,224,0.25)",
              letterSpacing: "0",
              textTransform: "uppercase",
            }}
          >
            Aesthetix Studio
          </span>
        </div>

        {/* Nav */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                color: "rgba(240,235,224,0.28)",
                textDecoration: "none",
                letterSpacing: "0",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(240,235,224,0.65)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(240,235,224,0.28)")
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social */}
        <div style={{ display: "flex", gap: "18px" }}>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                fontWeight: 400,
                color: "rgba(240,235,224,0.2)",
                textDecoration: "none",
                letterSpacing: "0",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(240,235,224,0.55)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(240,235,224,0.2)")
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-7"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            fontWeight: 400,
            color: "rgba(240,235,224,0.18)",
            letterSpacing: "0",
          }}
        >
          © 2026 Aesthetix Studio. All rights reserved.
        </span>
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "12px",
            fontStyle: "italic",
            fontWeight: 400,
            color: "rgba(240,235,224,0.14)",
            letterSpacing: "0",
          }}
        >
          Design is market positioning made visible.
        </span>
      </div>
    </footer>
  );
}
