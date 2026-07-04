import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import { cn } from "../ui/utils";
import { AXButton } from "../ds-buttons";
import { AesthetixWordmark } from "../AesthetixMark";

const navLinks = [
  {
    label: "Services",
    href: "/services",
    items: [
      { label: "Website Design", desc: "Conversion-focused websites", href: "/services/website-design" },
      { label: "Web Development", desc: "Performant, clean-code builds", href: "/services/web-development" },
      { label: "SEO", desc: "Organic growth strategies", href: "/services/seo" },
      { label: "Digital Design", desc: "Brand identity & motion", href: "/services/digital-design" },
    ],
  },
  { label: "Work", href: "/portfolio" },
  { label: "Studio", href: "/about" },
  { label: "Journal", href: "/blog" },
];

export function HPNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="no-underline">
          <AesthetixWordmark size="md" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition-all duration-180 ease-standard no-underline",
                    isActive
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )
                }
                style={{ fontSize: "14px", fontWeight: 500 }}
                onMouseEnter={() => link.items && setDropdown(link.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                {link.label}
                {link.items && (
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-180",
                      dropdown === link.label && "rotate-180"
                    )}
                  />
                )}
              </NavLink>

              {link.items && (
                <div
                  className="absolute top-full left-0 pt-2"
                  onMouseEnter={() => setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <AnimatePresence>
                    {dropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                        className="w-64 bg-popover border border-border rounded-lg shadow-lg overflow-hidden"
                      >
                        {link.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setDropdown(null)}
                            className="block px-5 py-4 hover:bg-accent border-b border-border/40 last:border-0 transition-colors no-underline"
                          >
                            <div className="text-foreground text-body-sm font-medium">
                              {item.label}
                            </div>
                            <div className="text-muted-foreground text-caption mt-0.5">
                              {item.desc}
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <AXButton variant="outline" size="sm" onClick={() => navigate("/inquiry")}>
            Get a Quote
          </AXButton>
          <AXButton variant="brand" size="sm" onClick={() => navigate("/discovery-call")}>
            Book Discovery Call
          </AXButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2.5 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <div className="px-5 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors no-underline"
                  style={{ fontSize: "15px", fontWeight: 500 }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-5 border-t border-border/60 space-y-3">
                <Link
                  to="/inquiry"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full"
                >
                  <AXButton variant="outline" size="md" className="w-full">
                    Get a Quote
                  </AXButton>
                </Link>
                <Link
                  to="/discovery-call"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full"
                >
                  <AXButton variant="brand" size="md" className="w-full">
                    Book Discovery Call
                  </AXButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
