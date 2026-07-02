import { Link } from "react-router";
import { ArrowRight, Monitor, Code2, SearchCheck, Layers, Check } from "lucide-react";
import { motion } from "motion/react";
import SEO, { serviceSchema } from "../components/SEO";

const services = [
  { slug:"website-design", icon:Monitor, title:"Website Design", tagline:"Sites that convert browsers into buyers", desc:"We design high-converting websites that balance beauty with function. Every page is crafted with your audience's intent in mind — not just aesthetics.", features:["UX wireframes & information architecture","Full visual design in Figma","Responsive across all devices","Conversion rate optimization","Interactive prototype","Developer handoff file"], from:"₹40,000", bgColor:"#F2F0FF", iconColor:"#6150F6" },
  { slug:"web-development", icon:Code2, title:"Web Development", tagline:"Fast, clean code built to last", desc:"Modern stacks, accessible markup, and performance-first builds. 95+ PageSpeed score, sub-2s load times, and WCAG AA accessibility on every project.", features:["React / Next.js development","CMS integration (Webflow, Sanity)","Performance optimization","WCAG AA accessibility","SEO-optimized markup","30-day post-launch support"], from:"₹50,000", bgColor:"#EFF6FF", iconColor:"#2563EB" },
  { slug:"seo", icon:SearchCheck, title:"SEO", tagline:"Get found by buyers who are ready", desc:"Strategic on-page SEO, technical audits, and content architecture that puts you in front of high-intent audiences — and keeps you there.", features:["Technical SEO audit","Keyword strategy & mapping","On-page optimization","Core Web Vitals improvement","Monthly reporting","Content recommendations"], from:"₹15,000/mo", bgColor:"#F0FDF4", iconColor:"#16A34A" },
  { slug:"digital-design", icon:Layers, title:"Digital Design", tagline:"Brand systems that scale with you", desc:"Logos, visual systems, motion assets, and brand guidelines that make every touchpoint — from pitch decks to social — instantly recognizable.", features:["Logo design & wordmark","Visual identity system","Typography & color palette","Brand guidelines (PDF + Figma)","Motion assets","Social media kit"], from:"₹25,000", bgColor:"#FFFBEB", iconColor:"#D97706" },
];

export default function Services() {
  return (
    <div className="bg-background">
      <SEO
        title="Services"
        description="Website design, web development, SEO, and brand identity services. We build brands that convert for startups and growing businesses."
        url="/services"
        structuredData={serviceSchema}
      />
      <section className="border-b border-border py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-muted-foreground mb-3" style={{ fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em" }}>Services</p>
          <h1 className="text-foreground mb-4" style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.1 }}>Everything you need to win online.</h1>
          <p className="text-muted-foreground max-w-xl" style={{ fontSize:"17px", lineHeight:1.65 }}>Four disciplines where strategy and design intersect. Delivered as a complete package or individually.</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 space-y-5">
        {services.map(({ slug, icon:Icon, title, tagline, desc, features, from, bgColor, iconColor }, i) => (
          <motion.div key={slug} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.35, delay:i * 0.07 }} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
              <div className="p-7 lg:p-8">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background:bgColor }}>
                    <Icon className="w-5 h-5" style={{ color:iconColor }} />
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5" style={{ fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.07em" }}>{title}</p>
                    <h2 className="text-foreground" style={{ fontSize:"22px", fontWeight:700, letterSpacing:"-0.015em" }}>{tagline}</h2>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6" style={{ fontSize:"15px", lineHeight:1.7 }}>{desc}</p>
                <div className="grid grid-cols-2 gap-2">
                  {features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-success shrink-0" />
                      <span className="text-muted-foreground" style={{ fontSize:"13px" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t lg:border-t-0 lg:border-l border-border p-7 lg:p-8 flex flex-col justify-between bg-secondary/50">
                <div>
                  <p className="text-muted-foreground mb-1" style={{ fontSize:"12px" }}>Starting from</p>
                  <p className="text-foreground mb-4" style={{ fontSize:"28px", fontWeight:800, letterSpacing:"-0.02em" }}>{from}</p>
                  <p className="text-muted-foreground" style={{ fontSize:"13px", lineHeight:1.55 }}>Every project begins with a discovery call to scope the work and confirm the fit.</p>
                </div>
                <div className="mt-6 space-y-2">
                  <Link to={`/services/${slug}`} className="flex items-center justify-center gap-2 bg-foreground text-background rounded-xl px-4 py-3.5 no-underline hover:bg-foreground/90 transition-colors" style={{ fontSize:"13px", fontWeight:600 }}>
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/discovery-call" className="flex items-center justify-center gap-2 text-foreground hover:bg-accent rounded-xl px-4 py-3.5 no-underline transition-colors" style={{ fontSize:"13px", fontWeight:500 }}>
                    Book a call
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
