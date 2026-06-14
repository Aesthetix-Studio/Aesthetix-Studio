"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="px-6 md:px-10 py-28 md:py-40 relative overflow-hidden"
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="pointer-events-none absolute"
        style={{
          top: "20%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(ellipse, rgba(196,164,107,0.06) 0%, transparent 65%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "-20%",
          right: "-15%",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(ellipse, rgba(196,164,107,0.04) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div ref={ref} className="max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{ duration: 0.9 }}
          className="flex items-center gap-4 mb-10"
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
              color: "#C4A46B",
            }}
          >
            Start a Conversation
          </span>
        </motion.div>

        <div style={{ overflow: "hidden", marginBottom: "28px" }}>
          <motion.h2
            initial={{ y: "110%" }}
            animate={isInView ? { y: 0 } : { y: "110%" }}
            transition={{
              duration: 1.15,
              delay: 0.15,
              ease: [0.19, 1, 0.22, 1],
            }}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(56px, 8vw, 124px)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#F0EBE0",
              lineHeight: "0.96",
              letterSpacing: "-0.028em",
              textShadow: "0 0 40px rgba(196,164,107,0.1)",
            }}
          >
            Let's build
            <span style={{ display: "block", fontStyle: "normal" }}>something</span>
            <span style={{ display: "block" }}>exceptional.</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 300,
              lineHeight: "1.8",
              color: "rgba(240,235,224,0.48)",
              maxWidth: "440px",
              marginBottom: "20px",
            }}
          >
            We take on a limited number of projects each quarter to ensure surgical focus and exceptional outcomes.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 300,
              lineHeight: "1.7",
              color: "rgba(240,235,224,0.32)",
              maxWidth: "420px",
              marginBottom: "48px",
            }}
          >
            Share your brief and we'll tell you within 48 hours if we're the right strategic partner.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", maxWidth: "560px", position: "relative" }}
            >
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="your@company.com"
                required
                animate={{
                  borderColor: isFocused
                    ? "rgba(196,164,107,0.5)"
                    : "rgba(255,255,255,0.12)",
                }}
                transition={{ duration: 0.3 }}
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRight: "none",
                  padding: "16px 20px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#F0EBE0",
                  outline: "none",
                  cursor: "text",
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  backgroundColor: "#F0EBE0",
                  color: "#080808",
                  border: "1px solid #F0EBE0",
                  padding: "16px 28px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s cubic-bezier(0.19,1,0.22,1)",
                  flexShrink: 0,
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#F0EBE0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F0EBE0";
                  e.currentTarget.style.color = "#080808";
                }}
              >
                Send Brief
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "12px",
                }}
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
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(20px, 2.2vw, 32px)",
                    fontStyle: "italic",
                    color: "#C4A46B",
                    letterSpacing: "-0.015em",
                  }}
                >
                  We'll be in touch shortly.
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "rgba(240,235,224,0.35)",
                  paddingLeft: "42px",
                }}
              >
                Expect a response within 48 hours.
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          style={{ marginTop: "36px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                color: "rgba(240,235,224,0.25)",
                letterSpacing: "0.02em",
              }}
            >
              Prefer email?
            </span>
            <a
              href="mailto:studio@aesthetix.co"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "rgba(240,235,224,0.45)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(240,235,224,0.15)",
                paddingBottom: "1px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#C4A46B";
                e.currentTarget.style.borderBottomColor = "rgba(196,164,107,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(240,235,224,0.45)";
                e.currentTarget.style.borderBottomColor = "rgba(240,235,224,0.15)";
              }}
            >
              studio@aesthetix.co
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

