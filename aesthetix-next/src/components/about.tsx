"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import { GrainOverlay } from "./grain";
import { Nav } from "./nav";
import { Footer } from "./footer";

const VALUES = [
  {
    number: "01",
    title: "Restraint as Strategy",
    description:
      "Every element must earn its place. We remove until only the essential remains — then we make that essential extraordinary.",
  },
  {
    number: "02",
    title: "Systems Over Spectacles",
    description:
      "Beautiful moments are easy. Consistent excellence across 140 screens is hard. We build design systems that scale.",
  },
  {
    number: "03",
    title: "Measured Impact",
    description:
      "Aesthetic without outcome is decoration. Every decision ties back to conversion, retention, or brand equity.",
  },
  {
    number: "04",
    title: "Craft at the Edge",
    description:
      "We push the boundary of what's possible on the modern web — edge computing, real-time AI, motion systems that feel alive.",
  },
];

const STATS = [
  { value: "4+", label: "Years" },
  { value: "60+", label: "Projects" },
  { value: "40+", label: "Clients" },
  { value: "98%", label: "Retention" },
];

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div style={{ backgroundColor: "#080808", minHeight: "100vh", overflowX: "hidden" }}>
      <GrainOverlay />
      <Nav />

      {/* Hero */}
      <motion.section
        ref={heroRef}
        className="px-6 md:px-10 pt-32 md:pt-40 pb-20 md:pb-28"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C4A46B",
              display: "block",
              marginBottom: "16px",
            }}
          >
            About
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 400,
              color: "#F0EBE0",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "24px",
            }}
          >
            We believe restraint is the highest form of creative courage.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "17px",
              fontWeight: 300,
              color: "rgba(240,235,224,0.5)",
              lineHeight: 1.7,
              maxWidth: "640px",
            }}
          >
            Aesthetix Studio is a digital design agency for brands that refuse to blend in.
            We combine strategy, design, and engineering to build digital experiences
            that convert — without compromise.
          </motion.p>
        </div>
      </motion.section>

      {/* Stats bar */}
      <section className="px-6 md:px-10 py-12 md:py-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl">
          {STATS.map((stat, i) => (
            <AnimatedSection key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * i }}
              >
                <p
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    fontWeight: 400,
                    color: "#C4A46B",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(240,235,224,0.35)",
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-4xl">
          <AnimatedSection>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C4A46B",
                marginBottom: "16px",
              }}
            >
              Philosophy
            </p>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 400,
                color: "#F0EBE0",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
                marginBottom: "24px",
              }}
            >
              Design is not decoration. Design is decisions.
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 300,
                color: "rgba(240,235,224,0.45)",
                lineHeight: 1.8,
                maxWidth: "600px",
              }}
            >
              Most agencies chase trends. We study systems. Every project begins with
              understanding the underlying structure — the information architecture, the
              user psychology, the business model — before a single pixel is placed.
              The result is work that doesn't just look different. It performs differently.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-10 py-20 md:py-28" style={{ background: "#0a0a0a" }}>
        <div className="max-w-5xl">
          <AnimatedSection>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C4A46B",
                marginBottom: "12px",
              }}
            >
              Values
            </p>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 400,
                color: "#F0EBE0",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
                marginBottom: "48px",
              }}
            >
              What we stand for.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {VALUES.map((value, i) => (
              <AnimatedSection key={value.number}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  style={{
                    background: "#0a0a0a",
                    padding: "clamp(28px, 3vw, 40px)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      color: "#C4A46B",
                      display: "block",
                      marginBottom: "16px",
                    }}
                  >
                    {value.number}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: "22px",
                      fontWeight: 400,
                      color: "#F0EBE0",
                      lineHeight: 1.2,
                      marginBottom: "12px",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "rgba(240,235,224,0.4)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {value.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-24 md:py-32">
        <AnimatedSection>
          <div className="max-w-2xl text-center mx-auto">
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 400,
                color: "#F0EBE0",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
                marginBottom: "20px",
              }}
            >
              Ready to build something exceptional?
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 300,
                color: "rgba(240,235,224,0.4)",
                lineHeight: 1.7,
                marginBottom: "32px",
              }}
            >
              We partner with a limited number of clients each quarter to ensure every
              project gets the focus it deserves.
            </p>
            <Link
              to="/"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#080808",
                background: "#F0EBE0",
                padding: "14px 32px",
                textDecoration: "none",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#F0EBE0";
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F0EBE0";
                e.currentTarget.style.color = "#080808";
                e.currentTarget.style.border = "none";
              }}
            >
              Start a project
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
