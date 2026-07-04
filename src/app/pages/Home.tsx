import { HPHero } from "../components/hp-hero";
import { HPTrustStrip } from "../components/hp-trust-strip";
import { HPClientLogos } from "../components/hp-client-logos";
import { HPAwards } from "../components/hp-awards";
import { HPProjects } from "../components/hp-projects";
import { HPBeforeAfter } from "../components/hp-before-after";
import { HPServices } from "../components/hp-services";
import { HPProcess } from "../components/hp-process";
import { HPWhyUs } from "../components/hp-why-us";
import { HPSocialProof } from "../components/hp-social-proof";
import { HPTeam } from "../components/hp-team";
import { HPVideoTestimonials } from "../components/hp-video-testimonials";
import { HPTechIndustries } from "../components/hp-tech-industries";
import { HPPricingPreview } from "../components/hp-pricing-preview";
import { HPFaq } from "../components/hp-faq";
import { HPFinalCTA } from "../components/hp-cta";
import SEO, { organizationSchema, websiteSchema, localBusinessSchema, professionalServiceSchema, faqSchema } from "../components/SEO";

const homeFaqs = [
  { q: "What's included in a typical website project?", a: "Every project starts with a strategy session, then moves through UX wireframes, full visual design in Figma, a component library, and responsive front-end development. You'll receive complete source files and a 30-day support window post-launch." },
  { q: "How long does it take to build a website?", a: "A focused 5-page marketing site typically takes 4–6 weeks from kickoff to launch. Larger projects — design systems, e-commerce, or custom web apps — run 8–14 weeks." },
  { q: "Do you work with startups that don't have a brand yet?", a: "Yes — and it's actually ideal. Starting fresh means we can build everything from the right foundation. Our Growth package covers brand identity and website together." },
  { q: "Can you take over or redesign an existing website?", a: "Absolutely. We do full redesigns regularly. We'll start with a short audit of your current site — what's working, what's not, conversion data if available — then build a strategy before designing anything." },
  { q: "What do you need from us to get started?", a: "A discovery call (30–60 minutes), answers to a short creative brief, access to any existing brand assets, and your key pages, goals, and timeline." },
  { q: "Do you offer monthly retainer plans?", a: "Yes. Many clients move to a retainer after their initial project for ongoing design support — new landing pages, campaign assets, feature design, and SEO updates." },
  { q: "What does the discovery call actually involve?", a: "It's a 30-minute conversation — not a sales pitch. We'll ask about your goals, target audience, timeline, budget range, and what success looks like for you." },
];

export default function Home() {
  return (
    <>
      <SEO
        title="Aesthetix Studio"
        description="Aesthetix Studio — Web design agency in Hyderabad, India. Design, development, and branding for startups and growing businesses. 80+ brands launched, 42% avg. conversion lift."
        url="/"
        structuredData={organizationSchema}
      />
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(professionalServiceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema(homeFaqs))}</script>

      {/* 1. Hero — positioning + dual CTA */}
      <HPHero />

      {/* 2. Trust Strip — star ratings + review platform links (fast social proof) */}
      <HPTrustStrip />

      {/* 3. Client Logos — recognizable brands across industries */}
      <HPClientLogos />

      {/* 4. Awards & Certifications — industry recognition */}
      <HPAwards />

      {/* 5. Featured Projects — show work before explaining services */}
      <HPProjects />

      {/* 6. Before & After — visual transformation results */}
      <HPBeforeAfter />

      {/* 7. Services — now they've seen the quality, explain what you offer */}
      <HPServices />

      {/* 8. Process — how we work */}
      <HPProcess />

      {/* 9. Why Choose Us — differentiators + comparison table */}
      <HPWhyUs />

      {/* 10. Social Proof — stats, testimonials */}
      <HPSocialProof />

      {/* 11. Team — meet the people behind the work */}
      <HPTeam />

      {/* 12. Video Testimonials — hear directly from clients */}
      <HPVideoTestimonials />

      {/* 13. Tech Stack + Industries — credibility signals */}
      <HPTechIndustries />

      {/* 14. Pricing Preview — anchor expectation, link to full pricing */}
      <HPPricingPreview />

      {/* 15. FAQ */}
      <HPFaq />

      {/* 16. Final CTA */}
      <HPFinalCTA />
    </>
  );
}
