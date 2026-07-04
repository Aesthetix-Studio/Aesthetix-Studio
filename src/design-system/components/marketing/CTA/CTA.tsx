/**
 * ADL Marketing — CTA
 * Aesthetix Design Language
 *
 * Call-to-action block with dark background.
 * Content-only: no section wrapper, no container, no background.
 * Layout controlled by Section + Container in the page.
 */

import { forwardRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../../utils';

export interface CTAAction {
  label: string;
  href: string;
  variant?: 'brand' | 'ghost' | 'primary' | 'secondary';
}

export interface CTAProps {
  headline: ReactNode;
  subline?: string;
  actions?: CTAAction[];
  className?: string;
}

export const CTA = forwardRef<HTMLDivElement, CTAProps>(
  ({ headline, subline, actions, className }, ref) => (
    <div ref={ref} className={cn('text-center', className)}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-white">
          {headline}
        </h2>

        {subline && (
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto">
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
                  'inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full font-medium transition-all no-underline',
                  action.variant === 'ghost'
                    ? 'border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white'
                    : 'bg-[var(--brand)] text-white hover:bg-[var(--brand)]/90',
                )}
                style={{ fontSize: '15px' }}
              >
                {action.label}
                <ArrowRight className="w-4 h-4" />
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  ),
);

CTA.displayName = 'CTA';
