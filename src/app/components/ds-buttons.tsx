import { useState } from "react";
import { Loader2, ArrowRight, Plus, Download, Trash2, ExternalLink, Check, Sparkles } from "lucide-react";
import { DSSection, DSSubSection, DSPreview } from "./ds-section";
import { cn } from "./ui/utils";

/* ─── Aesthetix Button primitives ─────────────────────────── */
type AXButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "brand" | "link";
type AXButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AXButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AXButtonVariant;
  size?: AXButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconOnly?: boolean;
}

const variantStyles: Record<AXButtonVariant, string> = {
  primary: "bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/80",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70 active:bg-secondary/60 border border-border",
  outline: "bg-transparent text-foreground border border-border hover:bg-accent hover:border-foreground/20 active:bg-accent/70",
  ghost: "bg-transparent text-foreground hover:bg-accent active:bg-accent/70",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
  brand: "bg-brand text-brand-foreground hover:bg-brand-hover active:bg-brand-hover/90 shadow-[var(--shadow-brand)]",
  link: "bg-transparent text-brand hover:underline p-0 h-auto",
};

const sizeStyles: Record<AXButtonSize, string> = {
  xs: "h-7 px-2.5 text-[11px] rounded-md gap-1",
  sm: "h-9 px-3 text-[12px] rounded-lg gap-1.5",
  md: "h-11 px-4 text-[13px] rounded-lg gap-2",
  lg: "h-12 px-5 text-[14px] rounded-xl gap-2",
  xl: "h-14 px-6 text-[15px] rounded-xl gap-2.5",
};

export function AXButton({ variant = "primary", size = "md", loading, icon, iconRight, iconOnly, children, className, disabled, ...props }: AXButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-500 transition-all duration-150 cursor-pointer",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variantStyles[variant],
        sizeStyles[size],
        iconOnly && "w-auto aspect-square px-0 flex items-center justify-center",
        variant !== "link" && "select-none",
        className
      )}
      style={{ fontWeight: 500 }}
    >
      {loading ? <Loader2 className="animate-spin" style={{ width: 14, height: 14 }} /> : icon}
      {!iconOnly && children}
      {!loading && iconRight}
    </button>
  );
}

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
                <div className="text-[13px] font-500 text-foreground" style={{ fontWeight: 500 }}>{label}</div>
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
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider" style={{ fontWeight: 500 }}>{size}</span>
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
