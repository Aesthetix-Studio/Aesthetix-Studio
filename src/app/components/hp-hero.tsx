import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { Link } from "react-router";
import { cn } from "./ui/utils";
import { AXButton } from "./ds-buttons";

const projectPreviews = [
  {
    title: "Luminary",
    category: "Brand + Web",
    gradient: "from-violet-500 via-purple-600 to-blue-600",
    size: "large",
  },
  {
    title: "Verdant",
    category: "Brand Identity",
    gradient: "from-emerald-400 to-green-600",
    size: "small",
  },
  {
    title: "Solari",
    category: "Web Design",
    gradient: "from-amber-300 via-orange-400 to-rose-500",
    size: "small",
  },
  {
    title: "Nexus",
    category: "Product Design",
    gradient: "from-slate-600 to-zinc-900",
    size: "large",
  },
];

const trustStats = [
  { value: "80+", label: "brands launched" },
  { value: "98%", label: "client satisfaction" },
  { value: "4.2×", label: "average ROI" },
  { value: "6 yrs", label: "in the craft" },
];

export function HPHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <div>
            {/* Label chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-muted-foreground" style={{ fontSize: '12px', fontWeight: 500 }}>
                  Trusted by 80+ founders & growing teams
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-foreground mb-5"
              style={{
                fontSize: 'clamp(36px, 5.5vw, 62px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
              }}
            >
              Your website should be your best{' '}
              <span style={{ color: 'var(--brand)' }}>salesperson.</span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-muted-foreground mb-8 max-w-lg"
              style={{ fontSize: '17px', lineHeight: '1.65', fontWeight: 400 }}
            >
              We design and build conversion-focused websites, brand systems,
              and digital products for founders and teams ready to compete
              at the highest level.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10"
            >
              <Link to="/discovery-call" className="w-full sm:w-auto">
                <AXButton
                  variant="brand"
                  size="lg"
                  iconRight={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Book Discovery Call
                </AXButton>
              </Link>
              <Link to="/portfolio" className="w-full sm:w-auto">
                <AXButton
                  variant="ghost"
                  size="lg"
                  iconRight={<ArrowUpRight className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  See our work
                </AXButton>
              </Link>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              {trustStats.map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-2">
                  {i > 0 && <div className="w-px h-4 bg-border hidden sm:block" />}
                  <span className="text-foreground" style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                    {value}
                  </span>
                  <span className="text-muted-foreground" style={{ fontSize: '13px' }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Project previews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-3"
          >
            {projectPreviews.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                className={cn(
                  "group relative rounded-2xl overflow-hidden cursor-pointer",
                  "border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                  p.size === "large" ? "h-52" : "h-44"
                )}
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br", p.gradient)} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white" style={{ fontSize: '13px', fontWeight: 700 }}>{p.title}</div>
                      <div className="text-white/65" style={{ fontSize: '11px' }}>{p.category}</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ArrowUpRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border/60" />
    </section>
  );
}
