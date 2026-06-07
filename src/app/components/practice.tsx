import { useRef } from "react";
import { motion, useInView } from "motion/react";

const DISCIPLINES = [
  {
    name: "Strategy",
    detail: "Positioning, market thesis, narrative direction.",
  },
  {
    name: "Brand Systems",
    detail: "Identity, typography, visual language, governance.",
  },
  {
    name: "Product Design",
    detail: "Interfaces, journeys, conversion-critical flows.",
  },
  {
    name: "Motion",
    detail: "Transitions, interaction behavior, launch assets.",
  },
  {
    name: "Engineering",
    detail: "Front-end systems, performance, production delivery.",
  },
];

export function Practice() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="practice"
      className="px-6 md:px-10 py-20 md:py-28"
      style={{
        backgroundColor: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <motion.div
          className="md:col-span-4"
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
            The Practice
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "42px",
              fontWeight: 400,
              color: "#F0EBE0",
              letterSpacing: "0",
              lineHeight: "1.18",
            }}
          >
            What makes the work believable.
          </h2>
        </motion.div>

        <div className="md:col-span-8">
          {DISCIPLINES.map((discipline, i) => (
            <motion.div
              key={discipline.name}
              className="grid grid-cols-12 gap-4 py-7"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{
                duration: 0.85,
                delay: 0.08 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                borderTop:
                  i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span
                className="col-span-2"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  fontStyle: "italic",
                  letterSpacing: "0",
                  color: "rgba(240,235,224,0.18)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="col-span-10 md:col-span-5"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "32px",
                  fontWeight: 400,
                  color: "#F0EBE0",
                  letterSpacing: "0",
                  lineHeight: "1.1",
                }}
              >
                {discipline.name}
              </h3>
              <p
                className="col-span-10 col-start-3 md:col-span-5 md:col-start-auto"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  lineHeight: "1.7",
                  color: "rgba(240,235,224,0.42)",
                  marginTop: "4px",
                }}
              >
                {discipline.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
