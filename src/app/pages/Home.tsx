import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import SEO, { organizationSchema } from "../components/SEO";

export default function Home() {
  return (
    <>
      <SEO
        title="Aesthetix Studio"
        description="Aesthetix Studio — Digital product studio. Strategy, design, and engineering for startups and growing businesses."
        url="/"
        structuredData={organizationSchema}
      />

      {/* ═══════════════════════════════════════════════════
          VIEWPORT 1 — ARRIVAL
          Composition: Monumental typography. Almost nothing else.
          Feeling: "These people are different."
          ═══════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-end bg-[var(--neutral-950)] px-5 md:px-8 pt-24 pb-16 md:pb-24">
        <div className="max-w-[90rem] mx-auto w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,9rem)] font-normal tracking-tight leading-[0.98] text-white max-w-[90vw]"
          >
            Designing
            <br />
            digital products
            <br />
            <span className="text-zinc-500">that create measurable</span>
            <br />
            <span className="text-zinc-500">business impact.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 md:mt-20"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group"
            >
              <span className="w-10 h-10 rounded-full border border-zinc-700 group-hover:border-zinc-500 flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
              Start a project
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          VIEWPORT 2 — BELIEF
          Composition: Quiet editorial. Centered. Massive whitespace.
          Feeling: "They understand the problem."
          ═══════════════════════════════════════════════════ */}
      <section className="py-48 md:py-64 lg:py-80 px-5 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,3.5rem)] font-normal tracking-tight leading-[1.15] text-[var(--neutral-950)] dark:text-white"
          >
            Most websites look good.
            <br />
            <span className="text-zinc-400">Very few solve business problems.</span>
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          VIEWPORT 3 — EVIDENCE
          Composition: Magazine spread. Editorial. Not a card.
          Feeling: "They've done this before."
          ═══════════════════════════════════════════════════ */}
      <section className="px-5 md:px-8">
        <div className="max-w-[90rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Full-bleed image — dominates the viewport */}
            <div className="aspect-[16/9] md:aspect-[21/9] bg-zinc-100 dark:bg-zinc-900 overflow-hidden mb-12 md:mb-16">
              <img
                src="https://picsum.photos/id/1060/1800/600"
                alt="Luminary Financial — Digital showroom for wealth management"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Editorial spread — magazine layout */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-8 md:gap-12 items-start">
              {/* Left: Title + description */}
              <div>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-zinc-400 mb-4">
                  Featured Project
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.05] text-[var(--neutral-950)] dark:text-white mb-4">
                  Luminary Financial
                </h2>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-md">
                  A high-performance digital showroom for a boutique wealth management firm.
                </p>
              </div>

              {/* Divider */}
              <div className="hidden md:block bg-zinc-200 dark:bg-zinc-800 w-px h-full" />

              {/* Right: Metadata */}
              <div className="space-y-6">
                <div>
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-zinc-400 mb-2">
                    Industry
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Wealth Management
                  </p>
                </div>
                <div>
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-zinc-400 mb-2">
                    Outcome
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    67% increase in qualified leads within 90 days.
                  </p>
                </div>
                <div>
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-zinc-400 mb-2">
                    Technologies
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Next.js · Sanity CMS · Tailwind CSS
                  </p>
                </div>
                <div className="pt-4">
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[var(--neutral-950)] dark:hover:text-white transition-colors group no-underline"
                  >
                    View project
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          VIEWPORT 4 — CAPABILITY (Digital Experiences)
          Composition: Full viewport. Huge type left. Supporting right.
          Feeling: "They can do what I need."
          ═══════════════════════════════════════════════════ */}
      <section className="py-40 md:py-56 lg:py-64 px-5 md:px-8">
        <div className="max-w-[90rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-start"
          >
            <div>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)] mb-6">
                What we build
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,7rem)] font-normal tracking-tight leading-[0.98] text-[var(--neutral-950)] dark:text-white">
                Digital
                <br />
                Experiences
              </h2>
            </div>
            <div className="md:pt-24">
              <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mb-8">
                Marketing websites and landing pages designed to convert visitors into customers.
                Every page is crafted with your audience's intent in mind — not just aesthetics.
              </p>
              <p className="text-[0.75rem] text-zinc-400">
                Website Design · Landing Pages · Conversion Optimization
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          VIEWPORT 5 — CAPABILITY (Web Applications)
          Composition: Centered statement. Different energy.
          Feeling: "They build real products."
          ═══════════════════════════════════════════════════ */}
      <section className="py-40 md:py-56 lg:py-64 px-5 md:px-8 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,5rem)] font-normal tracking-tight leading-[1.05] text-[var(--neutral-950)] dark:text-white mb-8">
              Web Applications
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto mb-8">
              Scalable SaaS products, dashboards, and internal platforms built for long-term growth.
              Modern stacks, clean architecture, performance-first.
            </p>
            <p className="text-[0.75rem] text-zinc-400">
              SaaS · Dashboards · Internal Platforms
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          VIEWPORT 6 — CAPABILITY (AI Solutions)
          Composition: Asymmetric. Huge type right. Text left.
          Feeling: "This is interesting."
          ═══════════════════════════════════════════════════ */}
      <section className="py-40 md:py-56 lg:py-64 px-5 md:px-8">
        <div className="max-w-[90rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start"
          >
            <div className="md:pt-12">
              <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mb-8">
                Intelligent experiences that automate workflows and enhance customer interactions.
                We only recommend AI when it solves a real business problem.
              </p>
              <p className="text-[0.75rem] text-zinc-400">
                AI Integration · Automation · Intelligent UX
              </p>
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(4rem,10vw,10rem)] font-normal tracking-tight leading-[0.92] text-[var(--neutral-950)] dark:text-white">
                AI
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          VIEWPORT 7 — PROOF
          Composition: Editorial list. Horizontal dividers.
          Feeling: "They have the numbers."
          ═══════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 px-5 md:px-8 bg-[var(--neutral-950)]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)] mb-12">
              Results
            </p>

            <div className="space-y-0">
              {[
                { value: "80+", label: "Brands launched." },
                { value: "42%", label: "Average conversion increase." },
                { value: "4.2×", label: "Average return on investment." },
                { value: "6 yrs", label: "Building products that matter." },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="border-t border-zinc-800 py-8 md:py-10"
                >
                  <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-12 items-baseline">
                    <span className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] font-normal tracking-tight text-white leading-none">
                      {stat.value}
                    </span>
                    <span className="text-sm text-zinc-500">
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-zinc-800" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          VIEWPORT 8 — THE WOW MOMENT
          Composition: Massive quote. Almost the entire viewport.
          Feeling: "Wow."
          ═══════════════════════════════════════════════════ */}
      <section className="py-48 md:py-64 lg:py-80 px-5 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,5rem)] font-normal tracking-tight leading-[1.08] text-[var(--neutral-950)] dark:text-white">
              "Aesthetix completely transformed how our company presents itself online. Three weeks after launch, we closed a ₹15L deal where the client specifically mentioned our website as the reason they reached out."
            </blockquote>

            <div className="mt-12 md:mt-16 flex items-center gap-4">
              <img
                src="https://picsum.photos/id/64/80/80"
                alt="Sarah Chen"
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-medium text-[var(--neutral-950)] dark:text-white">
                  Sarah Chen
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  CEO, Luminary Financial
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          VIEWPORT 9 — INVITATION
          Composition: Full viewport. One sentence. One button.
          Feeling: "I need to contact them."
          ═══════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-[var(--neutral-950)] px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,6rem)] font-normal tracking-tight leading-[1.02] text-white mb-12 md:mb-16">
              Ready to build
              <br />
              something people
              <br />
              remember?
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group"
            >
              <span className="w-10 h-10 rounded-full border border-zinc-700 group-hover:border-zinc-500 flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
              Book a discovery call
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
