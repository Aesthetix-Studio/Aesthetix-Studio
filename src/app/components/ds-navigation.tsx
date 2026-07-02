import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { AesthetixMark } from "./AesthetixMark";
import { DSSection, DSSubSection, DSPreview } from "./ds-section";
import { cn } from "./ui/utils";
import { AXButton } from "./ds-buttons";

/* ─── Navigation Component ──────────────────────────────────── */
const navLinks = [
  {
    label: "Services",
    dropdown: [
      { label: "Brand Identity", desc: "Logos, visual systems, guidelines" },
      { label: "Web Design", desc: "Marketing sites, landing pages" },
      { label: "Product Design", desc: "SaaS, dashboards, mobile apps" },
      { label: "Motion & 3D", desc: "Animation, interactive experiences" },
    ],
  },
  { label: "Work" },
  { label: "Studio" },
  { label: "Journal" },
];

interface NavigationProps {
  variant?: "default" | "transparent" | "dark";
  showBreadcrumb?: boolean;
}

export function AXNavigation({ variant = "default" }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isDark = variant === "dark";
  const isTransparent = variant === "transparent";

  return (
    <nav
      className={cn(
        "w-full border-b",
        isDark ? "bg-[#0D0D0C] border-white/8" : "bg-card border-border"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-brand flex items-center justify-center">
            <AesthetixMark size={14} color="#ffffff" />
          </div>
          <span
            className={cn("text-[14px]", isDark ? "text-white" : "text-foreground")}
            style={{ fontWeight: 700, letterSpacing: '-0.01em' }}
          >
            Aesthetix
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              <button
                className={cn(
                  "flex items-center gap-1 px-3.5 py-2 rounded-lg transition-all duration-150",
                  isDark
                    ? "text-white/70 hover:text-white hover:bg-white/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                style={{ fontSize: '13px', fontWeight: 500 }}
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.label}
                {link.dropdown && <ChevronDown className="w-3 h-3 opacity-60" />}
              </button>

              {/* Dropdown */}
              {link.dropdown && (
                <div
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1.5 w-56 bg-popover border border-border rounded-xl shadow-lg overflow-hidden z-50"
                      >
                        {link.dropdown.map((item) => (
                          <a
                            key={item.label}
                            href="#"
                            className="flex flex-col px-4 py-3 hover:bg-accent transition-colors border-b border-border/40 last:border-0"
                            onClick={(e) => e.preventDefault()}
                          >
                            <span className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>{item.label}</span>
                            <span className="text-muted-foreground" style={{ fontSize: '11px' }}>{item.desc}</span>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <button
            className={cn(
              "px-3.5 py-2 rounded-lg transition-all duration-150",
              isDark ? "text-white/70 hover:text-white hover:bg-white/8" : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
            style={{ fontSize: '13px', fontWeight: 500 }}
          >
            Sign in
          </button>
          <AXButton variant="brand" size="sm">Get Started</AXButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className={cn(
            "md:hidden p-2 rounded-lg transition-colors",
            isDark ? "text-white/70 hover:bg-white/8" : "text-muted-foreground hover:bg-accent"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={cn("border-t overflow-hidden", isDark ? "border-white/8" : "border-border")}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href="#"
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors",
                    isDark ? "text-white/70 hover:text-white hover:bg-white/8" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  style={{ fontSize: '14px', fontWeight: 500 }}
                  onClick={(e) => e.preventDefault()}
                >
                  {link.label}
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </a>
              ))}
              <div className="pt-3 border-t border-border/40 flex flex-col gap-2">
                <AXButton variant="outline" size="md" className="w-full justify-center">Sign in</AXButton>
                <AXButton variant="brand" size="md" className="w-full justify-center">Get Started</AXButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── Breadcrumb ────────────────────────────────────────────── */
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AXBreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: "slash" | "chevron";
}

export function AXBreadcrumb({ items, separator = "slash" }: AXBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && (
              <span className="text-muted-foreground/50 select-none" style={{ fontSize: '12px' }}>
                {separator === "slash" ? "/" : <ChevronDown className="w-3 h-3 -rotate-90" />}
              </span>
            )}
            {i < items.length - 1 ? (
              <a
                href={item.href || "#"}
                className="text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontSize: '13px' }}
                onClick={(e) => e.preventDefault()}
              >
                {item.label}
              </a>
            ) : (
              <span className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function DSNavigationSection() {
  return (
    <DSSection
      id="navigation"
      title="Navigation"
      description="Responsive top navigation with dropdown menus, mobile drawer, and breadcrumb trail. Three variants: default, dark, and transparent."
      badge="Patterns"
    >
      <DSSubSection title="Navigation — Default (Light)">
        <div className="rounded-xl overflow-hidden border border-border">
          <AXNavigation variant="default" />
        </div>
      </DSSubSection>

      <DSSubSection title="Navigation — Dark">
        <div className="rounded-xl overflow-hidden border border-border">
          <AXNavigation variant="dark" />
        </div>
      </DSSubSection>

      <DSSubSection title="Breadcrumbs">
        <DSPreview>
          <div className="space-y-4 w-full">
            <div>
              <p className="text-muted-foreground mb-2" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Slash separator</p>
              <AXBreadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Work", href: "/work" },
                  { label: "Brand Identity" },
                ]}
                separator="slash"
              />
            </div>
            <div>
              <p className="text-muted-foreground mb-2" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Chevron separator</p>
              <AXBreadcrumb
                items={[
                  { label: "Projects", href: "/projects" },
                  { label: "Q4 Campaign", href: "/projects/q4" },
                  { label: "Visual Direction" },
                ]}
                separator="chevron"
              />
            </div>
          </div>
        </DSPreview>
      </DSSubSection>
    </DSSection>
  );
}
