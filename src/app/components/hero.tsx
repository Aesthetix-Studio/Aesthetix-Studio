import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const STATS = [
  { value: "47", label: "Brands launched", suffix: "" },
  { value: "$2.4", label: "Client value created", suffix: "B" },
  { value: "8", label: "Years category-building", suffix: "+" },
];

const HEADLINE_LINES = [
  { text: "We design", italic: false },
  { text: "market", italic: false },
  { text: "dominance.", italic: true },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{ backgroundColor: "#080808", minHeight: "100svh" }}
    >
      {/* Dual bloom layers */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "35%",
          right: "-15%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(ellipse, rgba(196,164,107,0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "10%",
          left: "-20%",
          width: "45vw",
          height: "45vw",
          background:
            "radial-gradient(ellipse, rgba(196,164,107,0.03) 0%, transparent 65%)",
          filter: "blur(100px)",
        }}
      />

      {/* Main content */}
      <motion.div
        className="flex-1 flex flex-col justify-center px-6 md:px-10"
        style={{ paddingTop: "140px", paddingBottom: "60px", opacity, scale }}
      >
        {/* Eyebrow with decorative line */}
        <motion.div
          className="mb-12 md:mb-16 flex items-center gap-4"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              width: "28px",
              height: "1px",
              background: "linear-gradient(90deg, #C4A46B 0%, transparent 100%)",
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C4A46B",
            }}
          >
            Brand & Digital Studio — Hyderabad
          </span>
        </motion.div>

        {/* Headline with enhanced stagger */}
        <div className="mb-12 md:mb-14">
          {HEADLINE_LINES.map((line, i) => (
            <div
              key={i}
              style={{ overflow: "hidden", lineHeight: "0.9" }}
            >
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.15,
                  delay: 0.4 + i * 0.12,
                  ease: [0.19, 1, 0.22, 1],
                }}
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(68px, 10vw, 156px)",
                  fontWeight: 400,
                  color: "#F0EBE0",
                  letterSpacing: "-0.028em",
                  fontStyle: line.italic ? "italic" : "normal",
                  display: "block",
                  paddingBottom: "0.08em",
                  textShadow: line.italic ? "0 0 40px rgba(196,164,107,0.12)" : "none",
                }}
              >
                {line.text}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Bottom row: enhanced description + animated scroll indicator */}
        <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-0 md:justify-between">
          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: "1.8",
                color: "rgba(240,235,224,0.5)",
                marginBottom: "18px",
              }}
            >
              We build high-performance digital products — UI/UX design, React applications,
              and SaaS platforms — for brands that refuse to blend in.
            </p>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div
                style={{
                  width: "2px",
                  height: "32px",
                  background: "linear-gradient(180deg, #C4A46B 0%, transparent 100%)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 300,
                  lineHeight: "1.6",
                  color: "rgba(240,235,224,0.32)",
                  maxWidth: "220px",
                }}
              >
                Every engagement starts at $50k. Every outcome compounds for years.
              </span>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-start md:items-end gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.div
              className="flex items-center gap-3"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                style={{
                  width: "42px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent 0%, #C4A46B 100%)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "9px",
                  fontWeight: 400,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(240,235,224,0.28)",
                }}
              >
                Selected work
              </span>
            </motion.div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "24px",
                fontWeight: 200,
                color: "rgba(240,235,224,0.15)",
              }}
            >
              ↓
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced stats bar */}
      <motion.div
        className="flex flex-wrap border-t"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(20px)",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            className="flex-1 flex flex-col gap-1 px-6 md:px-9 py-6 md:py-7 group cursor-default"
            style={{
              borderRight:
                i < STATS.length - 1
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "none",
              transition: "background 0.4s ease",
            }}
            whileHover={{ backgroundColor: "rgba(196,164,107,0.02)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 1.1 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  fontWeight: 400,
                  color: "#F0EBE0",
                  letterSpacing: "-0.024em",
                  lineHeight: "1",
                  transition: "color 0.3s ease",
                }}
                className="group-hover:text-[#C4A46B]"
              >
                {stat.value}
              </span>
              {stat.suffix && (
                <span
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(16px, 2vw, 24px)",
                    fontWeight: 400,
                    color: "rgba(240,235,224,0.4)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stat.suffix}
                </span>
              )}
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                fontWeight: 400,
                color: "rgba(240,235,224,0.32)",
                letterSpacing: "0.04em",
                marginTop: "6px",
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
