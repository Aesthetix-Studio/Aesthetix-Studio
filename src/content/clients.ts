/**
 * Content — Clients
 * Aesthetix Studio
 *
 * Client/partner logo data used across the website.
 * Import from here instead of hardcoding in components.
 */

export interface Client {
  name: string;
  industry?: string;
  color?: string;
}

export const homepageClients: Client[] = [
  { name: 'Luminary', industry: 'Finance', color: 'text-violet-500' },
  { name: 'Verdant', industry: 'Sustainability', color: 'text-emerald-500' },
  { name: 'Solari', industry: 'Energy', color: 'text-amber-500' },
  { name: 'Nexus', industry: 'Technology', color: 'text-blue-500' },
  { name: 'Helix', industry: 'Healthcare', color: 'text-rose-500' },
  { name: 'Orbit', industry: 'Technology', color: 'text-indigo-500' },
  { name: 'Capsule', industry: 'SaaS', color: 'text-cyan-500' },
  { name: 'Meridian', industry: 'Finance', color: 'text-teal-500' },
];

export const logoStripNames = ['Luminary', 'Verdant', 'Solari', 'Nexus', 'Helix', 'Orbit', 'Capsule', 'Meridian'];

export const clientLogos: Client[] = [
  { name: 'PhysioCore', industry: 'Healthcare', color: 'text-teal-500' },
  { name: 'Aurelia', industry: 'Creative', color: 'text-fuchsia-500' },
  { name: 'Review Harvest', industry: 'SaaS', color: 'text-emerald-500' },
  { name: 'LuxeTech', industry: 'E-Commerce', color: 'text-amber-500' },
  { name: 'ClimateBridge', industry: 'Sustainability', color: 'text-green-500' },
  { name: 'Mono Studio', industry: 'Agency', color: 'text-neutral-500' },
  { name: 'Nexus', industry: 'Technology', color: 'text-blue-500' },
  { name: 'Helix Medical', industry: 'Healthcare', color: 'text-rose-500' },
  { name: 'Solari Energy', industry: 'Energy', color: 'text-orange-500' },
  { name: 'Verdant', industry: 'Agriculture', color: 'text-lime-500' },
  { name: 'Orbit', industry: 'Technology', color: 'text-indigo-500' },
  { name: 'Meridian', industry: 'Finance', color: 'text-cyan-500' },
];
