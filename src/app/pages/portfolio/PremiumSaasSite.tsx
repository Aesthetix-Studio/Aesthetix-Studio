import { HeroPremiumSaas } from "../../components/var-hero";
import { ServicesPremiumSaas } from "../../components/var-services";
import { PortfolioPremiumSaas } from "../../components/var-portfolio";
import { TestimonialsPremiumSaas } from "../../components/var-testimonials";
import { ProcessPremiumSaas } from "../../components/var-process";
import { CTAPremiumSaas } from "../../components/var-cta";
import { PricingPremiumSaas } from "../../components/var-pricing";
import { FAQPremiumSaas } from "../../components/var-faq";
import { FooterPremiumSaas } from "../../components/var-footer";

export default function PremiumSaasSite() {
  return (
    <div>
      <HeroPremiumSaas />
      <ServicesPremiumSaas />
      <PortfolioPremiumSaas />
      <TestimonialsPremiumSaas />
      <ProcessPremiumSaas />
      <PricingPremiumSaas />
      <FAQPremiumSaas />
      <CTAPremiumSaas />
      <FooterPremiumSaas />
    </div>
  );
}
