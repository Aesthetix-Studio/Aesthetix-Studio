export interface PortfolioProject {
  id: number;
  title: string;
  cat: string;
  year: string;
  tags: string[];
  image: string;
  result: string;
}

/* ── 1. Minimal — "Mono Studio" ─────────────────────────────── */
export const minimalProjects: PortfolioProject[] = [
  { id:1, title:"Meridian Capital", cat:"Brand Identity", year:"2025", tags:["Fintech","Strategy"], image:"https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=500&fit=crop", result:"+3× leads" },
  { id:2, title:"Forma Architects", cat:"Web Design", year:"2025", tags:["Architecture","Portfolio"], image:"https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=500&fit=crop", result:"+210% traffic" },
  { id:3, title:"Nūmo Wellness", cat:"Brand Identity + Web", year:"2025", tags:["Health","DTC"], image:"https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=500&fit=crop", result:"4.9★ rating" },
  { id:4, title:"Kōdo Japanese Dining", cat:"Brand Identity", year:"2024", tags:["Hospitality","F&B"], image:"https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&h=500&fit=crop", result:"Sold out opening" },
  { id:5, title:"Terraform Ventures", cat:"Web Design", year:"2024", tags:["VC","B2B"], image:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop", result:"+180% pipeline" },
  { id:6, title:"Ōra Timepieces", cat:"E-Commerce", year:"2024", tags:["Luxury","D2C"], image:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=500&fit=crop", result:"+92% AOV" },
];

/* ── 2. Editorial — "The Chronicle" ─────────────────────────── */
export const editorialProjects: PortfolioProject[] = [
  { id:1, title:"The Power Series", cat:"Investigative", year:"2025", tags:["Politics","Investigation"], image:"https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop", result:"12M readers" },
  { id:2, title:"Mumbai Monographs", cat:"Long-Form", year:"2025", tags:["Culture","Narrative"], image:"https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=500&fit=crop", result:"Best in Class" },
  { id:3, title:"Climate Data Tracker", cat:"Data Journalism", year:"2025", tags:["Science","Data"], image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop", result:"+340% engagement" },
  { id:4, title:"The Art Issue", cat:"Cultural", year:"2024", tags:["Art","Culture"], image:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=500&fit=crop", result:"IPA Winner" },
  { id:5, title:"Budget Watch", cat:"Investigative", year:"2024", tags:["Economy","Policy"], image:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop", result:"+89% engagement" },
  { id:6, title:"The Identity Issue", cat:"Cultural", year:"2024", tags:["Society","Ideas"], image:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=500&fit=crop", result:"Grammy nom" },
];

/* ── 3. Premium SaaS — ClimateBridge ─────────────────────────── */
export const premiumSaasProjects: PortfolioProject[] = [
  { id:1, title:"Tata Steel Migration", cat:"Enterprise Deployment", year:"2025", tags:["Manufacturing","Scope 3"], image:"https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&h=500&fit=crop", result:"-28% emissions" },
  { id:2, title:"Unilever Supply Chain", cat:"Supplier Engagement", year:"2025", tags:["FMCG","Supply Chain"], image:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop", result:"12k suppliers" },
  { id:3, title:"Infosys Net-Zero Dashboard", cat:"Platform Design", year:"2025", tags:["IT Services","Dashboard"], image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop", result:"Real-time tracking" },
  { id:4, title:"HDFC Green Bonds", cat:"Reporting", year:"2024", tags:["Banking","CSRD"], image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop", result:"CSRD compliant" },
  { id:5, title:"Mahindra Fleet Electrification", cat:"Reduction Planning", year:"2024", tags:["Automotive","Fleet"], image:"https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop", result:"-40% fleet CO2" },
  { id:6, title:"Wipro Carbon Neutral Ops", cat:"Enterprise", year:"2024", tags:["IT Services","Operations"], image:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop", result:"Net-zero by 2030" },
];

/* ── 4. Restaurant — Saffron Kitchen ────────────────────────── */
export const creativeStudioProjects: PortfolioProject[] = [
  { id:1, title:"Saffron Risotto", cat:"Signature Main", year:"2025", tags:["Vegetarian","Chef's Pick"], image:"https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=500&fit=crop", result:"Most ordered" },
  { id:2, title:"Tandoori Lamb Chops", cat:"From the Grill", year:"2025", tags:["Non-Veg","Popular"], image:"https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=500&fit=crop", result:"Staff favourite" },
  { id:3, title:"Mango Sticky Rice", cat:"Dessert", year:"2025", tags:["Seasonal","Sweet"], image:"https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=500&fit=crop", result:"4.9★ rating" },
  { id:4, title:"Masala Chai Cocktail", cat:"Bar", year:"2024", tags:["Cocktail","Signature"], image:"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=500&fit=crop", result:"Top 50 Bar" },
  { id:5, title:"Sunday Brunch Thali", cat:"Brunch", year:"2024", tags:["Brunch","Weekend"], image:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop", result:"+180% covers" },
  { id:6, title:"Chef's Table Experience", cat:"Fine Dining", year:"2024", tags:["Exclusive","8-course"], image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop", result:"Sold out" },
];

/* ── 5. Enterprise — "Meridian Systems" ─────────────────────── */
export const enterpriseProjects: PortfolioProject[] = [
  { id:1, title:"Atlas Cloud Platform", cat:"Product Design", year:"2025", tags:["Cloud","Enterprise"], image:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop", result:"SOC 2 certified" },
  { id:2, title:"Vertex Compliance Hub", cat:"Dashboard Design", year:"2025", tags:["Compliance","FinTech"], image:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop", result:"$50M processed" },
  { id:3, title:"Horizon Health Systems", cat:"Enterprise UX", year:"2025", tags:["Healthcare","HIPAA"], image:"https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=500&fit=crop", result:"200k users" },
  { id:4, title:"Quantum Logistics", cat:"Platform Design", year:"2024", tags:["Supply Chain","B2B"], image:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop", result:"-35% downtime" },
  { id:5, title:"Stratos Aerospace", cat:"Infrastructure Design", year:"2024", tags:["Aerospace","Defense"], image:"https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=500&fit=crop", result:"ISO 27001" },
  { id:6, title:"Pinnacle Financial", cat:"Design System", year:"2024", tags:["Banking","Compliance"], image:"https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=500&fit=crop", result:"3x faster dev" },
];

/* ── 6. Luxury — "Maison Aurélien" ─────────────────────────── */
export const luxuryProjects: PortfolioProject[] = [
  { id:1, title:"Château Beaumont", cat:"Brand Identity", year:"2025", tags:["Hospitality","Wine"], image:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop", result:"Relais & Châteaux" },
  { id:2, title:"Maison de Parfum", cat:"Fragrance Launch", year:"2025", tags:["Fragrance","Luxury"], image:"https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=500&fit=crop", result:"+180% revenue" },
  { id:3, title:"Aurelian Watches", cat:"Product Design", year:"2025", tags:["Horology","D2C"], image:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=500&fit=crop", result:"SIHH debut" },
  { id:4, title:"Palazzo Versace Interiors", cat:"Interior Design", year:"2024", tags:["Interior","Luxury"], image:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=500&fit=crop", result:"Elle Decor" },
  { id:5, title:"Riviera Yacht Club", cat:"Brand Identity", year:"2024", tags:["Yachting","Lifestyle"], image:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=500&fit=crop", result:"500+ members" },
  { id:6, title:"Opus Jewels", cat:"E-Commerce", year:"2024", tags:["Jewelry","D2C"], image:"https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&h=500&fit=crop", result:"+240% AOV" },
];

/* ── 7. Startup — "Launchpad" ───────────────────────────────── */
export const startupProjects: PortfolioProject[] = [
  { id:1, title:"MealPrep AI", cat:"Product Design", year:"2025", tags:["FoodTech","AI"], image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop", result:"50k downloads" },
  { id:2, title:"GreenGrid Energy", cat:"Brand Identity", year:"2025", tags:["CleanTech","B2B"], image:"https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=500&fit=crop", result:"$3M seed" },
  { id:3, title:"PetPulse", cat:"Product Design", year:"2025", tags:["PetTech","D2C"], image:"https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop", result:"10k MAU" },
  { id:4, title:"ClassroomOS", cat:"UX Design", year:"2024", tags:["EdTech","SaaS"], image:"https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=500&fit=crop", result:"200 schools" },
  { id:5, title:"FitScore", cat:"Product Design", year:"2024", tags:["HealthTech","Fitness"], image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop", result:"App Store #3" },
  { id:6, title:"NomadHub", cat:"Product Design", year:"2024", tags:["Travel","Community"], image:"https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop", result:"15k members" },
];

/* ── 8. Music Label — Resonance Records ─────────────────────── */
export const modernTechProjects: PortfolioProject[] = [
  { id:1, title:"Anaya Rao — Velvet Dusk", cat:"Debut EP", year:"2025", tags:["Indie Pop","Debut"], image:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=500&fit=crop", result:"50M streams" },
  { id:2, title:"The Nighthaus — Glass Echoes", cat:"Album", year:"2025", tags:["Alt Rock","Album"], image:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop", result:"Billboard debut" },
  { id:3, title:"Priya Khan — Live at NSCI", cat:"Live Album", year:"2025", tags:["Classical","Live"], image:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=500&fit=crop", result:"Sold out venue" },
  { id:4, title:"Midnight Frequencies — Singles", cat:"Single Series", year:"2024", tags:["Electronic","Single"], image:"https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=500&fit=crop", result:"10M+ streams" },
  { id:5, title:"Resonance Festival 2024", cat:"Festival", year:"2024", tags:["Festival","Multi-genre"], image:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=500&fit=crop", result:"15k attendees" },
  { id:6, title:"Studio Session Series", cat:"Content", year:"2024", tags:["Content","Studio"], image:"https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=500&fit=crop", result:"2M views" },
];

/* ── 9. Fitness — Pulse Fitness ─────────────────────────────── */
export const brutalistProjects: PortfolioProject[] = [
  { id:1, title:"HIIT 60 Challenge", cat:"Group Program", year:"2025", tags:["HIIT","Challenge"], image:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop", result:"500+ joiners" },
  { id:2, title:"Corporate Wellness", cat:"B2B Program", year:"2025", tags:["Corporate","Wellness"], image:"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop", result:"20 companies" },
  { id:3, title:"Women's Strength Camp", cat:"Specialty", year:"2025", tags:["Women","Strength"], image:"https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=500&fit=crop", result:"120 members" },
  { id:4, title:"Marathon Training Program", cat:"Endurance", year:"2024", tags:["Running","Endurance"], image:"https://images.unsplash.com/photo-1461896836934-bd45ba8c9b4a?w=800&h=500&fit=crop", result:"95% completion" },
  { id:5, title:"Recovery Retreat Weekend", cat:"Wellness", year:"2024", tags:["Recovery","Retreat"], image:"https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=500&fit=crop", result:"Sold out" },
  { id:6, title:"Youth Athletics Program", cat:"Youth", year:"2024", tags:["Youth","Sports"], image:"https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&h=500&fit=crop", result:"80 athletes" },
];

/* ── 10. High-End Portfolio — "Atelier Noir" ────────────────── */
export const highEndProjects: PortfolioProject[] = [
  { id:1, title:"Vesper & Co.", cat:"Editorial Shoot", year:"2025", tags:["Jewelry","Editorial"], image:"https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&h=500&fit=crop", result:"Vogue feature" },
  { id:2, title:"Atelier Lumière", cat:"Campaign", year:"2025", tags:["Fashion","Haute Couture"], image:"https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop", result:"CFDA nominee" },
  { id:3, title:"Maison Noir Interiors", cat:"Lookbook", year:"2025", tags:["Interior","Architecture"], image:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=500&fit=crop", result:"AD100" },
  { id:4, title:"Éclat Perfumery", cat:"Product Photography", year:"2024", tags:["Fragrance","Luxury"], image:"https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=500&fit=crop", result:"+320% DTC" },
  { id:5, title:"Noir — Self Portraits", cat:"Fine Art", year:"2024", tags:["Photography","Art"], image:"https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=500&fit=crop", result:"Prix Pictet" },
  { id:6, title:"Sōl Architecture", cat:"Architectural Photography", year:"2024", tags:["Architecture","Minimal"], image:"https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=500&fit=crop", result:"Pritzker shortlist" },
];

export const allProjects: Record<string, PortfolioProject[]> = {
  minimal: minimalProjects,
  editorial: editorialProjects,
  "premium-saas": premiumSaasProjects,
  "creative-studio": creativeStudioProjects,
  enterprise: enterpriseProjects,
  luxury: luxuryProjects,
  startup: startupProjects,
  "modern-tech": modernTechProjects,
  brutalist: brutalistProjects,
  "high-end-portfolio": highEndProjects,
};
