/**
 * ADL Button — Types
 * Aesthetix Design Language
 */

import type { ReactNode, ButtonHTMLAttributes } from 'react';

export type AXButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'brand'
  | 'link'
  | 'craft';

export type AXButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AXButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: AXButtonVariant;
  /** Size preset */
  size?: AXButtonSize;
  /** Shows loading spinner and disables button */
  loading?: boolean;
  /** Icon element placed before children */
  icon?: ReactNode;
  /** Icon element placed after children */
  iconRight?: ReactNode;
  /** When true, renders icon-only with square aspect ratio */
  iconOnly?: boolean;
}
