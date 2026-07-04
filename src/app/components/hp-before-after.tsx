import { motion } from "motion/react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Link } from "react-router";

const transformations = [
  {
    slug: "physiocore",
    title: "PhysioCore",
    category: "Healthcare",
    before: {
      label: "Before",
      issues: ["1.8% conversion rate", "Phone-only booking", "Generic template design"],
      color: "bg-red-500/10 text-red-600 border-red-500/20",
    },
    after: {
      label: "After",
      results: ["42% conversion rate", "+68% online bookings", "3.2× monthly leads"],
      color: "bg-green-500/10 text-green-600 border-green-500/20",
    },
    metric: { value: "+68%", label: "More Bookings" },
    gradient: "from-teal-500 via-cyan-600 to-blue-700",
  },
  {
    slug: "review-harvest",
    title: "Review Harvest",
    category: "SaaS",
    before: {
      label: "Before",
      issues: ["Manual review tracking", "2% Google review rate", "No automation"],
      color: "bg-red-500/10 text-red-600 border-red-500/20",
    },
    after: {
      label: "After",
      results: ["10k+ businesses served", "+180% Google reviews", "127 reviews/month"],
      color: "bg-green-500/10 text-green-600 border-green-500/20",
    },
    metric: { value: "+180%", label: "More Reviews" },
    gradient: "from-emerald-500 via-green-600 to-teal-700",
  },
  {
    slug: "aurelia",
    title: "Aurelia",
    category: "Creative Portfolio",
    before: {
      label: "Before",
      issues: ["0.8% inquiry rate", "1:10 avg. session", "Forgettable experience"],
      color: "bg-red-500/10 text-red-600 border-red-500/20",
    },
    after: {
      label: "After",
      results: ["5.2× more leads", "4:32 avg. session", "3 Awwwards features"],
      color: "bg-green-500/10 text-green-600 border-green-500/20",
    },
    metric: { value: "5.2×", label: "More Leads" },
    gradient: "from-fuchsia-500 via-purple-600 to-violet-700",
  },
];

function TransformationCard({ transformation, index }: { transformation: typeof transformations[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/portfolio/${transformation.slug}`} className="no-underline">
        <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
          {/* Header with gradient */}
          <div className={`relative h-32 bg-gradient-to-br ${transformation.gradient} overflow-hidden`}>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-lg bg-black/30 backdrop-blur-sm">
                <span className="text-white" style={{ fontSize: '11px', fontWeight: 600 }}>{transformation.category}</span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
            {/* Metric badge */}
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-white" />
                <span className="text-white" style={{ fontSize: '13px', fontWeight: 700 }}>{transformation.metric.value}</span>
                <span className="text-white/70" style={{ fontSize: '11px' }}>{transformation.metric.label}</span>
              </div>
            </div>
          </div>

          {/* Before/After comparison */}
          <div className="p-5">
            <h3 className="text-foreground mb-4 group-hover:text-brand transition-colors" style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.01em' }}>
              {transformation.title}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Before */}
              <div className={`p-3 rounded-xl border ${transformation.before.color}`}>
                <div className="mb-2" style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {transformation.before.label}
                </div>
                <ul className="space-y-1.5">
                  {transformation.before.issues.map((issue) => (
                    <li key={issue} className="flex items-start gap-1.5" style={{ fontSize: '11px', lineHeight: 1.4 }}>
                      <span className="mt-0.5 shrink-0">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className={`p-3 rounded-xl border ${transformation.after.color}`}>
                <div className="mb-2" style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {transformation.after.label}
                </div>
                <ul className="space-y-1.5">
                  {transformation.after.results.map((result) => (
                    <li key={result} className="flex items-start gap-1.5" style={{ fontSize: '11px', lineHeight: 1.4 }}>
                      <span className="mt-0.5 shrink-0">✓</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function HPBeforeAfter() {
  return (
    <section className="bg-background py-20 sm:py-28 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-xl mb-12">
          <div className="inline-block px-3 py-1 rounded-full border border-border bg-card text-muted-foreground mb-4" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Transformations
          </div>
          <h2
            className="text-foreground"
            style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            Before & after
            <br />
            <span className="text-muted-foreground">real client results.</span>
          </h2>
          <p className="text-muted-foreground mt-4" style={{ fontSize: '15px', lineHeight: 1.6 }}>
            See the measurable impact of our work. Every transformation is backed by real data and verified results.
          </p>
        </div>

        {/* Transformation cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {transformations.map((transformation, i) => (
            <TransformationCard key={transformation.slug} transformation={transformation} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: '13px', fontWeight: 600 }}
          >
            View all case studies
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
