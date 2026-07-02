import { HeroHighEndPortfolio } from "../../components/var-hero";
import { ServicesHighEndPortfolio } from "../../components/var-services";
import { PortfolioHighEndPortfolio } from "../../components/var-portfolio";
import { TestimonialsHighEndPortfolio } from "../../components/var-testimonials";
import { ProcessHighEndPortfolio } from "../../components/var-process";
import { CTAHighEndPortfolio } from "../../components/var-cta";
import { PricingHighEndPortfolio } from "../../components/var-pricing";
import { FAQHighEndPortfolio } from "../../components/var-faq";
import { FooterHighEndPortfolio } from "../../components/var-footer";

export default function HighEndPortfolioSite() {
  return (
    <div>
      <HeroHighEndPortfolio />
      <ServicesHighEndPortfolio />
      <PortfolioHighEndPortfolio />
      <TestimonialsHighEndPortfolio />
      <ProcessHighEndPortfolio />
      <PricingHighEndPortfolio />
      <FAQHighEndPortfolio />
      <CTAHighEndPortfolio />
      <FooterHighEndPortfolio />
    </div>
  );
}
