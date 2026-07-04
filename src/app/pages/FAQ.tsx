import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import SEO, { faqSchema } from "../components/SEO";

const categories = [
  { name:"Working with Us", faqs:[
    { q:"What does your discovery call involve?", a:"It's a 30-minute conversation — not a sales pitch. We'll ask about your goals, target audience, timeline, and budget. You'll get a clear sense of whether we're the right fit." },
    { q:"How long does a typical project take?", a:"A focused 5-page website takes 4–6 weeks. Larger design systems or apps run 8–14 weeks. We share a detailed milestone schedule at kickoff." },
    { q:"How many clients do you take on at once?", a:"We cap at 4 concurrent active projects to maintain quality. We typically have 1–2 spots available each quarter." },
  ]},
  { name:"Design Process", faqs:[
    { q:"Do you work with existing brands?", a:"Yes. We can extend, refine, or work within existing brand systems. We always start with a brand audit to understand what's working before making recommendations." },
    { q:"What's included in a web design project?", a:"UX wireframes, full visual design in Figma, component library, interactive prototype, and responsive layouts. Source files are always included." },
    { q:"How do revisions work?", a:"Each package includes defined revision rounds at structured checkpoints. We use feedback forms to keep sessions focused and efficient." },
  ]},
  { name:"Pricing & Contracts", faqs:[
    { q:"Do you work with fixed or hourly pricing?", a:"We use fixed project pricing exclusively. You know the cost upfront with no surprises. Hourly billing creates the wrong incentives." },
    { q:"What's your payment structure?", a:"50% deposit to begin, 25% at design approval, 25% at project completion. Enterprise projects can be structured differently." },
    { q:"Do you offer retainers?", a:"Yes. Many clients move to a monthly retainer after their initial project for ongoing design, new pages, and SEO. Starting at ₹25,000/mo." },
  ]},
];

function FAQItem({ q, a }: { q:string; a:string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-b-0">
      <button className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-brand transition-colors" onClick={() => setOpen(!open)}>
        <span className="text-foreground" style={{ fontSize:"15px", fontWeight:500, lineHeight:1.4 }}>{q}</span>
        <motion.div animate={{ rotate:open ? 180 : 0 }} transition={{ duration:0.2 }} className="shrink-0">
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.22 }} style={{ overflow:"hidden" }}>
            <p className="pb-4 text-muted-foreground" style={{ fontSize:"14px", lineHeight:1.75 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const allFaqs = categories.flatMap(c => c.faqs);

export default function FAQ() {
  return (
    <div className="bg-background">
      <SEO
        title="FAQ"
        description="Frequently asked questions about our design process, pricing, timelines, and how we work with clients."
        url="/faq"
        structuredData={faqSchema(allFaqs)}
      />
      <section className="border-b border-border py-16 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-muted-foreground mb-3" style={{ fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em" }}>FAQ</p>
          <h1 className="text-foreground mb-4" style={{ fontSize:"clamp(30px,5vw,50px)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.1 }}>Everything you wanted to ask but didn't.</h1>
          <p className="text-muted-foreground" style={{ fontSize:"17px", lineHeight:1.65 }}>If you don't find your answer here, <Link to="/contact" className="text-brand hover:underline no-underline">get in touch</Link>.</p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 space-y-10">
        {categories.map(cat => (
          <div key={cat.name}>
            <h2 className="text-foreground mb-4" style={{ fontSize:"16px", fontWeight:700 }}>{cat.name}</h2>
            <div className="bg-card rounded-xl border border-border px-5">
              {cat.faqs.map(f => <FAQItem key={f.q} {...f} />)}
            </div>
          </div>
        ))}
        <div className="text-center py-8 bg-secondary/50 rounded-2xl border border-border">
          <p className="text-foreground mb-2" style={{ fontSize:"16px", fontWeight:700 }}>Still have questions?</p>
          <p className="text-muted-foreground mb-4" style={{ fontSize:"14px" }}>We respond within 4 business hours.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-lg no-underline hover:bg-brand-hover transition-colors" style={{ fontSize:"13px", fontWeight:600 }}>
            Send us a message
          </Link>
        </div>
      </div>
    </div>
  );
}
