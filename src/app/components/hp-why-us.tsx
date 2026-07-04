import { motion } from "motion/react";
import { reasons, comparisonRows } from "../../content";

export function HPWhyUs() {
  return (
    <section className="bg-background py-20 sm:py-28 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-block px-3 py-1 rounded-full border border-border bg-card text-muted-foreground mb-4" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>
            Why Aesthetix
          </div>
          <h2 className="text-foreground mb-4" style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2 }}>
            What makes us different —<br />
            <span className="text-muted-foreground" style={{ fontWeight: 600 }}>and why it matters.</span>
          </h2>
          <p className="text-muted-foreground" style={{ fontSize: "16px", lineHeight: "1.65" }}>
            Most agencies look similar on paper. Here's what the work actually looks like when you hire us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          {/* Reasons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-muted flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-brand" />
                </div>
                <h3 className="text-foreground mb-2" style={{ fontSize: "14px", fontWeight: 700 }}>{title}</h3>
                <p className="text-muted-foreground" style={{ fontSize: "13px", lineHeight: "1.65" }}>{description}</p>
              </motion.div>
            ))}
          </div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-2xl overflow-hidden lg:sticky lg:top-8"
          >
            <div className="px-5 py-4 border-b border-border bg-secondary/50">
              <p className="text-muted-foreground" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                Aesthetix vs. Typical Agency
              </p>
            </div>
            <div className="divide-y divide-border">
              <div className="grid grid-cols-3 px-5 py-2.5 bg-secondary/30">
                <span className="text-muted-foreground" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}></span>
                <span className="text-center text-brand" style={{ fontSize: "11px", fontWeight: 700 }}>Us</span>
                <span className="text-center text-muted-foreground" style={{ fontSize: "11px", fontWeight: 600 }}>Typical</span>
              </div>
              {comparisonRows.map(({ label, us, typical }) => (
                <div key={label} className="grid grid-cols-3 px-5 py-3 items-center">
                  <span className="text-foreground" style={{ fontSize: "13px" }}>{label}</span>
                  <div className="flex justify-center">
                    {us ? (
                      <span className="w-5 h-5 rounded-full bg-success-muted flex items-center justify-center">
                        <span className="text-success" style={{ fontSize: "10px", fontWeight: 800 }}>✓</span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground/40" style={{ fontSize: "16px" }}>–</span>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {typical === true ? (
                      <span className="w-5 h-5 rounded-full bg-success-muted flex items-center justify-center">
                        <span className="text-success" style={{ fontSize: "10px", fontWeight: 800 }}>✓</span>
                      </span>
                    ) : typeof typical === "string" ? (
                      <span className="text-warning" style={{ fontSize: "11px", fontWeight: 500 }}>{typical}</span>
                    ) : (
                      <span className="text-muted-foreground/40" style={{ fontSize: "16px" }}>–</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
