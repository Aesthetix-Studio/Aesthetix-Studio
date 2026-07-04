/**
 * ADL Badge — Types
 * Aesthetix Design Language
 */

import type { ReactNode, HTMLAttributes } from 'react';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'craft'
  | 'success'
  | 'warning'
  | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant */
  variant?: BadgeVariant;
  /** When true, renders as child element via Slot */
  asChild?: boolean;
}
