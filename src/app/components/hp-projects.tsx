import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "./ui/utils";
import { AXButton } from "./ds-buttons";

const projects = [
  {
    id: 1,
    slug: "luminary",
    title: "Luminary Financial",
    category: "Brand Identity + Web Design",
    description: "Full brand overhaul and conversion-optimized website for a Series A fintech startup. 3× increase in qualified inbound leads within 60 days of launch.",
    tags: ["Fintech", "SaaS", "Conversion"],
    gradient: "from-violet-600 via-purple-700 to-blue-700",
    span: "col-span-1 sm:col-span-2",
    height: "h-72 sm:h-80",
    year: "2025",
    result: "+3× leads",
  },
  {
    id: 2,
    slug: "verdant",
    title: "Verdant Foods Co.",
    category: "Brand Identity",
    description: "Premium CPG brand identity for a sustainable food startup entering national retail.",
    tags: ["F&B", "Packaging"],
    gradient: "from-emerald-500 to-green-700",
    span: "col-span-1",
    height: "h-72 sm:h-80",
    year: "2025",
    result: "Retail-ready",
  },
  {
    id: 3,
    slug: "solari",
    title: "Solari Energy",
    category: "Web Design + SEO",
    description: "New website and SEO strategy for a B2B renewable energy consultancy.",
    tags: ["Energy", "B2B", "SEO"],
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    span: "col-span-1",
    height: "h-64",
    year: "2025",
    result: "+148% organic",
  },
  {
    id: 4,
    slug: "nexus",
    title: "Nexus Protocol",
    category: "Product Design",
    description: "Complex analytics dashboard for a crypto data platform — designed for power users.",
    tags: ["Web3", "Dashboard"],
    gradient: "from-slate-700 via-zinc-800 to-neutral-900",
    span: "col-span-1",
    height: "h-64",
    year: "2024",
    result: "10k+ users",
  },
  {
    id: 5,
    slug: "helix",
    title: "Helix Medical",
    category: "Brand + Web + SEO",
    description: "End-to-end digital presence for a boutique telehealth startup — from logo to 5-page site.",
    tags: ["Health", "Startup"],
    gradient: "from-pink-500 via-rose-500 to-purple-600",
    span: "col-span-1",
    height: "h-64",
    year: "2024",
    result: "Sold in 18mo",
  },
  {
    id: 6,
    slug: "orbit",
    title: "Orbit Analytics",
    category: "Web Development",
    description: "Custom dashboard and data visualization built in React with real-time chart components.",
    tags: ["Analytics", "SaaS"],
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    span: "col-span-1",
    height: "h-64",
    year: "2024",
    result: "98 Perf score",
  },
];

function ProjectCard({ slug, title, category, description, tags, gradient, span, height, year, result }: typeof projects[0]) {
  return (
    <Link to={`/portfolio/${slug}`} className="no-underline">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={cn("group relative rounded-2xl overflow-hidden border border-border cursor-pointer", span)}
      >
        {/* Image/gradient area */}
        <div className={cn("relative bg-gradient-to-br overflow-hidden", gradient, height)}>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Result badge */}
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-black/30 backdrop-blur-sm">
            <span className="text-white" style={{ fontSize: '11px', fontWeight: 600 }}>{result}</span>
          </div>

          {/* Tags */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white" style={{ fontSize: '10px', fontWeight: 500 }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Hover CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5 bg-card border-t border-border/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-foreground group-hover:text-brand transition-colors" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '-0.01em' }}>
                {title}
              </h3>
              <p className="text-muted-foreground mt-0.5" style={{ fontSize: '12px' }}>{category} · {year}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-brand transition-colors shrink-0 mt-0.5" />
          </div>
          <p className="text-muted-foreground mt-2 line-clamp-2" style={{ fontSize: '13px', lineHeight: '1.55' }}>
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export function HPProjects() {
  return (
    <section className="bg-secondary/30 py-20 sm:py-28 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div className="max-w-xl">
            <div className="inline-block px-3 py-1 rounded-full border border-border bg-background text-muted-foreground mb-4" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Selected Work
            </div>
            <h2
              className="text-foreground"
              style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.2 }}
            >
              Brands we've helped
              <br />
              <span className="text-muted-foreground">become impossible to ignore.</span>
            </h2>
          </div>
          <Link to="/portfolio">
            <AXButton variant="outline" size="sm" iconRight={<ArrowRight className="w-4 h-4" />}>
              View all projects
            </AXButton>
          </Link>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
