import { Link } from "react-router";
import { Clock } from "lucide-react";

const posts = [
  { slug:"systematic-design", title:"The Case for Systematic Design", excerpt:"Why ad hoc creative decisions always fail at scale — and how a design system changes everything.", category:"Design Systems", date:"Jun 14, 2026", readTime:"6 min", gradient:"from-violet-400 to-purple-600", author:"Anna Reeves", initials:"AR", featured:true },
  { slug:"motion-enterprise", title:"Motion Design Principles for Enterprise Software", excerpt:"How subtle animation cues improve usability in data-heavy interfaces without becoming a distraction.", category:"Motion Design", date:"May 28, 2026", readTime:"4 min", gradient:"from-blue-400 to-cyan-500", author:"Kai Tanaka", initials:"KT", featured:false },
  { slug:"typography-products", title:"Choosing Type for Digital Products", excerpt:"Variable fonts, optical sizing, and pairing logic for UI typography that scales without breaking.", category:"Typography", date:"May 10, 2026", readTime:"8 min", gradient:"from-amber-400 to-orange-500", author:"Lena Morris", initials:"LM", featured:false },
  { slug:"seo-agencies", title:"SEO for Creative Agencies: Stop Ignoring It", excerpt:"Why most creative agencies have terrible organic presence — and how to fix it in 90 days.", category:"SEO", date:"Apr 22, 2026", readTime:"5 min", gradient:"from-emerald-400 to-green-600", author:"Lena Morris", initials:"LM", featured:false },
  { slug:"dark-mode", title:"Dark Mode Done Right", excerpt:"The design decisions that separate a thoughtful dark mode from a quick color inversion.", category:"UI/UX", date:"Apr 5, 2026", readTime:"7 min", gradient:"from-slate-600 to-zinc-800", author:"Anna Reeves", initials:"AR", featured:false },
  { slug:"pricing-design", title:"How to Price Creative Work", excerpt:"A transparent look at how we think about pricing — and why cheap design costs more.", category:"Business", date:"Mar 18, 2026", readTime:"6 min", gradient:"from-rose-400 to-pink-600", author:"Mia Chen", initials:"MC", featured:false },
];

export default function Blog() {
  const featured = posts[0];
  const rest = posts.slice(1);
  return (
    <div className="bg-background">
      <section className="border-b border-border py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-muted-foreground mb-3" style={{ fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em" }}>Journal</p>
          <h1 className="text-foreground" style={{ fontSize:"clamp(30px,5vw,50px)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.1 }}>Design, strategy, and the craft.</h1>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <Link to={`/blog/${featured.slug}`} className="block group mb-12 no-underline">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`bg-gradient-to-br ${featured.gradient} h-72 lg:h-auto relative`}>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-brand-muted text-brand-muted-foreground" style={{ fontSize:"11px", fontWeight:500 }}>{featured.category}</span>
                <h2 className="text-foreground mt-4 mb-3 group-hover:text-brand transition-colors" style={{ fontSize:"clamp(20px,2.5vw,26px)", fontWeight:800, letterSpacing:"-0.02em", lineHeight:1.2 }}>{featured.title}</h2>
                <p className="text-muted-foreground" style={{ fontSize:"15px", lineHeight:1.65 }}>{featured.excerpt}</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white" style={{ fontSize:"10px", fontWeight:700 }}>{featured.initials}</div>
                  <div>
                    <div className="text-foreground" style={{ fontSize:"12px", fontWeight:600 }}>{featured.author}</div>
                    <div className="text-muted-foreground" style={{ fontSize:"11px" }}>{featured.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground" style={{ fontSize:"12px" }}>
                  <Clock className="w-3.5 h-3.5" /> {featured.readTime} read
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map(p => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="block group no-underline">
              <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className={`bg-gradient-to-br ${p.gradient} h-44`} />
                <div className="p-5">
                  <span className="px-2 py-0.5 rounded-full bg-brand-muted text-brand-muted-foreground" style={{ fontSize:"10px", fontWeight:500 }}>{p.category}</span>
                  <h3 className="text-foreground mt-2 mb-2 group-hover:text-brand transition-colors" style={{ fontSize:"15px", fontWeight:700, lineHeight:1.35, letterSpacing:"-0.01em" }}>{p.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2" style={{ fontSize:"13px", lineHeight:1.55 }}>{p.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <span className="text-muted-foreground" style={{ fontSize:"12px" }}>{p.date}</span>
                    <span className="flex items-center gap-1 text-muted-foreground" style={{ fontSize:"11px" }}><Clock className="w-3 h-3" /> {p.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
