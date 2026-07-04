/**
 * Aesthetix Footer — Closing Chapter
 *
 * Not a sitemap. Not a newsletter signup. Not a social media dump.
 * This is the closing chapter of the story.
 *
 * Structure:
 * 1. Final Statement — Huge typography
 * 2. CTA — Simple action
 * 3. Navigation — Two clean columns
 * 4. Signature — Brand, location, year
 */

import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const studioLinks = [
  { label: "Work", href: "/work" },
  { label: "Capabilities", href: "/services" },
  { label: "Journal", href: "/blog" },
  { label: "Studio", href: "/about" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/aesthetix-studio" },
  { label: "GitHub", href: "https://github.com/aesthetixstudio" },
  { label: "X", href: "https://x.com/aesthetixstudio" },
  { label: "Email", href: "mailto:hello@aesthetixstudio.com" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--neutral-950)] text-white">
      {/* Section 1 — Final Statement */}
      <div className="px-5 md:px-8 pt-32 md:pt-40 pb-20 md:pb-24">
        <div className="max-w-[90rem] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,4.5rem)] font-normal tracking-tight leading-[1.08] text-white max-w-4xl"
          >
            Let's build products
            <br />
            that people remember.
          </motion.p>
        </div>
      </div>

      {/* Editorial Divider */}
      <div className="px-5 md:px-8">
        <div className="max-w-[90rem] mx-auto border-t border-zinc-800" />
      </div>

      {/* Section 2 — CTA */}
      <div className="px-5 md:px-8 py-16 md:py-20">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group no-underline"
          >
            <span className="w-10 h-10 rounded-full border border-zinc-700 group-hover:border-zinc-500 flex items-center justify-center transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
            Start a project
          </Link>
          <a
            href="mailto:hello@aesthetixstudio.com"
            className="text-sm text-zinc-500 hover:text-white transition-colors no-underline"
          >
            hello@aesthetixstudio.com
          </a>
        </div>
      </div>

      {/* Editorial Divider */}
      <div className="px-5 md:px-8">
        <div className="max-w-[90rem] mx-auto border-t border-zinc-800" />
      </div>

      {/* Section 3 — Navigation */}
      <div className="px-5 md:px-8 py-16 md:py-20">
        <div className="max-w-[90rem] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {/* Studio */}
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-6">
              Studio
            </p>
            <ul className="space-y-3">
              {studioLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-6">
              Connect
            </p>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-white transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — takes remaining space on desktop */}
          <div className="col-span-2 md:col-span-1 md:col-start-4">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-6">
              Get in touch
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@aesthetixstudio.com"
                  className="text-sm text-zinc-400 hover:text-white transition-colors no-underline"
                >
                  hello@aesthetixstudio.com
                </a>
              </li>
              <li>
                <span className="text-sm text-zinc-500">
                  Hyderabad, India
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Editorial Divider */}
      <div className="px-5 md:px-8">
        <div className="max-w-[90rem] mx-auto border-t border-zinc-800" />
      </div>

      {/* Section 4 — Signature */}
      <div className="px-5 md:px-8 py-10 md:py-12">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[0.8125rem] italic text-zinc-500">
            Competence through restraint.
          </p>
          <p className="text-[0.75rem] text-zinc-600">
            © 2026 Aesthetix Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
