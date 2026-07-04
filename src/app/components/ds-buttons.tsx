import { useState } from "react";
import { ArrowRight, Plus, Download, Trash2, ExternalLink, Check, Sparkles } from "lucide-react";
import { DSSection, DSSubSection, DSPreview } from "./ds-section";
import { AXButton } from "../../design-system/components/Button";

// Re-export for backward compatibility
export { AXButton };
export type { AXButtonProps, AXButtonVariant, AXButtonSize } from "../../design-system/components/Button";

const variants: { label: string; variant: AXButtonVariant; desc: string }[] = [
  { label: "Primary", variant: "primary", desc: "Default action" },
  { label: "Brand", variant: "brand", desc: "Hero CTA, signup" },
  { label: "Secondary", variant: "secondary", desc: "Secondary action" },
  { label: "Outline", variant: "outline", desc: "Tertiary, form actions" },
  { label: "Ghost", variant: "ghost", desc: "Inline, table row" },
  { label: "Destructive", variant: "destructive", desc: "Delete, revoke" },
  { label: "Link", variant: "link", desc: "Inline text link" },
];

export function DSButtonsSection() {
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});

  const triggerLoading = (key: string) => {
    setLoadingState((s) => ({ ...s, [key]: true }));
    setTimeout(() => setLoadingState((s) => ({ ...s, [key]: false })), 2000);
  };

  return (
    <DSSection
      id="buttons"
      title="Buttons"
      description="Seven semantic variants across five sizes. Every button ships with hover, active, focus, disabled, and loading states."
      badge="Components"
    >
      <DSSubSection title="Variants">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {variants.map(({ label, variant, desc }) => (
            <div key={variant} className="flex items-center gap-6 px-6 py-4 border-b border-border/40 last:border-0 hover:bg-accent/30 transition-colors">
              <div className="w-32 shrink-0">
                <div className="text-[13px] font-medium text-foreground">{label}</div>
                <div className="text-[11px] text-muted-foreground">{desc}</div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <AXButton variant={variant} size="md">{label}</AXButton>
                <AXButton variant={variant} size="md" icon={<Sparkles style={{ width: 14, height: 14 }} />}>{label}</AXButton>
                <AXButton variant={variant} size="md" iconRight={<ArrowRight style={{ width: 14, height: 14 }} />}>{label}</AXButton>
                <AXButton variant={variant} size="md" disabled>{label}</AXButton>
                <AXButton
                  variant={variant}
                  size="md"
                  loading={loadingState[variant]}
                  onClick={() => triggerLoading(variant)}
                >
                  {loadingState[variant] ? "Loading…" : "Click me"}
                </AXButton>
              </div>
            </div>
          ))}
        </div>
      </DSSubSection>

      <DSSubSection title="Sizes">
        <DSPreview centered>
          {(["xs", "sm", "md", "lg", "xl"] as AXButtonSize[]).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <AXButton variant="brand" size={size}>Get Started</AXButton>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{size}</span>
            </div>
          ))}
        </DSPreview>
      </DSSubSection>

      <DSSubSection title="Icon Buttons">
        <DSPreview centered>
          {(["xs", "sm", "md", "lg"] as AXButtonSize[]).map((size) => (
            <div key={size} className="flex gap-2">
              <AXButton variant="primary" size={size} iconOnly icon={<Plus style={{ width: 14, height: 14 }} />} />
              <AXButton variant="secondary" size={size} iconOnly icon={<Download style={{ width: 14, height: 14 }} />} />
              <AXButton variant="outline" size={size} iconOnly icon={<ExternalLink style={{ width: 14, height: 14 }} />} />
              <AXButton variant="ghost" size={size} iconOnly icon={<Trash2 style={{ width: 14, height: 14 }} />} />
            </div>
          ))}
        </DSPreview>
      </DSSubSection>

      <DSSubSection title="Button Groups">
        <DSPreview centered>
          <div className="flex">
            <AXButton variant="outline" size="sm" className="rounded-r-none border-r-0">All</AXButton>
            <AXButton variant="secondary" size="sm" className="rounded-none border-r-0">Active</AXButton>
            <AXButton variant="outline" size="sm" className="rounded-none border-r-0">Paused</AXButton>
            <AXButton variant="outline" size="sm" className="rounded-l-none">Draft</AXButton>
          </div>
          <div className="flex items-center gap-2">
            <AXButton variant="brand" size="md" icon={<Check style={{ width: 14, height: 14 }} />}>Save Changes</AXButton>
            <AXButton variant="outline" size="md">Cancel</AXButton>
          </div>
          <div className="flex items-center gap-2">
            <AXButton variant="primary" size="lg" iconRight={<ArrowRight style={{ width: 16, height: 16 }} />}>Start Free Trial</AXButton>
            <AXButton variant="ghost" size="lg">Learn more</AXButton>
          </div>
        </DSPreview>
      </DSSubSection>

      <DSSubSection title="States — Loading Pattern">
        <DSPreview centered>
          <AXButton variant="brand" size="md" loading={loadingState["demo"]} onClick={() => triggerLoading("demo")}>
            {loadingState["demo"] ? "Publishing…" : "Publish Site"}
          </AXButton>
          <AXButton variant="primary" size="md" icon={<Check style={{ width: 14, height: 14 }} />} className="bg-success text-success-foreground hover:bg-success/90">
            Saved
          </AXButton>
          <AXButton variant="primary" size="md" disabled>Disabled</AXButton>
        </DSPreview>
      </DSSubSection>
    </DSSection>
  );
}
