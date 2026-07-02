import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

const projects = [
  { slug:"minimal", title:"Mono Studio", category:"Design Agency", tags:["Branding","Minimal","Identity"], year:"2025", gradient:"from-neutral-400 via-neutral-500 to-neutral-600", result:"+3× leads", featured:true },
  { slug:"editorial", title:"The Chronicle", category:"Publishing", tags:["Editorial","Journalism","Subscription"], year:"2025", gradient:"from-neutral-800 via-neutral-900 to-black", result:"12M readers", featured:false },
  { slug:"premium-saas", title:"ClimateBridge", category:"Sustainability SaaS", tags:["Carbon Tracking","ESG","Compliance"], year:"2025", gradient:"from-emerald-500 via-green-600 to-teal-700", result:"-32% avg. emissions", featured:true },
  { slug:"creative-studio", title:"Saffron Kitchen", category:"Restaurant", tags:["Indian","Fine Dining","Bangalore"], year:"2025", gradient:"from-amber-700 via-orange-600 to-red-700", result:"4.8★ rating", featured:false },
  { slug:"enterprise", title:"Meridian Systems", category:"Enterprise Tech", tags:["Enterprise","Cloud","B2B"], year:"2024", gradient:"from-blue-600 via-blue-700 to-indigo-800", result:"SOC 2 certified", featured:false },
  { slug:"luxury", title:"Maison Aurélien", category:"Luxury Goods", tags:["Luxury","Fragrance","Horology"], year:"2024", gradient:"from-amber-600 via-yellow-700 to-amber-800", result:"Relais & Châteaux", featured:true },
  { slug:"startup", title:"Launchpad", category:"Startup Studio", tags:["Startup","MVP","Product"], year:"2024", gradient:"from-violet-600 via-purple-700 to-fuchsia-700", result:"50k downloads", featured:false },
  { slug:"modern-tech", title:"Resonance Records", category:"Music Label", tags:["Music","Artist Management","Publishing"], year:"2024", gradient:"from-purple-700 via-violet-600 to-pink-600", result:"2B+ streams", featured:false },
  { slug:"brutalist", title:"Pulse Fitness", category:"Gym & Wellness", tags:["Fitness","Training","Recovery"], year:"2024", gradient:"from-red-600 via-red-500 to-orange-500", result:"50k sessions/mo", featured:false },
  { slug:"high-end-portfolio", title:"Atelier Noir", category:"Fashion Photography", tags:["Editorial","Campaign","Fine Art"], year:"2024", gradient:"from-neutral-500 via-stone-600 to-neutral-700", result:"Vogue feature", featured:false },
];
const filters = ["All","Branding","Web Design","Development","SaaS","Product"];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter(p => p.tags.some(t => t.toLowerCase().includes(active.toLowerCase())));
  return (
    <div className="bg-background">
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
                <div className={`bg-gradient-to-br ${p.gradient} rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                  <div className={`relative ${p.featured ? "h-72" : "h-56"}`}>
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
