import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { homepageFaq } from "../../../content";

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
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-brand hover:underline"
              style={{ fontSize: '13px', fontWeight: 600 }}
            >
              Send us a message →
            </Link>
          </div>

          {/* Right: accordion */}
          <div className="space-y-2">
            {homepageFaq.map((item, i) => (
              <div key={i} className="bg-background rounded-xl border border-border overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-accent/50 transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-foreground pr-8" style={{ fontSize: '14px', fontWeight: 600, lineHeight: '1.4' }}>
                    {item.question}
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
                          {item.answer}
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
