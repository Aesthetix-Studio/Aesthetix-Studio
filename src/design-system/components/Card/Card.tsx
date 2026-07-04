/**
 * ADL Card
 * Aesthetix Design Language
 *
 * Container component for grouping related content.
 * Composable: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter.
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils';

// ─── Card ──────────────────────────────────────────────────────

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-lg border border-border shadow-sm transition-shadow duration-180 ease-standard hover:shadow-md',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

// ─── CardHeader ────────────────────────────────────────────────

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-3 px-8 pt-8 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-8',
        className,
      )}
      {...props}
    />
  ),
);
CardHeader.displayName = 'CardHeader';

// ─── CardTitle ─────────────────────────────────────────────────

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h4
      ref={ref}
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

// ─── CardDescription ──────────────────────────────────────────

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="card-description"
      className={cn('text-muted-foreground text-body-md', className)}
      {...props}
    />
  ),
);
CardDescription.displayName = 'CardDescription';

// ─── CardAction ────────────────────────────────────────────────

export interface CardActionProps extends HTMLAttributes<HTMLDivElement> {}

export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  ),
);
CardAction.displayName = 'CardAction';

// ─── CardContent ───────────────────────────────────────────────

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn('px-8 [&:last-child]:pb-8', className)}
      {...props}
    />
  ),
);
CardContent.displayName = 'CardContent';

// ─── CardFooter ────────────────────────────────────────────────

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn('flex items-center px-8 pb-8 [.border-t]:pt-8', className)}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';
