import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { MagneticButton } from "./magnetic-button";
export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8787";
      const response = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="px-6 md:px-10 py-24 md:py-36 relative overflow-hidden"
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Ambient bloom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 30% 100%, rgba(196,164,107,0.045) 0%, transparent 100%)",
        }}
      />

      <div ref={ref} className="max-w-4xl relative">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.85 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0",
            textTransform: "uppercase",
            color: "#C4A46B",
            display: "block",
            marginBottom: "28px",
          }}
        >
          Start a Conversation
        </motion.span>

        {/* Headline */}
        <div style={{ overflow: "hidden", marginBottom: "24px" }}>
          <motion.h2
            className="text-[56px] md:text-[76px]"
            initial={{ y: "105%" }}
            animate={isInView ? { y: 0 } : { y: "105%" }}
            transition={{
              duration: 1.0,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#F0EBE0",
              lineHeight: "1.0",
              letterSpacing: "0",
            }}
          >
            Let's talk.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.85, delay: 0.28 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 300,
            lineHeight: "1.75",
            color: "rgba(240,235,224,0.42)",
            maxWidth: "440px",
            marginBottom: "40px",
          }}
        >
          If you are trying to make a company harder to ignore and easier to
          trust, send the brief. We will tell you if we are the right fit.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.85, delay: 0.38 }}
        >
          {!submitted ? (
            <>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", maxWidth: "500px" }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@company.com"
                required
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRight: "none",
                  padding: "14px 18px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#F0EBE0",
                  outline: "none",
                  cursor: "text",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor =
                    "rgba(196,164,107,0.45)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.1)")
                }
              />
              <MagneticButton
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: "#F0EBE0",
                  color: "#080808",
                  border: "1px solid #F0EBE0",
                  padding: "14px 22px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0",
                  textTransform: "uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  opacity: loading ? 0.6 : 1,
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
                {loading ? "Sending..." : "Send Brief"}
              </MagneticButton>
            </form>
            {error && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#e57373", marginTop: "10px" }}>
                {error}
              </p>
            )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "26px",
                fontStyle: "italic",
                color: "#C4A46B",
                letterSpacing: "0",
              }}
            >
              We will be in touch shortly.
            </motion.div>
          )}
        </motion.div>

        {/* Alt contact */}
        <motion.div
          style={{ marginTop: "28px" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.85, delay: 0.55 }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              color: "rgba(240,235,224,0.22)",
            }}
          >
            Or reach us at{" "}
          </span>
          <a
            href="mailto:studio@aesthetix.co"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              color: "rgba(240,235,224,0.4)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(240,235,224,0.8)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(240,235,224,0.4)")
            }
          >
            studio@aesthetix.co
          </a>
        </motion.div>
      </div>
    </section>
  );
}
