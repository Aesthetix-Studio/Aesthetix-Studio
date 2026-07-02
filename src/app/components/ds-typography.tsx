import { DSSection, DSSubSection, DSPreview } from "./ds-section";

const typeScale = [
  { name: "Display XL", size: "48px", weight: "700", tracking: "-0.03em", sample: "Craft. Create. Define." },
  { name: "Display L", size: "40px", weight: "700", tracking: "-0.025em", sample: "Premium Design Systems" },
  { name: "Display M", size: "32px", weight: "700", tracking: "-0.02em", sample: "Built for Enterprise Scale" },
  { name: "Heading XL", size: "28px", weight: "600", tracking: "-0.018em", sample: "Design Token Architecture" },
  { name: "Heading L", size: "24px", weight: "600", tracking: "-0.015em", sample: "Component Variants & States" },
  { name: "Heading M", size: "20px", weight: "600", tracking: "-0.012em", sample: "Typography Scale System" },
  { name: "Heading S", size: "18px", weight: "600", tracking: "-0.01em", sample: "Accessible & Scalable UI" },
  { name: "Body L", size: "17px", weight: "400", tracking: "0", sample: "Our design language is built for clarity and trust." },
  { name: "Body M", size: "15px", weight: "400", tracking: "0", sample: "Every component ships with variants, states, and WCAG AA accessibility built in." },
  { name: "Body S", size: "13px", weight: "400", tracking: "0", sample: "Consistent, scalable, and maintainable across every product surface." },
  { name: "Caption", size: "12px", weight: "400", tracking: "0", sample: "Last updated 2 days ago · 5 min read" },
  { name: "Label", size: "11px", weight: "600", tracking: "0.06em", sample: "COMPONENT COUNT · VERSION 1.0 · WCAG AA" },
];

const fontWeights = [
  { name: "Light", weight: "300", sample: "Aesthetix Studio" },
  { name: "Regular", weight: "400", sample: "Aesthetix Studio" },
  { name: "Medium", weight: "500", sample: "Aesthetix Studio" },
  { name: "Semibold", weight: "600", sample: "Aesthetix Studio" },
  { name: "Bold", weight: "700", sample: "Aesthetix Studio" },
  { name: "Extrabold", weight: "800", sample: "Aesthetix Studio" },
];

export function DSTypographySection() {
  return (
    <DSSection
      id="typography"
      title="Typography"
      description="Plus Jakarta Sans for display & headings. Inter for body copy. JetBrains Mono for code. Every size has a defined purpose in the information hierarchy."
      badge="Foundation"
    >
      <DSSubSection title="Type Scale">
        <div className="space-y-1 bg-card rounded-xl border border-border overflow-hidden">
          {typeScale.map((t, i) => (
            <div
              key={t.name}
              className="flex items-baseline gap-6 px-6 py-4 border-b border-border/40 last:border-0 hover:bg-accent/50 transition-colors group"
            >
              <div className="w-24 shrink-0">
                <div className="text-[11px] font-600 text-muted-foreground" style={{ fontWeight: 600 }}>{t.name}</div>
                <div className="text-[10px] text-muted-foreground/60 font-mono">{t.size} / {t.weight}</div>
              </div>
              <div
                className="flex-1 text-foreground truncate"
                style={{
                  fontSize: t.size,
                  fontWeight: t.weight,
                  letterSpacing: t.tracking,
                  lineHeight: 1.2,
                  fontFamily: t.name.startsWith("Label") ? "'JetBrains Mono', monospace" : "'Plus Jakarta Sans', 'Inter', sans-serif",
                  textTransform: t.name.startsWith("Label") ? "uppercase" : undefined,
                }}
              >
                {t.sample}
              </div>
            </div>
          ))}
        </div>
      </DSSubSection>

      <DSSubSection title="Font Weights — Plus Jakarta Sans">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {fontWeights.map((w) => (
            <div key={w.name} className="bg-card rounded-xl border border-border p-4">
              <div
                className="text-2xl text-foreground mb-2 truncate"
                style={{ fontWeight: w.weight, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {w.sample}
              </div>
              <div className="text-[11px] text-muted-foreground">{w.name}</div>
              <div className="text-[10px] text-muted-foreground/60 font-mono">{w.weight}</div>
            </div>
          ))}
        </div>
      </DSSubSection>

      <DSSubSection title="Monospace — JetBrains Mono">
        <div className="bg-[#0D0D0C] rounded-xl border border-border p-6">
          <div className="text-[13px]" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#A3A39D", lineHeight: "1.7" }}>
            <span style={{ color: "#8C78FF" }}>const</span>
            <span style={{ color: "#F3F3F1" }}> design</span>
            <span style={{ color: "#6150F6" }}> =</span>
            <span style={{ color: "#F3F3F1" }}> {"{"}</span>
            <br />
            <span style={{ color: "#F3F3F1" }}>{"  "}</span>
            <span style={{ color: "#8C78FF" }}>brand</span>
            <span style={{ color: "#A3A39D" }}>: </span>
            <span style={{ color: "#D2CCFF" }}>'Aesthetix Studio'</span>
            <span style={{ color: "#A3A39D" }}>,</span>
            <br />
            <span style={{ color: "#8C78FF" }}>{"  "}accent</span>
            <span style={{ color: "#A3A39D" }}>: </span>
            <span style={{ color: "#D2CCFF" }}>'#6150F6'</span>
            <span style={{ color: "#A3A39D" }}>,</span>
            <br />
            <span style={{ color: "#8C78FF" }}>{"  "}wcag</span>
            <span style={{ color: "#A3A39D" }}>: </span>
            <span style={{ color: "#D2CCFF" }}>'AA'</span>
            <br />
            <span style={{ color: "#F3F3F1" }}>{"}"}</span>
          </div>
        </div>
      </DSSubSection>

      <DSSubSection title="Prose — Editorial Example">
        <DSPreview>
          <article className="max-w-2xl space-y-4">
            <p className="text-[11px] font-600 uppercase tracking-widest text-brand" style={{ fontWeight: 600 }}>
              Design Systems
            </p>
            <h1 className="text-foreground" style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              A systematic approach to building digital products at scale
            </h1>
            <p className="text-muted-foreground" style={{ fontSize: '17px', lineHeight: '1.75' }}>
              Great design systems are like great architecture — invisible when working, immediately felt when absent.
              Aesthetix Studio's design language is built around restraint, hierarchy, and precision.
            </p>
            <p className="text-muted-foreground" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Every decision — from shadow depth to border radius — is deliberate. Components ship with WCAG AA accessibility
              and dark mode support by default.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-[11px] font-700" style={{ fontWeight: 700 }}>AS</div>
              <div>
                <div className="text-[13px] font-500 text-foreground" style={{ fontWeight: 500 }}>Aesthetix Studio</div>
                <div className="text-[11px] text-muted-foreground">Design Systems · June 2026</div>
              </div>
            </div>
          </article>
        </DSPreview>
      </DSSubSection>
    </DSSection>
  );
}
