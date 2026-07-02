import { HeroBrutalist } from "../../components/var-hero";
import { ServicesBrutalist } from "../../components/var-services";
import { PortfolioBrutalist } from "../../components/var-portfolio";
import { TestimonialsBrutalist } from "../../components/var-testimonials";
import { ProcessBrutalist } from "../../components/var-process";
import { CTABrutalist } from "../../components/var-cta";
import { PricingBrutalist } from "../../components/var-pricing";
import { FAQBrutalist } from "../../components/var-faq";
import { FooterBrutalist } from "../../components/var-footer";

const sans = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";

function NavbarPulse() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: sans }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", background: "#EF4444", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "12px", fontWeight: 900, color: "#fff" }}>P</span>
          </div>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>Pulse Fitness</span>
        </div>
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {["Classes", "Coaches", "Pricing", "Schedule"].map(l => (
            <a key={l} href="#" onClick={e => e.preventDefault()} style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}>{l}</a>
          ))}
          <a href="#" onClick={e => e.preventDefault()} style={{ background: "#EF4444", color: "#fff", padding: "8px 18px", borderRadius: "6px", fontSize: "13px", fontWeight: 600, textDecoration: "none", marginLeft: "8px" }}>
            Free Class
          </a>
        </div>
      </div>
    </nav>
  );
}

export default function BrutalistSite() {
  return (
    <div>
      <NavbarPulse />
      <HeroBrutalist />
      <ServicesBrutalist />
      <PortfolioBrutalist />
      <TestimonialsBrutalist />
      <ProcessBrutalist />
      <PricingBrutalist />
      <FAQBrutalist />
      <CTABrutalist />
      <FooterBrutalist />
    </div>
  );
}
