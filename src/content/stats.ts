/**
 * Content — Stats & Metrics
 * Aesthetix Studio
 *
 * Trust stats, metrics, and social proof data.
 * Import from here instead of hardcoding in components.
 */

export interface Stat {
  value: string;
  label: string;
  sublabel?: string;
}

/** Homepage hero trust stats */
export const heroStats: Stat[] = [
  { value: '80+', label: 'brands launched' },
  { value: '42%', label: 'avg. conversion lift' },
  { value: '4.2×', label: 'average ROI' },
  { value: '6 yrs', label: 'in the craft' },
];

/** Full metrics for stats bar */
export const fullMetrics: Stat[] = [
  { value: '80+', label: 'Brands Launched', sublabel: 'Across 12 industries' },
  { value: '42%', label: 'Avg. Conversion Lift', sublabel: 'Within first 90 days' },
  { value: '4.2×', label: 'Average ROI', sublabel: 'Within 6 months of launch' },
  { value: '₹50L+', label: 'Revenue Generated', sublabel: 'For clients since 2019' },
];

/** About page stats */
export const aboutStats: Stat[] = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '5+', label: 'Years of Craft' },
  { value: '10', label: 'Showcase Sites' },
];

/** Team/studio stats */
export const studioStats: Stat[] = [
  { value: '80+', label: 'Projects Delivered' },
  { value: '6+', label: 'Years in the Craft' },
  { value: '42%', label: 'Avg. Conversion Lift' },
];
