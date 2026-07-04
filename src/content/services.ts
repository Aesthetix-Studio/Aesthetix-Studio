/**
 * Content — Services
 * Aesthetix Studio
 *
 * Service definitions used across the website.
 * Import from here instead of hardcoding in components.
 */

import { Monitor, Code2, SearchCheck, Layers } from 'lucide-react';
import type { ElementType } from 'react';

export interface Service {
  slug: string;
  icon: ElementType;
  title: string;
  tagline: string;
  headline: string;
  description: string;
  deliverables: string[];
  from: string;
  accent: string;
  iconBg: string;
  iconColor: string;
}

export const services: Service[] = [
  {
    slug: 'website-design',
    icon: Monitor,
    title: 'Website Design',
    tagline: 'Sites that convert browsers into buyers',
    headline: 'We design high-converting websites that balance beauty with function.',
    description: 'Every page is crafted with your audience\'s intent in mind — not just aesthetics.',
    deliverables: ['UX wireframes', 'Visual design', 'Responsive layouts', 'Conversion optimization'],
    from: '₹40,000',
    accent: 'from-violet-500/10 to-brand/5',
    iconBg: 'bg-brand-muted',
    iconColor: 'text-brand',
  },
  {
    slug: 'web-development',
    icon: Code2,
    title: 'Web Development',
    tagline: 'Fast, clean code built to last',
    headline: 'Modern stacks, accessible markup, and performance-first builds.',
    description: 'Your site will load in under 2 seconds and score 95+ on Google PageSpeed.',
    deliverables: ['React / Next.js', 'CMS integration', 'Performance tuning', 'Accessibility (WCAG AA)'],
    from: '₹50,000',
    accent: 'from-blue-500/10 to-cyan-500/5',
    iconBg: 'bg-blue-50 dark:bg-blue-950/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    slug: 'seo',
    icon: SearchCheck,
    title: 'SEO',
    tagline: 'Get found by buyers who are ready',
    headline: 'Strategic on-page SEO, technical audits, and content architecture.',
    description: 'Puts you in front of high-intent audiences — and keeps you there.',
    deliverables: ['Technical audit', 'Keyword strategy', 'On-page optimization', 'Core Web Vitals'],
    from: '₹15,000/mo',
    accent: 'from-emerald-500/10 to-green-500/5',
    iconBg: 'bg-success-muted',
    iconColor: 'text-success',
  },
  {
    slug: 'digital-design',
    icon: Layers,
    title: 'Digital Design',
    tagline: 'Brand systems that scale with you',
    headline: 'Logos, visual systems, motion assets, and brand guidelines.',
    description: 'Makes every touchpoint — from pitch decks to social — instantly recognizable.',
    deliverables: ['Brand identity', 'Design system', 'Motion assets', 'Brand guidelines'],
    from: '₹25,000',
    accent: 'from-amber-500/10 to-orange-400/5',
    iconBg: 'bg-warning-muted',
    iconColor: 'text-warning',
  },
];
