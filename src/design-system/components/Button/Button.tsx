/**
 * ADL Button
 * Aesthetix Design Language
 *
 * Seven semantic variants across five sizes.
 * Supports loading states, icons, and icon-only mode.
 */

import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils';
import type { AXButtonProps, AXButtonVariant, AXButtonSize } from './Button.types';

// ─── Variant Styles ────────────────────────────────────────────

const variantStyles: Record<AXButtonVariant, string> = {
  primary: 'bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98]',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98] border border-border',
  outline: 'bg-transparent text-foreground border border-border hover:bg-accent active:scale-[0.98]',
  ghost: 'bg-transparent text-foreground hover:bg-accent active:scale-[0.98]',
  destructive: 'bg-destructive text-white hover:bg-destructive/90 active:scale-[0.98]',
  brand: 'bg-brand text-brand-foreground hover:bg-brand-hover active:scale-[0.98] shadow-brand hover:shadow-brand-lg',
  craft: 'bg-craft text-craft-foreground hover:bg-craft-hover active:scale-[0.98] shadow-sm hover:shadow-md',
  link: 'bg-transparent text-brand hover:underline p-0 h-auto',
};

// ─── Size Styles ───────────────────────────────────────────────

const sizeStyles: Record<AXButtonSize, string> = {
  xs: 'h-7 px-2.5 text-caption rounded-md gap-1',
  sm: 'h-8 px-3 text-body-sm rounded-md gap-1.5',
  md: 'h-10 px-5 text-base rounded-lg gap-2',
  lg: 'h-12 px-7 text-base rounded-lg gap-2',
  xl: 'h-14 px-8 text-body-lg rounded-lg gap-2.5',
};

// ─── Component ─────────────────────────────────────────────────

export const AXButton = forwardRef<HTMLButtonElement, AXButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconRight,
      iconOnly = false,
      children,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          variantStyles[variant],
          sizeStyles[size],
          iconOnly && 'w-auto aspect-square px-0 flex items-center justify-center',
          variant !== 'link' && 'select-none',
          className,
        )}
      >
        {loading ? <Loader2 className="animate-spin w-3.5 h-3.5" /> : icon}
        {!iconOnly && children}
        {!loading && iconRight}
      </button>
    );
  },
);

AXButton.displayName = 'AXButton';
