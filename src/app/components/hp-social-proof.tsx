import { motion } from "motion/react";
import { Star } from "lucide-react";
import { cn } from "./ui/utils";

const stats = [
  { value: "80+", label: "Brands Launched", sub: "Across 12 industries" },
  { value: "42%", label: "Avg. Conversion Lift", sub: "Within first 90 days" },
  { value: "4.2×", label: "Average ROI", sub: "Within 6 months of launch" },
  { value: "₹50L+", label: "Revenue Generated", sub: "For clients since 2019" },
];

const testimonials = [
  {
    quote: "Aesthetix completely transformed how our company presents itself online. Three weeks after launch, we closed a ₹15L deal where the client specifically mentioned our website as the reason they reached out.",
    name: "Sarah Chen",
    role: "CEO",
    company: "Luminary Financial",
    initials: "SC",
    avatarColor: "bg-violet-500",
    stars: 5,
  },
  {
    quote: "I've worked with five agencies over my career. Aesthetix is the first one that challenged our thinking before they started designing. The strategy session alone was worth the engagement.",
    name: "Marcus Webb",
    role: "Founder",
    company: "Solari Energy",
    initials: "MW",
    avatarColor: "bg-amber-500",
    stars: 5,
  },
  {
    quote: "Our organic traffic went up 148% in four months. More importantly, the leads actually convert — because the site speaks to the right audience from the first line of copy.",
    name: "Priya Nair",
    role: "Head of Marketing",
    company: "Helix Medical",
    initials: "PN",
    avatarColor: "bg-rose-500",
    stars: 5,
  },
];

const logoNames = ["Luminary", "Verdant", "Solari", "Nexus", "Helix", "Orbit", "Capsule", "Meridian"];

function TestimonialCard({ quote, name, role, company, initials, avatarColor, stars }: typeof testimonials[0]) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-5 hover:shadow-md transition-shadow duration-200">
      {/* Stars */}
      <div className="flex gap-0.5">
        {[...Array(stars)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-foreground flex-1" style={{ fontSize: '14px', lineHeight: '1.75', fontStyle: 'italic' }}>
        "{quote}"
      </p>

      {/* Attribution */}
      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0", avatarColor)} style={{ fontSize: '11px', fontWeight: 700 }}>
          {initials}
        </div>
        <div>
          <div className="text-foreground" style={{ fontSize: '13px', fontWeight: 600 }}>{name}</div>
          <div className="text-muted-foreground" style={{ fontSize: '12px' }}>{role} · {company}</div>
        </div>
      </div>
    </div>
  );
}

export function HPSocialProof() {
  return (
    <>
      {/* Stats bar */}
      <section className="bg-foreground py-14 border-b border-border/20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="text-center"
              >
                <div className="text-background mb-1" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
                  {value}
                </div>
                <div className="text-background" style={{ fontSize: '14px', fontWeight: 600, opacity: 0.85 }}>
                  {label}
                </div>
                <div className="text-background" style={{ fontSize: '12px', opacity: 0.45, marginTop: '2px' }}>
                  {sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client logos strip */}
      <section className="bg-secondary/40 py-8 border-b border-border/60">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-center text-muted-foreground mb-6" style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Trusted by growing teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {logoNames.map((name) => (
              <span key={name} className="text-muted-foreground/50 hover:text-muted-foreground transition-colors" style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em' }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background py-20 sm:py-28 border-b border-border/60">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {/* Header */}
          <div className="max-w-xl mb-12">
            <div className="inline-block px-3 py-1 rounded-full border border-border bg-card text-muted-foreground mb-4" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Testimonials
            </div>
            <h2
              className="text-foreground"
              style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.2 }}
            >
              Don't take our word for it.
              <br />
              <span className="text-muted-foreground">Take theirs.</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <TestimonialCard {...t} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
