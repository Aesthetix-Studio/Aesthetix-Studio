import { HeroMinimal } from "../../components/var-hero";
import { ServicesMinimal } from "../../components/var-services";
import { PortfolioMinimal } from "../../components/var-portfolio";
import { TestimonialsMinimal } from "../../components/var-testimonials";
import { ProcessMinimal } from "../../components/var-process";
import { CTAMinimal } from "../../components/var-cta";
import { PricingMinimal } from "../../components/var-pricing";
import { FAQMinimal } from "../../components/var-faq";
import { FooterMinimal } from "../../components/var-footer";

export default function MinimalSite() {
  return (
    <div>
      <HeroMinimal />
      <ServicesMinimal />
      <PortfolioMinimal />
      <TestimonialsMinimal />
      <ProcessMinimal />
      <PricingMinimal />
      <FAQMinimal />
      <CTAMinimal />
      <FooterMinimal />
    </div>
  );
}
