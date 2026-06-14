"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const STEPS = [
  {
    num: "01",
    title: "Diagnose",
    subtitle: "Strategic Foundation",
    description:
      "We map the gap between where you are and where the market needs to see you. Deep stakeholder sessions, competitive landscape analysis, and the kind of surgical honesty most agencies avoid.",
    deliverables: ["Market positioning map", "Competitive audit", "Strategic brief"],
    duration: "2-3 weeks",
  },
  {
    num: "02",
    title: "Architect",
    subtitle: "System Design",
    description:
      "We build the complete system: brand strategy, visual identity, tone of voice, and the design framework that scales across every touchpoint without losing integrity or precision.",
    deliverables: ["Visual identity system", "Brand guidelines", "Design tokens"],
    duration: "4-6 weeks",
  },
  {
    num: "03",
    title: "Deploy",
    subtitle: "Precision Launch",
    description:
      "Coordinated activation. Every asset, platform, and pixel deployed in concert. We measure adoption, iterate on execution, and ensure the positioning lands — then compounds over time.",
    deliverables: ["Launch assets", "Implementation support", "Performance tracking"],
    duration: "3-4 weeks",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  return (
    <section
      id="process"
      className="px-6 md:px-10 py-24 md:py-32 relative overflow-hidden"
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Subtle background gradient */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "-10%",
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(ellipse, rgba(196,164,107,0.03) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div ref={ref} className="max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-20">
          {/* Left label col */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
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
                  Our Approach
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(30px, 3.5vw, 52px)",
                  fontWeight: 400,
                  color: "#F0EBE0",
                  letterSpacing: "-0.025em",
                  lineHeight: "1.15",
                  marginBottom: "20px",
                }}
              >
                Design as strategic
                <span style={{ fontStyle: "italic", display: "block" }}>
                  market positioning.
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "rgba(240,235,224,0.42)",
                  lineHeight: "1.75",
                  maxWidth: "320px",
                  marginBottom: "24px",
                }}
              >
                Three phases. No shortcuts. Built to compound value over years, not quarters.
              </p>

              {/* Timeline indicator */}
              <div
                style={{
                  borderLeft: "1px solid rgba(196,164,107,0.2)",
                  paddingLeft: "16px",
                  marginTop: "32px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    fontWeight: 400,
                    color: "rgba(240,235,224,0.3)",
                    letterSpacing: "0.06em",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  TYPICAL ENGAGEMENT
                </span>
                <span
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "#C4A46B",
                    letterSpacing: "-0.01em",
                  }}
                >
                  10-14 weeks
                </span>
              </div>
            </motion.div>
          </div>

          {/* Steps col */}
          <div className="md:col-span-8">
            {STEPS.map((step, i) => {
              const isExpanded = expandedStep === step.num;

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + i * 0.12,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  className="grid grid-cols-12 gap-5 py-9 md:py-10 group cursor-pointer"
                  style={{
                    borderBottom:
                      i < STEPS.length - 1
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "none",
                  }}
                  onClick={() => setExpandedStep(isExpanded ? null : step.num)}
                  onMouseEnter={() => {
                    if (!isExpanded) setExpandedStep(step.num);
                  }}
                >
                  {/* Number */}
                  <div className="col-span-2 md:col-span-2">
                    <motion.span
                      animate={{
                        color: isExpanded ? "#C4A46B" : "rgba(240,235,224,0.2)",
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "18px",
                        fontWeight: 400,
                        fontStyle: "italic",
                      }}
                    >
                      {step.num}
                    </motion.span>
                  </div>

                  {/* Content */}
                  <div className="col-span-10">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <h3
                          style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontSize: "clamp(26px, 2.8vw, 40px)",
                            fontWeight: 400,
                            color: "#F0EBE0",
                            letterSpacing: "-0.02em",
                            marginBottom: "4px",
                            transition: "color 0.3s ease",
                          }}
                        >
                          {step.title}
                        </h3>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "11px",
                            fontWeight: 400,
                            color: "rgba(240,235,224,0.35)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {step.subtitle}
                        </span>
                      </div>
                      <motion.span
                        animate={{
                          opacity: isExpanded ? 0.4 : 0.25,
                        }}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "10px",
                          fontWeight: 400,
                          color: "#F0EBE0",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {step.duration}
                      </motion.span>
                    </div>

                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        fontWeight: 300,
                        lineHeight: "1.8",
                        color: "rgba(240,235,224,0.48)",
                        maxWidth: "520px",
                        marginBottom: isExpanded ? "20px" : "0",
                        transition: "margin-bottom 0.3s ease",
                      }}
                    >
                      {step.description}
                    </p>

                    {/* Expandable deliverables */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0,
                        marginTop: isExpanded ? "16px" : "0px",
                      }}
                      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                          paddingTop: "16px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "9px",
                            fontWeight: 500,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "rgba(240,235,224,0.3)",
                            display: "block",
                            marginBottom: "12px",
                          }}
                        >
                          Key Deliverables
                        </span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {step.deliverables.map((item, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: idx * 0.05 }}
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "11px",
                                fontWeight: 400,
                                color: "rgba(240,235,224,0.38)",
                                backgroundColor: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                padding: "6px 12px",
                                letterSpacing: "0.02em",
                              }}
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
