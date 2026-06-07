import { useRef } from "react";
import { motion, useInView } from "motion/react";

const MANIFESTO_LINES = [
  "Most companies mistake visibility for relevance.",
  "We help ambitious brands become impossible to confuse with anyone else.",
  "Design is not decoration.",
  "It is market positioning made visible.",
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      id="manifesto"
      className="px-6 md:px-10 py-20 md:py-28"
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div ref={ref} className="max-w-6xl">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.85 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0",
            textTransform: "uppercase",
            color: "#C4A46B",
            display: "block",
            marginBottom: "28px",
          }}
        >
          Manifesto
        </motion.span>

        <div>
          {MANIFESTO_LINES.map((line, i) => (
            <div key={line} style={{ overflow: "hidden" }}>
              <motion.p
                className="text-[30px] md:text-[44px] lg:text-[56px]"
                initial={{ y: "110%", opacity: 0 }}
                animate={
                  isInView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }
                }
                transition={{
                  duration: 0.9,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontWeight: 400,
                  fontStyle: i === 3 ? "italic" : "normal",
                  lineHeight: "1.14",
                  letterSpacing: "0",
                  color:
                    i === 1
                      ? "#F0EBE0"
                      : "rgba(240,235,224,0.58)",
                  marginBottom: i === MANIFESTO_LINES.length - 1 ? 0 : "4px",
                }}
              >
                {line}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
