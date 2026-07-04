/**
 * ADL Marketing — Timeline
 * Aesthetix Design Language
 *
 * Step-by-step process/timeline with icons and descriptions.
 * Content-only: no section wrapper, no container, no background.
 * Layout controlled by Section + Container in the page.
 */

import { forwardRef, type ElementType } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../../utils';

export interface TimelineStep {
  number: string;
  icon: ElementType;
  title: string;
  description: string;
  detail?: string;
}

export interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ steps, className }, ref) => (
    <div ref={ref} className={cn('', className)}>
      {/* Desktop: horizontal */}
      <div className="hidden lg:block">
        <div className="relative mb-8">
          <div className="absolute top-5 left-[40px] right-[40px] h-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-4 relative z-10 hover:border-[var(--brand)] hover:bg-[var(--brand)]/10 transition-all duration-200 group">
                    <Icon className="w-[18px] h-[18px] text-zinc-400 group-hover:text-[var(--brand)] transition-colors" />
                  </div>
                  <div className="text-zinc-400 mb-1" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {step.number}
                  </div>
                  <div className="text-[var(--neutral-950)] dark:text-white mb-2" style={{ fontSize: '14px', fontWeight: 700 }}>
                    {step.title}
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400" style={{ fontSize: '12px', lineHeight: '1.55' }}>
                    {step.description}
                  </p>
                  {step.detail && (
                    <div className="mt-3 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700" style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>
                      {step.detail}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="lg:hidden space-y-0">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="flex gap-5 pb-8 relative last:pb-0"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 z-10">
                  <Icon className="w-[18px] h-[18px] text-zinc-400" />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-zinc-200 dark:bg-zinc-800 mt-3 mb-0" />
                )}
              </div>

              <div className="pt-1 pb-2">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-zinc-400" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {step.number}
                  </span>
                  <span className="text-[var(--neutral-950)] dark:text-white" style={{ fontSize: '15px', fontWeight: 700 }}>
                    {step.title}
                  </span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 mb-2" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  {step.description}
                </p>
                {step.detail && (
                  <div className="inline-flex px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400" style={{ fontSize: '11px' }}>
                    {step.detail}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  ),
);

Timeline.displayName = 'Timeline';
