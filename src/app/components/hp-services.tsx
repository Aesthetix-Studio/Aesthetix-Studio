import { motion } from "motion/react";
import { Monitor, Code2, SearchCheck, Layers, ArrowRight } from "lucide-react";
import { cn } from "./ui/utils";

const services = [
  {
    icon: Monitor,
    title: "Website Design",
    headline: "Sites that convert browsers into buyers",
    desc: "We design high-converting websites that balance beauty with function. Every page is crafted with your audience's intent in mind — not just aesthetics.",
    deliverables: ["UX wireframes", "Visual design", "Responsive layouts", "Conversion optimization"],
    accent: "from-violet-500/10 to-brand/5",
    iconBg: "bg-brand-muted",
    iconColor: "text-brand",
  },
  {
    icon: Code2,
    title: "Web Development",
    headline: "Fast, clean code built to last",
    desc: "Modern stacks, accessible markup, and performance-first builds. Your site will load in under 2 seconds and score 95+ on Google PageSpeed.",
    deliverables: ["React / Next.js", "CMS integration", "Performance tuning", "Accessibility (WCAG AA)"],
    accent: "from-blue-500/10 to-cyan-500/5",
    iconBg: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: SearchCheck,
    title: "SEO",
    headline: "Get found by buyers who are ready",
    desc: "Strategic on-page SEO, technical audits, and content architecture that puts you in front of high-intent audiences — and keeps you there.",
    deliverables: ["Technical audit", "Keyword strategy", "On-page optimization", "Core Web Vitals"],
    accent: "from-emerald-500/10 to-green-500/5",
    iconBg: "bg-success-muted",
    iconColor: "text-success",
  },
  {
    icon: Layers,
    title: "Digital Design",
    headline: "Brand systems that scale with you",
    desc: "Logos, visual systems, motion assets, and brand guidelines that make every touchpoint — from pitch decks to social — instantly recognizable.",
    deliverables: ["Brand identity", "Design system", "Motion assets", "Brand guidelines"],
    accent: "from-amber-500/10 to-orange-400/5",
    iconBg: "bg-warning-muted",
    iconColor: "text-warning",
  },
];

function ServiceCard({ icon: Icon, title, headline, desc, deliverables, accent, iconBg, iconColor }: typeof services[0]) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
      className="group relative bg-card rounded-lg border border-border shadow-sm p-8 flex flex-col gap-5 hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      {/* Accent bg */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300", accent)} />

      <div className="relative">
        {/* Icon */}
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-5", iconBg)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>

        {/* Title */}
        <div className="text-muted-foreground mb-2" style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {title}
        </div>
        <h3 className="text-foreground mb-3" style={{ fontFamily: 'var(--font-family-display)', fontSize: '20px', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: '1.3' }}>
          {headline}
        </h3>
        <p className="text-muted-foreground mb-6" style={{ fontSize: '15px', lineHeight: '1.6' }}>
          {desc}
        </p>

        {/* Deliverables */}
        <ul className="space-y-2 mb-6">
          {deliverables.map((d) => (
            <li key={d} className="flex items-center gap-2.5 text-muted-foreground" style={{ fontSize: '14px' }}>
              <div className="w-1 h-1 rounded-full bg-muted-foreground/40 shrink-0" />
              {d}
            </li>
          ))}
        </ul>

        {/* Link */}
        <button className="flex items-center gap-2 text-brand group-hover:gap-3 transition-all duration-180" style={{ fontSize: '14px', fontWeight: 600 }}>
          Learn more
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export function HPServices() {
  return (
    <section className="bg-background py-24 sm:py-32 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-block px-3 py-1.5 rounded-xs border border-border bg-card text-muted-foreground mb-5" style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Services
          </div>
          <h2
            className="text-foreground mb-5"
            style={{ fontFamily: 'var(--font-family-display)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.15 }}
          >
            Everything you need to win online —
            <span className="text-muted-foreground"> nothing you don't.</span>
          </h2>
          <p className="text-muted-foreground" style={{ fontSize: '16px', lineHeight: '1.6' }}>
            We focus on four disciplines where design and strategy intersect.
            No fluff — just the work that moves the needle.
          </p>
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
