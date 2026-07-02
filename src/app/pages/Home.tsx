import { HPHero } from "../components/hp-hero";
import { HPTrustStrip } from "../components/hp-trust-strip";
import { HPProjects } from "../components/hp-projects";
import { HPServices } from "../components/hp-services";
import { HPProcess } from "../components/hp-process";
import { HPWhyUs } from "../components/hp-why-us";
import { HPSocialProof } from "../components/hp-social-proof";
import { HPTechIndustries } from "../components/hp-tech-industries";
import { HPPricingPreview } from "../components/hp-pricing-preview";
import { HPFaq } from "../components/hp-faq";
import { HPFinalCTA } from "../components/hp-cta";
import SEO, { organizationSchema, websiteSchema } from "../components/SEO";

export default function Home() {
  return (
    <>
      <SEO
        title={undefined}
        description="Aesthetix Studio — Design, development, and branding agency for startups and growing businesses. We build brands that convert."
        structuredData={organizationSchema}
      />
      {/* 1. Hero — positioning + dual CTA */}
      <HPHero />

      {/* 2. Trust Strip — logo names + star rating (fast social proof) */}
      <HPTrustStrip />

      {/* 3. Featured Projects — show work before explaining services */}
      <HPProjects />

      {/* 4. Services — now they've seen the quality, explain what you offer */}
      <HPServices />

      {/* 5. Process — how we work */}
      <HPProcess />

      {/* 6. Why Choose Us — differentiators + comparison table */}
      <HPWhyUs />

      {/* 7. Social Proof — stats, testimonials */}
      <HPSocialProof />

      {/* 8. Tech Stack + Industries — credibility signals */}
      <HPTechIndustries />

      {/* 9. Pricing Preview — anchor expectation, link to full pricing */}
      <HPPricingPreview />

      {/* 10. FAQ */}
      <HPFaq />

      {/* 11. Final CTA */}
      <HPFinalCTA />
    </>
  );
}
