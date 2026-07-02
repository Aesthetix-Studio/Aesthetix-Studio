import { Link } from "react-router";
import SEO from "../components/SEO";
import { ArrowRight } from "lucide-react";

const values = [
  {
    title: "Craft Over Convention",
    description: "Every pixel, every line of code, every interaction is intentional. We don't ship templates — we build from first principles.",
  },
  {
    title: "Partnership, Not Service",
    description: "We embed ourselves in your vision. The best work happens when boundaries between client and studio dissolve.",
  },
  {
    title: "Quality Is Non-Negotiable",
    description: "We'd rather deliver late and exceptional than on-time and forgettable. Our reputation lives in every project.",
  },
  {
    title: "Think in Systems",
    description: "Beautiful pages are easy. We build brands, design systems, and architectures that scale with your ambition.",
  },
];

const milestones = [
  { year: "2021", event: "Founded in Hyderabad with a focus on premium digital design" },
  { year: "2022", event: "Expanded to full-service design and development" },
  { year: "2023", event: "Launched 10+ showcase websites and established the design system" },
  { year: "2024", event: "Grew to serve startups, SaaS companies, and enterprise clients globally" },
  { year: "2025", event: "Introduced product design, motion graphics, and 3D capabilities" },
  { year: "2026", event: "Rebranding to Aesthetix Studio — full creative studio for ambitious brands" },
];

export default function About() {
  return (
    <>
      <SEO
        title="About | Aesthetix Studio"
        description="Learn about Aesthetix Studio — a premium creative studio in Hyderabad specializing in brand identity, web design, product design, and design systems. Founded 2021."
        url="/about"
      />
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-brand" />
            <span className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              About the Studio
            </span>
          </div>
          <h1
            className="text-foreground mb-6"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            We design digital experiences that move people.
          </h1>
          <p
            className="text-muted-foreground max-w-2xl"
            style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.7 }}
          >
            Aesthetix Studio is a premium creative studio based in Hyderabad, India. We partner with startups, SaaS companies, and enterprise brands to create identities, websites, and products that stand apart.
          </p>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-card">
          <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "30+", label: "Happy Clients" },
              { value: "5+", label: "Years of Craft" },
              { value: "10", label: "Showcase Sites" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-foreground" style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-1" style={{ fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-foreground" style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                Our Story
              </h2>
            </div>
            <div className="md:col-span-3 space-y-4">
              <p className="text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                Aesthetix Studio started with a simple observation: the digital landscape is flooded with sameness. Generic templates, recycled aesthetics, and forgettable experiences dominate. We believed there was room for something better.
              </p>
              <p className="text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                Founded in Hyderabad in 2021, we set out to build a studio that treats every project as a craft — not a commodity. From brand identities that resonate to websites that convert, we approach each challenge with the same rigour and attention to detail.
              </p>
              <p className="text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                Today, we serve clients across India and globally — from early-stage startups finding their voice to established brands ready for a transformation. Our work spans brand identity, web design, product design, design systems, and motion graphics.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-y border-border bg-card">
          <div className="max-w-4xl mx-auto px-6 py-20">
            <h2 className="text-foreground mb-12" style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.02em" }}>
              What We Stand For
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value) => (
                <div key={value.title} className="p-6 rounded-xl border border-border bg-background">
                  <h3 className="text-foreground mb-2" style={{ fontSize: "16px", fontWeight: 600 }}>
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-foreground mb-12" style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.02em" }}>
            Our Journey
          </h2>
          <div className="space-y-0">
            {milestones.map((milestone, i) => (
              <div key={milestone.year} className="flex gap-6 relative">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-brand shrink-0 mt-1.5" />
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-foreground block" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                    {milestone.year}
                  </span>
                  <span className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                    {milestone.event}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-card">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <h2 className="text-foreground mb-4" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, letterSpacing: "-0.03em" }}>
              Ready to build something remarkable?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto" style={{ fontSize: "15px", lineHeight: 1.7 }}>
              We're selective about the projects we take on because every partnership deserves our full attention.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/discovery-call"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-brand text-white transition-all hover:bg-brand-hover"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                Book a Discovery Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-lg border border-border text-foreground transition-colors hover:bg-card"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                View Our Work
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
