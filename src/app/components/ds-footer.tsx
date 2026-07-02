import { useState } from "react";
import { useNavigate } from "react-router";
import { Twitter, Linkedin, Github, Instagram, ArrowRight } from "lucide-react";
import { AesthetixMark } from "./AesthetixMark";
import { DSSection, DSSubSection } from "./ds-section";
import { cn } from "./ui/utils";
import { subscribeNewsletter } from "../lib/api";

const footerLinks = {
  Services: ["Brand Identity", "Web Design", "Product Design", "Motion & 3D", "Design Systems"],
  Company: ["About Studio", "Work", "Journal", "Careers", "Press"],
  Resources: ["Design Tokens", "Style Guide", "Component Library", "Brand Guidelines", "Case Studies"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
};

const footerLinkHrefs = {
  Services: ["/services", "/services", "/services", "/services", "/services"],
  Company: ["/about", "/portfolio", "/blog", "/about", "/about"],
  Resources: ["/services", "/services", "/services", "/about", "/portfolio"],
  Legal: ["/privacy-policy", "/terms-of-service", "/cookie-policy", "/accessibility"],
};

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/aesthetixstudio" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/aesthetix-studio" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/aesthetixstudio" },
  { icon: Github, label: "GitHub", href: "https://github.com/aesthetixstudio" },
];

interface AXFooterProps {
  variant?: "default" | "dark" | "minimal";
}

export function AXFooter({ variant = "default" }: AXFooterProps) {
  const isDark = variant === "dark";
  const isMinimal = variant === "minimal";
  const [footerEmail, setFooterEmail] = useState("");
  const [footerLoading, setFooterLoading] = useState(false);
  const [footerSuccess, setFooterSuccess] = useState(false);

  const handleFooterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail) return;
    setFooterLoading(true);
    try {
      await subscribeNewsletter(footerEmail);
      setFooterSuccess(true);
      setFooterEmail("");
    } catch {
      // silently fail for footer subscribe
    } finally {
      setFooterLoading(false);
    }
  };

  if (isMinimal) {
    return (
      <footer className="border-t border-border bg-background py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-brand flex items-center justify-center">
              <AesthetixMark size={12} color="#ffffff" />
            </div>
            <span className="text-foreground" style={{ fontSize: '13px', fontWeight: 700 }}>Aesthetix Studio</span>
          </div>
          <div className="flex items-center gap-5">
            {[
              { label: "Privacy", href: "/privacy-policy" },
              { label: "Terms", href: "/terms-of-service" },
              { label: "Cookies", href: "/cookie-policy" },
              { label: "Accessibility", href: "/accessibility" },
            ].map((link) => (
              <a key={link.label} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '12px' }}>
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-muted-foreground" style={{ fontSize: '12px' }}>© 2026 Aesthetix Studio. All rights reserved.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className={cn("border-t", isDark ? "bg-[#0D0D0C] border-white/8" : "bg-card border-border")}>
      {/* Newsletter strip */}
      <div className={cn("border-b px-6 py-10", isDark ? "border-white/8" : "border-border")}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className={isDark ? "text-white" : "text-foreground"} style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '-0.01em' }}>
              Stay ahead of the curve
            </h3>
            <p className={isDark ? "text-white/50" : "text-muted-foreground"} style={{ fontSize: '13px', marginTop: '4px' }}>
              Monthly dispatches on design, brand strategy, and the craft.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {footerSuccess ? (
              <span className="text-success" style={{ fontSize: '13px', fontWeight: 500 }}>Subscribed!</span>
            ) : (
              <form onSubmit={handleFooterSubscribe} className="flex items-center gap-2 shrink-0">
                <input
                  type="email"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className={cn(
                    "h-11 px-3 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-ring/30 w-52",
                    isDark ? "bg-white/8 border-white/12 text-white placeholder:text-white/30 focus:border-white/30" : "bg-input-background border-border text-foreground placeholder:text-muted-foreground/50"
                  )}
                  style={{ fontSize: '13px' }}
                />
                <button
                  type="submit"
                  disabled={footerLoading}
                  className="h-11 px-4 rounded-lg bg-brand text-white transition-all hover:bg-brand-hover flex items-center gap-1.5 disabled:opacity-50"
                  style={{ fontSize: '13px', fontWeight: 500 }}
                >
                  {footerLoading ? "..." : <>Subscribe <ArrowRight className="w-3.5 h-3.5" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main links */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <AesthetixMark size={20} color={isDark ? "rgba(255,255,255,0.9)" : "var(--foreground)"} />
              <span className={isDark ? "text-white" : "text-foreground"} style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em' }}>Aesthetix Studio</span>
            </div>
            <p className={isDark ? "text-white/45" : "text-muted-foreground"} style={{ fontSize: '13px', lineHeight: '1.7', maxWidth: '240px' }}>
              A premium creative studio specializing in brand identity, web design, and product experiences.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-11 h-11 rounded-lg flex items-center justify-center transition-colors",
                    isDark ? "bg-white/8 text-white/50 hover:bg-white/15 hover:text-white" : "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className={isDark ? "text-white/70" : "text-foreground"} style={{ fontSize: '12px', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {group}
              </h4>
              <ul className="space-y-1">
                {links.map((link, i) => (
                  <li key={link}>
                    <a
                      href={footerLinkHrefs[group as keyof typeof footerLinkHrefs]?.[i] ?? "#"}
                      className={cn(
                        "inline-block py-1.5 transition-colors",
                        isDark ? "text-white/40 hover:text-white/80" : "text-muted-foreground hover:text-foreground"
                      )}
                      style={{ fontSize: '13px' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className={cn("border-t px-6 py-5", isDark ? "border-white/8" : "border-border")}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={isDark ? "text-white/35" : "text-muted-foreground"} style={{ fontSize: '12px' }}>
            © 2026 Aesthetix Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
            <span className={isDark ? "text-white/35" : "text-muted-foreground"} style={{ fontSize: '12px' }}>
              WCAG AA · Accessible by design
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function DSFooterSection() {
  return (
    <DSSection
      id="footer"
      title="Footer"
      description="Three footer variants: full with newsletter and link columns, dark mode version, and a minimal single-row variant."
      badge="Patterns"
    >
      <DSSubSection title="Full Footer — Light">
        <div className="rounded-xl overflow-hidden border border-border">
          <AXFooter variant="default" />
        </div>
      </DSSubSection>

      <DSSubSection title="Full Footer — Dark">
        <div className="rounded-xl overflow-hidden border border-border">
          <AXFooter variant="dark" />
        </div>
      </DSSubSection>

      <DSSubSection title="Minimal Footer">
        <div className="rounded-xl overflow-hidden border border-border">
          <AXFooter variant="minimal" />
        </div>
      </DSSubSection>
    </DSSection>
  );
}
