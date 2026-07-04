/**
 * ADL Marketing — Testimonials
 * Aesthetix Design Language
 *
 * Testimonial cards with quotes, attribution, and star ratings.
 * Data-driven: all content passed via props.
 */

import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { cn } from '../../../utils';

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatarColor?: string;
  stars?: number;
}

export interface TestimonialsProps {
  /** Section overline label */
  overline?: string;
  /** Section headline */
  headline?: string;
  /** Testimonial items */
  testimonials: TestimonialItem[];
  /** Additional CSS classes */
  className?: string;
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-5 hover:shadow-md transition-shadow duration-200">
      {testimonial.stars && (
        <div className="flex gap-0.5">
          {[...Array(testimonial.stars)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-craft text-craft" />
          ))}
        </div>
      )}

      <p className="text-foreground flex-1" style={{ fontSize: '14px', lineHeight: '1.75', fontStyle: 'italic' }}>
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        <div
          className={cn(
            'w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0',
            testimonial.avatarColor ?? 'bg-brand',
          )}
          style={{ fontSize: '11px', fontWeight: 700 }}
        >
          {testimonial.initials}
        </div>
        <div>
          <div className="text-foreground" style={{ fontSize: '13px', fontWeight: 600 }}>{testimonial.name}</div>
          <div className="text-muted-foreground" style={{ fontSize: '12px' }}>{testimonial.role} · {testimonial.company}</div>
        </div>
      </div>
    </div>
  );
}

export const Testimonials = forwardRef<HTMLElement, TestimonialsProps>(
  ({ overline = 'Testimonials', headline, testimonials, className }, ref) => (
    <section ref={ref} className={cn('bg-background py-20 sm:py-28 border-b border-border/60', className)}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl mb-12">
          <div className="inline-block px-3 py-1 rounded-full border border-border bg-card text-muted-foreground mb-4" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            {overline}
          </div>
          {headline && (
            <h2 className="text-foreground" style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.2 }}>
              {headline}
            </h2>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  ),
);

Testimonials.displayName = 'Testimonials';
