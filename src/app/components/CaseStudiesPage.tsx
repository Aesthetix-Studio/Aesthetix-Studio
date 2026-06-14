import { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
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

const CARD_CONFIGS = [
  { bg: "linear-gradient(145deg, #0E0C1A 0%, #181428 50%, #0A0814 100%)", accent: "rgba(120,100,200,0.1)" },
  { bg: "linear-gradient(145deg, #100A08 0%, #1C1410 100%)", accent: "rgba(196,164,107,0.08)" },
  { bg: "linear-gradient(145deg, #080C08 0%, #0C1810 100%)", accent: "rgba(100,150,120,0.08)" },
  { bg: "linear-gradient(145deg, #0A0810 0%, #14081A 100%)", accent: "rgba(180,130,190,0.08)" },
];

/* ─── Case Study Card ─── */

function CaseStudyCard({
  study,
  index,
  large,
}: {
  study: CaseStudy;
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
            {new Date(study.created_at).getFullYear()}
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
        {/* Client name */}
        <motion.h3
          animate={{ color: hovered ? "#F0EBE0" : "rgba(240,235,224,0.92)" }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(28px, 3.2vw, 44px)",
            fontWeight: 400,
            lineHeight: "1.05",
            letterSpacing: "-0.025em",
            marginBottom: "12px",
          }}
        >
          {study.client}
        </motion.h3>

        {/* Brief */}
        {study.brief && (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 400,
              color: "rgba(240,235,224,0.42)",
              lineHeight: 1.6,
              marginBottom: "0px",
              letterSpacing: "0.01em",
            }}
          >
            {study.brief}
          </p>
        )}

        {/* Hover reveal — result + approach */}
        <motion.div
          animate={{
            height: hovered ? "auto" : 0,
            opacity: hovered ? 1 : 0,
            marginTop: hovered ? "20px" : "0px",
          }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          style={{ overflow: "hidden" }}
        >
          {study.result && (
            <div style={{ marginBottom: "16px" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#C4A46B",
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
              Read Case Study
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

  // Compute large flag — alternate large/small
  const getLarge = (i: number): boolean => i % 2 === 0;

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

      {/* Case studies grid — full width matching work.tsx layout */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        {loading ? (
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {[0, 1, 2].map((i) => (
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
        ) : displayStudies.length === 0 ? (
          <div className="text-center py-20">
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
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {displayStudies.map((study, i) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                index={i}
                large={getLarge(i)}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
