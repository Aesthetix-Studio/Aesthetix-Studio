import { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
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
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "proj_meridian_01",
    name: "Meridian",
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
    id: "proj_kyoto_02",
    name: "Kyoto Co.",
    slug: "kyoto-co",
    category: "Luxury Retail Identity",
    summary: "Tripling conversion through surgical restraint. Complete rebrand for a 40-year heritage house.",
    result: "3x conversion rate improvement across all digital channels.",
    year: 2024,
    image: null,
    details: ["Identity System", "Campaign"],
    is_featured: 0,
  },
  {
    id: "proj_solaris_03",
    name: "Solaris",
    slug: "solaris",
    category: "Climate Technology Brand",
    summary: "Making clean energy feel inevitable. Category positioning, identity, and product design for Series B climate tech.",
    result: "$12M Series B funding secured within 4 months of rebrand.",
    year: 2025,
    image: null,
    details: ["Brand Strategy", "Product Design"],
    is_featured: 0,
  },
  {
    id: "proj_vantage_04",
    name: "Vantage",
    slug: "vantage",
    category: "B2B SaaS Design System",
    summary: "Engineering 230+ components for a $450M platform. Design system, documentation, and 18-month implementation.",
    result: "60% faster feature development cycles across 12 product teams.",
    year: 2024,
    image: null,
    details: ["Design System", "Component Library"],
    is_featured: 1,
  },
];

const CARD_CONFIGS = [
  { bg: "linear-gradient(145deg, #0E0C1A 0%, #181428 50%, #0A0814 100%)", accent: "rgba(120,100,200,0.1)", large: true },
  { bg: "linear-gradient(145deg, #100A08 0%, #1C1410 100%)", accent: "rgba(196,164,107,0.08)", large: false },
  { bg: "linear-gradient(145deg, #080C08 0%, #0C1810 100%)", accent: "rgba(100,150,120,0.08)", large: false },
  { bg: "linear-gradient(145deg, #0A0810 0%, #14081A 100%)", accent: "rgba(180,130,190,0.08)", large: true },
];

/* ─── Project Card (matching work.tsx design) ─── */

function ProjectCard({
  project,
  index,
  large,
}: {
  project: Project;
  index: number;
  large: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });

  useMotionValueEvent(springX, "change", (latest) => {
    setGradientPos((prev) => ({ ...prev, x: latest * 100 }));
  });
  useMotionValueEvent(springY, "change", (latest) => {
    setGradientPos((prev) => ({ ...prev, y: latest * 100 }));
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const config = CARD_CONFIGS[index % CARD_CONFIGS.length];
  const displayIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden col-span-12 ${large ? "md:col-span-7" : "md:col-span-5"}`}
      style={{
        background: config.bg,
        minHeight: large ? "500px" : "460px",
        border: "1px solid rgba(255,255,255,0.06)",
        cursor: "pointer",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Animated accent overlay — follows cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${gradientPos.x}% ${gradientPos.y}%, ${config.accent}, transparent 40%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Grain texture on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 0.03 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
        }}
      />

      {/* Top meta row */}
      <div className="flex items-start justify-between p-7 md:p-8">
        <motion.span
          animate={{ opacity: hovered ? 0.4 : 0.2 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.16em",
            color: "#F0EBE0",
          }}
        >
          {displayIndex}
        </motion.span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <motion.span
            animate={{ opacity: hovered ? 0.35 : 0.2 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              letterSpacing: "0.12em",
              color: "#F0EBE0",
            }}
          >
            {project.year || "—"}
          </motion.span>
          <motion.div
            animate={{
              opacity: hovered ? 1 : 0.2,
              x: hovered ? 0 : -4,
              y: hovered ? 0 : 4,
            }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <ArrowUpRight size={16} color="#F0EBE0" strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
        {/* Tags with stagger animation */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(project.details || []).map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -8 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.6, delay: index * 0.1 + i * 0.05 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(196,164,107,0.3)" }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "9px",
                fontWeight: 400,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(240,235,224,0.32)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "4px 9px",
                transition: "all 0.25s ease",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Project name */}
        <motion.h3
          animate={{ color: hovered ? "#F0EBE0" : "rgba(240,235,224,0.92)" }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(32px, 3.8vw, 56px)",
            fontWeight: 400,
            lineHeight: "1.02",
            letterSpacing: "-0.025em",
            marginBottom: "8px",
          }}
        >
          {project.name}
        </motion.h3>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: "rgba(240,235,224,0.42)",
            marginBottom: "0px",
            letterSpacing: "0.01em",
          }}
        >
          {project.category || "Uncategorized"}
        </p>

        {/* Hover reveal — description + CTA */}
        <motion.div
          animate={{
            height: hovered ? "auto" : 0,
            opacity: hovered ? 1 : 0,
            marginTop: hovered ? "20px" : "0px",
          }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          style={{ overflow: "hidden" }}
        >
          {project.summary && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(240,235,224,0.45)",
                marginBottom: "18px",
                lineHeight: "1.7",
                maxWidth: "90%",
              }}
            >
              {project.summary}
            </p>
          )}
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#C4A46B",
              }}
            >
              View Case Study
            </span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: "#C4A46B", fontSize: "14px" }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Hover bloom — bottom glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(196,164,107,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Golden border glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(196,164,107,0.15), 0 8px 32px rgba(0,0,0,0.4)"
            : "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────── */

export function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

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

  // Extract unique tags for filter tabs
  const allTags = Array.from(
    new Set(displayProjects.flatMap((p) => p.details || []))
  ).sort();

  const filteredProjects =
    activeFilter === "All"
      ? displayProjects
      : displayProjects.filter((p) => (p.details || []).includes(activeFilter));

  // Compute the "large" flag for each card — swap sizes in second pair like work.tsx
  const getLarge = (i: number, project: Project): boolean => {
    const config = CARD_CONFIGS[i % CARD_CONFIGS.length];
    // First pair uses config.large, second pair swaps
    const pairIndex = Math.floor(i / 2);
    return pairIndex % 2 === 0 ? config.large : !config.large;
  };

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

      {/* Filter tabs */}
      {!loading && allTags.length > 0 && (
        <section className="px-6 md:px-10 pt-10 md:pt-14">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => setActiveFilter("All")}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: activeFilter === "All" ? "#080808" : "rgba(240,235,224,0.4)",
                backgroundColor: activeFilter === "All" ? "#F0EBE0" : "transparent",
                border: `1px solid ${activeFilter === "All" ? "#F0EBE0" : "rgba(255,255,255,0.1)"}`,
                padding: "8px 16px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              All
            </motion.button>
            {allTags.map((tag, i) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.03 }}
                onClick={() => setActiveFilter(tag)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: activeFilter === tag ? "#080808" : "rgba(240,235,224,0.4)",
                  backgroundColor: activeFilter === tag ? "#F0EBE0" : "transparent",
                  border: `1px solid ${activeFilter === tag ? "#F0EBE0" : "rgba(255,255,255,0.1)"}`,
                  padding: "8px 16px",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== tag) {
                    e.currentTarget.style.borderColor = "rgba(196,164,107,0.3)";
                    e.currentTarget.style.color = "#F0EBE0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== tag) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(240,235,224,0.4)";
                  }
                }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* Projects grid — full width matching work.tsx layout */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        {loading ? (
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`col-span-12 ${i % 2 === 0 ? "md:col-span-7" : "md:col-span-5"}`}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.04)",
                  minHeight: i % 2 === 0 ? "500px" : "460px",
                }}
              />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 300,
                color: "rgba(240,235,224,0.35)",
              }}
            >
              No projects match this filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                large={getLarge(i, project)}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
