import { useEffect, useState } from "react";

function useDocumentTitle(title: string) {
  useEffect(() => { document.title = `${title} | Aesthetix Studio`; }, [title]);
}
import { useParams, Link } from "react-router";
import { GrainOverlay } from "./grain";
import { Nav } from "./nav";
import { Footer } from "./footer";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  process: { step: string; title: string; description: string }[];
  outcomes: string[];
  ctaText: string;
}

const SERVICES: Record<string, ServiceData> = {
  "ui-ux-design": {
    title: "UI/UX Design",
    subtitle: "Design that converts.",
    description: "We craft intuitive, conversion-focused interfaces that turn visitors into clients. Every pixel serves a purpose — from information architecture to micro-interactions, our design system ensures your digital presence feels cohesive and intentional.",
    capabilities: [
      "User research & persona development",
      "Information architecture",
      "Wireframing & prototyping",
      "Visual design systems",
      "Interaction design",
      "Usability testing",
      "Accessibility auditing (WCAG 2.1)",
      "Design-to-code handoff",
    ],
    process: [
      { step: "01", title: "Discovery", description: "We audit your current experience, interview stakeholders, and analyze user behavior to identify friction points and opportunities." },
      { step: "02", title: "Strategy", description: "Information architecture, user flows, and wireframes that map the optimal path from visitor to conversion." },
      { step: "03", title: "Design", description: "High-fidelity mockups and interactive prototypes built on a scalable design system." },
      { step: "04", title: "Validate", description: "Usability testing with real users to validate decisions before a single line of code is written." },
    ],
    outcomes: [
      "43% increase in qualified inquiries",
      "2.8x improvement in conversion rates",
      "60% reduction in support tickets",
      "95+ Lighthouse accessibility scores",
    ],
    ctaText: "Start your design project",
  },
  "web-development": {
    title: "Web Development",
    subtitle: "Performance is a feature.",
    description: "We build fast, modern web applications using cutting-edge frameworks and Cloudflare's global edge network. Our stack is designed for speed, security, and scalability — because every millisecond counts.",
    capabilities: [
      "React / Next.js development",
      "Cloudflare Workers & Pages",
      "Headless CMS integration",
      "E-commerce solutions",
      "API design & development",
      "Performance optimization",
      "Progressive Web Apps",
      "CI/CD & deployment automation",
    ],
    process: [
      { step: "01", title: "Architecture", description: "Technical planning that balances performance, maintainability, and future scalability." },
      { step: "02", title: "Build", description: "Clean, typed code with modern frameworks. We favor edge computing for global performance." },
      { step: "03", title: "Optimize", description: "Core Web Vitals tuning, bundle optimization, and caching strategies that deliver sub-second loads." },
      { step: "04", title: "Launch", description: "Automated deployments, monitoring, and performance budgets to keep your site fast over time." },
    ],
    outcomes: [
      "Sub-second page loads globally",
      "99.9% uptime on Cloudflare edge",
      "50-80% reduction in hosting costs",
      "Lighthouse scores consistently 95+",
    ],
    ctaText: "Build something fast",
  },
  "ai-solutions": {
    title: "AI Solutions",
    subtitle: "Intelligence, engineered.",
    description: "We integrate practical AI into your business workflows — not hype, but measurable impact. From content generation to intelligent automation, we build AI systems that save time and generate revenue.",
    capabilities: [
      "AI-powered content generation",
      "Intelligent document processing",
      "Predictive analytics dashboards",
      "Chatbot & conversational AI",
      "Workflow automation",
      "Custom AI model integration",
      "Data pipeline engineering",
      "AI strategy consulting",
    ],
    process: [
      { step: "01", title: "Assess", description: "We map your workflows to identify where AI can save the most time and money." },
      { step: "02", title: "Prototype", description: "Rapid MVP of the AI feature using proven models and APIs — no reinventing the wheel." },
      { step: "03", title: "Integrate", description: "Production-grade implementation with proper error handling, monitoring, and fallbacks." },
      { step: "04", title: "Iterate", description: "Continuous improvement based on real usage data and feedback loops." },
    ],
    outcomes: [
      "70% reduction in manual data entry",
      "3x faster content production",
      "Automated proposal generation",
      "Intelligent lead qualification",
    ],
    ctaText: "Explore AI for your business",
  },
  "seo": {
    title: "SEO & Growth",
    subtitle: "Be found. Be chosen.",
    description: "Technical SEO and content strategy that drives organic traffic. We build sites that search engines love and users can't ignore — from schema markup to content clusters.",
    capabilities: [
      "Technical SEO auditing",
      "Core Web Vitals optimization",
      "Schema markup & structured data",
      "Content strategy & clustering",
      "Keyword research & mapping",
      "Internal linking architecture",
      "Local SEO optimization",
      "Analytics & reporting dashboards",
    ],
    process: [
      { step: "01", title: "Audit", description: "Comprehensive technical and content audit revealing every opportunity for organic growth." },
      { step: "02", title: "Plan", description: "Keyword mapping, content calendar, and technical roadmap prioritized by impact." },
      { step: "03", title: "Execute", description: "Technical fixes, content creation, and on-page optimization — measured and tracked." },
      { step: "04", title: "Scale", description: "Monthly reporting, content expansion, and continuous optimization for compounding growth." },
    ],
    outcomes: [
      "3-5x organic traffic in 6 months",
      "Top 3 rankings for target keywords",
      "30% increase in organic leads",
      "Measurable ROI on every content piece",
    ],
    ctaText: "Grow your organic presence",
  },
};

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES[slug ?? ""];

  useDocumentTitle(service?.title ?? "Service");

  if (!service) {
    return (
      <div style={styles.notFound}>
        <p style={{ color: "#555" }}>Service not found.</p>
        <Link to="/" style={styles.back}>← Back to home</Link>
      </div>
    );
  }

  const [leads, setLeads] = useState({ name: "", email: "", company: "", project_details: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`${API}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leads.name,
          email: leads.email,
          company: leads.company,
          project_details: `[${service.title}] ${leads.project_details}`,
        }),
      });
      setSubmitted(true);
    } catch {}
    setSubmitting(false);
  }

  return (
    <div style={{ backgroundColor: "#080808", minHeight: "100vh", overflowX: "hidden" }}>
      <GrainOverlay />
      <Nav />

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <Link to="/" style={styles.back}>← Back</Link>
          <p style={styles.subtitle}>{service.subtitle}</p>
          <h1 style={styles.title}>{service.title}</h1>
          <p style={styles.description}>{service.description}</p>
        </div>
      </section>

      {/* Capabilities */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Capabilities</h2>
          <div style={styles.grid}>
            {service.capabilities.map((cap, i) => (
              <div key={i} style={styles.capCard}>
                <span style={styles.capIndex}>{String(i + 1).padStart(2, "0")}</span>
                <p style={styles.capText}>{cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ ...styles.section, background: "#0d0d0d" }}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Our Process</h2>
          <div style={styles.processGrid}>
            {service.process.map((p, i) => (
              <div key={i} style={styles.processCard}>
                <span style={styles.processStep}>{p.step}</span>
                <h3 style={styles.processTitle}>{p.title}</h3>
                <p style={styles.processDesc}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Outcomes</h2>
          <div style={styles.outcomesGrid}>
            {service.outcomes.map((outcome, i) => (
              <div key={i} style={styles.outcomeCard}>
                <p style={styles.outcomeText}>{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...styles.section, background: "#0d0d0d" }}>
        <div style={{ ...styles.container, maxWidth: 480 }}>
          <h2 style={styles.sectionTitle}>{service.ctaText}</h2>
          {submitted ? (
            <p style={{ color: "#22c55e", fontSize: 16, marginTop: 16 }}>Thank you! We'll be in touch within 24 hours.</p>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <input required placeholder="Your name" value={leads.name} onChange={e => setLeads({ ...leads, name: e.target.value })} style={styles.input} />
              <input required type="email" placeholder="Email" value={leads.email} onChange={e => setLeads({ ...leads, email: e.target.value })} style={styles.input} />
              <input placeholder="Company (optional)" value={leads.company} onChange={e => setLeads({ ...leads, company: e.target.value })} style={styles.input} />
              <textarea placeholder="Tell us about your project" value={leads.project_details} onChange={e => setLeads({ ...leads, project_details: e.target.value })} style={{ ...styles.input, minHeight: 100, resize: "vertical" }} />
              <button type="submit" disabled={submitting} style={styles.btn}>{submitting ? "Sending…" : "Send inquiry"}</button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 960, margin: "0 auto", padding: "0 24px" },
  notFound: { minHeight: "100vh", background: "#080808", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 },
  back: { color: "#555", fontSize: 14, textDecoration: "none", marginBottom: 40, display: "inline-block" },
  hero: { padding: "160px 0 80px" },
  subtitle: { fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: "#C4A46B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 56, fontWeight: 400, color: "#F0EBE0", lineHeight: 1.1, letterSpacing: -1, marginBottom: 24 },
  description: { fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 300, color: "rgba(240,235,224,0.5)", lineHeight: 1.7, maxWidth: 640 },
  section: { padding: "80px 0" },
  sectionTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 32, fontWeight: 400, color: "#F0EBE0", marginBottom: 40 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 },
  capCard: { background: "#111", border: "1px solid #1f1f1f", borderRadius: 0, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 },
  capIndex: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#C4A46B", fontWeight: 500, flexShrink: 0 },
  capText: { fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(240,235,224,0.7)", margin: 0 },
  processGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 },
  processCard: { },
  processStep: { fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#C4A46B", fontWeight: 500, display: "block", marginBottom: 12 },
  processTitle: { fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 600, color: "#F0EBE0", margin: "0 0 8px" },
  processDesc: { fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(240,235,224,0.45)", lineHeight: 1.7, margin: 0 },
  outcomesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 },
  outcomeCard: { background: "#111", border: "1px solid #1f1f1f", borderRadius: 0, padding: "20px 24px" },
  outcomeText: { fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: "#F0EBE0", margin: 0 },
  form: { display: "flex", flexDirection: "column", gap: 12, marginTop: 24 },
  input: { background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "12px 16px", fontSize: 14, borderRadius: 4, outline: "none", fontFamily: "'Inter', sans-serif" },
  btn: { background: "#F0EBE0", color: "#080808", border: "none", padding: "12px 24px", fontSize: 14, fontWeight: 500, borderRadius: 4, cursor: "pointer", fontFamily: "'Inter', sans-serif" },
};
