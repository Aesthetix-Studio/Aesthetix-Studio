"use client";
const CLIENTS = [
  "Meridian Capital",
  "Kyoto Co.",
  "Solaris Climate",
  "Vantage Platform",
  "Nexus Capital",
  "Arterra Group",
  "Luminary Labs",
  "Crestwood Ventures",
  "Apex Collective",
  "Orion Technologies",
  "Fable Studio",
  "Compass Enterprise",
];

export function MarqueeSection() {
  const items = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <>
      <style>{`
        @keyframes ae-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .ae-marquee-track {
          animation: ae-marquee 40s linear infinite;
          will-change: transform;
        }
        .ae-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div
        className="overflow-hidden py-5 md:py-6 relative"
        style={{
          backgroundColor: "#080808",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Gradient fade edges */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "100px",
            background: "linear-gradient(90deg, #080808 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "100px",
            background: "linear-gradient(270deg, #080808 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        <div className="ae-marquee-track flex whitespace-nowrap">
          {items.map((client, i) => (
            <div
              key={i}
              className="flex items-center gap-10 px-6 md:px-8 group cursor-default"
            >
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "rgba(240,235,224,0.25)",
                  letterSpacing: "0.005em",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(240,235,224,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,235,224,0.25)")}
              >
                {client}
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "2px",
                  borderRadius: "50%",
                  backgroundColor: "#C4A46B",
                  opacity: 0.3,
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
