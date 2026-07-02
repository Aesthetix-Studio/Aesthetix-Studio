import { HeroEditorial } from "../../components/var-hero";
import { ServicesEditorial } from "../../components/var-services";
import { PortfolioEditorial } from "../../components/var-portfolio";
import { TestimonialsEditorial } from "../../components/var-testimonials";
import { ProcessEditorial } from "../../components/var-process";
import { CTAEditorial } from "../../components/var-cta";
import { PricingEditorial } from "../../components/var-pricing";
import { FAQEditorial } from "../../components/var-faq";
import { FooterEditorial } from "../../components/var-footer";

export default function EditorialSite() {
  return (
    <div>
      <HeroEditorial />
      <ServicesEditorial />
      <PortfolioEditorial />
      <TestimonialsEditorial />
      <ProcessEditorial />
      <PricingEditorial />
      <FAQEditorial />
      <CTAEditorial />
      <FooterEditorial />
    </div>
  );
}
