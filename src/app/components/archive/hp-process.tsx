import { motion } from "motion/react";
import { cn } from "../ui/utils";
import { processSteps } from "../../../content";

export function HPProcess() {
  return (
    <section className="bg-background py-20 sm:py-28 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-block px-3 py-1 rounded-full border border-border bg-card text-muted-foreground mb-4" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Our Process
          </div>
          <h2
            className="text-foreground mb-4"
            style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            No guesswork.
            <br />
            <span className="text-muted-foreground">A repeatable system that delivers every time.</span>
          </h2>
          <p className="text-muted-foreground" style={{ fontSize: '16px', lineHeight: '1.65' }}>
            Five phases. Predictable timelines. Clear deliverables at every stage so you always know where we are and what's coming next.
          </p>
        </div>

        {/* Desktop: horizontal steps */}
        <div className="hidden lg:block">
          {/* Connector line */}
          <div className="relative mb-8">
            <div className="absolute top-5 left-[40px] right-[40px] h-px bg-border" />
            <div className="grid grid-cols-5 gap-4">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className="flex flex-col items-center text-center relative"
                  >
                    <div className="w-10 h-10 rounded-xl bg-card border-2 border-border flex items-center justify-center mb-4 relative z-10 hover:border-brand hover:bg-brand-muted transition-all duration-200 group">
                      <Icon className="w-4.5 h-4.5 text-muted-foreground group-hover:text-brand transition-colors" style={{ width: 18, height: 18 }} />
                    </div>
                    <div className="text-muted-foreground mb-1" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {step.number}
                    </div>
                    <div className="text-foreground mb-2" style={{ fontSize: '14px', fontWeight: 700 }}>
                      {step.title}
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: '12px', lineHeight: '1.55' }}>
                      {step.description}
                    </p>
                    <div className="mt-3 px-2 py-1 rounded-md bg-secondary border border-border/60" style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>
                      {step.detail}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: vertical steps */}
        <div className="lg:hidden space-y-0">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex gap-5 pb-8 relative last:pb-0"
              >
                {/* Left: number + line */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-card border-2 border-border flex items-center justify-center shrink-0 z-10">
                    <Icon className="w-4.5 h-4.5 text-muted-foreground" style={{ width: 18, height: 18 }} />
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-px flex-1 bg-border/60 mt-3 mb-0" />
                  )}
                </div>

                {/* Right: content */}
                <div className="pt-1 pb-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-muted-foreground" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {step.number}
                    </span>
                    <span className="text-foreground" style={{ fontSize: '15px', fontWeight: 700 }}>
                      {step.title}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    {step.description}
                  </p>
                  <div className="inline-flex px-2.5 py-1 rounded-md bg-secondary border border-border/60 text-muted-foreground" style={{ fontSize: '11px' }}>
                    {step.detail}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
