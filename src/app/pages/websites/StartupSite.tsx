import { HeroStartup } from "../../components/var-hero";
import { ServicesStartup } from "../../components/var-services";
import { PortfolioStartup } from "../../components/var-portfolio";
import { TestimonialsStartup } from "../../components/var-testimonials";
import { ProcessStartup } from "../../components/var-process";
import { CTAStartup } from "../../components/var-cta";
import { PricingStartup } from "../../components/var-pricing";
import { FAQStartup } from "../../components/var-faq";
import { FooterStartup } from "../../components/var-footer";

export default function StartupSite() {
  return (
    <div>
      <HeroStartup />
      <ServicesStartup />
      <PortfolioStartup />
      <TestimonialsStartup />
      <ProcessStartup />
      <PricingStartup />
      <FAQStartup />
      <CTAStartup />
      <FooterStartup />
    </div>
  );
}
