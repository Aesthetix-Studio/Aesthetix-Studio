import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import SEO from "../components/SEO";

const projects = [
  { slug:"physiocore", title:"PhysioCore", category:"Healthcare", tags:["Health","Web Design","Landing Page"], year:"2025", image:"/projects/physiocore-hero.png", gradient:"from-teal-500 via-cyan-600 to-blue-700", result:"Live", featured:true },
  { slug:"aurelia", title:"Aurelia", category:"Portfolio", tags:["Portfolio","Awwwards","Creative"], year:"2025", image:"/projects/aurelia-hero.png", gradient:"from-fuchsia-500 via-purple-600 to-violet-700", result:"Awwwards Style", featured:true },
  { slug:"review-harvest", title:"Review Harvest", category:"SaaS", tags:["SaaS","Review Management","Product"], year:"2025", image:"/projects/review-harvest-hero.png", gradient:"from-emerald-500 via-green-600 to-teal-700", result:"10k+ businesses", featured:true },
  { slug:"luxe-tech", title:"LuxeTech", category:"E-Commerce", tags:["E-Commerce","Design System","Premium"], year:"2025", image:"/projects/luxe-tech-hero.png", gradient:"from-amber-600 via-yellow-700 to-amber-800", result:"Commerce Kit", featured:false },
  { slug:"minimal", title:"Mono Studio", category:"Design Agency", tags:["Branding","Minimal","Identity"], year:"2025", image:"/screenshots/minimal-hero.png", gradient:"from-neutral-400 via-neutral-500 to-neutral-600", result:"+3× leads", featured:false },
  { slug:"editorial", title:"The Chronicle", category:"Publishing", tags:["Editorial","Journalism","Subscription"], year:"2025", image:"/screenshots/editorial-hero.png", gradient:"from-neutral-800 via-neutral-900 to-black", result:"12M readers", featured:false },
  { slug:"premium-saas", title:"ClimateBridge", category:"Sustainability SaaS", tags:["Carbon Tracking","ESG","Compliance"], year:"2025", image:"/screenshots/premium-saas-hero.png", gradient:"from-emerald-500 via-green-600 to-teal-700", result:"-32% emissions", featured:false },
  { slug:"creative-studio", title:"Saffron Kitchen", category:"Restaurant", tags:["F&B","Branding","Web Design"], year:"2025", image:"/screenshots/creative-studio-hero.png", gradient:"from-orange-500 via-red-500 to-rose-600", result:"+40% bookings", featured:false },
  { slug:"enterprise", title:"Meridian Systems", category:"Enterprise SaaS", tags:["Enterprise","B2B","Dashboard"], year:"2025", image:"/screenshots/enterprise-hero.png", gradient:"from-slate-600 via-slate-700 to-slate-800", result:"$2M ARR", featured:false },
  { slug:"luxury", title:"Maison Aurélien", category:"Luxury Goods", tags:["Luxury","Fragrance","Horology"], year:"2024", image:"/screenshots/luxury-hero.png", gradient:"from-amber-600 via-yellow-700 to-amber-800", result:"Relais & Châteaux", featured:false },
  { slug:"startup", title:"Launchpad", category:"Startup Studio", tags:["Startup","MVP","Product"], year:"2024", image:"/screenshots/startup-hero.png", gradient:"from-violet-600 via-purple-700 to-fuchsia-700", result:"50k downloads", featured:false },
  { slug:"modern-tech", title:"Resonance Records", category:"Music Label", tags:["Music","Artist Management","Publishing"], year:"2024", image:"/screenshots/modern-tech-hero.png", gradient:"from-purple-700 via-violet-600 to-pink-600", result:"2B+ streams", featured:false },
  { slug:"brutalist", title:"Pulse Fitness", category:"Fitness", tags:["Brutalist","Gym","Landing Page"], year:"2024", image:"/screenshots/brutalist-hero.png", gradient:"from-red-600 via-red-700 to-red-800", result:"3x signups", featured:false },
  { slug:"high-end-portfolio", title:"Atelier Studio", category:"Creative Portfolio", tags:["Portfolio","High-End","Creative"], year:"2024", image:"/screenshots/high-end-portfolio-hero.png", gradient:"from-stone-400 via-stone-500 to-stone-600", result:"Awwwards", featured:false },
];
const filters = ["All","Branding","Web Design","Development","SaaS","Product","Healthcare","Portfolio","E-Commerce"];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter(p => p.tags.some(t => t.toLowerCase().includes(active.toLowerCase())));
  return (
    <div className="bg-background">
      <SEO
        title="Portfolio"
        description="Explore our work — web design, brand identity, and development projects for startups and growing businesses."
        url="/portfolio"
      />
      <section className="border-b border-border py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-muted-foreground mb-3" style={{ fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em" }}>Portfolio</p>
            <h1 className="text-foreground" style={{ fontSize:"clamp(30px,5vw,50px)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.1 }}>
              Work that speaks<br /><span className="text-muted-foreground" style={{ fontWeight:600 }}>for itself.</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setActive(f)} className="px-4 py-2.5 rounded-full border transition-all" style={{ fontSize:"12px", fontWeight:500, background:active===f?"var(--foreground)":"var(--card)", color:active===f?"var(--background)":"var(--muted-foreground)", borderColor:active===f?"var(--foreground)":"var(--border)" }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <motion.div key={p.slug} layout initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3, delay:i*0.06 }}>
              <Link to={`/portfolio/${p.slug}`} className="block group no-underline">
                <div className="rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`relative ${p.featured ? "h-72" : "h-56"}`}>
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.fallback-gradient')) {
                          const div = document.createElement('div');
                          div.className = `fallback-gradient absolute inset-0 bg-gradient-to-br ${p.gradient}`;
                          parent.insertBefore(div, target);
                        }
                      }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} style={{ zIndex: -1 }} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute top-4 right-4 bg-black/25 backdrop-blur-sm rounded-lg px-2.5 py-1">
                      <span className="text-white" style={{ fontSize:"11px", fontWeight:600 }}>{p.result}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                      {p.tags.slice(0,2).map(t=><span key={t} className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white" style={{ fontSize:"10px", fontWeight:500 }}>{t}</span>)}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-4 border-t border-border/60">
                    <h3 className="text-foreground group-hover:text-brand transition-colors mb-0.5" style={{ fontSize:"14px", fontWeight:700 }}>{p.title}</h3>
                    <p className="text-muted-foreground" style={{ fontSize:"12px" }}>{p.category} · {p.year}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
