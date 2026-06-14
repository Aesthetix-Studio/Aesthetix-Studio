import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GrainOverlay } from "./grain";
import { Nav } from "./nav";
import { Footer } from "./footer";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

interface Project {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  summary: string | null;
  result: string | null;
  year: number | null;
  image: string | null;
  details: string[];
  is_featured: number;
  project_url: string | null;
  created_at: string;
}

const CARD_CONFIGS = [
  { bg: "linear-gradient(145deg, #0E0C1A 0%, #181428 50%, #0A0814 100%)", accent: "rgba(120,100,200,0.1)" },
  { bg: "linear-gradient(145deg, #100A08 0%, #1C1410 100%)", accent: "rgba(196,164,107,0.08)" },
  { bg: "linear-gradient(145deg, #080C08 0%, #0C1810 100%)", accent: "rgba(100,150,120,0.08)" },
  { bg: "linear-gradient(145deg, #0A0810 0%, #14081A 100%)", accent: "rgba(180,130,190,0.08)" },
];

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`${API}/api/projects/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => setProject(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#080808", minHeight: "100vh", overflowX: "hidden" }}>
        <GrainOverlay />
        <Nav />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <div style={{ width: "20px", height: "20px", border: "1.5px solid rgba(240,235,224,0.15)", borderTopColor: "#C4A46B", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div style={{ backgroundColor: "#080808", minHeight: "100vh", overflowX: "hidden" }}>
        <GrainOverlay />
        <Nav />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "24px" }}>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "48px", color: "#F0EBE0", fontStyle: "italic" }}>404</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(240,235,224,0.4)" }}>Project not found.</p>
          <Link to="/work" style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4A46B", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            <ArrowLeft size={14} /> Back to Work
          </Link>
        </div>
      </div>
    );
  }

  const config = CARD_CONFIGS[project.id.charCodeAt(0) % CARD_CONFIGS.length];

  return (
    <div style={{ backgroundColor: "#080808", minHeight: "100vh", overflowX: "hidden" }}>
      <GrainOverlay />
      <Nav />

      {/* Hero */}
      <section className="px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-4xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              to="/work"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(240,235,224,0.35)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "32px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#C4A46B"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(240,235,224,0.35)"; }}
            >
              <ArrowLeft size={14} /> Back to Work
            </Link>
          </motion.div>

          {/* Year + category */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}
          >
            {project.year && (
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.16em", color: "rgba(240,235,224,0.3)" }}>
                {project.year}
              </span>
            )}
            {project.category && (
              <>
                <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C4A46B" }}>
                  {project.category}
                </span>
              </>
            )}
          </motion.div>

          {/* Project name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 400,
              color: "#F0EBE0",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "24px",
            }}
          >
            {project.name}
          </motion.h1>

          {/* Summary */}
          {project.summary && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "17px",
                fontWeight: 300,
                color: "rgba(240,235,224,0.5)",
                lineHeight: 1.7,
                maxWidth: "600px",
              }}
            >
              {project.summary}
            </motion.p>
          )}
        </div>
      </section>

      {/* Tags */}
      {project.details && project.details.length > 0 && (
        <section className="px-6 md:px-10 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
            >
              {project.details.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    fontWeight: 400,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(240,235,224,0.4)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "6px 14px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="px-6 md:px-10">
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }} />
      </div>

      {/* Project hero card */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: config.bg,
              minHeight: "400px",
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "clamp(32px, 4vw, 48px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(ellipse 60% 50% at 30% 30%, ${config.accent}, transparent 60%)`,
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              {project.result && (
                <div style={{ marginBottom: "24px" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C4A46B", display: "block", marginBottom: "8px" }}>
                    Key Result
                  </span>
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 400, fontStyle: "italic", color: "#F0EBE0", lineHeight: 1.4, letterSpacing: "-0.015em", margin: 0, maxWidth: "500px" }}>
                    {project.result}
                  </p>
                </div>
              )}

              {project.project_url && (
                <motion.a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#C4A46B",
                    textDecoration: "none",
                  }}
                >
                  View Live Site <ArrowUpRight size={14} />
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to work */}
      <section className="px-6 md:px-10 pb-24 md:pb-32">
        <div className="max-w-4xl" style={{ display: "flex", justifyContent: "center" }}>
          <Link
            to="/work"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(240,235,224,0.35)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#C4A46B"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(240,235,224,0.35)"; }}
          >
            <ArrowLeft size={14} /> Back to all projects
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
