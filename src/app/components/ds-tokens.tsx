import { DSSection, DSSubSection } from "./ds-section";
import { cn } from "./ui/utils";

const inkScale = [
  { name: "Ink 0", var: "--ink-0", value: "#FFFFFF", text: "dark" },
  { name: "Ink 50", var: "--ink-50", value: "#FAFAF9", text: "dark" },
  { name: "Ink 100", var: "--ink-100", value: "#F3F3F1", text: "dark" },
  { name: "Ink 200", var: "--ink-200", value: "#E5E5E2", text: "dark" },
  { name: "Ink 300", var: "--ink-300", value: "#CBCBC6", text: "dark" },
  { name: "Ink 400", var: "--ink-400", value: "#A3A39D", text: "dark" },
  { name: "Ink 500", var: "--ink-500", value: "#737370", text: "light" },
  { name: "Ink 600", var: "--ink-600", value: "#525250", text: "light" },
  { name: "Ink 700", var: "--ink-700", value: "#3B3B39", text: "light" },
  { name: "Ink 800", var: "--ink-800", value: "#262624", text: "light" },
  { name: "Ink 900", var: "--ink-900", value: "#171715", text: "light" },
  { name: "Ink 950", var: "--ink-950", value: "#0D0D0C", text: "light" },
];

const violetScale = [
  { name: "Violet 50", var: "--violet-50", value: "#F2F0FF", text: "dark" },
  { name: "Violet 100", var: "--violet-100", value: "#E8E4FF", text: "dark" },
  { name: "Violet 200", var: "--violet-200", value: "#D2CCFF", text: "dark" },
  { name: "Violet 300", var: "--violet-300", value: "#B0A5FF", text: "dark" },
  { name: "Violet 400", var: "--violet-400", value: "#8C78FF", text: "dark" },
  { name: "Violet 500", var: "--violet-500", value: "#6150F6", text: "light", primary: true },
  { name: "Violet 600", var: "--violet-600", value: "#4E3DE0", text: "light" },
  { name: "Violet 700", var: "--violet-700", value: "#3D2EC4", text: "light" },
  { name: "Violet 800", var: "--violet-800", value: "#3125A8", text: "light" },
  { name: "Violet 900", var: "--violet-900", value: "#261C80", text: "light" },
  { name: "Violet 950", var: "--violet-950", value: "#160F4F", text: "light" },
];

const statusColors = [
  { name: "Success", value: "#16A34A", muted: "#F0FDF4", label: "green" },
  { name: "Warning", value: "#D97706", muted: "#FFFBEB", label: "amber" },
  { name: "Error", value: "#DC2626", muted: "#FEF2F2", label: "red" },
  { name: "Info", value: "#2563EB", muted: "#EFF6FF", label: "blue" },
];

const shadows = [
  { name: "xs", value: "0 1px 2px rgba(0,0,0,0.04)", label: "Subtle lift" },
  { name: "sm", value: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)", label: "Card resting" },
  { name: "md", value: "0 4px 8px -2px rgba(0,0,0,0.07)", label: "Dropdown, popover" },
  { name: "lg", value: "0 10px 20px -5px rgba(0,0,0,0.08)", label: "Modal, panel" },
  { name: "xl", value: "0 20px 40px -10px rgba(0,0,0,0.10)", label: "Overlay" },
  { name: "2xl", value: "0 32px 64px -16px rgba(0,0,0,0.14)", label: "Command palette" },
  { name: "brand", value: "0 8px 24px -4px rgba(97,80,246,0.30)", label: "Brand CTA" },
];

const radii = [
  { name: "none", value: "0", label: "0" },
  { name: "sm", value: "4px", label: "4px" },
  { name: "md", value: "6px", label: "6px" },
  { name: "lg", value: "10px", label: "10px" },
  { name: "xl", value: "14px", label: "14px" },
  { name: "2xl", value: "20px", label: "20px" },
  { name: "full", value: "9999px", label: "∞" },
];

const motion = [
  { name: "instant", value: "50ms", label: "Micro-feedback" },
  { name: "fast", value: "100ms", label: "Icon swap, toggle" },
  { name: "normal", value: "200ms", label: "Standard transition" },
  { name: "slow", value: "300ms", label: "Panel, drawer" },
  { name: "slower", value: "500ms", label: "Page transition" },
  { name: "slowest", value: "800ms", label: "Intro animation" },
];

const easings = [
  { name: "ease-out-expo", value: "cubic-bezier(0.16, 1, 0.3, 1)", label: "Snappy entry" },
  { name: "ease-in-out", value: "cubic-bezier(0.45, 0, 0.55, 1)", label: "Smooth cross-fade" },
  { name: "ease-spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)", label: "Bouncy confirm" },
  { name: "ease-smooth", value: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", label: "Smooth hover" },
];

const spacingScale = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];

function ColorSwatch({ name, value, text, primary }: { name: string; value: string; text: string; primary?: boolean }) {
  return (
    <div className="group">
      <div
        className={cn(
          "h-12 rounded-lg mb-2 relative transition-transform duration-150 hover:scale-105",
          primary && "ring-2 ring-brand ring-offset-2 ring-offset-background"
        )}
        style={{ backgroundColor: value }}
      >
        {primary && (
          <span
            className="absolute top-1 right-1 text-[9px] px-1 rounded"
            style={{ background: "rgba(255,255,255,0.25)", color: text === "light" ? "#fff" : "#000", fontWeight: 600 }}
          >
            PRIMARY
          </span>
        )}
      </div>
      <div className="text-[11px] font-500 text-foreground" style={{ fontWeight: 500 }}>{name}</div>
      <div className="text-[10px] text-muted-foreground font-mono">{value}</div>
    </div>
  );
}

export function DSTokensSection() {
  return (
    <DSSection
      id="tokens"
      title="Design Tokens"
      description="The foundational building blocks — colors, shadows, spacing, radius, and motion. All tokens are available as CSS custom properties and Tailwind utilities."
      badge="Foundation"
    >
      <DSSubSection title="Color / Ink Scale (Neutral)">
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {inkScale.map((c) => (
            <ColorSwatch key={c.name} {...c} />
          ))}
        </div>
      </DSSubSection>

      <DSSubSection title="Color / Violet Scale (Brand Accent)">
        <div className="grid grid-cols-5 sm:grid-cols-11 gap-2">
          {violetScale.map((c) => (
            <ColorSwatch key={c.name} {...c} />
          ))}
        </div>
      </DSSubSection>

      <DSSubSection title="Color / Status">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statusColors.map((c) => (
            <div key={c.name} className="rounded-xl border border-border overflow-hidden">
              <div className="h-14" style={{ backgroundColor: c.value }} />
              <div className="px-3 py-2 bg-card">
                <div className="text-[12px] font-500 text-foreground" style={{ fontWeight: 500 }}>{c.name}</div>
                <div className="text-[11px] text-muted-foreground font-mono">{c.value}</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: c.muted, border: "1px solid rgba(0,0,0,0.08)" }} />
                  <span className="text-[10px] text-muted-foreground">Muted bg</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DSSubSection>

      <DSSubSection title="Shadow System">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {shadows.map((s) => (
            <div key={s.name} className="bg-card rounded-xl p-4 border border-border/40" style={{ boxShadow: s.value }}>
              <div className="text-[13px] font-600 text-foreground mb-0.5" style={{ fontWeight: 600 }}>shadow-{s.name}</div>
              <div className="text-[11px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </DSSubSection>

      <DSSubSection title="Border Radius">
        <div className="flex flex-wrap items-end gap-6">
          {radii.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 bg-brand/15 border-2 border-brand/40"
                style={{ borderRadius: r.value }}
              />
              <div className="text-[11px] font-500 text-foreground text-center" style={{ fontWeight: 500 }}>
                {r.name}
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">{r.label}</div>
            </div>
          ))}
        </div>
      </DSSubSection>

      <DSSubSection title="Spacing Scale">
        <div className="space-y-2 overflow-x-auto">
          {spacingScale.map((n) => (
            <div key={n} className="flex items-center gap-4 min-w-0">
              <div className="w-8 text-[11px] text-muted-foreground font-mono text-right shrink-0">{n}</div>
              <div className="h-4 bg-brand/20 rounded-sm" style={{ width: `${n * 4}px`, minWidth: "4px" }} />
              <div className="text-[11px] text-muted-foreground">{n * 4}px</div>
            </div>
          ))}
        </div>
      </DSSubSection>

      <DSSubSection title="Motion / Duration">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {motion.map((m) => (
            <div key={m.name} className="bg-card rounded-lg border border-border p-3">
              <div className="text-[12px] font-600 text-foreground mb-1" style={{ fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
                {m.value}
              </div>
              <div className="text-[11px] text-muted-foreground">{m.name}</div>
              <div className="text-[10px] text-muted-foreground/70 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      </DSSubSection>

      <DSSubSection title="Motion / Easing">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {easings.map((e) => (
            <div key={e.name} className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[12px] font-600 text-foreground" style={{ fontWeight: 600 }}>{e.name}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{e.label}</div>
                </div>
              </div>
              <div className="mt-2 text-[10px] text-muted-foreground/70 font-mono break-all">{e.value}</div>
            </div>
          ))}
        </div>
      </DSSubSection>
    </DSSection>
  );
}
