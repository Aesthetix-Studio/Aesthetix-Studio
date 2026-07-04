/**
 * Content — Why Us
 * Aesthetix Studio
 *
 * Differentiators and comparison data.
 * Import from here instead of hardcoding in components.
 */

import { Zap, Clock, Target, Shield, Users, DollarSign } from 'lucide-react';
import type { ElementType } from 'react';

export interface Reason {
  icon: ElementType;
  title: string;
  description: string;
}

export const reasons: Reason[] = [
  {
    icon: Target,
    title: 'Built to Convert',
    description: 'Every design decision is made with your business goals in mind — not awards, not trends. If it doesn\'t move the needle, it doesn\'t ship.',
  },
  {
    icon: Clock,
    title: 'Predictable Timelines',
    description: 'You\'ll always know exactly where we are. Milestones, check-ins, and delivery windows set at kickoff — no surprises.',
  },
  {
    icon: Zap,
    title: 'Fast Without Corners',
    description: 'Most projects complete in 4–6 weeks. We run a tight process so speed and quality aren\'t a tradeoff.',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'Fixed-price projects mean you know the cost before we start. No hourly billing, no scope creep, no hidden fees.',
  },
  {
    icon: Shield,
    title: 'Accessible by Default',
    description: 'WCAG AA compliance, semantic markup, and keyboard navigation are included in every project — not add-ons.',
  },
  {
    icon: Users,
    title: 'Small Team, Senior Work',
    description: 'You work directly with the designers building your project. No account managers. No hand-offs. No junior work.',
  },
];

export interface ComparisonRow {
  label: string;
  us: boolean;
  typical: boolean | string;
}

export const comparisonRows: ComparisonRow[] = [
  { label: 'Fixed-price projects', us: true, typical: false },
  { label: 'Direct senior designer access', us: true, typical: false },
  { label: 'WCAG AA included', us: true, typical: false },
  { label: 'Figma source files delivered', us: true, typical: 'Extra' },
  { label: '30-day post-launch support', us: true, typical: false },
  { label: 'Strategy before design', us: true, typical: false },
];
