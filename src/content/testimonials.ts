/**
 * Content — Testimonials
 * Aesthetix Studio
 *
 * Client testimonials used across the website.
 * Import from here instead of hardcoding in components.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatarColor: string;
  stars: number;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Aesthetix completely transformed how our company presents itself online. Three weeks after launch, we closed a ₹15L deal where the client specifically mentioned our website as the reason they reached out.',
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'Luminary Financial',
    initials: 'SC',
    avatarColor: 'bg-violet-500',
    stars: 5,
  },
  {
    quote: 'I\'ve worked with five agencies over my career. Aesthetix is the first one that challenged our thinking before they started designing. The strategy session alone was worth the engagement.',
    name: 'Marcus Webb',
    role: 'Founder',
    company: 'Solari Energy',
    initials: 'MW',
    avatarColor: 'bg-amber-500',
    stars: 5,
  },
  {
    quote: 'Our organic traffic went up 148% in four months. More importantly, the leads actually convert — because the site speaks to the right audience from the first line of copy.',
    name: 'Priya Nair',
    role: 'Head of Marketing',
    company: 'Helix Medical',
    initials: 'PN',
    avatarColor: 'bg-rose-500',
    stars: 5,
  },
];
