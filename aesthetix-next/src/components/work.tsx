"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useSpring } from "motion/react";

const PROJECTS = [
  {
    id: "01",
    name: "Meridian",
    subtitle: "Financial Intelligence Platform",
    year: "2025",
    tags: ["Brand Identity", "Digital Platform", "Motion"],
    description: "Reshaping perception in the $3T wealth management sector. Full identity, motion system, and 140-screen platform.",
    bg: "linear-gradient(145deg, #0E0C1A 0%, #181428 50%, #0A0814 100%)",
    accent: "rgba(120,100,200,0.1)",
    large: true,
  },
  {
    id: "02",
    name: "Kyoto Co.",
    subtitle: "Luxury Retail Identity",
    year: "2024",
    tags: ["Identity System", "Campaign"],
    description: "Tripling conversion through surgical restraint. Complete rebrand for a 40-year heritage house.",
    bg: "linear-gradient(145deg, #100A08 0%, #1C1410 100%)",
    accent: "rgba(196,164,107,0.08)",
    large: false,
  },
  {
    id: "03",
    name: "Solaris",
    subtitle: "Climate Technology Brand",
    year: "2025",
    tags: ["Brand Strategy", "Product Design"],
    description: "Making clean energy feel inevitable. Category positioning, identity, and product design for Series B climate tech.",
    bg: "linear-gradient(145deg, #080C08 0%, #0C1810 100%)",
    accent: "rgba(100,150,120,0.08)",
    large: false,
  },
  {
    id: "04",
    name: "Vantage",
    subtitle: "B2B SaaS Design System",
    year: "2024",
    tags: ["Design System", "Component Library"],
    description: "Engineering 230+ components for a $450M platform. Design system, documentation, and 18-month implementation.",
    bg: "linear-gradient(145deg, #0A0810 0%, #14081A 100%)",
    accent: "rgba(180,130,190,0.08)",
    large: true,
  },
];

type Project = (typeof PROJECTS)[0];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Track reactive motion values for gradient position
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.19, 1, 0.22, 1],
      }}
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden col-span-12 ${
        project.large ? "md:col-span-7" : "md:col-span-5"
      }`}
      style={{
        background: project.bg,
        minHeight: project.large ? "500px" : "460px",
        border: "1px solid rgba(255,255,255,0.06)",
        cursor: "pointer",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Animated accent overlay - now using reactive state */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${gradientPos.x}% ${gradientPos.y}%, ${project.accent}, transparent 40%)`,
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
          {project.id}
        </motion.span>
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
          {project.year}
        </motion.span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
        {/* Tags with stagger animation */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -8 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -8 }
              }
              transition={{
                duration: 0.6,
                delay: index * 0.1 + i * 0.05,
              }}
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
          animate={{
            color: hovered ? "#F0EBE0" : "rgba(240,235,224,0.92)",
          }}
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
          {project.subtitle}
        </p>

        {/* Hover reveal */}
        <motion.div
          animate={{
            height: hovered ? "auto" : 0,
            opacity: hovered ? 1 : 0,
            marginTop: hovered ? "20px" : "0px",
          }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          style={{ overflow: "hidden" }}
        >
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
            {project.description}
          </p>
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

      {/* Hover bloom */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(196,164,107,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Border glow on hover */}
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

export function Work() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section
      id="work"
      className="px-6 md:px-10 py-24 md:py-32"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Section header */}
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-12 pb-6 md:pb-7"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div>
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C4A46B",
              display: "block",
              marginBottom: "14px",
            }}
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(28px, 3.2vw, 48px)",
              fontWeight: 400,
              color: "#F0EBE0",
              letterSpacing: "-0.025em",
            }}
          >
            Selected Work
          </motion.h2>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            color: "rgba(240,235,224,0.28)",
            letterSpacing: "0.1em",
            marginTop: "8px",
          }}
        >
          2022–2025
        </motion.span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-12 gap-3 md:gap-4">
        {PROJECTS.slice(0, 2).map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
        {PROJECTS.slice(2, 4).map((project, i) => (
          <ProjectCard
            key={project.id}
            project={{ ...project, large: !project.large }}
            index={i + 2}
          />
        ))}
      </div>

      {/* View all link */}
      <motion.div
        className="mt-10 flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.a
          href="#"
          whileHover={{ x: 4 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            letterSpacing: "0.08em",
            color: "rgba(240,235,224,0.38)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            transition: "color 0.3s ease",
            paddingBottom: "2px",
            borderBottom: "1px solid transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#C4A46B";
            e.currentTarget.style.borderBottomColor = "rgba(196,164,107,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(240,235,224,0.38)";
            e.currentTarget.style.borderBottomColor = "transparent";
          }}
        >
          <span>View all work</span>
          <span style={{ fontSize: "13px" }}>→</span>
        </motion.a>
      </motion.div>
    </section>
  );
}

