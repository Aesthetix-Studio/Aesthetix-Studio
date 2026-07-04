/**
 * ADL Radius Tokens
 * Aesthetix Design Language — Border Radius
 *
 * Components should import from here, not use hardcoded values.
 */

export const radius = {
  /** No radius */
  none: '0',
  /** Extra small — 4px */
  xs: '0.25rem',
  /** Small — 8px */
  sm: '0.5rem',
  /** Medium — 12px */
  md: '0.75rem',
  /** Large — 16px */
  lg: '1rem',
  /** Extra large — 24px */
  xl: '1.5rem',
  /** Full — pill shape */
  full: '9999px',
} as const;

// ─── Component Radius Presets ──────────────────────────────────

/** Common radius values used by specific components */
export const componentRadius = {
  button: radius.lg,
  input: radius.lg,
  card: radius.xl,
  badge: radius.full,
  avatar: radius.full,
  dialog: radius.xl,
  tooltip: radius.sm,
} as const;
