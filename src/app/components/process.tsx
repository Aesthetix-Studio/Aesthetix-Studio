import { useRef } from "react";
import { motion, useInView } from "motion/react";

const PERSPECTIVES = [
  {
    num: "01",
    title: "Clarity over complexity",
    description: "We remove what weakens the signal.",
  },
  {
    num: "02",
    title: "Systems over campaigns",
    description: "Strong brands compound.",
  },
  {
    num: "03",
    title: "Perception over decoration",
    description: "The market judges what it sees.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="perspective"
      className="px-6 md:px-10 py-20 md:py-28"
      style={{
        backgroundColor: "#0C0C0C",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div ref={ref} className="max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left label col */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0",
                  textTransform: "uppercase",
                  color: "#C4A46B",
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                Our Approach
              </span>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "42px",
                  fontWeight: 400,
                  color: "#F0EBE0",
                  letterSpacing: "0",
                  lineHeight: "1.2",
                }}
              >
                Perspective
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "rgba(240,235,224,0.35)",
                  lineHeight: "1.7",
                  marginTop: "16px",
                  maxWidth: "280px",
                }}
              >
                The goal is to sell thinking, not deliverables.
              </p>
            </motion.div>
          </div>

          {/* Steps col */}
          <div className="md:col-span-8">
            {PERSPECTIVES.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 18 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
                }
                transition={{
                  duration: 0.85,
                  delay: 0.1 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="grid grid-cols-12 gap-4 py-8"
                style={{
                  borderBottom:
                    i < PERSPECTIVES.length - 1
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "none",
                }}
              >
                <div className="col-span-2 md:col-span-2">
                  <span
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: "16px",
                      fontWeight: 400,
                      fontStyle: "italic",
                      letterSpacing: "0",
                      color: "rgba(240,235,224,0.18)",
                    }}
                  >
                    {step.num}
                  </span>
                </div>
                <div className="col-span-10">
                  <h3
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: "34px",
                      fontWeight: 400,
                      color: "#F0EBE0",
                      letterSpacing: "0",
                      marginBottom: "10px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      lineHeight: "1.75",
                      color: "rgba(240,235,224,0.42)",
                      maxWidth: "440px",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
