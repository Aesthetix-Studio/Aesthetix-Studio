/**
 * ADL Marketing — Hero
 * Aesthetix Design Language
 *
 * Full-width hero section with headline, subline, CTAs, and optional media.
 * Data-driven: all content passed via props.
 */

import { forwardRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../../utils';

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroProps {
  /** Overline label chip */
  overline?: string;
  /** Main headline (supports JSX for highlighted words) */
  headline: ReactNode;
  /** Supporting paragraph */
  subline?: string;
  /** Primary CTA */
  primaryCta?: { label: string; href: string };
  /** Secondary CTA */
  secondaryCta?: { label: string; href: string };
  /** Trust stats displayed below CTAs */
  stats?: HeroStat[];
  /** Right-side media slot */
  media?: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const Hero = forwardRef<HTMLElement, HeroProps>(
  ({ overline, headline, subline, primaryCta, secondaryCta, stats, media, className }, ref) => {
    return (
      <section ref={ref} className={cn('relative overflow-hidden bg-background', className)}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32">
          <div className={cn('grid grid-cols-1 gap-12 lg:gap-16 items-center', media ? 'lg:grid-cols-[1fr_420px]' : '')}>
            {/* Left: Content */}
            <div>
              {overline && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs border border-border bg-card mb-6">
                    <span className="text-muted-foreground text-caption font-medium">{overline}</span>
                  </div>
                </motion.div>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
                className="text-foreground mb-6"
                style={{
                  fontFamily: 'var(--font-family-display)',
                  fontSize: 'clamp(36px, 5.5vw, 62px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                }}
              >
                {headline}
              </motion.h1>

              {subline && (
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                  className="text-muted-foreground mb-10 max-w-lg"
                  style={{ fontSize: '18px', lineHeight: '1.6', fontWeight: 400 }}
                >
                  {subline}
                </motion.p>
              )}

              {(primaryCta || secondaryCta) && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12"
                >
                  {primaryCta && (
                    <a
                      href={primaryCta.href}
                      className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-brand text-brand-foreground font-medium transition-all hover:bg-brand-hover hover:shadow-brand-lg active:scale-[0.98] no-underline"
                      style={{ fontSize: '16px' }}
                    >
                      {primaryCta.label}
                    </a>
                  )}
                  {secondaryCta && (
                    <a
                      href={secondaryCta.href}
                      className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg text-foreground font-medium transition-colors hover:bg-accent no-underline"
                      style={{ fontSize: '16px' }}
                    >
                      {secondaryCta.label}
                    </a>
                  )}
                </motion.div>
              )}

              {stats && stats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="flex flex-wrap items-center gap-x-6 gap-y-4"
                >
                  {stats.map(({ value, label }, i) => (
                    <div key={label} className="flex items-center gap-2">
                      {i > 0 && <div className="w-px h-5 bg-border hidden sm:block" />}
                      <span className="text-foreground" style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                        {value}
                      </span>
                      <span className="text-muted-foreground text-body-sm">{label}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right: Media slot */}
            {media && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="hidden lg:block"
              >
                {media}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    );
  },
);

Hero.displayName = 'Hero';
