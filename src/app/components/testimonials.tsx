import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

const TESTIMONIALS = [
  {
    quote:
      "Aesthetix didn't just redesign our brand — they redesigned how the market sees us. Eighteen months later, that single decision still compounds.",
    author: "Sarah Chen",
    role: "Chief Brand Officer",
    company: "Meridian",
  },
  {
    quote:
      "The Solaris rebrand was the inflection point. Every enterprise conversion, every partnership — it all traces back to the clarity they created.",
    author: "James Okafor",
    role: "Chief Executive Officer",
    company: "Solaris Climate Tech",
  },
  {
    quote:
      "Working with Aesthetix is working with people who understand that design is a business argument, not a decoration exercise.",
    author: "Mia Weston",
    role: "Founder & CEO",
    company: "Kyoto Co.",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      className="px-6 md:px-10 py-20 md:py-28"
      style={{
        backgroundColor: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div ref={ref} className="max-w-5xl">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.85 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(240,235,224,0.25)",
            display: "block",
            marginBottom: "48px",
          }}
        >
          Client Perspectives
        </motion.span>

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(22px, 3vw, 44px)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#F0EBE0",
                lineHeight: "1.32",
                letterSpacing: "-0.015em",
                marginBottom: "40px",
              }}
            >
              "{TESTIMONIALS[active].quote}"
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "22px",
                  height: "1px",
                  backgroundColor: "rgba(196,164,107,0.5)",
                  flexShrink: 0,
                }}
              />
              <div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#F0EBE0",
                    display: "block",
                    letterSpacing: "0.02em",
                  }}
                >
                  {TESTIMONIALS[active].author}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 400,
                    color: "rgba(240,235,224,0.35)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {TESTIMONIALS[active].role}, {TESTIMONIALS[active].company}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot nav */}
        <div style={{ display: "flex", gap: "10px", marginTop: "44px" }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 28 : 6,
                height: 2,
                backgroundColor:
                  i === active ? "#C4A46B" : "rgba(240,235,224,0.15)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                padding: 0,
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
