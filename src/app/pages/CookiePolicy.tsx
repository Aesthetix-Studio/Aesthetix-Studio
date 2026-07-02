import { Link } from "react-router";
import SEO from "../components/SEO";

const cookieTypes = [
  {
    name: "Essential Cookies",
    purpose: "Required for the website to function. These enable core features like authentication, session management, and security.",
    examples: ["Session tokens", " CSRF protection", " Load balancing identifiers"],
    duration: "Session or up to 24 hours",
    canDisable: false,
  },
  {
    name: "Functional Cookies",
    purpose: "Remember your preferences and settings to provide a personalized experience.",
    examples: ["Language preference", " Theme selection", " Recently viewed projects"],
    duration: "Up to 1 year",
    canDisable: true,
  },
  {
    name: "Analytics Cookies",
    purpose: "Help us understand how visitors interact with our website by collecting anonymous usage data.",
    examples: ["Google Analytics (_ga, _gid)", " Microsoft Clarity (_clck, _clsk)", " Page view tracking"],
    duration: "Up to 26 months",
    canDisable: true,
  },
  {
    name: "Marketing Cookies",
    purpose: "Used to track visitors across websites to display relevant advertisements.",
    examples: ["Retargeting pixels", " Ad conversion tracking", " Social media tracking"],
    duration: "Up to 90 days",
    canDisable: true,
  },
];

const thirdPartyCookies = [
  { service: "Google Analytics", provider: "Google LLC", purpose: "Website analytics", privacyPolicy: "https://policies.google.com/privacy" },
  { service: "Microsoft Clarity", provider: "Microsoft Corporation", purpose: "Session recording and heatmaps", privacyPolicy: "https://privacy.microsoft.com/privacystatement" },
  { service: "Razorpay", provider: "Razorpay Software Pvt. Ltd.", purpose: "Payment processing", privacyPolicy: "https://razorpay.com/privacy/" },
  { service: "Cloudflare", provider: "Cloudflare, Inc.", purpose: "CDN, security, and performance", privacyPolicy: "https://www.cloudflare.com/privacypolicy/" },
  { service: "Supabase", provider: "Supabase, Inc.", purpose: "Authentication and database", privacyPolicy: "https://supabase.com/privacy" },
];

export default function CookiePolicy() {
  return (
    <>
      <SEO
        title="Cookie Policy | Aesthetix Studio"
        description="Aesthetix Studio cookie policy. Learn about the cookies we use, their purpose, duration, and how to manage your cookie preferences."
        url="/cookie-policy"
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
            Cookie Policy
          </h1>

          <p className="text-muted-foreground mb-10" style={{ fontSize: "14px" }}>
            Last updated: July 2026
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="text-foreground mb-3" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                What Are Cookies
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, understanding how you use our site, and enabling core functionality.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-4" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                Types of Cookies We Use
              </h2>
              <div className="space-y-4">
                {cookieTypes.map((cookie) => (
                  <div key={cookie.name} className="p-5 rounded-xl border border-border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-foreground" style={{ fontSize: "15px", fontWeight: 600 }}>
                        {cookie.name}
                      </h3>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          background: cookie.canDisable ? "color-mix(in srgb, var(--warning) 12%, transparent)" : "color-mix(in srgb, var(--brand) 12%, transparent)",
                          color: cookie.canDisable ? "var(--warning)" : "var(--brand)",
                        }}
                      >
                        {cookie.canDisable ? "Optional" : "Required"}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2" style={{ fontSize: "13px", lineHeight: 1.6 }}>
                      {cookie.purpose}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {cookie.examples.map((ex) => (
                        <span key={ex} className="px-2 py-0.5 rounded bg-secondary text-muted-foreground" style={{ fontSize: "11px" }}>
                          {ex}
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                      Duration: {cookie.duration}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-foreground mb-4" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                Third-Party Cookies
              </h2>
              <p className="text-muted-foreground mb-4" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. Please refer to the privacy policies of these services for more information.
              </p>
              <div className="border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-card">
                      <th className="text-left p-3 text-foreground" style={{ fontSize: "12px", fontWeight: 600 }}>Service</th>
                      <th className="text-left p-3 text-foreground hidden sm:table-cell" style={{ fontSize: "12px", fontWeight: 600 }}>Provider</th>
                      <th className="text-left p-3 text-foreground" style={{ fontSize: "12px", fontWeight: 600 }}>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thirdPartyCookies.map((item) => (
                      <tr key={item.service} className="border-b border-border last:border-0">
                        <td className="p-3">
                          <a href={item.privacyPolicy} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline" style={{ fontSize: "13px", fontWeight: 500 }}>
                            {item.service}
                          </a>
                        </td>
                        <td className="p-3 text-muted-foreground hidden sm:table-cell" style={{ fontSize: "13px" }}>
                          {item.provider}
                        </td>
                        <td className="p-3 text-muted-foreground" style={{ fontSize: "13px" }}>
                          {item.purpose}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-foreground mb-3" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                Managing Cookies
              </h2>
              <div className="space-y-2">
                <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                  You can control and manage cookies in several ways:
                </p>
                <ul className="space-y-2 text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span><strong className="text-foreground">Browser Settings:</strong> Most browsers allow you to block or delete cookies. Check your browser's help section for instructions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span><strong className="text-foreground">Opt-Out Links:</strong> Use the opt-out tools provided by Google Analytics and Microsoft Clarity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span><strong className="text-foreground">Do Not Track:</strong> We respect Do Not Track (DNT) signals from your browser.</span>
                  </li>
                </ul>
                <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                  Note: Disabling essential cookies may affect website functionality, including authentication and security features.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-foreground mb-3" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                Updates to This Policy
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. Please check this page periodically for updates.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                Contact Us
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                If you have questions about our use of cookies, please contact us at privacy@aesthetixstudio.dev.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
