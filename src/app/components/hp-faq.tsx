import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What's included in a typical website project?",
    a: "Every project starts with a strategy session, then moves through UX wireframes, full visual design in Figma, a component library, and responsive front-end development. You'll receive complete source files and a 30-day support window post-launch. The exact scope varies by package — see our Pricing section for details.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A focused 5-page marketing site typically takes 4–6 weeks from kickoff to launch. Larger projects — design systems, e-commerce, or custom web apps — run 8–14 weeks. We share a detailed milestone schedule during the kickoff call so you always know what's coming next.",
  },
  {
    q: "Do you work with startups that don't have a brand yet?",
    a: "Yes — and it's actually ideal. Starting fresh means we can build everything from the right foundation. Our Growth package covers brand identity and website together, which produces more cohesive results than retrofitting a brand onto an existing site.",
  },
  {
    q: "Can you take over or redesign an existing website?",
    a: "Absolutely. We do full redesigns regularly. We'll start with a short audit of your current site — what's working, what's not, conversion data if available — then build a strategy before designing anything. We don't redesign for the sake of redesigning.",
  },
  {
    q: "What do you need from us to get started?",
    a: "A discovery call (30–60 minutes), answers to a short creative brief, access to any existing brand assets, and your key pages, goals, and timeline. Most of our clients are surprised by how little upfront content they need — we help develop copy direction as part of the process.",
  },
  {
    q: "Do you offer monthly retainer plans?",
    a: "Yes. Many clients move to a retainer after their initial project for ongoing design support — new landing pages, campaign assets, feature design, and SEO updates. Retainers start at a defined number of hours per month and include weekly check-ins. Talk to us about what would work for your team.",
  },
  {
    q: "What does the discovery call actually involve?",
    a: "It's a 30-minute conversation — not a sales pitch. We'll ask about your goals, target audience, timeline, budget range, and what success looks like for you. You'll get a clear sense of whether we're the right fit, and so will we. No pressure, no obligation.",
  },
];

export function HPFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-secondary/30 py-20 sm:py-28 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-14">
          {/* Left: header */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="inline-block px-3 py-1 rounded-full border border-border bg-background text-muted-foreground mb-4" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              FAQ
            </div>
            <h2
              className="text-foreground mb-4"
              style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.2 }}
            >
              Everything you wanted to ask but didn't.
            </h2>
            <p className="text-muted-foreground mb-6" style={{ fontSize: '15px', lineHeight: '1.65' }}>
              Still have a question? Drop us a line — we typically respond within a few hours.
            </p>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 text-brand hover:underline"
              style={{ fontSize: '13px', fontWeight: 600 }}
            >
              Send us a message →
            </a>
          </div>

          {/* Right: accordion */}
          <div className="space-y-2">
            {faqs.map((item, i) => (
              <div key={i} className="bg-background rounded-xl border border-border overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-accent/50 transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-foreground pr-8" style={{ fontSize: '14px', fontWeight: 600, lineHeight: '1.4' }}>
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="px-5 pb-5 border-t border-border/40">
                        <p className="text-muted-foreground pt-4" style={{ fontSize: '14px', lineHeight: '1.75' }}>
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
