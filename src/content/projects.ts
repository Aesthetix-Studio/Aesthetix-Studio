/**
 * Content — Featured Work
 * Aesthetix Studio
 *
 * Selected projects organized by challenge and outcome.
 */

export interface Project {
  name: string;
  industry: string;
  challenge: string;
  outcome: string;
  technologies: string[];
  image?: string;
}

export const projects: Project[] = [
  {
    name: "Luminary Financial",
    industry: "Fintech",
    challenge: "Create a premium digital presence for a boutique wealth management firm.",
    outcome: "A high-performance website that increased qualified leads by 67% within 90 days.",
    technologies: ["Next.js", "Sanity CMS", "Tailwind CSS"],
  },
  {
    name: "GreenLeaf Organics",
    industry: "E-commerce",
    challenge: "Rebuild a D2C brand with conversion-focused design and fast checkout.",
    outcome: "A Shopify-powered storefront with 42% higher conversion rate and 3.2× ROAS.",
    technologies: ["Shopify", "React", "Tailwind CSS"],
  },
  {
    name: "NovaMind AI",
    industry: "AI / SaaS",
    challenge: "Design and build an AI-powered analytics dashboard for enterprise clients.",
    outcome: "A scalable SaaS platform handling 10K+ daily active users with 99.9% uptime.",
    technologies: ["React", "Python", "OpenAI", "PostgreSQL"],
  },
  {
    name: "Artisan Collective",
    industry: "Luxury",
    challenge: "Create a premium editorial experience for a luxury jewellery brand.",
    outcome: "A digital showroom focused on storytelling and craftsmanship, 2.8× time-on-site.",
    technologies: ["Next.js", "Three.js", "Sanity CMS"],
  },
];
