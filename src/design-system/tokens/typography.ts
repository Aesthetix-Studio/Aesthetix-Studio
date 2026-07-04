/**
 * ADL Typography Tokens
 * Aesthetix Design Language — Typography System
 *
 * Font Families:
 *   - Display: DM Serif Display (editorial headlines)
 *   - Interface: Geist (body, UI, navigation)
 *   - Mono: JetBrains Mono (code, technical)
 *
 * Components should import from here, not use hardcoded values.
 */

// ─── Font Families ─────────────────────────────────────────────

export const fontFamily = {
  display: "'DM Serif Display', Georgia, 'Times New Roman', serif",
  interface: "'Geist', 'Inter', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
} as const;

// ─── Font Sizes (Primitive) ────────────────────────────────────

export const fontSize = {
  /** 80px — Hero headlines */
  displayHero: '5rem',
  /** 64px — Section headlines */
  displayLg: '4rem',
  /** 52px — Major headlines */
  displayMd: '3.25rem',
  /** 44px — Page titles */
  titleXl: '2.75rem',
  /** 36px — Section titles */
  titleLg: '2.25rem',
  /** 30px — Card titles */
  titleMd: '1.875rem',
  /** 24px — Subsection titles */
  titleSm: '1.5rem',
  /** 20px — Small titles */
  titleXs: '1.25rem',
  /** 18px — Tiny titles */
  titleXxs: '1.125rem',
  /** 18px — Large body text */
  bodyLg: '1.125rem',
  /** 16px — Default body text */
  bodyMd: '1rem',
  /** 14px — Small body text */
  bodySm: '0.875rem',
  /** 14px — Form labels */
  label: '0.875rem',
  /** 16px — Button text */
  button: '1rem',
  /** 12px — Captions, helper text */
  caption: '0.75rem',
  /** 12px — Overlines, category labels */
  overline: '0.75rem',
  /** 14px — Code blocks */
  code: '0.875rem',
} as const;

// ─── Font Weights ──────────────────────────────────────────────

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// ─── Line Heights (Primitive) ──────────────────────────────────

export const lineHeight = {
  displayHero: '4.75rem',
  displayLg: '4rem',
  displayMd: '3.4125rem',
  titleXl: '3.025rem',
  titleLg: '2.5875rem',
  titleMd: '2.25rem',
  titleSm: '1.875rem',
  titleXs: '1.625rem',
  titleXxs: '1.575rem',
  bodyLg: '1.8rem',
  bodyMd: '1.6rem',
  bodySm: '1.3125rem',
  label: '1.225rem',
  button: '1rem',
  caption: '1.125rem',
  overline: '1.125rem',
  code: '1.3125rem',
} as const;

// ─── Letter Spacing (Primitive) ────────────────────────────────

export const letterSpacing = {
  /** -0.15em — Hero display text */
  displayHero: '-0.15em',
  /** -0.08em — Large display text */
  displayLg: '-0.08em',
  /** -0.0325em — Medium display text */
  displayMd: '-0.0325em',
  /** 0.01em — Labels */
  label: '0.01em',
  /** 0.015em — Captions */
  caption: '0.015em',
  /** 0.06em — Overlines */
  overline: '0.06em',
} as const;

// ─── Typography Presets ────────────────────────────────────────

/** Pre-defined typography styles for common use cases */
export const typography = {
  /** Hero headline — DM Serif Display, 80px */
  displayHero: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.displayHero,
    lineHeight: lineHeight.displayHero,
    letterSpacing: letterSpacing.displayHero,
    fontWeight: fontWeight.bold,
  },
  /** Large headline — DM Serif Display, 64px */
  displayLg: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.displayLg,
    lineHeight: lineHeight.displayLg,
    letterSpacing: letterSpacing.displayLg,
    fontWeight: fontWeight.bold,
  },
  /** Medium headline — DM Serif Display, 52px */
  displayMd: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.displayMd,
    lineHeight: lineHeight.displayMd,
    letterSpacing: letterSpacing.displayMd,
    fontWeight: fontWeight.bold,
  },
  /** Page title — Geist, 44px */
  titleXl: {
    fontFamily: fontFamily.interface,
    fontSize: fontSize.titleXl,
    lineHeight: lineHeight.titleXl,
    fontWeight: fontWeight.bold,
  },
  /** Section title — Geist, 36px */
  titleLg: {
    fontFamily: fontFamily.interface,
    fontSize: fontSize.titleLg,
    lineHeight: lineHeight.titleLg,
    fontWeight: fontWeight.bold,
  },
  /** Card title — Geist, 30px */
  titleMd: {
    fontFamily: fontFamily.interface,
    fontSize: fontSize.titleMd,
    lineHeight: lineHeight.titleMd,
    fontWeight: fontWeight.bold,
  },
  /** Subsection title — Geist, 24px */
  titleSm: {
    fontFamily: fontFamily.interface,
    fontSize: fontSize.titleSm,
    lineHeight: lineHeight.titleSm,
    fontWeight: fontWeight.semibold,
  },
  /** Small title — Geist, 20px */
  titleXs: {
    fontFamily: fontFamily.interface,
    fontSize: fontSize.titleXs,
    lineHeight: lineHeight.titleXs,
    fontWeight: fontWeight.semibold,
  },
  /** Body large — Geist, 18px */
  bodyLg: {
    fontFamily: fontFamily.interface,
    fontSize: fontSize.bodyLg,
    lineHeight: lineHeight.bodyLg,
    fontWeight: fontWeight.regular,
  },
  /** Body default — Geist, 16px */
  bodyMd: {
    fontFamily: fontFamily.interface,
    fontSize: fontSize.bodyMd,
    lineHeight: lineHeight.bodyMd,
    fontWeight: fontWeight.regular,
  },
  /** Body small — Geist, 14px */
  bodySm: {
    fontFamily: fontFamily.interface,
    fontSize: fontSize.bodySm,
    lineHeight: lineHeight.bodySm,
    fontWeight: fontWeight.regular,
  },
  /** Label — Geist, 14px, semibold */
  label: {
    fontFamily: fontFamily.interface,
    fontSize: fontSize.label,
    lineHeight: lineHeight.label,
    letterSpacing: letterSpacing.label,
    fontWeight: fontWeight.medium,
  },
  /** Overline — Geist, 12px, uppercase, wide tracking */
  overline: {
    fontFamily: fontFamily.interface,
    fontSize: fontSize.overline,
    lineHeight: lineHeight.overline,
    letterSpacing: letterSpacing.overline,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase' as const,
  },
  /** Caption — Geist, 12px */
  caption: {
    fontFamily: fontFamily.interface,
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption,
    letterSpacing: letterSpacing.caption,
    fontWeight: fontWeight.regular,
  },
  /** Code — JetBrains Mono, 14px */
  code: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.code,
    lineHeight: lineHeight.code,
    fontWeight: fontWeight.regular,
  },
} as const;
