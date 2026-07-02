import { Monitor, Code2, SearchCheck, Layers, BookOpen, PenTool, Camera, Music, FileText, Users, TrendingUp, Rocket, Server, Shield, BarChart3, Gem, Palette, Watch, Scissors, Flower2, Briefcase, GraduationCap, Megaphone, HandHelping, Terminal, Cpu, Database, Cloud, Coffee, Stamp, Frame, Box, Building2, Globe, Mic, Activity, UtensilsCrossed, Wine, ChefHat, Leaf } from "lucide-react";

export interface ServiceItem {
  icon: any;
  num: string;
  title: string;
  short: string;
  desc: string;
  result: string;
}

/* ── 1. Minimal — Mono Studio (Design Studio) ─────────────── */
export const minimalServices: ServiceItem[] = [
  { icon: PenTool, num: "01", title: "Brand Identity", short: "Brand", desc: "Strategic visual identities that distill complexity into clarity.", result: "3× recognition" },
  { icon: Monitor, num: "02", title: "Web Design", short: "Web", desc: "Minimal, high-performance websites built on restraint and hierarchy.", result: "98 Perf Score" },
  { icon: Camera, num: "03", title: "Art Direction", short: "Art Dir", desc: "Creative direction for photoshoots, campaigns, and editorial spreads.", result: "+210% engagement" },
  { icon: Layers, num: "04", title: "Packaging Design", short: "Pack", desc: "Tactile, shelf-ready packaging that communicates premium at first touch.", result: "4.9★ rating" },
];

/* ── 2. Editorial — The Chronicle (Publishing) ─────────────── */
export const editorialServices: ServiceItem[] = [
  { icon: BookOpen, num: "01", title: "Investigative Reporting", short: "Investigative", desc: "Deep-dive investigations into politics, business, and governance that hold power accountable.", result: "3 Pulitzer nods" },
  { icon: FileText, num: "02", title: "Long-Form Features", short: "Features", desc: "In-depth narratives and essays that explore the forces shaping modern India.", result: "12M readers" },
  { icon: PenTool, num: "03", title: "Data Journalism", short: "Data", desc: "Data-driven stories with interactive visualisations that make complex issues accessible.", result: "+340% engagement" },
  { icon: Globe, num: "04", title: "Cultural Commentary", short: "Culture", desc: "Criticism, profiles, and essays on art, film, literature, and the ideas that define a generation.", result: "IPA Winner" },
];

/* ── 3. Premium SaaS — ClimateBridge (Carbon Tracking SaaS) ── */
export const premiumSaasServices: ServiceItem[] = [
  { icon: Leaf, num: "01", title: "Carbon Tracking", short: "Tracking", desc: "Automated Scope 1, 2, and 3 emissions tracking across your entire value chain.", result: "2M+ tonnes tracked" },
  { icon: BarChart3, num: "02", title: "Reduction Roadmaps", short: "Reductions", desc: "AI-powered reduction strategies with milestone tracking and benchmark comparisons.", result: "-32% avg. reduction" },
  { icon: FileText, num: "03", title: "Compliance Reports", short: "Reports", desc: "Audit-ready CSRD, CDP, TCFD, and SEC Climate disclosures generated in minutes.", result: "1,200+ reports" },
  { icon: Users, num: "04", title: "Supplier Engagement", short: "Suppliers", desc: "Collect primary data from your supply chain with built-in surveys and integrations.", result: "50k+ suppliers" },
];

/* ── 4. Restaurant — Saffron Kitchen ────────────────────────── */
export const creativeStudioServices: ServiceItem[] = [
  { icon: UtensilsCrossed, num: "01", title: "Tasting Menu", short: "Dining", desc: "8-course seasonal tasting menu with wine pairings, updated monthly.", result: "4.8★ rating" },
  { icon: Users, num: "02", title: "Private Dining", short: "Private", desc: "Intimate private dining room for 12-40 guests. Custom menus and dedicated service.", result: "95% rebooked" },
  { icon: Wine, num: "03", title: "Cocktail Program", short: "Bar", desc: "Craft cocktails using house-made syrups, local spirits, and seasonal ingredients.", result: "Top 50 Bar" },
  { icon: ChefHat, num: "04", title: "Event Catering", short: "Catering", desc: "Full-service catering for weddings, corporate events, and private celebrations.", result: "200+ events/yr" },
];

/* ── 5. Enterprise — Meridian Systems (Enterprise Software) ── */
export const enterpriseServices: ServiceItem[] = [
  { icon: Cloud, num: "01", title: "Cloud Platform", short: "Cloud", desc: "Multi-tenant SaaS infrastructure with 99.99% uptime SLA.", result: "99.99% uptime" },
  { icon: Shield, num: "02", title: "Compliance Hub", short: "Compliance", desc: "SOC 2, ISO 27001, GDPR, and HIPAA compliance automation.", result: "SOC 2 certified" },
  { icon: BarChart3, num: "03", title: "Analytics Suite", short: "Analytics", desc: "Enterprise-grade business intelligence with real-time data pipelines.", result: "$50M processed" },
  { icon: Server, num: "04", title: "Infrastructure", short: "Infra", desc: "Dedicated environments, custom integrations, and 24/7 priority support.", result: "-35% downtime" },
];

/* ── 6. Luxury — Maison Aurélien (Luxury Atelier) ─────────── */
export const luxuryServices: ServiceItem[] = [
  { icon: Gem, num: "01", title: "Bespoke Branding", short: "Branding", desc: "Hand-crafted identities for heritage houses and luxury maisons.", result: "Relais & Châteaux" },
  { icon: Flower2, num: "02", title: "Fragrance Development", short: "Fragrance", desc: "Nose-led fragrance creation with bespoke bottle and packaging design.", result: "+180% revenue" },
  { icon: Watch, num: "03", title: "Horological Design", short: "Watches", desc: "Watch dial design, case sculpting, and limited edition concept development.", result: "SIHH debut" },
  { icon: Frame, num: "04", title: "Interior Curation", short: "Interior", desc: "Spatial design, material sourcing, and art direction for private residences.", result: "Elle Decor" },
];

/* ── 7. Startup — Launchpad (Startup Accelerator) ─────────── */
export const startupServices: ServiceItem[] = [
  { icon: Rocket, num: "01", title: "MVP Development", short: "MVP", desc: "From idea to launched product in 4 weeks — design, code, and deploy.", result: "50k downloads" },
  { icon: Palette, num: "02", title: "Brand Launch", short: "Brand", desc: "Startup branding, pitch decks, and launch-ready visual systems.", result: "$3M seed raised" },
  { icon: TrendingUp, num: "03", title: "Growth Marketing", short: "Growth", desc: "SEO, paid acquisition, and conversion optimization for early traction.", result: "+320% sales" },
  { icon: HandHelping, num: "04", title: "Fundraising Support", short: "Fundraise", desc: "Data rooms, investor decks, and narrative consulting for pre-seed to Series A.", result: "200 schools" },
];

/* ── 8. Music Label — Resonance Records ─────────────────────── */
export const modernTechServices: ServiceItem[] = [
  { icon: Users, num: "01", title: "Artist Management", short: "Management", desc: "Full-service artist management: branding, touring, sync licensing, and career strategy.", result: "120+ artists" },
  { icon: Music, num: "02", title: "Music Publishing", short: "Publishing", desc: "Songwriting camps, sync placement, and royalty administration worldwide.", result: "2B+ streams" },
  { icon: Globe, num: "03", title: "Distribution", short: "Distribution", desc: "Global digital distribution to 150+ platforms with transparent royalty splits.", result: "35 countries" },
  { icon: Mic, num: "04", title: "Recording Studio", short: "Studio", desc: "3 acoustically-treated rooms, analog & digital gear, in-house engineers.", result: "500+ sessions/yr" },
];

/* ── 9. Fitness — Pulse Fitness ─────────────────────────────── */
export const brutalistServices: ServiceItem[] = [
  { icon: TrendingUp, num: "01", title: "Personal Training", short: "1-on-1", desc: "Certified coaches, custom programs, and weekly check-ins. Results guaranteed.", result: "50k sessions" },
  { icon: Users, num: "02", title: "Group Classes", short: "Groups", desc: "HIIT, strength, yoga, and boxing — 40+ classes per week, all levels welcome.", result: "98% retention" },
  { icon: Activity, num: "03", title: "Recovery & Wellness", short: "Recovery", desc: "Cryotherapy, infrared sauna, sports massage, and physiotherapy on-site.", result: "4.9★ rating" },
  { icon: UtensilsCrossed, num: "04", title: "Nutrition Coaching", short: "Nutrition", desc: "Meal planning, macro tracking, and supplements guidance from registered dietitians.", result: "+320% results" },
];

/* ── 10. High-End Portfolio — Atelier Noir (Photographer) ──── */
export const highEndServices: ServiceItem[] = [
  { icon: Camera, num: "01", title: "Fashion Photography", short: "Fashion", desc: "Editorial and campaign photography for luxury and haute couture brands.", result: "Vogue feature" },
  { icon: Gem, num: "02", title: "Product Styling", short: "Product", desc: "High-end product photography, still life, and catalog direction.", result: "+320% DTC" },
  { icon: Palette, num: "03", title: "Art Direction", short: "Art Dir", desc: "Creative direction for lookbooks, campaigns, and visual narratives.", result: "CFDA nominee" },
  { icon: Frame, num: "04", title: "Gallery Curation", short: "Gallery", desc: "Exhibition curation, print editioning, and fine art advisory.", result: "Prix Pictet" },
];

export const allServices: Record<string, ServiceItem[]> = {
  minimal: minimalServices,
  editorial: editorialServices,
  "premium-saas": premiumSaasServices,
  "creative-studio": creativeStudioServices,
  enterprise: enterpriseServices,
  luxury: luxuryServices,
  startup: startupServices,
  "modern-tech": modernTechServices,
  brutalist: brutalistServices,
  "high-end-portfolio": highEndServices,
};
