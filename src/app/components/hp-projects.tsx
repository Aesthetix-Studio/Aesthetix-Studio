import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "./ui/utils";
import { AXButton } from "./ds-buttons";

const projects = [
  {
    id: 1,
    slug: "physiocore",
    title: "PhysioCore",
    category: "Healthcare Web Design",
    description: "Modern physiotherapy platform designed to build trust and book appointments. Clean, professional landing page with calming aesthetics.",
    tags: ["Healthcare", "Landing Page"],
    image: "/projects/physiocore-hero.png",
    gradient: "from-teal-500 via-cyan-600 to-blue-700",
    span: "col-span-1 sm:col-span-2",
    height: "h-72 sm:h-80",
    year: "2025",
    result: "Live",
  },
  {
    id: 2,
    slug: "review-harvest",
    title: "Review Harvest",
    category: "SaaS Platform",
    description: "Intelligent review management platform for modern businesses. Automates review collection and smart feedback routing.",
    tags: ["SaaS", "Product"],
    image: "/projects/review-harvest-hero.png",
    gradient: "from-emerald-500 to-green-700",
    span: "col-span-1",
    height: "h-72 sm:h-80",
    year: "2025",
    result: "10k+ businesses",
  },
  {
    id: 3,
    slug: "aurelia",
    title: "Aurelia",
    category: "Creative Portfolio",
    description: "Awwwards-style portfolio that pushes the boundaries of web creativity with smooth animations and immersive experiences.",
    tags: ["Portfolio", "Creative"],
    image: "/projects/aurelia-hero.png",
    gradient: "from-fuchsia-500 via-purple-600 to-violet-700",
    span: "col-span-1",
    height: "h-64",
    year: "2025",
    result: "Awwwards Style",
  },
  {
    id: 4,
    slug: "luxe-tech",
    title: "LuxeTech",
    category: "E-Commerce Assets",
    description: "Premium ecommerce UI components, cart patterns, checkout flows, and design systems for modern commerce teams.",
    tags: ["E-Commerce", "Design System"],
    image: "/projects/luxe-tech-hero.png",
    gradient: "from-amber-600 via-yellow-700 to-amber-800",
    span: "col-span-1",
    height: "h-64",
    year: "2025",
    result: "Commerce Kit",
  },
  {
    id: 5,
    slug: "minimal",
    title: "Mono Studio",
    category: "Design Agency",
    description: "Minimal design agency site that strips everything down to essentials. Radical simplicity where whitespace does the talking.",
    tags: ["Branding", "Minimal"],
    image: "/screenshots/minimal-hero.png",
    gradient: "from-neutral-400 via-neutral-500 to-neutral-600",
    span: "col-span-1",
    height: "h-64",
    year: "2025",
    result: "+3× leads",
  },
  {
    id: 6,
    slug: "premium-saas",
    title: "ClimateBridge",
    category: "Sustainability SaaS",
    description: "Enterprise carbon tracking platform that turns complex emissions data into clear, actionable decisions.",
    tags: ["SaaS", "ESG"],
    image: "/screenshots/premium-saas-hero.png",
    gradient: "from-emerald-500 via-green-600 to-teal-700",
    span: "col-span-1",
    height: "h-64",
    year: "2025",
    result: "-32% emissions",
  },
];

function ProjectCard({ slug, title, category, description, tags, image, gradient, span, height, year, result }: typeof projects[0]) {
  return (
    <Link to={`/portfolio/${slug}`} className="no-underline">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={cn("group relative rounded-2xl overflow-hidden border border-border cursor-pointer", span)}
      >
        {/* Image/gradient area */}
        <div className={cn("relative overflow-hidden", height)}>
          {image && (
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          )}
          <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} style={{ zIndex: -1 }} />
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
