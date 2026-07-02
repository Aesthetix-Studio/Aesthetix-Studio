import { Link } from "react-router";
import SEO from "../components/SEO";

const sections = [
  {
    title: "Information We Collect",
    content: [
      "Personal Information: Name, email address, phone number, company name, and project details submitted through contact forms, discovery calls, or project inquiries.",
      "Usage Data: Pages visited, time spent on pages, browser type, device information, and referral sources collected automatically through analytics tools.",
      "Cookies and Tracking: Session cookies for authentication and functional cookies to remember your preferences. We may use analytics tools such as Google Analytics and Microsoft Clarity to understand user behavior.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "To respond to your inquiries and schedule discovery calls.",
      "To deliver design and development services as outlined in project agreements.",
      "To send project updates, invoices, and administrative communications.",
      "To improve our website experience and service offerings.",
      "To comply with legal obligations and protect against fraud.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We implement industry-standard security measures including encryption in transit (TLS/SSL) and at rest. All data is stored on secure Cloudflare infrastructure with DDoS protection and Web Application Firewall (WAF) enabled. Payment processing is handled exclusively by Razorpay and we never store credit card details on our servers.",
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      "Razorpay — Payment processing. Subject to Razorpay's Privacy Policy.",
      "Cloudflare — Hosting, CDN, and security infrastructure.",
      "Supabase — Authentication and database services.",
      "Google Analytics — Website analytics. Data is anonymized.",
      "Microsoft Clarity — Session recording and heatmaps for UX improvement.",
      "Email Service Providers — Transactional and marketing emails.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "You have the right to access, correct, or delete your personal data. You may opt out of marketing communications at any time. To exercise these rights, contact us at privacy@aesthetixstudio.dev. We will respond to data requests within 30 days.",
    ],
  },
  {
    title: "Data Retention",
    content: [
      "We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy. Project-related data is retained for 3 years after project completion for reference and support purposes. Analytics data is aggregated and anonymized after 26 months.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "Essential cookies for site functionality and authentication. Analytics cookies (Google Analytics) to understand usage patterns. You can control cookie preferences through your browser settings. Disabling essential cookies may affect site functionality.",
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      "Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will promptly delete it.",
    ],
  },
  {
    title: "International Data Transfers",
    content: [
      "Your information may be processed in countries other than your own. Cloudflare's global network ensures data is handled in compliance with applicable data protection laws including GDPR and Indian IT Act, 2000.",
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this policy from time to time. Material changes will be communicated via email or a prominent notice on our website. The \"Last Updated\" date at the top reflects the most recent revision.",
    ],
  },
  {
    title: "Contact Us",
    content: [
      "For questions about this Privacy Policy or to request data access/deletion, email privacy@aesthetixstudio.dev or write to: Aesthetix Studio, Hyderabad, Telangana, India.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Aesthetix Studio"
        description="Aesthetix Studio privacy policy. Learn how we collect, use, and protect your personal information. Covers data security, cookies, third-party services, and your rights under Indian IT Act and GDPR."
        url="/privacy-policy"
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
            Privacy Policy
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
