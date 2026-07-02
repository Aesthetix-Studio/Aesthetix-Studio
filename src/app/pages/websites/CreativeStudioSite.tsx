import { HeroCreativeStudio } from "../../components/var-hero";
import { ServicesCreativeStudio } from "../../components/var-services";
import { PortfolioCreativeStudio } from "../../components/var-portfolio";
import { TestimonialsCreativeStudio } from "../../components/var-testimonials";
import { ProcessCreativeStudio } from "../../components/var-process";
import { CTACreativeStudio } from "../../components/var-cta";
import { PricingCreativeStudio } from "../../components/var-pricing";
import { FAQCreativeStudio } from "../../components/var-faq";
import { FooterCreativeStudio } from "../../components/var-footer";

export default function CreativeStudioSite() {
  return (
    <div>
      <HeroCreativeStudio />
      <ServicesCreativeStudio />
      <PortfolioCreativeStudio />
      <TestimonialsCreativeStudio />
      <ProcessCreativeStudio />
      <PricingCreativeStudio />
      <FAQCreativeStudio />
      <CTACreativeStudio />
      <FooterCreativeStudio />
    </div>
  );
}
