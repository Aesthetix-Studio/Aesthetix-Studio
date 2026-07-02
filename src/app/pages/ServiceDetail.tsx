import { useParams, Link } from "react-router";
import { ArrowRight, ArrowLeft, Check, Clock, Package, Users, Star } from "lucide-react";
import { motion } from "motion/react";
import SEO from "../components/SEO";

const data: Record<string, {
  title: string; tagline: string; hero: string; intro: string;
  forWho: string[]; includes: string[]; timeline: string;
  deliverables: { item: string; desc: string }[];
  process: { step: string; desc: string }[];
  faqs: { q: string; a: string }[];
}> = {
  "website-design": {
    title: "Website Design",
    tagline: "Conversion-focused sites built to grow your business.",
    hero: "from-violet-500 to-blue-600",
    intro: "We design websites that do more than look good — they guide visitors toward a decision. Every layout, every headline, every CTA placement is intentional.",
    forWho: ["Founders launching or relaunching a brand", "B2B companies whose website isn't generating leads", "Startups preparing for fundraising or enterprise sales", "Professional service firms who've outgrown their current site"],
    includes: ["UX wireframes and information architecture", "Full visual design in Figma (all pages and breakpoints)", "Component library with variants and states", "Interactive prototype", "Developer handoff documentation", "Design tokens (color, type, spacing)"],
    timeline: "4–6 weeks",
    deliverables: [
      { item: "Figma source file", desc: "Every screen, every state, every component — organized and documented" },
      { item: "Design system", desc: "Tokens, component library, style guide" },
      { item: "Interactive prototype", desc: "Clickable prototype for stakeholder review and developer handoff" },
      { item: "Brand style guide", desc: "PDF + Figma version with usage guidelines" },
    ],
    process: [
      { step: "Discovery", desc: "Kickoff call, business goals audit, audience research, competitive analysis." },
      { step: "Strategy", desc: "Site map, messaging hierarchy, page structure, and conversion flow mapping." },
      { step: "Wireframes", desc: "Low-fidelity layouts for all key pages, reviewed and approved before visual design begins." },
      { step: "Visual Design", desc: "Full-fidelity Figma designs with your brand applied across all breakpoints." },
      { step: "Revision Rounds", desc: "Structured feedback sessions (not open-ended). 3 revision rounds included." },
      { step: "Handoff", desc: "Developer-ready Figma file with components, tokens, and specs." },
    ],
    faqs: [
      { q: "Do you write the copy?", a: "We provide a copy framework and messaging direction. We can work with your existing copy or connect you with our copywriting partners for an additional fee." },
      { q: "How many pages are included?", a: "A standard project covers 5–8 key pages. Additional pages are scoped and priced at the start — no surprises mid-project." },
      { q: "Can you redesign an existing website?", a: "Yes. We start with a conversion audit of your current site so we understand what's working and what isn't before touching the design." },
      { q: "What if I need changes after handoff?", a: "You have a 30-day window for post-launch revisions included in all packages. Beyond that, we offer a monthly design retainer." },
    ],
  },
  "web-development": {
    title: "Web Development",
    tagline: "Performant, accessible code built to scale.",
    hero: "from-blue-500 to-cyan-500",
    intro: "Clean code, fast load times, and accessibility baked in. We build with modern stacks and deliver production-ready sites that developers love working with.",
    forWho: ["Teams with Figma designs who need a developer", "Startups building their first marketing site", "Companies migrating from WordPress or Webflow", "Businesses needing custom integrations"],
    includes: ["React / Next.js or Webflow development", "CMS integration (Sanity, Contentful, or Webflow)", "Performance optimization (95+ PageSpeed)", "WCAG AA accessibility", "SEO-ready markup and schema", "Analytics and conversion tracking setup"],
    timeline: "3–5 weeks",
    deliverables: [
      { item: "Production codebase", desc: "Clean, well-documented code deployed to your preferred hosting" },
      { item: "CMS setup", desc: "Configured and ready for your team to manage content independently" },
      { item: "Performance report", desc: "Lighthouse audit showing scores across all key metrics" },
      { item: "Deployment guide", desc: "Documentation for your team to manage future updates" },
    ],
    process: [
      { step: "Kickoff", desc: "Tech stack decision, hosting setup, repository initialization, staging environment." },
      { step: "Build", desc: "Component-driven development with staging deployments at each milestone." },
      { step: "Integration", desc: "CMS, forms, analytics, and any third-party APIs connected and tested." },
      { step: "QA", desc: "Cross-browser testing, accessibility audit, performance pass, mobile testing." },
      { step: "Launch", desc: "Domain setup, redirects, analytics verification, and go-live." },
      { step: "Handoff", desc: "Walkthrough of the codebase and CMS with your team. 30-day support window." },
    ],
    faqs: [
      { q: "What CMS do you recommend?", a: "Sanity for content-rich sites, Webflow for marketing sites where the team wants to self-manage without code. Contentful for enterprise." },
      { q: "Can you build from our existing design?", a: "Yes — we can take designs from any tool (Figma, XD, Sketch, or even screenshots) and build them out." },
      { q: "Do you handle hosting?", a: "We set up hosting during the project (Vercel, Netlify, or Cloudflare Pages) and hand it over to you. Ongoing hosting management is available as a retainer." },
      { q: "What if we need backend functionality?", a: "Depending on complexity, we can build serverless API routes, connect to your existing backend, or scope a custom backend engagement." },
    ],
  },
  "seo": {
    title: "SEO",
    tagline: "Organic growth strategies for high-intent audiences.",
    hero: "from-emerald-500 to-green-600",
    intro: "Sustainable, high-intent organic traffic — not tricks. Our SEO work is rooted in technical fundamentals, strategic content architecture, and measurable outcomes.",
    forWho: ["B2B companies with long sales cycles who need organic inbound", "Startups ready to reduce paid acquisition costs", "Businesses who've rebuilt their site and need to protect/grow rankings", "Companies targeting competitive commercial-intent keywords"],
    includes: ["Full technical SEO audit", "Keyword research and commercial-intent mapping", "On-page optimization across all key pages", "Core Web Vitals improvement", "Internal linking architecture", "Monthly performance reports with recommendations"],
    timeline: "Ongoing monthly retainer",
    deliverables: [
      { item: "Technical audit report", desc: "Prioritized list of issues with implementation guidance" },
      { item: "Keyword strategy doc", desc: "Commercial-intent map with search volumes and difficulty scores" },
      { item: "Optimized page content", desc: "Revised meta titles, descriptions, headers, and body copy" },
      { item: "Monthly report", desc: "Rankings, traffic, conversions, and next 30-day priorities" },
    ],
    process: [
      { step: "Audit", desc: "Technical analysis of your site, indexation, Core Web Vitals, backlink profile, and competitor gap analysis." },
      { step: "Strategy", desc: "Keyword map built around your buyer journey. Quick wins and long-term opportunities identified and prioritized." },
      { step: "On-Page", desc: "Titles, descriptions, headers, schema markup, and content updated across key pages." },
      { step: "Technical", desc: "Site speed improvements, crawlability fixes, structured data, canonical tags." },
      { step: "Content", desc: "Content briefs for new pages targeting commercial keywords. Written in-house or with your team." },
      { step: "Monitor", desc: "Weekly ranking checks, monthly reporting, and ongoing priority adjustments based on data." },
    ],
    faqs: [
      { q: "How long until I see results?", a: "Most clients see measurable movement in 60–90 days. Competitive keywords take 6+ months but the traffic is more durable than paid." },
      { q: "Is SEO a monthly service?", a: "SEO is most effective as an ongoing engagement. We offer monthly retainers starting at ₹20,000/month. Minimum 3-month commitment." },
      { q: "Do you create the content?", a: "Yes. Our strategy includes content briefs and we can write the content or work with your team. Content writing is included at the Growth retainer level and above." },
      { q: "What if we're a new website?", a: "Perfect timing. Building SEO in from day one is always more effective than retrofitting it later. We include SEO setup in all web development projects." },
    ],
  },
  "digital-design": {
    title: "Digital Design",
    tagline: "Brand systems that make every touchpoint impossible to ignore.",
    hero: "from-amber-400 to-orange-500",
    intro: "A strong brand isn't just a logo — it's a complete system of visual decisions that communicate who you are before you say a word. We build those systems.",
    forWho: ["Founders launching a new brand from scratch", "Growing companies who've outgrown their current identity", "Agencies rebranding after a positioning shift", "Product teams who need a scalable design system"],
    includes: ["Logo design and wordmark", "Color palette and typography system", "Visual identity system", "Brand guidelines (PDF + Figma)", "Motion assets (logo animation, transitions)", "Social media and marketing kit"],
    timeline: "3–5 weeks",
    deliverables: [
      { item: "Logo package", desc: "SVG, PNG, and PDF in all variants — light, dark, horizontal, stacked" },
      { item: "Brand guidelines", desc: "40–60 page document covering all usage rules and rationale" },
      { item: "Figma master file", desc: "Components, styles, and documentation your team can work from" },
      { item: "Asset library", desc: "Icons, illustrations, and motion assets sized for all major platforms" },
    ],
    process: [
      { step: "Discovery", desc: "Brand audit, competitive landscape review, positioning workshop with your team." },
      { step: "Strategy", desc: "Positioning statement, brand personality, and creative direction brief." },
      { step: "Concept", desc: "2–3 distinct visual directions presented for review. Each shows the full system, not just a logo." },
      { step: "Refinement", desc: "Develop the chosen direction into a complete identity system." },
      { step: "Extensions", desc: "Apply the system to templates, social, motion assets, and marketing materials." },
      { step: "Delivery", desc: "Final files, guidelines, and a handoff walkthrough with your team." },
    ],
    faqs: [
      { q: "How many logo concepts do we get?", a: "We present 2–3 distinct concepts, then refine the chosen direction through structured revision rounds. We don't charge per revision — we charge for structured rounds." },
      { q: "Do you redesign existing brands?", a: "Yes. We do full rebrands and brand refinements. We always start with an audit to understand what equity exists before changing anything." },
      { q: "What if our team hates the concepts?", a: "It has never happened because we invest heavily in the discovery and strategy phase before touching design. If there's a mismatch, we revisit the brief — not the invoice." },
      { q: "Can you build a design system for our product?", a: "Yes. We offer a dedicated product design system engagement that includes tokens, components, and documentation for engineering teams." },
    ],
  },
};

export default function ServiceDetail() {
  const { slug = "website-design" } = useParams();
  const s = data[slug] || data["website-design"];

  return (
    <div className="bg-background">
      <SEO
        title={s.title}
        description={s.tagline + " " + s.intro.slice(0, 120)}
        url={`/services/${slug}`}
      />
      {/* Hero */}
      <section className={`bg-gradient-to-br ${s.hero} py-20 px-5 sm:px-8`}>
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-2 text-white/65 hover:text-white mb-8 no-underline transition-colors" style={{ fontSize: "13px" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> All Services
          </Link>
          <h1 className="text-white mb-4" style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>{s.title}</h1>
          <p className="text-white/80 max-w-xl" style={{ fontSize: "18px", lineHeight: 1.65 }}>{s.tagline}</p>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-white/65" style={{ fontSize: "13px" }}>
              <Clock className="w-4 h-4" /> {s.timeline}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-14">
          <div className="space-y-14">
            {/* Intro */}
            <p className="text-muted-foreground" style={{ fontSize: "17px", lineHeight: 1.75 }}>{s.intro}</p>

            {/* Who it's for */}
            <section>
              <div className="flex items-center gap-2 mb-5">
                <Users className="w-4 h-4 text-brand" />
                <h2 className="text-foreground" style={{ fontSize: "18px", fontWeight: 700 }}>Who it's for</h2>
              </div>
              <ul className="space-y-3">
                {s.forWho.map(w => (
                  <li key={w} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span className="text-foreground" style={{ fontSize: "15px" }}>{w}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* What's included */}
            <section>
              <div className="flex items-center gap-2 mb-5">
                <Package className="w-4 h-4 text-brand" />
                <h2 className="text-foreground" style={{ fontSize: "18px", fontWeight: 700 }}>What's included</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {s.includes.map(item => (
                  <div key={item} className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl">
                    <div className="w-4 h-4 rounded-full bg-success-muted flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-success" strokeWidth={3} />
                    </div>
                    <span className="text-foreground" style={{ fontSize: "13px" }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Deliverables */}
            <section>
              <h2 className="text-foreground mb-5" style={{ fontSize: "18px", fontWeight: 700 }}>What you receive</h2>
              <div className="space-y-3">
                {s.deliverables.map(({ item, desc }) => (
                  <div key={item} className="flex gap-4 p-4 bg-secondary/40 rounded-xl border border-border">
                    <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-brand" style={{ fontSize: "9px", fontWeight: 800 }}>✦</span>
                    </div>
                    <div>
                      <div className="text-foreground mb-0.5" style={{ fontSize: "14px", fontWeight: 600 }}>{item}</div>
                      <div className="text-muted-foreground" style={{ fontSize: "13px" }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section>
              <h2 className="text-foreground mb-6" style={{ fontSize: "18px", fontWeight: 700 }}>Our process</h2>
              <div className="space-y-4">
                {s.process.map((p, i) => (
                  <motion.div key={p.step} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.28, delay: i * 0.06 }} className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-brand" style={{ fontSize: "11px", fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <div className="text-foreground mb-1" style={{ fontSize: "14px", fontWeight: 600 }}>{p.step}</div>
                      <div className="text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.65 }}>{p.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-foreground mb-5" style={{ fontSize: "18px", fontWeight: 700 }}>Common questions</h2>
              <div className="space-y-4">
                {s.faqs.map(f => (
                  <div key={f.q} className="p-5 bg-card border border-border rounded-xl">
                    <div className="text-foreground mb-2" style={{ fontSize: "14px", fontWeight: 600 }}>{f.q}</div>
                    <div className="text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.7 }}>{f.a}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-1.5 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                <span className="text-muted-foreground ml-1" style={{ fontSize: "12px" }}>4.9 / 200+ reviews</span>
              </div>
              <p className="text-muted-foreground mb-4" style={{ fontSize: "13px", lineHeight: 1.65, fontStyle: "italic" }}>
                "The strategy session alone was worth the engagement — before they designed a single pixel."
              </p>
              <div className="flex items-center gap-2 border-t border-border pt-4">
                <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white" style={{ fontSize: "10px", fontWeight: 700 }}>MW</div>
                <div>
                  <div className="text-foreground" style={{ fontSize: "12px", fontWeight: 600 }}>Marcus Webb</div>
                  <div className="text-muted-foreground" style={{ fontSize: "11px" }}>Founder, Solari Energy</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>Timeline</span>
              </div>
              <p className="text-muted-foreground" style={{ fontSize: "13px" }}>{s.timeline}</p>
            </div>

            <Link to="/discovery-call" className="flex items-center justify-center gap-2 bg-brand text-white rounded-xl py-3 no-underline hover:bg-brand-hover transition-colors" style={{ fontSize: "14px", fontWeight: 600 }}>
              Book Discovery Call <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/inquiry" className="flex items-center justify-center border border-border text-foreground rounded-xl py-3 no-underline hover:bg-accent transition-colors" style={{ fontSize: "13px" }}>
              Submit a project brief
            </Link>
            <Link to="/pricing" className="flex items-center justify-center text-brand no-underline hover:underline" style={{ fontSize: "12px" }}>
              View pricing →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
