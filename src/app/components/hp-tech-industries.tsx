import { motion } from "motion/react";
import { Layers, CreditCard, HeartPulse, ShoppingBag, Building2, GraduationCap, Rocket, Briefcase, Sparkles, Leaf } from "lucide-react";

const techStack = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Figma", category: "Design" },
  { name: "Node.js", category: "Backend" },
  { name: "Framer", category: "Prototyping" },
  { name: "Webflow", category: "CMS" },
  { name: "Sanity", category: "CMS" },
  { name: "Vercel", category: "Hosting" },
  { name: "Cloudflare", category: "Edge" },
  { name: "Three.js", category: "3D" },
];

const industries = [
  { name: "SaaS & Software", Icon: Layers },
  { name: "Fintech", Icon: CreditCard },
  { name: "Healthcare", Icon: HeartPulse },
  { name: "E-commerce", Icon: ShoppingBag },
  { name: "Real Estate", Icon: Building2 },
  { name: "Education", Icon: GraduationCap },
  { name: "Startups", Icon: Rocket },
  { name: "Professional Services", Icon: Briefcase },
  { name: "Consumer Brands", Icon: Sparkles },
  { name: "Non-Profits", Icon: Leaf },
];

export function HPTechIndustries() {
  return (
    <section className="bg-secondary/20 py-20 sm:py-24 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-muted-foreground mb-3" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Tech Stack
            </p>
            <h2 className="text-foreground mb-3" style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Built with the best tools.
            </h2>
            <p className="text-muted-foreground mb-7" style={{ fontSize: "14px", lineHeight: "1.65" }}>
              We use modern, battle-tested tools that developers love and businesses can scale with.
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map(({ name, category }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                  className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-xl hover:border-brand/30 hover:bg-brand-muted transition-all duration-150 cursor-default group"
                >
                  <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>{name}</span>
                  <span className="text-muted-foreground/50 group-hover:text-brand-muted-foreground transition-colors" style={{ fontSize: "10px" }}>{category}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Industries */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <p className="text-muted-foreground mb-3" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Industries
            </p>
            <h2 className="text-foreground mb-3" style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              We understand your market.
            </h2>
            <p className="text-muted-foreground mb-7" style={{ fontSize: "14px", lineHeight: "1.65" }}>
              Deep experience across industries means we ask the right questions and skip the learning curve.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {industries.map(({ name, Icon }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="flex items-center gap-2.5 px-3 py-2.5 bg-card border border-border rounded-xl hover:shadow-sm transition-shadow cursor-default"
                >
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>{name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
