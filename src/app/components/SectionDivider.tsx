/**
 * Aesthetix Section Divider — Editorial Thin Line
 *
 * A recurring brand element. Not decorative.
 * Just enough to divide thoughts.
 *
 * Use throughout:
 * - Navbar
 * - Footer
 * - Case Studies
 * - Process
 * - Quotes
 */

import { cn } from "../../design-system/utils";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div className={cn("px-5 md:px-8", className)}>
      <div className="max-w-[90rem] mx-auto border-t border-zinc-200 dark:border-zinc-800" />
    </div>
  );
}
