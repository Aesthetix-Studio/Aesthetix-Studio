import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const team = [
  { name:"Anna Reeves", role:"Lead Designer & Co-founder", bio:"10 years in brand and product design. Previously at Figma and Stripe. Obsessed with type and the space between things.", initials:"AR", color:"#6150F6" },
  { name:"Kai Tanaka", role:"UI/UX Designer", bio:"Specializes in product design and motion. Believes great interaction design is invisible — until it isn't.", initials:"KT", color:"#F59E0B" },
  { name:"Lena Morris", role:"Brand Strategist", bio:"Former brand consultant at Interbrand. Turns 'we need a logo' into complete brand systems that work.", initials:"LM", color:"#EC4899" },
  { name:"Dev Sharma", role:"Frontend Developer", bio:"Writes the code that makes design real. Obsessive about performance, accessibility, and clean abstractions.", initials:"DS", color:"#10B981" },
];

const values = [
  { num:"01", title:"Restraint", desc:"We add nothing that doesn't earn its place. Every element serves the communication, not the portfolio." },
  { num:"02", title:"Precision", desc:"Typography kerned to the pixel. Spacing measured to the rem. Details aren't details — they're the whole thing." },
  { num:"03", title:"Honesty", desc:"We tell you when an idea won't work. The best client relationships are built on candor, not agreement." },
  { num:"04", title:"Craft", desc:"We take pride in work that holds up under scrutiny. Fast delivery is good. Good delivery is non-negotiable." },
];

export default function About() {
  return (
    <div className="bg-background">
      <section className="py-20 px-5 sm:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground mb-4" style={{ fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em" }}>About</p>
          <h1 className="text-foreground mb-6" style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.1 }}>
            We're a small studio that does exceptional work.
          </h1>
          <p className="text-muted-foreground max-w-2xl" style={{ fontSize:"18px", lineHeight:1.7 }}>
            Aesthetix Studio is a boutique design agency founded in 2019. We specialize in brand identity, web design, and digital products for founders and growing companies who understand that design is a business decision.
          </p>
        </div>
      </section>

      <section className="bg-foreground border-b border-border">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[["80+","Brands launched"],["6","Years in business"],["₹50L+","Client revenue"],["98%","Satisfaction rate"]].map(([v,l]) => (
            <div key={l} className="text-center">
              <div className="text-background" style={{ fontSize:"40px", fontWeight:800, letterSpacing:"-0.03em" }}>{v}</div>
              <div className="text-background/50" style={{ fontSize:"13px" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-5 sm:px-8 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-muted-foreground mb-12" style={{ fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em" }}>What We Believe</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div key={v.num} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.35, delay:i * 0.07 }}>
                <p className="mb-2" style={{ fontSize:"11px", fontFamily:"'JetBrains Mono',monospace", color:"var(--brand)" }}>{v.num}</p>
                <h3 className="text-foreground mb-2" style={{ fontSize:"20px", fontWeight:700 }}>{v.title}</h3>
                <p className="text-muted-foreground" style={{ fontSize:"15px", lineHeight:1.7 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-5 sm:px-8 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-muted-foreground mb-12" style={{ fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em" }}>The Team</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {team.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.3, delay:i * 0.07 }} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background:t.color, fontSize:"14px", fontWeight:700 }}>{t.initials}</div>
                  <div>
                    <div className="text-foreground" style={{ fontSize:"15px", fontWeight:700 }}>{t.name}</div>
                    <div className="text-muted-foreground" style={{ fontSize:"12px" }}>{t.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground" style={{ fontSize:"14px", lineHeight:1.65 }}>{t.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-5 sm:px-8 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-foreground mb-4" style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:800, letterSpacing:"-0.025em" }}>Want to work with us?</h2>
          <p className="text-muted-foreground mb-8" style={{ fontSize:"16px", lineHeight:1.65 }}>We take on a limited number of new projects each quarter. Reach out to check availability.</p>
          <Link to="/discovery-call" className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl no-underline hover:bg-brand-hover transition-colors" style={{ fontSize:"14px", fontWeight:600 }}>
            Book a Discovery Call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
