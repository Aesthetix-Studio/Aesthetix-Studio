/**
 * Content — Team
 * Aesthetix Studio
 *
 * Team/studio information used across the website.
 * Import from here instead of hardcoding in components.
 */

export interface TeamMember {
  name: string;
  role?: string;
  initials: string;
  color: string;
  description: string;
}

export const studio = {
  name: 'Aesthetix Studio',
  role: 'Independent Digital Studio',
  initials: 'AS',
  bio: 'Aesthetix Studio is an independent digital experience studio focused on building high-performance websites, premium branding systems, and modern web applications. We collaborate with trusted specialists when projects require additional expertise.',
};

export const collaborators: TeamMember[] = [
  {
    name: 'Design Specialists',
    initials: 'DS',
    color: 'bg-violet-500',
    description: 'Brand identity, UI/UX, and design systems — brought in for projects that need deep visual expertise.',
  },
  {
    name: 'Development Specialists',
    initials: 'DE',
    color: 'bg-amber-500',
    description: 'React, Next.js, and modern web technologies — collaborative engineering for complex builds.',
  },
  {
    name: 'Strategy Specialists',
    initials: 'ST',
    color: 'bg-rose-500',
    description: 'Market research, brand positioning, and conversion strategy — data-driven creative direction.',
  },
];
