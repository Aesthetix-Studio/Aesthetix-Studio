import { Link } from "react-router";
import SEO from "../components/SEO";
import { CheckCircle, AlertTriangle } from "lucide-react";

const standards = [
  { status: "pass", criterion: "1.1.1 Non-text Content", level: "A", description: "All images have descriptive alt text. Decorative images are marked appropriately." },
  { status: "pass", criterion: "1.3.1 Info and Relationships", level: "A", description: "Semantic HTML with proper headings, lists, tables, and form labels." },
  { status: "pass", criterion: "1.4.1 Use of Color", level: "A", description: "Color is never the sole means of conveying information. Interactive elements have additional indicators." },
  { status: "pass", criterion: "1.4.3 Contrast (Minimum)", level: "AA", description: "Text meets WCAG AA contrast ratios of 4.5:1 for normal text and 3:1 for large text." },
  { status: "pass", criterion: "1.4.4 Resize Text", level: "AA", description: "Text can be resized up to 200% without loss of content or functionality." },
  { status: "pass", criterion: "1.4.11 Non-text Contrast", level: "AA", description: "UI components and graphical objects meet 3:1 contrast ratio against adjacent colors." },
  { status: "pass", criterion: "2.1.1 Keyboard", level: "A", description: "All functionality is operable through a keyboard interface." },
  { status: "pass", criterion: "2.4.1 Bypass Blocks", level: "A", description: "Skip navigation links allow users to bypass repeated content blocks." },
  { status: "pass", criterion: "2.4.3 Focus Order", level: "A", description: "Focusable components receive focus in a logical and intuitive order." },
  { status: "pass", criterion: "2.4.7 Focus Visible", level: "AA", description: "Keyboard focus indicator is clearly visible on all interactive elements." },
  { status: "pass", criterion: "3.1.1 Language of Page", level: "A", description: "Page language is identified in HTML attributes." },
  { status: "pass", criterion: "3.2.1 On Focus", level: "A", description: "No unexpected changes occur when components receive focus." },
  { status: "pass", criterion: "4.1.2 Name, Role, Value", level: "A", description: "All UI components have programmatic names and roles." },
  { status: "partial", criterion: "2.4.6 Headings and Labels", level: "AA", description: "Most headings are descriptive. Ongoing review to ensure complete coverage." },
  { status: "partial", criterion: "1.4.10 Reflow", level: "AA", content: "Content reflows at 320px width. Some complex layouts may require horizontal scrolling on very narrow screens." },
];

const techniques = [
  "Semantic HTML5 elements (nav, main, header, footer, section, article)",
  "ARIA labels and landmarks for screen reader navigation",
  "Focus management with visible focus indicators",
  "Form inputs with associated labels and error messages",
  "Skip navigation link on all public pages",
  "Alt text on all meaningful images",
  "Color contrast ratios meeting WCAG AA standards",
  "Responsive design that adapts to different viewport sizes",
  "Reduced motion support via prefers-reduced-motion media query",
  "Logical heading hierarchy on all pages",
];

export default function Accessibility() {
  const passCount = standards.filter((s) => s.status === "pass").length;
  const partialCount = standards.filter((s) => s.status === "partial").length;

  return (
    <>
      <SEO
        title="Accessibility Statement | Aesthetix Studio"
        description="Aesthetix Studio accessibility statement. We are committed to WCAG 2.1 AA compliance. Learn about our accessibility features, standards, and ongoing efforts."
        url="/accessibility"
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            ← Back to Home
          </Link>

          <h1
            className="text-foreground mb-3"
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Accessibility Statement
          </h1>

          <p className="text-muted-foreground mb-10" style={{ fontSize: "14px" }}>
            Last updated: July 2026
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="text-foreground mb-3" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                Our Commitment
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                Aesthetix Studio is committed to ensuring digital accessibility for all users, including people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards to our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                Conformance Status
              </h2>
              <p className="text-muted-foreground mb-4" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border bg-card text-center">
                  <div className="text-foreground" style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                    {passCount}
                  </div>
                  <div className="text-muted-foreground mt-1" style={{ fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Criteria Passing
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card text-center">
                  <div className="text-foreground" style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                    {partialCount}
                  </div>
                  <div className="text-muted-foreground mt-1" style={{ fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Partially Meeting
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-foreground mb-4" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                WCAG 2.1 Compliance Details
              </h2>
              <div className="space-y-2">
                {standards.map((std) => (
                  <div
                    key={std.criterion}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card"
                  >
                    <div className="mt-0.5 shrink-0">
                      {std.status === "pass" ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-warning" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>
                          {std.criterion}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-secondary text-muted-foreground" style={{ fontSize: "10px", fontWeight: 600 }}>
                          Level {std.level}
                        </span>
                        <span
                          className="px-1.5 py-0.5 rounded text-xs font-medium"
                          style={{
                            background: std.status === "pass" ? "color-mix(in srgb, var(--success) 12%, transparent)" : "color-mix(in srgb, var(--warning) 12%, transparent)",
                            color: std.status === "pass" ? "var(--success)" : "var(--warning)",
                          }}
                        >
                          {std.status === "pass" ? "Pass" : "Partial"}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-1" style={{ fontSize: "12px", lineHeight: 1.5 }}>
                        {std.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-foreground mb-3" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                Accessibility Techniques
              </h2>
              <ul className="space-y-2 text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                {techniques.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-foreground mb-3" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                Known Limitations
              </h2>
              <div className="space-y-2 text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                <p>We are aware of the following accessibility limitations and are working to address them:</p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-warning mt-1">•</span>
                    <span>Some older portfolio screenshots may lack comprehensive alt text. We are adding descriptions to all project images.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warning mt-1">•</span>
                    <span>Third-party embedded content (if any) may not fully conform to WCAG standards. We work with vendors to improve accessibility.</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-foreground mb-3" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                Feedback
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                We welcome your feedback on the accessibility of our website. If you encounter accessibility barriers or have suggestions for improvement, please contact us at accessibility@aesthetixstudio.dev. We aim to respond to accessibility feedback within 5 business days.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                Assessment Approach
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                Aesthetix Studio assesses accessibility through a combination of automated testing tools (Lighthouse, axe-core), manual testing with keyboard and screen readers, and regular audits against WCAG 2.1 AA criteria.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
