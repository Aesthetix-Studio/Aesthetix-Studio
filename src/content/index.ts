/**
 * Content — Index
 * Aesthetix Studio
 *
 * Central export for all structured content.
 * Import from here:
 *   import { services, testimonials, heroStats } from '@/content';
 */

export { services } from './services';
export type { Service } from './services';

export { homepageFaq, faqCategories } from './faq';
export type { FAQItem } from './faq';

export { testimonials } from './testimonials';
export type { Testimonial } from './testimonials';

export { heroStats, fullMetrics, aboutStats, studioStats } from './stats';
export type { Stat } from './stats';

export { processSteps } from './process';
export type { ProcessStep } from './process';

export { homepageClients, logoStripNames, clientLogos } from './clients';
export type { Client } from './clients';

export { pricingPlans } from './pricing';
export type { PricingPlan } from './pricing';

export { reasons, comparisonRows } from './whyUs';
export type { Reason, ComparisonRow } from './whyUs';

export { studio, collaborators } from './team';
export type { TeamMember } from './team';
