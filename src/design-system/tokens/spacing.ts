/**
 * ADL Spacing Tokens
 * Aesthetix Design Language — 4-Point Grid System
 *
 * All spacing values are multiples of 4px.
 * Components should import from here, not use hardcoded values.
 */

// ─── Primitive Spacing (4px base) ──────────────────────────────

export const space = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
} as const;

// ─── Semantic: Section Spacing (vertical rhythm) ───────────────

export const sectionSpacing = {
  xs: space[16],    // 64px
  s: space[20],     // 80px
  m: space[24],     // 96px
  l: space[32],     // 128px
  xl: space[40],    // 160px
} as const;

// ─── Semantic: Component Spacing ───────────────────────────────

export const componentSpacing = {
  xs: space[4],     // 16px
  s: space[6],      // 24px
  m: space[8],      // 32px
  l: space[10],     // 40px
  xl: space[12],    // 48px
} as const;

// ─── Semantic: Inline Spacing ──────────────────────────────────

export const inlineSpacing = {
  xs: space[1],     // 4px
  s: space[2],      // 8px
  m: space[3],      // 12px
  l: space[4],      // 16px
  xl: space[6],     // 24px
} as const;

// ─── Content Rhythm ────────────────────────────────────────────

export const rhythm = {
  overlineGap: space[4],     // 16px
  titleGap: space[6],        // 24px
  descriptionGap: space[12], // 48px
  contentGap: space[24],     // 96px
} as const;

// ─── Container Widths ──────────────────────────────────────────

export const container = {
  content: '680px',
  reading: '720px',
  standard: '1200px',
  wide: '1440px',
} as const;

// ─── Grid ──────────────────────────────────────────────────────

export const grid = {
  columns: 12,
  gutter: space[6],
} as const;

// ─── Breakpoints (reference only — use Tailwind responsive prefixes) ──

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ─── All Spacing ───────────────────────────────────────────────

export const spacing = {
  space,
  section: sectionSpacing,
  component: componentSpacing,
  inline: inlineSpacing,
  rhythm,
  container,
  grid,
  breakpoints,
} as const;
