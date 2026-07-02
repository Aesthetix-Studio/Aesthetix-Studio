export interface PricingPlan {
  name: string;
  price: string;
  sub: string;
  desc: string;
  features: string[];
  cta: string;
  pop: boolean;
}

/* ── 1. Minimal — Mono Studio (Design Studio) ─────────────── */
export const minimalPlans: PricingPlan[] = [
  { name:"Essentials", price:"₹35,000", sub:"/project", desc:"Logo, brand guidelines, and a focused landing page.", features:["Brand mark + wordmark","Brand guidelines PDF","Single-page website","1 revision round","2-week delivery"], cta:"Begin", pop:false },
  { name:"Studio", price:"₹1,20,000", sub:"/project", desc:"Complete brand identity with a multi-page portfolio site.", features:["Full identity system","5-page website","Stationery suite","Brand photography art direction","3 revision rounds","4-week delivery"], cta:"Start", pop:true },
  { name:"Retainer", price:"₹80,000", sub:"/month", desc:"Ongoing design support for studios scaling fast.", features:["Unlimited requests","48h turnaround","Dedicated designer","Monthly strategy call","Priority scheduling","Figma file access"], cta:"Apply", pop:false },
];

/* ── 2. Editorial — The Chronicle (Publishing) ─────────────── */
export const editorialPlans: PricingPlan[] = [
  { name:"Digital", price:"₹299", sub:"/month", desc:"Full web access, mobile apps, daily newsletter, and complete archive.", features:["Unlimited web access","iOS and Android apps","Daily morning newsletter","Full archive access","Ad-free reading"], cta:"Subscribe", pop:false },
  { name:"Print + Digital", price:"₹599", sub:"/month", desc:"Everything in Digital plus weekly print delivery and collector editions.", features:["Everything in Digital","Weekly print delivery","Collector edition access","Priority customer support","Exclusive events"], cta:"Subscribe", pop:true },
  { name:"Premium", price:"₹999", sub:"/month", desc:"Everything in Print plus early access, exclusive events, and ad-free reading.", features:["Everything in Print + Digital","Early access to stories","Exclusive journalist events","Ad-free experience","Annual print archive"], cta:"Go Premium", pop:false },
];

/* ── 3. Premium SaaS — ClimateBridge (Carbon Tracking SaaS) ── */
export const premiumSaasPlans: PricingPlan[] = [
  { name:"Starter", price:"$499", sub:"/month", desc:"For small businesses starting their sustainability journey.", features:["Scope 1 & 2 tracking","Up to 50 data points","Basic dashboards","Quarterly reports","Email support"], cta:"Start Free Trial", pop:false },
  { name:"Growth", price:"$2,499", sub:"/month", desc:"For mid-market companies with growing ESG reporting needs.", features:["Scope 1, 2 & 3 tracking","Unlimited data points","AI reduction roadmaps","CDP & TCFD reports","API access","Dedicated CSM"], cta:"Get Started", pop:true },
  { name:"Enterprise", price:"Custom", sub:"", desc:"For large organizations with complex supply chains and compliance requirements.", features:["Multi-entity support","Custom integrations","On-premise option","CSRD & SEC reports","Supplier portal","Training & onboarding","SLA guarantee"], cta:"Contact Sales", pop:false },
];

/* ── 4. Restaurant — Saffron Kitchen ────────────────────────── */
export const creativeStudioPlans: PricingPlan[] = [
  { name:"À La Carte", price:"₹2,500", sub:"/person", desc:"Order from our seasonal à la carte menu. Walk-ins welcome.", features:["Seasonal small plates","Craft cocktail pairing","Vegetarian options","Weekend brunch menu"], cta:"Reserve", pop:false },
  { name:"Tasting Menu", price:"₹6,500", sub:"/person", desc:"8-course chef's tasting menu with wine and cocktail pairings.", features:["8-course seasonal menu","Wine pairing option","Amuse-bouche","Pre-dessert","Chef's table available"], cta:"Book Tasting", pop:true },
  { name:"Private Events", price:"₹3,00,000", sub:"/event", desc:"Full private dining experience for groups of 12-40 guests.", features:["Exclusive room hire","Custom 5-course menu","Welcome drinks","Dedicated staff","Floral styling","AV setup"], cta:"Plan Event", pop:false },
];

/* ── 5. Enterprise — Meridian Systems (Enterprise Software) ── */
export const enterprisePlans: PricingPlan[] = [
  { name:"Starter", price:"$2,500", sub:"/month", desc:"For teams up to 25 users needing core platform access.", features:["Up to 25 seats","Core platform modules","99.9% SLA","Email support","Basic analytics","Standard integrations"], cta:"Start Trial", pop:false },
  { name:"Growth", price:"$12,000", sub:"/month", desc:"For scaling organizations with advanced compliance needs.", features:["Up to 200 seats","All platform modules","99.99% SLA","24/7 phone support","Advanced analytics","Custom integrations","Dedicated CSM"], cta:"Contact Sales", pop:true },
  { name:"Enterprise", price:"Custom", sub:"", desc:"For global organizations requiring dedicated infrastructure.", features:["Unlimited seats","On-premise option","99.999% SLA","Dedicated support team","Custom SLA","White-label","Audit logs","SAML SSO"], cta:"Request Demo", pop:false },
];

/* ── 6. Luxury — Maison Aurélien (Luxury Atelier) ─────────── */
export const luxuryPlans: PricingPlan[] = [
  { name:"Signature", price:"₹5,00,000", sub:"/commission", desc:"A bespoke creative commission for discerning private clients.", features:["Personal consultation","Mood & material sourcing","Hand-crafted deliverables","Private presentation","3 refinement sessions"], cta:"Enquire", pop:false },
  { name:"Maison", price:"₹25,00,000", sub:"/commission", desc:"A comprehensive brand or interior commission with full art direction.", features:["Brand identity system","Printed collateral suite","Photography direction","Packaging design","Legacy documentation"], cta:"Private Consultation", pop:true },
  { name:"Patron", price:"By invitation", sub:"", desc:"An ongoing relationship for collectors and heritage institutions.", features:["Unlimited commissions","Priority scheduling","Global sourcing network","Private viewings","Annual review dinner"], cta:"Request Introduction", pop:false },
];

/* ── 7. Startup — Launchpad (Startup Accelerator) ─────────── */
export const startupPlans: PricingPlan[] = [
  { name:"Launch", price:"₹25,000", sub:"/month", desc:"Everything a founder needs to go from idea to live product.", features:["Brand identity","5-page website","Basic SEO","Google Analytics setup","2-week delivery"], cta:"Get Started", pop:false },
  { name:"Scale", price:"₹75,000", sub:"/month", desc:"For startups ready to professionalize their brand and web presence.", features:["Full brand system","8-page website + blog","SEO + content strategy","Motion assets","Pitch deck design","4-week delivery"], cta:"Start Project", pop:true },
  { name:"Fundraise", price:"₹1,50,000", sub:"/project", desc:"Investor-ready brand and materials for pre-seed to Series A.", features:["Complete rebrand","Investor pitch deck","Data room design","Demo day materials","VC intro support","4-week sprint"], cta:"Apply Now", pop:false },
];

/* ── 8. Music Label — Resonance Records ─────────────────────── */
export const modernTechPlans: PricingPlan[] = [
  { name:"Distribution", price:"₹5,000", sub:"/year", desc:"Get your music on 150+ platforms worldwide. Keep 100% of your royalties.", features:["All major platforms","Spotify, Apple, YouTube","Weekly payouts","Analytics dashboard","Playlist pitching support"], cta:"Start Distributing", pop:false },
  { name:"Label Deal", price:"Revenue Split", sub:"", desc:"Full label services: marketing, PR, playlisting, and sync placement.", features:["Marketing & PR campaign","Playlist pitching","Sync licensing","Radio promotion","Social media management","Master ownership retained"], cta:"Submit Demo", pop:true },
  { name:"Studio Time", price:"₹8,000", sub:"/hour", desc:"Professional recording, mixing, and mastering in our 3-room facility.", features:["Choice of 3 rooms","Analog & digital gear","In-house engineer","Mixing & mastering","Session musician network","Revisions included"], cta:"Book Session", pop:false },
];

/* ── 9. Fitness — Pulse Fitness ─────────────────────────────── */
export const brutalistPlans: PricingPlan[] = [
  { name:"Drop-In", price:"₹800", sub:"/class", desc:"Pay per class. No commitment. Try any class on the schedule.", features:["Access to any class","Locker + towel","Post-workout smoothie","First class free"], cta:"Book Class", pop:false },
  { name:"Monthly", price:"₹4,999", sub:"/month", desc:"Unlimited classes, recovery access, and nutrition consult.", features:["Unlimited group classes","Recovery suite access","1 nutrition consult/month","App tracking","Guest passes (2)"], cta:"Join Now", pop:true },
  { name:"Personal", price:"₹15,000", sub:"/month", desc:"Full personal training with custom programming and coaching.", features:["3 PT sessions/week","Custom workout plan","Daily check-ins","Nutrition coaching","Recovery protocols","Priority booking"], cta:"Get Started", pop:false },
];

/* ── 10. High-End Portfolio — Atelier Noir (Photographer) ──── */
export const highEndPlans: PricingPlan[] = [
  { name:"Editorial", price:"₹1,50,000", sub:"/day", desc:"Full-day editorial shoot with creative direction and post-production.", features:["10-hour shoot day","Creative direction","50 retouched images","Commercial license","48h delivery"], cta:"Book Shoot", pop:false },
  { name:"Campaign", price:"₹5,00,000", sub:"/project", desc:"Multi-day campaign with full creative team and production.", features:["3-day shoot","Art direction team","Styling + props","150 retouched images","Motion clips","Usage rights"], cta:"Discuss Brief", pop:true },
  { name:"Representation", price:"Custom", sub:"", desc:"Exclusive representation for ongoing brand partnerships.", features:["Portfolio curation","Client introductions","Contract negotiation","Usage licensing","Annual strategy","Global network"], cta:"Apply", pop:false },
];

export const allPlans: Record<string, PricingPlan[]> = {
  minimal: minimalPlans,
  editorial: editorialPlans,
  "premium-saas": premiumSaasPlans,
  "creative-studio": creativeStudioPlans,
  enterprise: enterprisePlans,
  luxury: luxuryPlans,
  startup: startupPlans,
  "modern-tech": modernTechPlans,
  brutalist: brutalistPlans,
  "high-end-portfolio": highEndPlans,
};
