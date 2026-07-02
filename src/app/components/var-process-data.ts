import { Search, Lightbulb, Palette, Code2, Rocket, FileText, MessageCircle, Pencil, CheckCircle, Package, Send, Target, Users, BarChart3, Megaphone, Globe, Camera, Gem, Watch, Frame, Terminal, Cpu, Database, Cloud, Stamp, HandHelping, TrendingUp, Shield, Music, Headphones } from "lucide-react";

export interface ProcessStep {
  n: string;
  icon: any;
  title: string;
  short: string;
  desc: string;
  time: string;
}

/* ── 1. Minimal — Mono Studio (Design Studio) ─────────────── */
export const minimalSteps: ProcessStep[] = [
  { n:"01", icon:MessageCircle, title:"Brief", short:"Brief", desc:"Understanding your vision, audience, and constraints through a focused intake session.", time:"1 day" },
  { n:"02", icon:Search, title:"Research", short:"Research", desc:"Competitive landscape, audience insights, and visual territory exploration.", time:"2–3 days" },
  { n:"03", icon:Palette, title:"Concept", short:"Concept", desc:"Three distinct creative directions — each with mood boards, type studies, and rationale.", time:"1 week" },
  { n:"04", icon:Pencil, title:"Refinement", short:"Refine", desc:"Selected direction refined into a complete identity system with guidelines.", time:"1–2 weeks" },
  { n:"05", icon:Package, title:"Delivery", short:"Deliver", desc:"Final files, brand guidelines, and handoff documentation. Clean, organized, ready to use.", time:"3 days" },
];

/* ── 2. Editorial — The Chronicle (Publishing) ─────────────── */
export const editorialSteps: ProcessStep[] = [
  { n:"01", icon:Search, title:"Research", short:"Research", desc:"Source investigation, document review, and source development.", time:"2–4 weeks" },
  { n:"02", icon:FileText, title:"Reporting", short:"Report", desc:"Interviews, field reporting, and data collection.", time:"3–6 weeks" },
  { n:"03", icon:Pencil, title:"Writing", short:"Write", desc:"Drafting, narrative structure, and fact-checking.", time:"2–4 weeks" },
  { n:"04", icon:Palette, title:"Editing", short:"Edit", desc:"Line editing, copy editing, legal review, and headline crafting.", time:"1–2 weeks" },
  { n:"05", icon:Send, title:"Publishing", short:"Publish", desc:"Print layout, digital formatting, and multi-platform distribution.", time:"3 days" },
];

/* ── 3. Premium SaaS — ClimateBridge (Carbon Tracking SaaS) ── */
export const premiumSaasSteps: ProcessStep[] = [
  { n:"01", icon:Target, title:"Data Audit", short:"Audit", desc:"Map your emission sources, data flows, and existing reporting infrastructure.", time:"1 week" },
  { n:"02", icon:Cloud, title:"Integration", short:"Integrate", desc:"Connect ERP, utility bills, fleet data, and supplier systems via API or CSV.", time:"2 weeks" },
  { n:"03", icon:BarChart3, title:"Baseline Report", short:"Baseline", desc:"Establish your Scope 1, 2, and 3 baseline with audit-ready documentation.", time:"1 week" },
  { n:"04", icon:Lightbulb, title:"Reduction Plan", short:"Plan", desc:"AI-generated reduction roadmap with targets, timelines, and ROI projections.", time:"1 week" },
  { n:"05", icon:Rocket, title:"Go Live", short:"Launch", desc:"Real-time dashboards, automated reporting, and ongoing optimization support.", time:"1 day" },
];

/* ── 4. Creative Studio — Flux Creative (Creative Agency) ──── */
export const creativeStudioSteps: ProcessStep[] = [
  { n:"01", icon:MessageCircle, title:"Discovery", short:"Discover", desc:"Brand immersion workshop, stakeholder interviews, and audience mapping.", time:"1 week" },
  { n:"02", icon:Target, title:"Strategy", short:"Strategy", desc:"Positioning, messaging framework, and creative territory definition.", time:"1–2 weeks" },
  { n:"03", icon:Palette, title:"Creative", short:"Creative", desc:"Visual identity, campaign concepts, and multi-channel asset development.", time:"2–3 weeks" },
  { n:"04", icon:BarChart3, title:"Launch", short:"Launch", desc:"Campaign deployment, media coordination, and performance tracking.", time:"1 week" },
  { n:"05", icon:TrendingUp, title:"Optimize", short:"Optimize", desc:"A/B testing, performance analysis, and iterative creative refinement.", time:"Ongoing" },
];

/* ── 5. Enterprise — Meridian Systems (Enterprise Software) ── */
export const enterpriseSteps: ProcessStep[] = [
  { n:"01", icon:Users, title:"Stakeholder Alignment", short:"Align", desc:"Requirements gathering, compliance review, and technical architecture planning.", time:"2 weeks" },
  { n:"02", icon:Target, title:"Solution Design", short:"Design", desc:"System architecture, integration mapping, and security protocol definition.", time:"3–4 weeks" },
  { n:"03", icon:Code2, title:"Implementation", short:"Build", desc:"Phased deployment with CI/CD pipelines, testing, and compliance validation.", time:"6–8 weeks" },
  { n:"04", icon:Shield, title:"Security Review", short:"Secure", desc:"Penetration testing, SOC 2 audit preparation, and vulnerability assessment.", time:"2 weeks" },
  { n:"05", icon:Rocket, title:"Go-Live", short:"Launch", desc:"Production deployment, monitoring setup, and 24/7 support handoff.", time:"1 week + SLA" },
];

/* ── 6. Luxury — Maison Aurélien (Luxury Atelier) ─────────── */
export const luxurySteps: ProcessStep[] = [
  { n:"01", icon:Gem, title:"Private Consultation", short:"Consult", desc:"An intimate meeting to understand your vision, heritage, and aspirations.", time:"By appointment" },
  { n:"02", icon:Search, title:"Material Sourcing", short:"Source", desc:"Global network of artisan suppliers, rare materials, and heritage craftspeople.", time:"2–4 weeks" },
  { n:"03", icon:Palette, title:"Atelier Work", short:"Create", desc:"Hand-crafted development in our Paris atelier with milestone presentations.", time:"4–8 weeks" },
  { n:"04", icon:Frame, title:"Presentation", short:"Present", desc:"Private unveiling with detailed provenance documentation and care instructions.", time:"1 day" },
  { n:"05", icon:Package, title:"White-Glove Delivery", short:"Deliver", desc:"Insured, hand-delivered with certificate of authenticity and lifetime care.", time:"Scheduled" },
];

/* ── 7. Startup — Launchpad (Startup Accelerator) ─────────── */
export const startupSteps: ProcessStep[] = [
  { n:"01", icon:Lightbulb, title:"Ideation", short:"Ideate", desc:"Market validation, competitive analysis, and MVP scope definition.", time:"3 days" },
  { n:"02", icon:Target, title:"Strategy", short:"Strategy", desc:"Go-to-market plan, pricing model, and launch timeline.", time:"1 week" },
  { n:"03", icon:Palette, title:"Brand Build", short:"Brand", desc:"Identity, messaging, and launch-ready visual system.", time:"1 week" },
  { n:"04", icon:Code2, title:"MVP Launch", short:"Build", desc:"Design, develop, and deploy your minimum viable product.", time:"2–3 weeks" },
  { n:"05", icon:TrendingUp, title:"Growth", short:"Grow", desc:"SEO, paid acquisition, and conversion optimization for first 1,000 users.", time:"Ongoing" },
];

/* ── 8. Modern Tech — Resonance Records (Music Label) ───────── */
export const modernTechSteps: ProcessStep[] = [
  { n:"01", icon:MessageCircle, title:"Discovery", short:"Demo", desc:"Artist submissions reviewed by A&R. We listen to every demo within 2 weeks.", time:"2 weeks" },
  { n:"02", icon:Music, title:"Signing", short:"Sign", desc:"Deal negotiation, creative alignment, and project scoping with the artist.", time:"1–2 weeks" },
  { n:"03", icon:Headphones, title:"Recording", short:"Record", desc:"Studio sessions with world-class engineers and production support.", time:"2–8 weeks" },
  { n:"04", icon:Palette, title:"Production", short:"Produce", desc:"Mixing, mastering, artwork design, and marketing material creation.", time:"2–4 weeks" },
  { n:"05", icon:Globe, title:"Distribution", short:"Release", desc:"Global distribution to 150+ platforms with promotional campaign launch.", time:"Release day" },
];

/* ── 9. Brutalist — RAW FORM (Raw Creative) ────────────────── */
export const brutalistSteps: ProcessStep[] = [
  { n:"01", icon:MessageCircle, title:"BRIEF", short:"BRIEF", desc:"NO BULLSHIT. TELL US WHAT YOU NEED AND WHY IT MATTERS.", time:"1 DAY" },
  { n:"02", icon:Lightbulb, title:"CONCEPT", short:"CONCEPT", desc:"RAW IDEAS. NO MOOD BOARDS. JUST DIRECTION AND INTENT.", time:"3 DAYS" },
  { n:"03", icon:Pencil, title:"CREATE", short:"CREATE", desc:"HEADS DOWN. NO REVISIONS UNTIL THE WORK SPEAKS.", time:"1–2 WEEKS" },
  { n:"04", icon:CheckCircle, title:"REFINE", short:"REFINE", desc:"ONE ROUND. MAXIMUM IMPACT. ZERO COMPROMISE.", time:"2 DAYS" },
  { n:"05", icon:Rocket, title:"SHIP", short:"SHIP", desc:"LAUNCH AND NEVER LOOK BACK.", time:"1 DAY" },
];

/* ── 10. High-End Portfolio — Atelier Noir (Photographer) ──── */
export const highEndSteps: ProcessStep[] = [
  { n:"01", icon:Camera, title:"Pre-Production", short:"Pre", desc:"Creative brief, mood boarding, location scouting, and casting.", time:"1–2 weeks" },
  { n:"02", icon:MessageCircle, title:"Creative Direction", short:"Direct", desc:"Shot list refinement, styling direction, and production design.", time:"3–5 days" },
  { n:"03", icon:Camera, title:"Shoot Day", short:"Shoot", desc:"Full production with lighting, styling, and real-time creative review.", time:"1–3 days" },
  { n:"04", icon:Palette, title:"Post-Production", short:"Post", desc:"Culling, retouching, color grading, and format delivery.", time:"1–2 weeks" },
  { n:"05", icon:Package, title:"Delivery", short:"Deliver", desc:"Final files in all required formats with licensing documentation.", time:"3 days" },
];

export const allSteps: Record<string, ProcessStep[]> = {
  minimal: minimalSteps,
  editorial: editorialSteps,
  "premium-saas": premiumSaasSteps,
  "creative-studio": creativeStudioSteps,
  enterprise: enterpriseSteps,
  luxury: luxurySteps,
  startup: startupSteps,
  "modern-tech": modernTechSteps,
  brutalist: brutalistSteps,
  "high-end-portfolio": highEndSteps,
};
