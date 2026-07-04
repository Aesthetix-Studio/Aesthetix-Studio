/**
 * ADL Components — Barrel Export
 * Aesthetix Design Language
 *
 * Import components from here:
 *   import { AXButton, Badge, Card } from '@/design-system/components';
 *   import { Hero, FeatureGrid, FAQ } from '@/design-system/components/marketing';
 */

// ─── Marketing ─────────────────────────────────────────────────
export * from './marketing';

export { AXButton } from './Button';
export type { AXButtonProps, AXButtonVariant, AXButtonSize } from './Button';

export { Badge, badgeVariants } from './Badge';
export type { BadgeProps, BadgeVariant } from './Badge';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from './Card';
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardActionProps,
  CardContentProps,
  CardFooterProps,
} from './Card';

export { Input } from './Input';
export type { InputProps } from './Input';

export { Textarea } from './Textarea';
export type { TextareaProps } from './Textarea';

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './Select';
export type {
  SelectProps,
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
} from './Select';

export { Avatar, AvatarImage, AvatarFallback } from './Avatar';
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps } from './Avatar';
