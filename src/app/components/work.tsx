import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

const FALLBACK_PROJECT = {
  name: "Aurelia",
  category: "Luxury Fashion House",
  result: "+43% increase in qualified inquiries",
  year: "2026",
  image: "/work/fashion.png",
  summary:
    "A positioning and digital system for an independent fashion house moving from seasonal awareness to private-client demand.",
  details: [
    "Editorial art direction",
    "Brand system refinement",
    "Campaign landing experience",
    "Private inquiry flow",
  ],
};

export function Work() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.3 });
  const [project, setProject] = useState(FALLBACK_PROJECT);

  useEffect(() => {
    async function getFeaturedProject() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8787";
        const response = await fetch(`${apiUrl}/api/projects`);
        if (response.ok) {
          const projects = await response.json();
          const featured = projects.find((p: any) => p.is_featured === 1) || projects[0];
          if (featured) {
            setProject(featured);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch remote projects, using fallback:", err);
      }
    }
    getFeaturedProject();
  }, []);

  const META = [
    { label: "Project", value: project.category },
    { label: "Outcome", value: project.result },
    { label: "Year", value: project.year },
  ];

  return (
    <section
      id="work"
      className="px-6 md:px-10 py-20 md:py-28"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Section header */}
      <div
        ref={headerRef}
        className="flex items-end justify-between mb-8 md:mb-10 pb-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "42px",
            fontWeight: 400,
            color: "#F0EBE0",
            letterSpacing: "0",
          }}
        >
          Featured Project
        </motion.h2>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.85, delay: 0.2 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            color: "rgba(240,235,224,0.25)",
            letterSpacing: "0",
          }}
        >
          01 / 01
        </motion.span>
      </div>

      <motion.article
        className="group grid grid-cols-1 lg:grid-cols-12"
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="lg:col-span-7 min-h-[420px] md:min-h-[600px] overflow-hidden"
          style={{
            borderRight: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <img
            src={project.image}
            alt={`${project.name} editorial fashion campaign`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between gap-16 p-6 md:p-10">
          <div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0",
                textTransform: "uppercase",
                color: "#C4A46B",
                display: "block",
                marginBottom: "22px",
              }}
            >
              {project.name}
            </span>
            <h3
              className="text-[40px] md:text-[64px]"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                color: "#F0EBE0",
                lineHeight: "1",
                letterSpacing: "0",
                marginBottom: "22px",
              }}
            >
              Luxury made commercially legible.
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(240,235,224,0.48)",
                lineHeight: "1.75",
                maxWidth: "420px",
              }}
            >
              {project.summary}
            </p>
          </div>

          <div>
            <div style={{ marginBottom: "30px" }}>
              {META.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-12 gap-4 py-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span
                    className="col-span-4"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      fontWeight: 400,
                      color: "rgba(240,235,224,0.28)",
                      letterSpacing: "0",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="col-span-8"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "rgba(240,235,224,0.58)",
                      letterSpacing: "0",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {project.details && project.details.map((detail) => (
                <span
                  key={detail}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "rgba(240,235,224,0.36)",
                    letterSpacing: "0",
                  }}
                >
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </section>
  );
}
