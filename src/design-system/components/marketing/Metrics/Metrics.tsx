/**
 * ADL Marketing — Metrics
 * Aesthetix Design Language
 *
 * Stats/metrics bar with large numbers and labels.
 * Data-driven: all content passed via props.
 */

import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../../utils';

export interface MetricItem {
  value: string;
  label: string;
  sublabel?: string;
}

export interface MetricsProps {
  /** Metric items to display */
  metrics: MetricItem[];
  /** Background variant */
  variant?: 'dark' | 'light';
  /** Additional CSS classes */
  className?: string;
}

export const Metrics = forwardRef<HTMLElement, MetricsProps>(
  ({ metrics, variant = 'dark', className }, ref) => {
    const bg = variant === 'dark' ? 'bg-foreground' : 'bg-card';
    const textColor = variant === 'dark' ? 'text-background' : 'text-foreground';
    const subColor = variant === 'dark' ? 'text-background/45' : 'text-muted-foreground';

    return (
      <section ref={ref} className={cn(bg, 'py-14 border-b border-border/20', className)}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map(({ value, label, sublabel }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="text-center"
              >
                <div className={cn(textColor, 'mb-1')} style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
                  {value}
                </div>
                <div className={cn(textColor)} style={{ fontSize: '14px', fontWeight: 600, opacity: 0.85 }}>
                  {label}
                </div>
                {sublabel && (
                  <div className={cn(subColor)} style={{ fontSize: '12px', marginTop: '2px' }}>
                    {sublabel}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);

Metrics.displayName = 'Metrics';
