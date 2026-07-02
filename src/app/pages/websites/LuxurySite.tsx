import { HeroLuxury } from "../../components/var-hero";
import { ServicesLuxury } from "../../components/var-services";
import { PortfolioLuxury } from "../../components/var-portfolio";
import { TestimonialsLuxury } from "../../components/var-testimonials";
import { ProcessLuxury } from "../../components/var-process";
import { CTALuxury } from "../../components/var-cta";
import { PricingLuxury } from "../../components/var-pricing";
import { FAQLuxury } from "../../components/var-faq";
import { FooterLuxury } from "../../components/var-footer";

export default function LuxurySite() {
  return (
    <div>
      <HeroLuxury />
      <ServicesLuxury />
      <PortfolioLuxury />
      <TestimonialsLuxury />
      <ProcessLuxury />
      <PricingLuxury />
      <FAQLuxury />
      <CTALuxury />
      <FooterLuxury />
    </div>
  );
}
