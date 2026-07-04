import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { Link } from "react-router";
import { cn } from "./ui/utils";
import { AXButton } from "./ds-buttons";
import { heroStats } from "../../content";

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

export function HPHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <div>
            {/* Label chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs border border-border bg-card mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-craft text-craft" />
                  ))}
                </div>
                <span className="text-muted-foreground text-caption font-medium">
                  Trusted by 80+ founders & growing teams
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
              className="text-foreground mb-6"
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(36px, 5.5vw, 62px)',
                fontWeight: 400,
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
              transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="text-muted-foreground mb-10 max-w-lg"
              style={{ fontSize: '18px', lineHeight: '1.6', fontWeight: 400 }}
            >
              We design and build conversion-focused websites, brand systems,
              and digital products for founders and teams ready to compete
              at the highest level.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12"
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
              className="flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              {heroStats.map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-2">
                  {i > 0 && <div className="w-px h-5 bg-border hidden sm:block" />}
                  <span className="text-foreground" style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                    {value}
                  </span>
                  <span className="text-muted-foreground text-body-sm">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Project previews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {projectPreviews.map((project, i) => (
              <Link
                key={project.title}
                to="/portfolio"
                className={cn(
                  "group relative overflow-hidden rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5",
                  project.size === "large" ? "row-span-2 h-64" : "h-30"
                )}
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br", project.gradient)} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-medium text-body-sm">{project.title}</div>
                  <div className="text-white/70 text-caption">{project.category}</div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
