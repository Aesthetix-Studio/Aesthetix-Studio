/**
 * Content — Pricing
 * Aesthetix Studio
 *
 * Pricing plan data used across the website.
 * Import from here instead of hardcoding in components.
 */

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  highlights: string[];
  cta: string;
  popular: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '₹25,000',
    description: 'A focused brand and website for early-stage founders.',
    highlights: ['Brand identity kit', '5-page website', '2 revision rounds', '3-week delivery'],
    cta: 'Get started',
    popular: false,
  },
  {
    name: 'Growth',
    price: '₹75,000',
    description: 'Complete brand system and website for teams ready to scale.',
    highlights: ['Full brand system', '8-page custom website', 'SEO + analytics setup', 'Motion assets', '6-week delivery'],
    cta: 'Start your project',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Dedicated team for complex, multi-channel engagements.',
    highlights: ['Design system', 'Product UI/UX', 'Ongoing retainer', 'Priority delivery'],
    cta: 'Contact us',
    popular: false,
  },
];
