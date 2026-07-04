/**
 * ADL Marketing — FeatureGrid
 * Aesthetix Design Language
 *
 * Grid of feature/service cards with icons, descriptions, and CTAs.
 * Data-driven: all content passed via props.
 */

import { forwardRef, type ReactNode, type ElementType } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../../utils';

export interface FeatureItem {
  /** Icon component (Lucide or custom) */
  icon: ElementType;
  /** Card title */
  title: string;
  /** Short description */
  description: string;
  /** List of deliverables/features */
  deliverables?: string[];
  /** Accent gradient class */
  accent?: string;
  /** Icon background class */
  iconBg?: string;
  /** Icon color class */
  iconColor?: string;
  /** CTA label */
  ctaLabel?: string;
  /** CTA href */
  ctaHref?: string;
}

export interface FeatureGridProps {
  /** Section overline label */
  overline?: string;
  /** Section headline */
  headline?: ReactNode;
  /** Section description */
  description?: string;
  /** Feature items to display */
  features: FeatureItem[];
  /** Number of columns (default: auto-responsive) */
  columns?: 2 | 3 | 4;
  /** Additional CSS classes */
  className?: string;
}

export const FeatureGrid = forwardRef<HTMLElement, FeatureGridProps>(
  ({ overline, headline, description, features, columns = 4, className }, ref) => {
    const gridCols = {
      2: 'sm:grid-cols-2',
      3: 'sm:grid-cols-2 lg:grid-cols-3',
      4: 'sm:grid-cols-2 lg:grid-cols-4',
    };

    return (
      <section ref={ref} className={cn('bg-background py-24 sm:py-32 border-b border-border/60', className)}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {(overline || headline || description) && (
            <div className="max-w-2xl mb-16">
              {overline && (
                <div className="inline-block px-3 py-1.5 rounded-xs border border-border bg-card text-muted-foreground mb-5" style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {overline}
                </div>
              )}
              {headline && (
                <h2
                  className="text-foreground mb-5"
                  style={{ fontFamily: 'var(--font-family-display)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.15 }}
                >
                  {headline}
                </h2>
              )}
              {description && (
                <p className="text-muted-foreground" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                  {description}
                </p>
              )}
            </div>
          )}

          <div className={cn('grid grid-cols-1 gap-6', gridCols[columns])}>
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="group relative bg-card rounded-lg border border-border shadow-sm p-8 flex flex-col gap-5 hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  {feature.accent && (
                    <div className={cn('absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300', feature.accent)} />
                  )}

                  <div className="relative">
                    <div className={cn('w-12 h-12 rounded-full flex items-center justify-center mb-5', feature.iconBg ?? 'bg-brand-muted')}>
                      <Icon className={cn('w-6 h-6', feature.iconColor ?? 'text-brand')} />
                    </div>

                    <div className="text-muted-foreground mb-2" style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {feature.title}
                    </div>
                    <h3 className="text-foreground mb-3" style={{ fontFamily: 'var(--font-family-display)', fontSize: '20px', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: '1.3' }}>
                      {feature.description}
                    </h3>

                    {feature.deliverables && feature.deliverables.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {feature.deliverables.map((d) => (
                          <li key={d} className="flex items-center gap-2.5 text-muted-foreground" style={{ fontSize: '14px' }}>
                            <div className="w-1 h-1 rounded-full bg-muted-foreground/40 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}

                    {feature.ctaLabel && (
                      <a
                        href={feature.ctaHref ?? '#'}
                        className="flex items-center gap-2 text-brand group-hover:gap-3 transition-all duration-180 no-underline"
                        style={{ fontSize: '14px', fontWeight: 600 }}
                      >
                        {feature.ctaLabel}
                        <span className="text-lg">→</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  },
);

FeatureGrid.displayName = 'FeatureGrid';
