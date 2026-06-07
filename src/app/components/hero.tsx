import { useRef } from "react";
import { motion } from "motion/react";

const HEADLINE_LINES = [
  { text: "Category", italic: false },
  { text: "leaders", italic: false },
  { text: "rarely look", italic: false },
  { text: "accidental.", italic: true },
];

const HERO_RAIL = [
  { label: "Practice", value: "Luxury digital design" },
  { label: "Focus", value: "Perception, position, presence" },
  { label: "Engagement", value: "Selective partnerships" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{ backgroundColor: "#080808", minHeight: "92svh" }}
    >
      {/* Background bloom */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "40%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(ellipse, rgba(196,164,107,0.04) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Main content */}
      <div
        className="flex-1 flex flex-col justify-center px-6 md:px-10"
        style={{ paddingTop: "132px", paddingBottom: "56px" }}
      >
        {/* Eyebrow tag */}
        <motion.div
          className="mb-9 md:mb-12"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0",
              textTransform: "uppercase",
              color: "#C4A46B",
            }}
          >
            Luxury Digital Design Practice
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="mb-10 md:mb-12">
          {HEADLINE_LINES.map((line, i) => (
            <div
              key={i}
              style={{ overflow: "hidden", lineHeight: "0.95" }}
            >
              <motion.span
                className="block text-[56px] sm:text-[76px] md:text-[108px] lg:text-[126px]"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.05,
                  delay: 0.45 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontWeight: 400,
                  color: "#F0EBE0",
                  letterSpacing: "0",
                  fontStyle: line.italic ? "italic" : "normal",
                  paddingBottom: "0.06em",
                }}
              >
                {line.text}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Bottom row: description + scroll cue */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-0 md:justify-between">
          <motion.p
            className="max-w-sm"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: "1.75",
              color: "rgba(240,235,224,0.45)",
            }}
          >
            We shape how ambitious companies are perceived, translating market
            position into brand systems, product interfaces, and digital
            experiences with editorial restraint.
          </motion.p>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.1 }}
          >
            <div
              style={{
                width: "36px",
                height: "1px",
                backgroundColor: "rgba(196,164,107,0.55)",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0",
                textTransform: "uppercase",
                color: "rgba(240,235,224,0.25)",
              }}
            >
              Manifesto below
            </span>
          </motion.div>
        </div>
      </div>

      {/* Editorial rail */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
      >
        {HERO_RAIL.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 px-5 md:px-8 py-5 md:py-6"
            style={{
              borderRight:
                i < HERO_RAIL.length - 1
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                color: "rgba(196,164,107,0.75)",
                letterSpacing: "0",
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                color: "rgba(240,235,224,0.46)",
                letterSpacing: "0",
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
