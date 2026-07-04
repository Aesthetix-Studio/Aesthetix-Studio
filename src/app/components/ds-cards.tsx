import { ArrowRight, Star, Check, Zap, Shield, Users, TrendingUp, Globe, Award, Clock } from "lucide-react";
import { DSSection, DSSubSection, DSPreview } from "./ds-section";
import { cn } from "./ui/utils";

/* ─── Base Card ─────────────────────────────────────────────── */
interface AXCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function AXCard({ children, className, hover = false, padding = "md" }: AXCardProps) {
  const padMap = { none: "", sm: "p-6", md: "p-8", lg: "p-10" };
  return (
    <div className={cn(
      "bg-card rounded-lg border border-border shadow-sm",
      hover && "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
      padMap[padding],
      className
    )}>
      {children}
    </div>
  );
}

/* ─── Service Card ──────────────────────────────────────────── */
const services = [
  {
    icon: Globe,
    title: "Brand Identity",
    desc: "Complete visual systems — logo, typography, color, and guidelines built to last.",
    tags: ["Strategy", "Visual Design"],
    color: "bg-violet-50 text-violet-500",
  },
  {
    icon: Zap,
    title: "Web Design",
    desc: "Marketing sites and landing pages engineered for conversion and delight.",
    tags: ["UI/UX", "Development"],
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: TrendingUp,
    title: "Product Design",
    desc: "SaaS interfaces and dashboards built for clarity, speed, and scale.",
    tags: ["Product", "Systems"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Shield,
    title: "Motion & 3D",
    desc: "Cinematic animations and interactive experiences that stop the scroll.",
    tags: ["Animation", "3D"],
    color: "bg-success-muted text-success",
  },
];

export function AXServiceCard({ icon: Icon, title, desc, tags, color }: typeof services[0]) {
  return (
    <AXCard hover className="group">
      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-5", color)}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-title-sm font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-body-md leading-relaxed text-muted-foreground mb-5">{desc}</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {tags.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-xs bg-secondary text-caption font-medium text-muted-foreground">{t}</span>
          ))}
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-150" />
      </div>
    </AXCard>
  );
}

/* ─── Portfolio Card ────────────────────────────────────────── */
const portfolioItems = [
  { title: "Luminary Fintech", category: "Brand + Web", year: "2025", gradient: "from-violet-500 to-blue-500", tags: ["Fintech", "SaaS"] },
  { title: "Verdant Foods", category: "Brand Identity", year: "2025", gradient: "from-green-400 to-emerald-600", tags: ["F&B", "Packaging"] },
  { title: "Solari Energy", category: "Web Design", year: "2024", gradient: "from-amber-400 to-orange-500", tags: ["Energy", "B2B"] },
  { title: "Nexus Protocol", category: "Product Design", year: "2024", gradient: "from-slate-600 to-zinc-800", tags: ["Web3", "Dashboard"] },
];

export function AXPortfolioCard({ title, category, year, gradient, tags }: typeof portfolioItems[0]) {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className={cn("h-56 bg-gradient-to-br relative overflow-hidden", gradient)}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
          {tags.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-xs bg-white/20 backdrop-blur-sm text-white text-caption font-medium">{t}</span>
          ))}
        </div>
      </div>
      <div className="p-6 flex items-start justify-between">
        <div>
          <h3 className="text-body-lg font-semibold text-foreground">{title}</h3>
          <p className="text-body-sm text-muted-foreground">{category}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-body-sm text-muted-foreground">{year}</span>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-150" />
        </div>
      </div>
    </div>
  );
}

/* ─── Testimonial Card ──────────────────────────────────────── */
const testimonials = [
  {
    quote: "Aesthetix completely transformed our brand. The attention to detail and strategic thinking delivered results beyond our expectations.",
    name: "Sarah Chen",
    role: "CEO at Luminary",
    avatar: "SC",
    rating: 5,
    company: "Luminary Fintech",
  },
  {
    quote: "Our website conversion rate increased by 40% after the redesign. The team understood our audience better than we did.",
    name: "Marcus Webb",
    role: "Head of Marketing",
    avatar: "MW",
    rating: 5,
    company: "Solari Energy",
  },
];

export function AXTestimonialCard({ quote, name, role, avatar, rating, company }: typeof testimonials[0]) {
  return (
    <AXCard padding="lg" className="flex flex-col gap-5">
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-craft text-craft" />
        ))}
      </div>
      <p className="text-body-lg leading-relaxed text-foreground flex-1 italic">
        "{quote}"
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-border/40">
        <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-brand-foreground text-body-sm font-bold shrink-0">
          {avatar}
        </div>
        <div>
          <div className="text-body-sm font-semibold text-foreground">{name}</div>
          <div className="text-body-sm text-muted-foreground">{role} · {company}</div>
        </div>
      </div>
    </AXCard>
  );
}

/* ─── Pricing Card ──────────────────────────────────────────── */
const pricingPlans = [
  {
    name: "Starter",
    price: "₹25,000",
    period: "project",
    desc: "Perfect for early-stage startups needing a strong foundation.",
    features: ["Brand identity kit", "2 revisions", "3-week delivery", "Style guide (PDF)", "Logo files"],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "₹75,000",
    period: "project",
    desc: "Comprehensive brand + web for growing businesses ready to scale.",
    features: ["Full brand system", "Custom website (5 pages)", "Motion assets", "4 revisions", "6-week delivery", "Design handoff"],
    popular: true,
    cta: "Start Project",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "engagement",
    desc: "Dedicated team for complex multi-channel brand and product work.",
    features: ["End-to-end design system", "Product UI/UX", "Ongoing retainer available", "Priority delivery", "Dedicated PM", "Unlimited revisions"],
    popular: false,
    cta: "Contact Sales",
  },
];

export function AXPricingCard({ name, price, period, desc, features, popular, cta }: typeof pricingPlans[0]) {
  return (
    <div className={cn(
      "relative rounded-lg border p-8 flex flex-col gap-6 transition-all duration-200",
      popular
        ? "bg-foreground border-foreground text-background shadow-xl scale-[1.02]"
        : "bg-card border-border shadow-sm hover:shadow-md hover:-translate-y-0.5"
    )}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 rounded-xs bg-brand text-brand-foreground text-caption font-semibold">Most Popular</span>
        </div>
      )}
      <div>
        <h3 className={cn("text-title-sm font-semibold mb-2", popular ? "text-background" : "text-foreground")}>{name}</h3>
        <div className="flex items-baseline gap-1.5">
          <span className={cn("text-title-xl font-bold tracking-tight", popular ? "text-background" : "text-foreground")}>{price}</span>
          {price !== "Custom" && <span className={cn("text-body-sm", popular ? "text-background/60" : "text-muted-foreground")}>/ {period}</span>}
        </div>
        <p className={cn("mt-3 text-body-md leading-relaxed", popular ? "text-background/70" : "text-muted-foreground")}>{desc}</p>
      </div>
      <ul className="flex-1 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3">
            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", popular ? "bg-background/20" : "bg-success/10")}>
              <Check className={cn("w-3 h-3", popular ? "text-background" : "text-success")} strokeWidth={3} />
            </div>
            <span className={cn("text-body-md", popular ? "text-background/85" : "text-muted-foreground")}>{f}</span>
          </li>
        ))}
      </ul>
      <button
        className={cn(
          "w-full h-10 rounded-lg text-base font-medium transition-all duration-180 ease-standard",
          popular
            ? "bg-brand text-brand-foreground hover:bg-brand-hover shadow-brand"
            : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
        )}
      >
        {cta}
      </button>
    </div>
  );
}

/* ─── Blog Card ─────────────────────────────────────────────── */
const blogPosts = [
  {
    title: "The Case for Systematic Design: Why Ad Hoc Always Fails",
    excerpt: "Discover why systematic thinking produces better outcomes than one-off creative solutions, even when the brief seems simple.",
    category: "Design Systems",
    date: "Jun 14, 2026",
    readTime: "6 min read",
    gradient: "from-violet-400 to-purple-600",
    author: "Anna Reeves",
    authorInitials: "AR",
  },
  {
    title: "Motion Design Principles for Enterprise Software",
    excerpt: "How subtle animation cues improve usability in data-heavy interfaces without becoming a distraction.",
    category: "Motion Design",
    date: "May 28, 2026",
    readTime: "4 min read",
    gradient: "from-blue-400 to-cyan-500",
    author: "Kai Tanaka",
    authorInitials: "KT",
  },
  {
    title: "Choosing Type for Digital Products: A Systematic Approach",
    excerpt: "Variable fonts, optical sizing, and pairing logic for UI typography that scales from 11px to 72px without breaking.",
    category: "Typography",
    date: "May 10, 2026",
    readTime: "8 min read",
    gradient: "from-amber-400 to-orange-500",
    author: "Lena Morris",
    authorInitials: "LM",
  },
];

export function AXBlogCard({ title, excerpt, category, date, readTime, gradient, author, authorInitials }: typeof blogPosts[0]) {
  return (
    <div className="group cursor-pointer bg-card rounded-lg border border-border shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className={cn("h-48 bg-gradient-to-br", gradient)} />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-xs bg-brand-muted text-caption font-medium text-brand-muted-foreground">{category}</span>
        </div>
        <h3 className="text-body-lg font-semibold leading-snug text-foreground group-hover:text-brand transition-colors">{title}</h3>
        <p className="text-body-sm leading-relaxed text-muted-foreground">{excerpt}</p>
        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-caption font-semibold text-muted-foreground">{authorInitials}</div>
            <span className="text-body-sm text-muted-foreground">{author}</span>
          </div>
          <div className="flex items-center gap-2 text-caption text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Stat Card ─────────────────────────────────────────────── */
const stats = [
  { label: "Projects Delivered", value: "240+", change: "+12% this year", icon: Award, trend: "up" },
  { label: "Client Satisfaction", value: "98.2%", change: "Based on 180 reviews", icon: Star, trend: "up" },
  { label: "Average ROI", value: "3.4×", change: "6 months post-launch", icon: TrendingUp, trend: "up" },
  { label: "Team Members", value: "24", change: "Across 3 time zones", icon: Users, trend: "neutral" },
];

export function AXStatCard({ label, value, change, icon: Icon, trend }: typeof stats[0]) {
  return (
    <AXCard padding="md">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-brand-muted flex items-center justify-center">
          <Icon className="w-5 h-5 text-brand" />
        </div>
        {trend === "up" && (
          <span className="px-2 py-1 rounded-xs bg-success/10 text-caption font-medium text-success">↑</span>
        )}
      </div>
      <div className="text-title-xl font-bold tracking-tight text-foreground mb-1">{value}</div>
      <div className="text-body-md font-medium text-foreground">{label}</div>
      <div className="text-body-sm text-muted-foreground mt-1">{change}</div>
    </AXCard>
  );
}

export function DSCardsSection() {
  return (
    <DSSection
      id="cards"
      title="Cards"
      description="Six card variants covering services, portfolio, testimonials, pricing, editorial content, and metrics. All cards are hover-interactive and respect light/dark themes."
      badge="Components"
    >
      <DSSubSection title="Service Cards">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => <AXServiceCard key={s.title} {...s} />)}
        </div>
      </DSSubSection>

      <DSSubSection title="Portfolio Cards">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((p) => <AXPortfolioCard key={p.title} {...p} />)}
        </div>
      </DSSubSection>

      <DSSubSection title="Testimonial Cards">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
          {testimonials.map((t) => <AXTestimonialCard key={t.name} {...t} />)}
        </div>
      </DSSubSection>

      <DSSubSection title="Pricing Cards">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start max-w-4xl">
          {pricingPlans.map((p) => <AXPricingCard key={p.name} {...p} />)}
        </div>
      </DSSubSection>

      <DSSubSection title="Blog / Editorial Cards">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {blogPosts.map((b) => <AXBlogCard key={b.title} {...b} />)}
        </div>
      </DSSubSection>

      <DSSubSection title="Stat / Metric Cards">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => <AXStatCard key={s.label} {...s} />)}
        </div>
      </DSSubSection>
    </DSSection>
  );
}
