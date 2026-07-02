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
  const padMap = { none: "", sm: "p-4", md: "p-5", lg: "p-6" };
  return (
    <div className={cn(
      "bg-card rounded-xl border border-border",
      hover && "transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer",
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
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-foreground mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>{title}</h3>
      <p className="text-muted-foreground mb-4" style={{ fontSize: '13px', lineHeight: '1.6' }}>{desc}</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground" style={{ fontSize: '11px', fontWeight: 500 }}>{t}</span>
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
    <div className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={cn("h-48 bg-gradient-to-br relative overflow-hidden", gradient)}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          {tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white" style={{ fontSize: '11px', fontWeight: 500 }}>{t}</span>
          ))}
        </div>
      </div>
      <div className="p-4 flex items-start justify-between">
        <div>
          <h3 className="text-foreground" style={{ fontSize: '14px', fontWeight: 600 }}>{title}</h3>
          <p className="text-muted-foreground" style={{ fontSize: '12px' }}>{category}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground" style={{ fontSize: '12px' }}>{year}</span>
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
    <AXCard padding="lg" className="flex flex-col gap-4">
      <div className="flex gap-0.5">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-foreground flex-1" style={{ fontSize: '14px', lineHeight: '1.7', fontStyle: 'italic' }}>
        "{quote}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-border/40">
        <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-white shrink-0" style={{ fontSize: '12px', fontWeight: 700 }}>
          {avatar}
        </div>
        <div>
          <div className="text-foreground" style={{ fontSize: '13px', fontWeight: 600 }}>{name}</div>
          <div className="text-muted-foreground" style={{ fontSize: '12px' }}>{role} · {company}</div>
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
      "relative rounded-2xl border p-6 flex flex-col gap-5 transition-all duration-200",
      popular
        ? "bg-foreground border-foreground text-background shadow-2xl scale-[1.02]"
        : "bg-card border-border hover:shadow-md hover:-translate-y-0.5"
    )}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 rounded-full bg-brand text-white text-[11px]" style={{ fontWeight: 600 }}>Most Popular</span>
        </div>
      )}
      <div>
        <h3 className={cn("mb-1", popular ? "text-background" : "text-foreground")} style={{ fontSize: '15px', fontWeight: 600 }}>{name}</h3>
        <div className="flex items-baseline gap-1.5">
          <span className={cn("text-3xl", popular ? "text-background" : "text-foreground")} style={{ fontWeight: 700, letterSpacing: '-0.03em' }}>{price}</span>
          {price !== "Custom" && <span className={cn("text-sm", popular ? "text-background/60" : "text-muted-foreground")}>/ {period}</span>}
        </div>
        <p className={cn("mt-2 text-sm", popular ? "text-background/70" : "text-muted-foreground")} style={{ fontSize: '13px', lineHeight: '1.5' }}>{desc}</p>
      </div>
      <ul className="flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5">
            <div className={cn("w-4 h-4 rounded-full flex items-center justify-center shrink-0", popular ? "bg-background/20" : "bg-success-muted")}>
              <Check className={cn("w-2.5 h-2.5", popular ? "text-background" : "text-success")} strokeWidth={3} />
            </div>
            <span className={cn(popular ? "text-background/85" : "text-muted-foreground")} style={{ fontSize: '13px' }}>{f}</span>
          </li>
        ))}
      </ul>
      <button
        className={cn(
          "w-full h-9 rounded-xl transition-all duration-150",
          popular
            ? "bg-brand text-white hover:bg-brand-hover"
            : "bg-secondary text-foreground hover:bg-secondary/70 border border-border"
        )}
        style={{ fontSize: '13px', fontWeight: 500 }}
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
    <div className="group cursor-pointer bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className={cn("h-40 bg-gradient-to-br", gradient)} />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-brand-muted text-brand-muted-foreground" style={{ fontSize: '11px', fontWeight: 500 }}>{category}</span>
        </div>
        <h3 className="text-foreground group-hover:text-brand transition-colors" style={{ fontSize: '14px', fontWeight: 600, lineHeight: '1.4' }}>{title}</h3>
        <p className="text-muted-foreground" style={{ fontSize: '12px', lineHeight: '1.6' }}>{excerpt}</p>
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" style={{ fontSize: '10px', fontWeight: 600 }}>{authorInitials}</div>
            <span className="text-muted-foreground" style={{ fontSize: '12px' }}>{author}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: '11px' }}>
            <Clock className="w-3 h-3" />
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
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-lg bg-brand-muted flex items-center justify-center">
          <Icon className="w-4 h-4 text-brand" />
        </div>
        {trend === "up" && (
          <span className="px-2 py-0.5 rounded-full bg-success-muted text-success-muted-foreground" style={{ fontSize: '11px', fontWeight: 500 }}>↑</span>
        )}
      </div>
      <div className="text-foreground mb-0.5" style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.03em' }}>{value}</div>
      <div className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>{label}</div>
      <div className="text-muted-foreground mt-1" style={{ fontSize: '12px' }}>{change}</div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => <AXServiceCard key={s.title} {...s} />)}
        </div>
      </DSSubSection>

      <DSSubSection title="Portfolio Cards">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolioItems.map((p) => <AXPortfolioCard key={p.title} {...p} />)}
        </div>
      </DSSubSection>

      <DSSubSection title="Testimonial Cards">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {testimonials.map((t) => <AXTestimonialCard key={t.name} {...t} />)}
        </div>
      </DSSubSection>

      <DSSubSection title="Pricing Cards">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 items-start max-w-4xl">
          {pricingPlans.map((p) => <AXPricingCard key={p.name} {...p} />)}
        </div>
      </DSSubSection>

      <DSSubSection title="Blog / Editorial Cards">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {blogPosts.map((b) => <AXBlogCard key={b.title} {...b} />)}
        </div>
      </DSSubSection>

      <DSSubSection title="Stat / Metric Cards">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => <AXStatCard key={s.label} {...s} />)}
        </div>
      </DSSubSection>
    </DSSection>
  );
}
