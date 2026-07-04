/**
 * ADL Marketing — FAQ
 * Aesthetix Design Language
 *
 * Accordion-style FAQ with animated expand/collapse.
 * Content-only: no section wrapper, no container, no background.
 * Layout controlled by Section + Container in the page.
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
  items: FAQItem[];
  defaultOpen?: number;
  className?: string;
}

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-[var(--brand)] transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-[var(--neutral-950)] dark:text-white" style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.4 }}>
          {item.question}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
          <ChevronDown className="w-4 h-4 text-zinc-400" />
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
            <p className="pb-4 text-zinc-500 dark:text-zinc-400" style={{ fontSize: '14px', lineHeight: 1.75 }}>
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const FAQ = forwardRef<HTMLDivElement, FAQProps>(
  ({ items, defaultOpen = 0, className }, ref) => {
    const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

    return (
      <div ref={ref} className={cn('', className)}>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-5">
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
    );
  },
);

FAQ.displayName = 'FAQ';
