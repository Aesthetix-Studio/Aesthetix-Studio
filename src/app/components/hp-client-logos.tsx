import { motion } from "motion/react";

const clients = [
  { name: "PhysioCore", industry: "Healthcare", color: "text-teal-500" },
  { name: "Aurelia", industry: "Creative", color: "text-fuchsia-500" },
  { name: "Review Harvest", industry: "SaaS", color: "text-emerald-500" },
  { name: "LuxeTech", industry: "E-Commerce", color: "text-amber-500" },
  { name: "ClimateBridge", industry: "Sustainability", color: "text-green-500" },
  { name: "Mono Studio", industry: "Agency", color: "text-neutral-500" },
  { name: "Nexus", industry: "Technology", color: "text-blue-500" },
  { name: "Helix Medical", industry: "Healthcare", color: "text-rose-500" },
  { name: "Solari Energy", industry: "Energy", color: "text-orange-500" },
  { name: "Verdant", industry: "Agriculture", color: "text-lime-500" },
  { name: "Orbit", industry: "Technology", color: "text-indigo-500" },
  { name: "Meridian", industry: "Finance", color: "text-cyan-500" },
];

function LogoCard({ name, industry, color }: typeof clients[0]) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-card/50 hover:bg-card hover:shadow-sm transition-all duration-200 shrink-0">
      <div className={`w-8 h-8 rounded-lg bg-secondary flex items-center justify-center ${color}`}>
        <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '-0.02em' }}>
          {name.charAt(0)}
        </span>
      </div>
      <div>
        <div className="text-foreground whitespace-nowrap" style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '-0.01em' }}>
          {name}
        </div>
        <div className="text-muted-foreground whitespace-nowrap" style={{ fontSize: '11px' }}>
          {industry}
        </div>
      </div>
    </div>
  );
}

export function HPClientLogos() {
  return (
    <section className="bg-secondary/30 py-14 border-b border-border/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
          className="text-center mb-10"
        >
          <p className="text-muted-foreground" style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Trusted by 80+ growing businesses across 12 industries
          </p>
        </motion.div>

        {/* Logo row - scrollable on mobile, grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-6 gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <LogoCard {...client} />
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-border/60"
        >
          {[
            { value: "80+", label: "Brands Launched" },
            { value: "42%", label: "Avg. Conversion Lift" },
            { value: "4.2×", label: "Average ROI" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              {i > 0 && <div className="w-px h-5 bg-border hidden sm:block" />}
              <div>
                <div className="text-foreground" style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground" style={{ fontSize: '11px', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
