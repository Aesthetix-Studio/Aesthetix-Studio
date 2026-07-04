/**
 * ADL Marketing — LogoCloud
 * Aesthetix Design Language
 *
 * Horizontal strip of client/partner logos with optional label.
 * Data-driven: all content passed via props.
 */

import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../../utils';

export interface LogoItem {
  /** Company/brand name */
  name: string;
  /** Optional custom logo element */
  logo?: React.ReactNode;
}

export interface LogoCloudProps {
  /** Label above logos */
  label?: string;
  /** Logo items to display */
  logos: LogoItem[];
  /** Additional CSS classes */
  className?: string;
}

export const LogoCloud = forwardRef<HTMLElement, LogoCloudProps>(
  ({ label = 'Trusted by growing teams at', logos, className }, ref) => (
    <section ref={ref} className={cn('bg-secondary/40 py-8 border-b border-border/60', className)}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-center text-muted-foreground mb-6" style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {label}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {logos.map((logo) => (
            <motion.span
              key={logo.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em' }}
            >
              {logo.logo ?? logo.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  ),
);

LogoCloud.displayName = 'LogoCloud';
