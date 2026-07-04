/**
 * Content — Capabilities
 * Aesthetix Studio
 *
 * "What We Build" — organized by business outcome, not service category.
 */

import { Globe, LayoutDashboard, Brain, Layers, Search, Gauge } from 'lucide-react';
import type { ElementType } from 'react';

export interface Capability {
  icon: ElementType;
  title: string;
  description: string;
}

export const capabilities: Capability[] = [
  {
    icon: Globe,
    title: "Digital Experiences",
    description: "Marketing websites and landing pages designed to convert visitors into customers.",
  },
  {
    icon: LayoutDashboard,
    title: "Web Applications",
    description: "Scalable SaaS products, dashboards, and internal platforms built for long-term growth.",
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Intelligent experiences that automate workflows and enhance customer interactions.",
  },
  {
    icon: Layers,
    title: "Design Systems",
    description: "Scalable design languages that create consistency across products and teams.",
  },
  {
    icon: Search,
    title: "Product Strategy",
    description: "Research, UX, and technical planning that reduce risk before development begins.",
  },
  {
    icon: Gauge,
    title: "Performance & SEO",
    description: "Fast, discoverable experiences engineered for search engines, AI search, and users.",
  },
];
