/**
 * ADL Marketing — FAQ
 * Aesthetix Design Language
 *
 * Accordion-style FAQ section with animated expand/collapse.
 * Data-driven: all content passed via props.
 */

import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../utils';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  /** Section overline label */
  overline?: string;
  /** Section headline */
  headline?: string;
  /** FAQ items */
  items: FAQItem[];
  /** Index of initially open item (-1 for none) */
  defaultOpen?: number;
  /** Additional CSS classes */
  className?: string;
}

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-brand transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-foreground" style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.4 }}>
          {item.question}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-4 text-muted-foreground" style={{ fontSize: '14px', lineHeight: 1.75 }}>
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const FAQ = forwardRef<HTMLElement, FAQProps>(
  ({ overline = 'FAQ', headline, items, defaultOpen = 0, className }, ref) => {
    const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

    return (
      <section ref={ref} className={cn('bg-background py-16', className)}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          {overline && (
            <p className="text-muted-foreground mb-3" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {overline}
            </p>
          )}
          {headline && (
            <h2 className="text-foreground mb-8" style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.2 }}>
              {headline}
            </h2>
          )}
          <div className="bg-card rounded-xl border border-border px-5">
            {items.map((item, i) => (
              <AccordionItem
                key={item.question}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>
    );
  },
);

FAQ.displayName = 'FAQ';
