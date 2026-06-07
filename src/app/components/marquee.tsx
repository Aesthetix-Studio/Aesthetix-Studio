const CLIENTS = [
  "Meridian",
  "Kyoto Co.",
  "Solaris",
  "Vantage",
  "Nexus Capital",
  "Arterra",
  "Luminary",
  "Crestwood",
  "Apex Collective",
  "Orion Labs",
  "Fable Studio",
  "Compass Group",
];

export function MarqueeSection() {
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <>
      <style>{`
        @keyframes ae-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ae-marquee-track {
          animation: ae-marquee 28s linear infinite;
          will-change: transform;
        }
        .ae-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div
        className="overflow-hidden py-4"
        style={{
          backgroundColor: "#080808",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="ae-marquee-track flex whitespace-nowrap">
          {items.map((client, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "rgba(240,235,224,0.22)",
                  letterSpacing: "0.01em",
                }}
              >
                {client}
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  backgroundColor: "#C4A46B",
                  opacity: 0.35,
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
