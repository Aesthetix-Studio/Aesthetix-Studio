import { Link } from "react-router";
import SEO from "../components/SEO";

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing or using the services provided by Aesthetix Studio ('we,' 'our,' or 'us'), including our website, design services, development services, and client portal, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.",
    ],
  },
  {
    title: "Services",
    content: [
      "Aesthetix Studio provides design, branding, web development, product design, and related creative services. Services are delivered on a fixed-price project basis or through ongoing retainer agreements as specified in individual project proposals or statements of work.",
      "Scope of work, deliverables, timelines, and pricing are defined in written agreements before project commencement. Any changes to scope require a formal change order agreed to by both parties.",
    ],
  },
  {
    title: "Project Timeline and Delivery",
    content: [
      "Project timelines begin upon receipt of the signed agreement and initial payment. Delays in client feedback or asset delivery may extend the timeline proportionally. We will communicate any anticipated delays promptly.",
      "Final deliverables are provided upon completion of all project milestones and full payment. Source files and project assets are transferred to the client as specified in the project agreement.",
    ],
  },
  {
    title: "Payment Terms",
    content: [
      "Payment schedules are defined in individual project agreements. For fixed-price projects, we typically require 50% upfront and 50% upon completion. For retainers, payment is due at the beginning of each billing cycle.",
      "Late payments may incur a fee of 1.5% per month on the outstanding balance. Services may be suspended for invoices unpaid beyond 30 days. All payments are processed securely through Razorpay.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "Upon full payment, the client receives ownership of all final deliverables as specified in the project agreement. This includes final design files, developed code, and approved brand assets.",
      "Aesthetix Studio retains the right to display completed work in our portfolio and marketing materials unless otherwise agreed in writing. We reserve the right to use general techniques, patterns, and knowledge gained during the project.",
      "Pre-existing intellectual property, tools, frameworks, and templates used by Aesthetix Studio remain our property. These may be incorporated into deliverables with appropriate licensing as specified in the project agreement.",
    ],
  },
  {
    title: "Revisions and Modifications",
    content: [
      "Each project includes a defined number of revision rounds as specified in the project agreement. Additional revisions beyond the agreed scope will be billed at our standard hourly rate.",
      "Revision requests must be consolidated and submitted together. We are not obligated to act on fragmented feedback received at different times as separate revision rounds.",
    ],
  },
  {
    title: "Warranties and Disclaimers",
    content: [
      "We warrant that our services will be performed in a professional and workmanlike manner consistent with industry standards. We provide a 30-day warranty on delivered work for defects in our craftsmanship.",
      "We do not guarantee specific business outcomes, search rankings, conversion rates, or other performance metrics resulting from our work. Website uptime and performance depend on hosting, third-party services, and factors outside our control.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "Aesthetix Studio's total liability for any claim arising from our services shall not exceed the total fees paid by the client for the specific project giving rise to the claim. We shall not be liable for indirect, incidental, special, or consequential damages.",
    ],
  },
  {
    title: "Confidentiality",
    content: [
      "Both parties agree to keep confidential any proprietary information shared during the course of the project. This includes business strategies, unreleased products, financial information, and technical details.",
      "Confidential information shall not be disclosed to third parties without written consent and shall be used solely for the purposes of the project.",
    ],
  },
  {
    title: "Cancellation and Termination",
    content: [
      "Either party may terminate a project agreement with 14 days written notice. Upon termination, the client is responsible for payment of all work completed up to the termination date.",
      "If a project is cancelled after work has commenced, the initial deposit is non-refundable. Work completed beyond the initial deposit will be invoiced proportionally.",
    ],
  },
  {
    title: "Force Majeure",
    content: [
      "Neither party shall be liable for delays or failure to perform caused by circumstances beyond reasonable control, including natural disasters, government actions, pandemics, or infrastructure failures.",
    ],
  },
  {
    title: "Governing Law",
    content: [
      "These Terms are governed by the laws of India. Any disputes shall be resolved in the courts of Hyderabad, Telangana, India. Both parties agree to attempt mediation before pursuing litigation.",
    ],
  },
  {
    title: "Changes to Terms",
    content: [
      "We reserve the right to modify these Terms at any time. Material changes will be communicated via email or posted on our website with an updated effective date. Continued use of our services after changes constitutes acceptance of the revised Terms.",
    ],
  },
  {
    title: "Contact",
    content: [
      "Questions about these Terms should be sent to legal@aesthetixstudio.dev or Aesthetix Studio, Hyderabad, Telangana, India.",
    ],
  },
];

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service | Aesthetix Studio"
        description="Aesthetix Studio terms of service. Read our project agreements, payment terms, intellectual property rights, revision policies, cancellation terms, and liability limitations."
        url="/terms-of-service"
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
            Terms of Service
          </h1>

          <p className="text-muted-foreground mb-10" style={{ fontSize: "14px" }}>
            Last updated: July 2026
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2
                  className="text-foreground mb-3"
                  style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}
                >
                  {section.title}
                </h2>
                <div className="space-y-2">
                  {section.content.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-muted-foreground"
                      style={{ fontSize: "14px", lineHeight: 1.7 }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
