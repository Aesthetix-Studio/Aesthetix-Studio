import { HeroEnterprise } from "../../components/var-hero";
import { ServicesEnterprise } from "../../components/var-services";
import { PortfolioEnterprise } from "../../components/var-portfolio";
import { TestimonialsEnterprise } from "../../components/var-testimonials";
import { ProcessEnterprise } from "../../components/var-process";
import { CTAEnterprise } from "../../components/var-cta";
import { PricingEnterprise } from "../../components/var-pricing";
import { FAQEnterprise } from "../../components/var-faq";
import { FooterEnterprise } from "../../components/var-footer";

export default function EnterpriseSite() {
  return (
    <div>
      <HeroEnterprise />
      <ServicesEnterprise />
      <PortfolioEnterprise />
      <TestimonialsEnterprise />
      <ProcessEnterprise />
      <PricingEnterprise />
      <FAQEnterprise />
      <CTAEnterprise />
      <FooterEnterprise />
    </div>
  );
}
