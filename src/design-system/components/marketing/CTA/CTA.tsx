/**
 * ADL Marketing — CTA
 * Aesthetix Design Language
 *
 * Full-width call-to-action section with dark background.
 * Data-driven: all content passed via props.
 */

import { forwardRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../../utils';

export interface CTAAction {
  label: string;
  href: string;
  /** Primary or secondary style */
  variant?: 'primary' | 'secondary';
}

export interface CTAProps {
  /** Overline label */
  overline?: string;
  /** Main headline (supports JSX) */
  headline: ReactNode;
  /** Supporting paragraph */
  subline?: string;
  /** Action buttons */
  actions?: CTAAction[];
  /** Additional CSS classes */
  className?: string;
}

export const CTA = forwardRef<HTMLElement, CTAProps>(
  ({ overline, headline, subline, actions, className }, ref) => (
    <section ref={ref} className={cn('bg-foreground py-24 sm:py-32', className)}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {overline && (
            <div
              className="mb-4"
              style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(243,243,241,0.4)' }}
            >
              {overline}
            </div>
          )}

          <h2
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#F3F3F1',
            }}
          >
            {headline}
          </h2>

          {subline && (
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'rgba(243,243,241,0.55)', marginTop: '20px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
              {subline}
            </p>
          )}

          {actions && actions.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              {actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className={cn(
                    'inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg font-medium transition-all no-underline',
                    action.variant === 'secondary'
                      ? 'border border-white/20 text-white hover:bg-white/10'
                      : 'bg-brand text-brand-foreground hover:bg-brand-hover hover:shadow-brand-lg',
                  )}
                  style={{ fontSize: '16px' }}
                >
                  {action.label}
                  <ArrowRight className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  ),
);

CTA.displayName = 'CTA';
