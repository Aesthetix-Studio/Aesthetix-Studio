import { Link } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";

const plans = [
  {
    name: "Starter",
    price: "₹25,000",
    desc: "A focused brand and website for early-stage founders.",
    highlights: ["Brand identity kit", "5-page website", "2 revision rounds", "3-week delivery"],
    cta: "Get started",
    pop: false,
  },
  {
    name: "Growth",
    price: "₹75,000",
    desc: "Complete brand system and website for teams ready to scale.",
    highlights: ["Full brand system", "8-page custom website", "SEO + analytics setup", "Motion assets", "6-week delivery"],
    cta: "Start your project",
    pop: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Dedicated team for complex, multi-channel engagements.",
    highlights: ["Design system", "Product UI/UX", "Ongoing retainer", "Priority delivery"],
    cta: "Contact us",
    pop: false,
  },
];

export function HPPricingPreview() {
  return (
    <section className="bg-secondary/20 py-20 sm:py-28 border-b border-border/60">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-full border border-border bg-background text-muted-foreground mb-4" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Pricing
            </div>
            <h2 className="text-foreground" style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2 }}>
              Simple, fixed-price packages.<br />
              <span className="text-muted-foreground" style={{ fontWeight: 600 }}>No hourly billing. Ever.</span>
            </h2>
          </div>
          <Link to="/pricing" className="inline-flex items-center gap-2 text-brand no-underline hover:underline shrink-0" style={{ fontSize: "13px", fontWeight: 600 }}>
            See full pricing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className={`relative rounded-2xl border overflow-hidden flex flex-col ${p.pop ? "border-brand shadow-[var(--shadow-brand)] scale-[1.02]" : "border-border bg-card hover:shadow-sm transition-shadow"}`}
              style={{ background: p.pop ? "var(--foreground)" : "var(--card)" }}
            >
              {p.pop && (
                <div className="text-center py-1.5 text-white" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em", background: "var(--brand)" }}>
                  MOST POPULAR
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: p.pop ? "var(--background)" : "var(--foreground)", marginBottom: "4px" }}>{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.03em", color: p.pop ? "var(--background)" : "var(--foreground)" }}>{p.price}</span>
                  {p.price !== "Custom" && <span style={{ fontSize: "13px", color: p.pop ? "rgba(250,250,249,0.55)" : "var(--muted-foreground)" }}>/project</span>}
                </div>
                <p style={{ fontSize: "13px", lineHeight: "1.55", color: p.pop ? "rgba(250,250,249,0.65)" : "var(--muted-foreground)", marginBottom: "18px" }}>{p.desc}</p>
                <ul className="space-y-2 mb-5 flex-1">
                  {p.highlights.map(h => (
                    <li key={h} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${p.pop ? "bg-white/15" : "bg-success-muted"}`}>
                        <Check className={`w-2.5 h-2.5 ${p.pop ? "text-white" : "text-success"}`} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: "12px", color: p.pop ? "rgba(250,250,249,0.75)" : "var(--muted-foreground)" }}>{h}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/pricing"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl no-underline transition-all"
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    background: p.pop ? "var(--brand)" : "var(--secondary)",
                    color: p.pop ? "#fff" : "var(--foreground)",
                    border: p.pop ? "none" : "1px solid var(--border)",
                  }}
                >
                  {p.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
