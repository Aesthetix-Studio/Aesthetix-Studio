import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GrainOverlay } from "./grain";
import { Nav } from "./nav";
import { Footer } from "./footer";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

interface CaseStudy {
  id: string;
  client: string;
  slug: string;
  brief: string | null;
  approach: string | null;
  result: string | null;
  published: number;
  created_at: string;
}

const FALLBACK_STUDIES: CaseStudy[] = [
  {
    id: "1",
    client: "Meridian Capital",
    slug: "meridian-capital",
    brief: "Reshape perception in the $3T wealth management sector with a complete brand identity and digital platform.",
    approach: "Built a comprehensive identity system with motion language and 140-screen platform design.",
    result: "47% increase in enterprise conversions within 6 months of launch.",
    published: 1,
    created_at: "2025-03-15",
  },
  {
    id: "2",
    client: "Kyoto Co.",
    slug: "kyoto-co",
    brief: "Modernize a 40-year heritage luxury brand without losing its legacy.",
    approach: "Surgical rebrand — retained core DNA while introducing contemporary visual language.",
    result: "3x conversion rate improvement across all digital channels.",
    published: 1,
    created_at: "2024-11-20",
  },
  {
    id: "3",
    client: "Solaris Climate Tech",
    slug: "solaris",
    brief: "Position a Series B climate tech startup as the inevitable category leader.",
    approach: "Category positioning, brand identity, and product design from zero to market-ready.",
    result: "$12M Series B funding secured within 4 months of rebrand.",
    published: 1,
    created_at: "2025-01-10",
  },
];

export function CaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/case-studies`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        const published = Array.isArray(data) ? data.filter((s: CaseStudy) => s.published) : [];
        setStudies(published);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayStudies = studies.length > 0 ? studies : loading ? [] : FALLBACK_STUDIES;

  return (
    <div style={{ backgroundColor: "#080808", minHeight: "100vh", overflowX: "hidden" }}>
      <GrainOverlay />
      <Nav />

      {/* Hero */}
      <section className="px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24">
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
            Case Studies
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
              marginBottom: "20px",
            }}
          >
            Proven outcomes,<br />not just deliverables.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 300,
              color: "rgba(240,235,224,0.45)",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            Deep dives into how we've helped brands shift perception, dominate categories, and compound value.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-10">
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }} />
      </div>

      {/* Case studies grid */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        {loading ? (
          <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.04)",
                  minHeight: "360px",
                }}
              />
            ))}
          </div>
        ) : displayStudies.length === 0 ? (
          <div className="max-w-5xl text-center py-20">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 300,
                color: "rgba(240,235,224,0.35)",
              }}
            >
              No case studies yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayStudies.map((study, i) => (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.06)",
                  overflow: "hidden",
                  transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                  padding: "clamp(24px, 3vw, 32px)",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(196,164,107,0.15)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Client */}
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#C4A46B",
                    display: "block",
                    marginBottom: "16px",
                  }}
                >
                  {study.client}
                </span>

                {/* Brief */}
                {study.brief && (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "rgba(240,235,224,0.5)",
                      lineHeight: 1.7,
                      marginBottom: "16px",
                      flex: 1,
                    }}
                  >
                    {study.brief}
                  </p>
                )}

                {/* Result highlight */}
                {study.result && (
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
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(240,235,224,0.25)",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Result
                    </span>
                    <p
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "16px",
                        fontWeight: 400,
                        fontStyle: "italic",
                        color: "#F0EBE0",
                        lineHeight: 1.4,
                        letterSpacing: "-0.01em",
                        margin: 0,
                      }}
                    >
                      {study.result}
                    </p>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
