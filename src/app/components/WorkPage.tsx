import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GrainOverlay } from "./grain";
import { Nav } from "./nav";
import { Footer } from "./footer";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  summary: string | null;
  result: string | null;
  year: number | null;
  image: string | null;
  details: string[];
  is_featured: number;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Meridian",
    slug: "meridian",
    category: "Financial Intelligence Platform",
    summary: "Reshaping perception in the $3T wealth management sector. Full identity, motion system, and 140-screen platform.",
    result: "47% increase in enterprise conversions within 6 months.",
    year: 2025,
    image: null,
    details: ["Brand Identity", "Digital Platform", "Motion"],
    is_featured: 1,
  },
  {
    id: "2",
    title: "Kyoto Co.",
    slug: "kyoto-co",
    category: "Luxury Retail Identity",
    summary: "Tripling conversion through surgical restraint. Complete rebrand for a 40-year heritage house.",
    result: "3x conversion rate improvement.",
    year: 2024,
    image: null,
    details: ["Identity System", "Campaign"],
    is_featured: 0,
  },
  {
    id: "3",
    title: "Solaris",
    slug: "solaris",
    category: "Climate Technology Brand",
    summary: "Making clean energy feel inevitable. Category positioning, identity, and product design for Series B climate tech.",
    result: "$12M Series B funding secured.",
    year: 2025,
    image: null,
    details: ["Brand Strategy", "Product Design"],
    is_featured: 0,
  },
  {
    id: "4",
    title: "Vantage",
    slug: "vantage",
    category: "B2B SaaS Design System",
    summary: "Engineering 230+ components for a $450M platform. Design system, documentation, and 18-month implementation.",
    result: "60% faster feature development cycles.",
    year: 2024,
    image: null,
    details: ["Design System", "Component Library"],
    is_featured: 1,
  },
];

const GRADIENTS = [
  "linear-gradient(145deg, #0E0C1A 0%, #181428 50%, #0A0814 100%)",
  "linear-gradient(145deg, #100A08 0%, #1C1410 100%)",
  "linear-gradient(145deg, #080C08 0%, #0C1810 100%)",
  "linear-gradient(145deg, #0A0810 0%, #14081A 100%)",
];

export function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/projects`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayProjects = projects.length > 0 ? projects : loading ? [] : FALLBACK_PROJECTS;

  return (
    <div style={{ backgroundColor: "#080808", minHeight: "100vh", overflowX: "hidden" }}>
      <GrainOverlay />
      <Nav />

      {/* Hero */}
      <section className="px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-5xl">
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
            Portfolio
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
            Selected Work
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
            Projects that define categories, shift perception, and compound value over years.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-10">
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }} />
      </div>

      {/* Projects grid */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        {loading ? (
          <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.04)",
                  minHeight: "400px",
                }}
              />
            ))}
          </div>
        ) : displayProjects.length === 0 ? (
          <div className="max-w-5xl text-center py-20">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 300,
                color: "rgba(240,235,224,0.35)",
              }}
            >
              No projects yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayProjects.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                style={{
                  background: GRADIENTS[i % GRADIENTS.length],
                  border: "1px solid rgba(255,255,255,0.06)",
                  overflow: "hidden",
                  transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                  minHeight: project.is_featured ? "480px" : "400px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "clamp(24px, 3vw, 36px)",
                  position: "relative",
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
                {/* Top meta */}
                <div
                  style={{
                    position: "absolute",
                    top: "clamp(20px, 3vw, 28px)",
                    left: "clamp(24px, 3vw, 36px)",
                    right: "clamp(24px, 3vw, 36px)",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "10px",
                      fontWeight: 400,
                      letterSpacing: "0.16em",
                      color: "rgba(240,235,224,0.2)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "10px",
                      fontWeight: 400,
                      letterSpacing: "0.12em",
                      color: "rgba(240,235,224,0.2)",
                    }}
                  >
                    {project.year || "—"}
                  </span>
                </div>

                {/* Tags */}
                {project.details && project.details.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {project.details.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "9px",
                          fontWeight: 400,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(240,235,224,0.32)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          padding: "4px 9px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(28px, 3.5vw, 48px)",
                    fontWeight: 400,
                    color: "#F0EBE0",
                    lineHeight: 1.02,
                    letterSpacing: "-0.025em",
                    marginBottom: "6px",
                  }}
                >
                  {project.title}
                  {project.is_featured ? (
                    <span style={{ fontSize: "12px", color: "#C4A46B", marginLeft: "8px" }}>★</span>
                  ) : null}
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "rgba(240,235,224,0.42)",
                    marginBottom: "0",
                    letterSpacing: "0.01em",
                  }}
                >
                  {project.category || "Uncategorized"}
                </p>

                {/* Summary on hover */}
                {project.summary && (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "rgba(240,235,224,0.4)",
                      lineHeight: 1.7,
                      marginTop: "12px",
                      maxWidth: "90%",
                    }}
                  >
                    {project.summary}
                  </p>
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
