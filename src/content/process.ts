/**
 * Content — Process / Timeline
 * Aesthetix Studio
 *
 * Process steps used in the timeline section.
 * Import from here instead of hardcoding in components.
 */

import { Search, Lightbulb, Palette, Code2, Rocket } from 'lucide-react';
import type { ElementType } from 'react';

export interface ProcessStep {
  number: string;
  icon: ElementType;
  title: string;
  description: string;
  detail: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description: 'We start by getting inside your business. Goals, audience, competitive landscape, and positioning — nothing is assumed.',
    detail: '1–2 days · Kickoff call, brief, competitor audit',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Strategy',
    description: 'Positioning, messaging hierarchy, and a clear creative direction before a single pixel is placed.',
    detail: '2–3 days · Messaging doc, creative brief, moodboard',
  },
  {
    number: '03',
    icon: Palette,
    title: 'Design',
    description: 'Full visual design in Figma with a complete component library and interactive prototype.',
    detail: '1–2 weeks · Figma files, component library, prototype',
  },
  {
    number: '04',
    icon: Code2,
    title: 'Development',
    description: 'Clean, performant code with accessibility baked in. We build on React or your preferred stack.',
    detail: '1–2 weeks · Staging site, QA, PageSpeed 95+',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Launch',
    description: 'We go live and don\'t disappear. Launch day support, 30-day check-in, and optional ongoing retainer.',
    detail: '1 day + 30-day support · Analytics, redirects, SEO',
  },
];
