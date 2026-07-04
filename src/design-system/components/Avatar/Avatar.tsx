/**
 * ADL Avatar
 * Aesthetix Design Language
 *
 * User avatar with image, fallback, and status indicators.
 * Built on Radix UI Avatar primitive.
 */

import { forwardRef } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../../utils';

// ─── Avatar ────────────────────────────────────────────────────

export interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {}

export const Avatar = forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    data-slot="avatar"
    className={cn(
      'relative flex size-10 shrink-0 overflow-hidden rounded-full border border-border',
      className,
    )}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

// ─── AvatarImage ───────────────────────────────────────────────

export interface AvatarImageProps extends React.ComponentProps<typeof AvatarPrimitive.Image> {}

export const AvatarImage = forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn('aspect-square size-full', className)}
    {...props}
  />
));
AvatarImage.displayName = 'AvatarImage';

// ─── AvatarFallback ────────────────────────────────────────────

export interface AvatarFallbackProps extends React.ComponentProps<typeof AvatarPrimitive.Fallback> {}

export const AvatarFallback = forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn(
      'bg-muted flex size-full items-center justify-center rounded-full text-muted-foreground font-medium',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = 'AvatarFallback';
