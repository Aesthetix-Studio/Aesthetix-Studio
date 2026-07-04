/**
 * ADL Color Tokens
 * Aesthetix Design Language — Color System
 *
 * Source of truth for all color values.
 * Components should import from here, not use hardcoded values.
 */

// ─── Primitive Palettes ────────────────────────────────────────

/** Neutral — Structure: stability, precision, calm */
export const neutral = {
  0: '#FFFFFF',
  50: '#FAFAFA',
  100: '#F4F4F5',
  200: '#E4E4E7',
  300: '#D4D4D8',
  400: '#A1A1A1',
  500: '#71717A',
  600: '#52525B',
  700: '#3F3F46',
  800: '#27272A',
  900: '#18181B',
  950: '#09090B',
} as const;

/** Brand / Interactive — Innovation, intelligence, momentum (Violet) */
export const brand = {
  50: '#F2F0FF',
  100: '#E8E4FF',
  200: '#D2CCFF',
  300: '#B0A5FF',
  400: '#8C78FF',
  500: '#6150F6',
  600: '#4E3DE0',
  700: '#3D2EC4',
  800: '#3125A8',
  900: '#261C80',
  950: '#160F4F',
} as const;

/** Craft / Gold — Premium accents: craftsmanship, quality, refinement */
export const craft = {
  50: '#FFFCF0',
  100: '#FEF7D6',
  200: '#FCEAA2',
  300: '#F9D86A',
  400: '#E8C23E',
  500: '#C9A21F',
  600: '#A68216',
  700: '#806311',
  800: '#5C460C',
  900: '#3A2D07',
  950: '#1F1703',
} as const;

/** Green — Success: confidence */
export const green = {
  50: '#F0FDF4',
  100: '#DCFCE7',
  200: '#BBF7D0',
  300: '#86EFAC',
  400: '#4ADE80',
  500: '#22C55E',
  600: '#16A34A',
  700: '#15803D',
  800: '#166534',
  900: '#14532D',
  950: '#052E16',
} as const;

/** Amber — Warning: attention without alarm */
export const amber = {
  50: '#FFFBEB',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#F59E0B',
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
  950: '#451A03',
} as const;

/** Red — Error: clear, actionable feedback */
export const red = {
  50: '#FEF2F2',
  100: '#FEE2E2',
  200: '#FECACA',
  300: '#FCA5A5',
  400: '#F87171',
  500: '#EF4444',
  600: '#DC2626',
  700: '#B91C1C',
  800: '#991B1B',
  900: '#7F1D1D',
  950: '#450A0A',
} as const;

/** Blue — Info: knowledge, assistance */
export const blue = {
  50: '#EFF6FF',
  100: '#DBEAFE',
  200: '#BFDBFE',
  300: '#93C5FD',
  400: '#60A5FA',
  500: '#3B82F6',
  600: '#2563EB',
  700: '#1D4ED8',
  800: '#1E40AF',
  900: '#1E3A8A',
  950: '#172554',
} as const;

// ─── Semantic Tokens (Light Mode) ──────────────────────────────

export const semanticLight = {
  background: '#FAFAF9',
  foreground: '#0D0D0C',
  card: '#FFFFFF',
  cardForeground: '#0D0D0C',
  popover: '#FFFFFF',
  popoverForeground: '#0D0D0C',
  primary: '#0D0D0C',
  primaryForeground: '#FFFFFF',
  secondary: '#F3F3F1',
  secondaryForeground: '#0D0D0C',
  muted: '#F3F3F1',
  mutedForeground: '#737370',
  accent: '#F3F3F1',
  accentForeground: '#0D0D0C',
  destructive: '#DC2626',
  destructiveForeground: '#FFFFFF',
  border: 'rgba(0, 0, 0, 0.07)',
  input: 'transparent',
  inputBackground: '#F3F3F1',
  ring: '#6150F6',
} as const;

/** Brand semantic (Light) */
export const brandSemanticLight = {
  brand: '#6150F6',
  brandHover: '#4E3DE0',
  brandForeground: '#FFFFFF',
  brandMuted: '#F2F0FF',
  brandMutedForeground: '#4E3DE0',
} as const;

/** Craft semantic (Light) */
export const craftSemanticLight = {
  craft: '#C9A21F',
  craftHover: '#A68216',
  craftForeground: '#FFFFFF',
  craftMuted: '#FFFCF0',
  craftMutedForeground: '#806311',
} as const;

/** Status semantic (Light) */
export const statusSemanticLight = {
  success: '#16A34A',
  successForeground: '#FFFFFF',
  successMuted: '#F0FDF4',
  successMutedForeground: '#15803D',
  warning: '#D97706',
  warningForeground: '#FFFFFF',
  warningMuted: '#FFFBEB',
  warningMutedForeground: '#92400E',
  info: '#2563EB',
  infoForeground: '#FFFFFF',
  infoMuted: '#EFF6FF',
  infoMutedForeground: '#1D4ED8',
} as const;

// ─── Semantic Tokens (Dark Mode) ───────────────────────────────

export const semanticDark = {
  background: '#0D0D0C',
  foreground: '#F3F3F1',
  card: '#161614',
  cardForeground: '#F3F3F1',
  popover: '#1C1C1A',
  popoverForeground: '#F3F3F1',
  primary: '#F3F3F1',
  primaryForeground: '#0D0D0C',
  secondary: '#1C1C1A',
  secondaryForeground: '#F3F3F1',
  muted: '#1C1C1A',
  mutedForeground: '#A3A39D',
  accent: '#1C1C1A',
  accentForeground: '#F3F3F1',
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',
  border: 'rgba(255, 255, 255, 0.08)',
  input: 'rgba(255, 255, 255, 0.06)',
  inputBackground: '#1C1C1A',
  ring: '#8C78FF',
} as const;

/** Brand semantic (Dark) */
export const brandSemanticDark = {
  brand: '#8C78FF',
  brandHover: '#B0A5FF',
  brandForeground: '#0D0D0C',
  brandMuted: '#1E1A3F',
  brandMutedForeground: '#B0A5FF',
} as const;

/** Craft semantic (Dark) */
export const craftSemanticDark = {
  craft: '#E8C23E',
  craftHover: '#F9D86A',
  craftForeground: '#0D0D0C',
  craftMuted: '#1F1703',
  craftMutedForeground: '#F9D86A',
} as const;

/** Status semantic (Dark) */
export const statusSemanticDark = {
  success: '#22C55E',
  successMuted: '#052E16',
  successMutedForeground: '#4ADE80',
  warning: '#F59E0B',
  warningMuted: '#1C1400',
  warningMutedForeground: '#FCD34D',
  info: '#3B82F6',
  infoMuted: '#0C1A3F',
  infoMutedForeground: '#93C5FD',
} as const;

// ─── All Colors ────────────────────────────────────────────────

export const colors = {
  neutral,
  brand,
  craft,
  green,
  amber,
  red,
  blue,
} as const;
