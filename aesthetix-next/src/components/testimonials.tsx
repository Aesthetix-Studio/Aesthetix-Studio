"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

const TESTIMONIALS = [
  {
    quote:
      "Aesthetix didn't just redesign our brand — they redesigned how the market perceives us. Eighteen months later, that single strategic decision continues to compound returns.",
    author: "Sarah Chen",
    role: "Chief Brand Officer",
    company: "Meridian Capital",
  },
  {
    quote:
      "The rebrand became our inflection point. Every enterprise conversion, every strategic partnership — it all traces directly back to the clarity Aesthetix engineered.",
    author: "James Okafor",
    role: "Chief Executive Officer",
    company: "Solaris Climate Tech",
  },
  {
    quote:
      "Working with Aesthetix means working with practitioners who understand that design is a business argument, not a decoration exercise. That precision is rare.",
    author: "Mia Weston",
    role: "Founder & CEO",
    company: "Kyoto Co.",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="px-6 md:px-10 py-24 md:py-32 relative overflow-hidden"
      style={{
        backgroundColor: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          right: "-15%",
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(ellipse, rgba(196,164,107,0.04) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div ref={ref} className="max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{ duration: 0.9 }}
          className="flex items-center gap-4 mb-12 md:mb-16"
        >
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "linear-gradient(90deg, #C4A46B 0%, transparent 100%)",
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(240,235,224,0.28)",
            }}
          >
            Client Perspectives
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.08, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "120px",
                lineHeight: "1",
                color: "#C4A46B",
                position: "absolute",
                top: "-20px",
                left: "-10px",
                pointerEvents: "none",
              }}
            >
              &ldquo;
            </motion.div>

            <blockquote
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(24px, 3.2vw, 48px)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#F0EBE0",
                lineHeight: "1.35",
                letterSpacing: "-0.018em",
                marginBottom: "44px",
                position: "relative",
                paddingLeft: "4px",
              }}
            >
              {TESTIMONIALS[active].quote}
            </blockquote>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                paddingLeft: "4px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "1px",
                  background: "linear-gradient(90deg, #C4A46B 0%, transparent 100%)",
                  flexShrink: 0,
                }}
              />
              <div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#F0EBE0",
                    display: "block",
                    letterSpacing: "0.01em",
                    marginBottom: "4px",
                  }}
                >
                  {TESTIMONIALS[active].author}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 400,
                    color: "rgba(240,235,224,0.38)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {TESTIMONIALS[active].role}, {TESTIMONIALS[active].company}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "52px",
            paddingLeft: "4px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            {TESTIMONIALS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: i === active ? 32 : 6,
                  height: 2,
                  backgroundColor:
                    i === active ? "#C4A46B" : "rgba(240,235,224,0.18)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.19,1,0.22,1)",
                  padding: 0,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              fontWeight: 400,
              color: "rgba(240,235,224,0.22)",
              letterSpacing: "0.06em",
            }}
          >
            {`${active + 1} / ${TESTIMONIALS.length}`}
          </span>
        </div>
      </div>
    </section>
  );
}
