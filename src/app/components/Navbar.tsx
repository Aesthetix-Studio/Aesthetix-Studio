/**
 * Aesthetix Navbar — Editorial Masthead
 *
 * Not a typical agency nav. This is the opening of the experience.
 *
 * Features:
 * - Thin height (80px)
 * - Transparent → frosted glass → surface on scroll
 * - Lots of whitespace
 * - Small navigation
 * - Typography as hero
 * - Subtle CTA
 */

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "../../design-system/utils";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Capabilities", href: "/services" },
  { label: "Journal", href: "/blog" },
  { label: "Studio", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 dark:bg-[var(--neutral-950)]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[90rem] mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
          {/* Logo — editorial masthead */}
          <Link to="/" className="no-underline flex flex-col">
            <span className={cn(
              "text-[0.9375rem] font-semibold tracking-tight leading-tight transition-colors",
              scrolled
                ? "text-[var(--neutral-950)] dark:text-white"
                : "text-white"
            )}>
              Aesthetix
            </span>
            <span className={cn(
              "text-[0.625rem] font-medium uppercase tracking-[0.15em] leading-tight transition-colors",
              scrolled
                ? "text-zinc-400"
                : "text-zinc-500"
            )}>
              Digital Product Studio
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "text-[0.8125rem] transition-colors duration-200 no-underline",
                    isActive
                      ? scrolled
                        ? "text-[var(--neutral-950)] dark:text-white"
                        : "text-white"
                      : scrolled
                        ? "text-zinc-400 hover:text-[var(--neutral-950)] dark:hover:text-white"
                        : "text-zinc-500 hover:text-white"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-6">
            <Link
              to="/contact"
              className={cn(
                "hidden md:inline-flex items-center gap-2 text-[0.8125rem] transition-colors no-underline group",
                scrolled
                  ? "text-zinc-400 hover:text-[var(--neutral-950)] dark:hover:text-white"
                  : "text-zinc-500 hover:text-white"
              )}
            >
              Start a Project
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "md:hidden w-10 h-10 flex items-center justify-center transition-colors",
                scrolled
                  ? "text-zinc-400 hover:text-[var(--neutral-950)] dark:hover:text-white"
                  : "text-zinc-500 hover:text-white"
              )}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white dark:bg-[var(--neutral-950)] pt-24 px-5 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "text-2xl font-[family-name:var(--font-display)] no-underline",
                      isActive
                        ? "text-[var(--neutral-950)] dark:text-white"
                        : "text-zinc-400"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[var(--neutral-950)] dark:hover:text-white transition-colors no-underline"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
