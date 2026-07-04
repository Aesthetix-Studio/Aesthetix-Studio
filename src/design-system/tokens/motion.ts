/**
 * ADL Motion Tokens
 * Aesthetix Design Language — Motion System
 *
 * Philosophy: Smooth, natural, controlled, intentional.
 * Components should import from here, not use hardcoded values.
 */

// ─── Easing ────────────────────────────────────────────────────

export const ease = {
  /** Default — natural, balanced feel */
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Elements entering the screen */
  entrance: 'cubic-bezier(1, 1, 0.3, 1)',
  /** Elements leaving the screen */
  exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
  /** Linear — constant speed */
  linear: 'linear',
} as const;

// ─── Duration ──────────────────────────────────────────────────

export const duration = {
  /** 0ms — immediate feedback */
  instant: '0ms',
  /** 120ms — micro-interactions (hover, focus) */
  fast: '120ms',
  /** 180ms — standard transitions */
  normal: '180ms',
  /** 280ms — complex state changes */
  slow: '280ms',
  /** 400ms — page-level transitions */
  slower: '400ms',
} as const;

// ─── Distance ──────────────────────────────────────────────────

/** Movement distance for enter/exit animations */
export const distance = {
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
} as const;

// ─── Scale ─────────────────────────────────────────────────────

/** Scale transforms for interactive states */
export const scale = {
  hover: 0.98,
  pressed: 1.02,
  appear: 0,
} as const;

// ─── Spring Configs ────────────────────────────────────────────

/** Spring physics for natural motion (for use with framer-motion) */
export const spring = {
  /** Gentle — subtle, elegant feel */
  gentle: { type: 'spring' as const, stiffness: 300, damping: 30 },
  /** Bouncy — playful, energetic */
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 25 },
  /** Stiff — precise, mechanical */
  stiff: { type: 'spring' as const, stiffness: 500, damping: 35 },
} as const;

// ─── Shadow ────────────────────────────────────────────────────

export const shadow = {
  xs: '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
  sm: '0px 2px 8px 0px rgba(0, 0, 0, 0.12)',
  md: '0px 8px 24px -2px rgba(0, 0, 0, 0.20)',
  lg: '0px 16px 48px -4px rgba(0, 0, 0, 0.24)',
  xl: '0px 32px 96px -8px rgba(0, 0, 0, 0.28)',
  brand: '0 4px 14px -2px rgba(97, 80, 246, 0.25)',
  brandLg: '0 8px 24px -4px rgba(97, 80, 246, 0.35)',
  innerSm: 'inset 0px 2px 8px 0px rgba(0, 0, 0, 0.12)',
  innerMd: 'inset 0px 8px 24px -2px rgba(0, 0, 0, 0.20)',
} as const;

/** Shadow values for dark mode */
export const shadowDark = {
  xs: '0px 1px 2px 0px rgba(0, 0, 0, 0.32)',
  sm: '0px 2px 8px 0px rgba(0, 0, 0, 0.36)',
  md: '0px 8px 24px -2px rgba(0, 0, 0, 0.44)',
  lg: '0px 16px 48px -4px rgba(0, 0, 0, 0.52)',
  xl: '0px 32px 96px -8px rgba(0, 0, 0, 0.60)',
  brand: '0 4px 14px -2px rgba(94, 135, 255, 0.30)',
  brandLg: '0 8px 24px -4px rgba(94, 135, 255, 0.40)',
  innerSm: 'inset 0px 2px 8px 0px rgba(0, 0, 0, 0.36)',
  innerMd: 'inset 0px 8px 24px -2px rgba(0, 0, 0, 0.44)',
} as const;

// ─── Effects ───────────────────────────────────────────────────

export const blur = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
} as const;

export const stroke = {
  hairline: '1px',
  thin: '1.5px',
  medium: '2px',
} as const;

export const opacity = {
  0: 0,
  5: 0.05,
  10: 0.1,
  20: 0.2,
  40: 0.4,
  60: 0.6,
  80: 0.8,
  100: 1,
} as const;

// ─── Z-Index ───────────────────────────────────────────────────

export const zIndex = {
  behind: -1,
  base: 0,
  above: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  toast: 600,
  tooltip: 700,
} as const;

// ─── All Motion ────────────────────────────────────────────────

export const motion = {
  ease,
  duration,
  distance,
  scale,
  spring,
  shadow,
  shadowDark,
  blur,
  stroke,
  opacity,
  zIndex,
} as const;
