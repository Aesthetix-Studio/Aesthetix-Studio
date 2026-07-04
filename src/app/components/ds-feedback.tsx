import { useState } from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X, ChevronDown, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DSSection, DSSubSection, DSPreview } from "./ds-section";
import { cn } from "./ui/utils";
import { AXButton } from "./ds-buttons";

/* ─── Alert ─────────────────────────────────────────────────── */
type AlertVariant = "info" | "success" | "warning" | "error";

const alertConfig: Record<AlertVariant, { icon: typeof Info; bg: string; border: string; iconColor: string; titleColor: string; textColor: string }> = {
  info: { icon: Info, bg: "bg-info-muted", border: "border-info/20", iconColor: "text-info", titleColor: "text-info-muted-foreground", textColor: "text-info-muted-foreground" },
  success: { icon: CheckCircle, bg: "bg-success-muted", border: "border-success/20", iconColor: "text-success", titleColor: "text-success-muted-foreground", textColor: "text-success-muted-foreground" },
  warning: { icon: AlertTriangle, bg: "bg-warning-muted", border: "border-warning/20", iconColor: "text-warning", titleColor: "text-warning-muted-foreground", textColor: "text-warning-muted-foreground" },
  error: { icon: AlertCircle, bg: "bg-red-50 dark:bg-destructive/10", border: "border-destructive/20", iconColor: "text-destructive", titleColor: "text-destructive", textColor: "text-destructive/80" },
};

interface AXAlertProps {
  variant: AlertVariant;
  title: string;
  description?: string;
  dismissible?: boolean;
  action?: { label: string; onClick: () => void };
}

export function AXAlert({ variant, title, description, dismissible, action }: AXAlertProps) {
  const [dismissed, setDismissed] = useState(false);
  const cfg = alertConfig[variant];
  const Icon = cfg.icon;

  if (dismissed) return null;

  return (
    <div className={cn("flex gap-3 p-4 rounded-xl border", cfg.bg, cfg.border)}>
      <Icon className={cn("w-4 h-4 shrink-0 mt-0.5", cfg.iconColor)} />
      <div className="flex-1 min-w-0">
        <div className={cn("text-sm font-semibold", cfg.titleColor)}>{title}</div>
        {description && <div className={cn("mt-1 text-[13px] leading-snug text-sm", cfg.textColor)}>{description}</div>}
        {action && (
          <button onClick={action.onClick} className={cn("mt-2 text-xs font-medium underline", cfg.titleColor)}>
            {action.label}
          </button>
        )}
      </div>
      {dismissible && (
        <button onClick={() => setDismissed(true)} className={cn("shrink-0 p-0.5 rounded hover:bg-black/10 transition-colors", cfg.iconColor)}>
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

/* ─── Badge ─────────────────────────────────────────────────── */
type BadgeVariant = "default" | "secondary" | "brand" | "success" | "warning" | "error" | "outline";

const badgeStyles: Record<BadgeVariant, string> = {
  default: "bg-foreground text-background",
  secondary: "bg-secondary text-muted-foreground border border-border",
  brand: "bg-brand-muted text-brand-muted-foreground",
  success: "bg-success-muted text-success-muted-foreground",
  warning: "bg-warning-muted text-warning-muted-foreground",
  error: "bg-red-50 text-destructive dark:bg-destructive/10",
  outline: "bg-transparent text-foreground border border-border",
};

interface AXBadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

export function AXBadge({ variant = "default", children, dot, className }: AXBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold", badgeStyles[variant], className)}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}

/* ─── Tag ───────────────────────────────────────────────────── */
interface AXTagProps {
  children: React.ReactNode;
  onRemove?: () => void;
  color?: "default" | "violet" | "blue" | "green" | "amber" | "red";
}

const tagColors: Record<NonNullable<AXTagProps["color"]>, string> = {
  default: "bg-secondary text-muted-foreground border border-border",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  green: "bg-success-muted text-success-muted-foreground",
  amber: "bg-warning-muted text-warning-muted-foreground",
  red: "bg-red-50 text-destructive dark:bg-destructive/10",
};

export function AXTag({ children, onRemove, color = "default" }: AXTagProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium", tagColors[color])}>
      {children}
      {onRemove && (
        <button onClick={onRemove} className="hover:opacity-70 transition-opacity ml-0.5">
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

/* ─── FAQ Accordion ─────────────────────────────────────────── */
const faqItems = [
  {
    q: "How long does a typical branding project take?",
    a: "Brand identity projects typically run 4–8 weeks depending on scope and revision rounds. We share a detailed timeline during the kickoff call so there are no surprises.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Absolutely. We love working with founders who are still shaping their vision. Our Starter package is designed specifically for early-stage teams with a focused scope and efficient delivery.",
  },
  {
    q: "What's included in a web design project?",
    a: "We deliver fully designed pages in Figma with a component library, interactive prototype, and developer-ready design tokens. We can also connect you with our development partners for implementation.",
  },
  {
    q: "Do you offer ongoing retainer arrangements?",
    a: "Yes. Many of our clients move to a monthly retainer after their initial project for continued design support, iteration, and new features. Talk to us about what that looks like.",
  },
  {
    q: "How do revisions work?",
    a: "Each package includes a defined number of revision rounds. We share work at structured checkpoints so feedback stays focused and efficient. Additional rounds can be added if needed.",
  },
];

export function AXFAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {faqItems.map((item, i) => (
        <div key={i} className="border border-border rounded-xl overflow-hidden bg-card">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-accent/50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="text-[14px] font-medium text-foreground pr-4">{item.q}</span>
            <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-5 pb-4 border-t border-border/40">
                  <p className="text-[13px] leading-relaxed text-muted-foreground pt-3">{item.a}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ─── CTA Section ───────────────────────────────────────────── */
interface AXCTASectionProps {
  variant?: "default" | "brand" | "dark";
}

export function AXCTASection({ variant = "brand" }: AXCTASectionProps) {
  const isBrand = variant === "brand";
  const isDark = variant === "dark";

  return (
    <div className={cn(
      "rounded-2xl p-10 relative overflow-hidden",
      isBrand ? "bg-gradient-to-br from-brand to-violet-700" : isDark ? "bg-background" : "bg-secondary"
    )}>
      {isBrand && (
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)" }} />
      )}
      <div className="relative text-center max-w-lg mx-auto space-y-4">
        <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full border", isBrand ? "border-white/20 bg-white/10 text-white" : "border-border bg-card text-muted-foreground")}>
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Limited spots available — Q3 2026</span>
        </div>
        <h2
          className={cn("text-[28px] font-bold tracking-tight", isBrand || isDark ? "text-white" : "text-foreground")}
        >
          Ready to define your brand?
        </h2>
        <p className={cn("text-[15px] leading-normal", isBrand ? "text-white/75" : isDark ? "text-white/60" : "text-muted-foreground")}>
          We take on a select number of new clients each quarter to maintain quality. Let's talk about your project.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            className={cn(
              "inline-flex items-center gap-2 h-10 px-6 rounded-xl text-sm font-semibold transition-all duration-150",
              isBrand ? "bg-white text-brand hover:bg-white/90" : "bg-foreground text-background hover:bg-foreground/90"
            )}
          >
            Book a Call
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            className={cn(
              "inline-flex items-center gap-1.5 h-10 px-5 rounded-xl text-sm font-medium transition-colors",
              isBrand ? "text-white/80 hover:text-white hover:bg-white/10" : isDark ? "text-white/60 hover:text-white hover:bg-white/8" : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            View Work
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Toast Demo ─────────────────────────────────────────────── */
export function AXToastDemo() {
  return (
    <div className="space-y-2 max-w-sm">
      {[
        { variant: "default" as const, title: "Project created", desc: "Luminary Brand Identity is ready." },
        { variant: "success" as const, title: "File uploaded", desc: "brand-assets.zip (24 MB) saved." },
        { variant: "warning" as const, title: "Review required", desc: "2 comments need your attention." },
        { variant: "error" as const, title: "Upload failed", desc: "File exceeds the 50MB size limit." },
      ].map(({ variant, title, desc }) => (
        <div
          key={title}
          className={cn(
            "flex items-start gap-3 p-3.5 rounded-xl border shadow-md bg-popover",
            variant === "success" && "border-success/20",
            variant === "warning" && "border-warning/20",
            variant === "error" && "border-destructive/20",
            variant === "default" && "border-border"
          )}
        >
          {variant === "success" && <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />}
          {variant === "warning" && <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />}
          {variant === "error" && <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />}
          {variant === "default" && <Info className="w-4 h-4 text-brand mt-0.5 shrink-0" />}
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-foreground">{title}</div>
            <div className="text-xs text-muted-foreground">{desc}</div>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

export function DSFeedbackSection() {
  const [tags, setTags] = useState(["Design Systems", "Brand Identity", "Motion Design", "UI/UX", "Enterprise"]);

  return (
    <DSSection
      id="feedback"
      title="Feedback & Alerts"
      description="Alerts, badges, tags, toasts, FAQ accordion, and CTA sections. Each component communicates status, context, or action with appropriate visual weight."
      badge="Components"
    >
      <DSSubSection title="Alerts">
        <div className="space-y-3 max-w-xl">
          <AXAlert variant="info" title="New update available" description="Version 2.1 includes 14 new components and improved dark mode support." action={{ label: "View changelog →", onClick: () => {} }} />
          <AXAlert variant="success" title="Project published" description="Your website is live at aesthetix.studio/work/luminary. Share it with your team." dismissible />
          <AXAlert variant="warning" title="Storage at 85%" description="Upgrade your plan before you run out of space. Free up 2.3 GB by archiving old files." action={{ label: "Upgrade now →", onClick: () => {} }} dismissible />
          <AXAlert variant="error" title="Payment failed" description="We couldn't charge the card ending in 4242. Please update your payment method to continue." action={{ label: "Update card →", onClick: () => {} }} dismissible />
        </div>
      </DSSubSection>

      <DSSubSection title="Badges">
        <DSPreview centered>
          <div className="flex flex-wrap gap-2">
            <AXBadge variant="default">Default</AXBadge>
            <AXBadge variant="secondary">Secondary</AXBadge>
            <AXBadge variant="brand">Brand</AXBadge>
            <AXBadge variant="success">Active</AXBadge>
            <AXBadge variant="warning">Pending</AXBadge>
            <AXBadge variant="error">Failed</AXBadge>
            <AXBadge variant="outline">Outline</AXBadge>
          </div>
          <div className="flex flex-wrap gap-2">
            <AXBadge variant="brand" dot>In Progress</AXBadge>
            <AXBadge variant="success" dot>Published</AXBadge>
            <AXBadge variant="warning" dot>Review</AXBadge>
            <AXBadge variant="error" dot>Rejected</AXBadge>
            <AXBadge variant="secondary" dot>Draft</AXBadge>
          </div>
        </DSPreview>
      </DSSubSection>

      <DSSubSection title="Tags">
        <DSPreview>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <AXTag key={tag} onRemove={() => setTags((t) => t.filter((x) => x !== tag))}>
                {tag}
              </AXTag>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <AXTag color="violet">Design Systems</AXTag>
            <AXTag color="blue">Web Design</AXTag>
            <AXTag color="green">Delivered</AXTag>
            <AXTag color="amber">In Review</AXTag>
            <AXTag color="red">Urgent</AXTag>
          </div>
        </DSPreview>
      </DSSubSection>

      <DSSubSection title="Toasts / Notifications">
        <DSPreview>
          <AXToastDemo />
        </DSPreview>
      </DSSubSection>

      <DSSubSection title="FAQ Accordion">
        <div className="max-w-2xl">
          <AXFAQAccordion />
        </div>
      </DSSubSection>

      <DSSubSection title="CTA Sections">
        <div className="space-y-4">
          <AXCTASection variant="brand" />
          <AXCTASection variant="dark" />
          <AXCTASection variant="default" />
        </div>
      </DSSubSection>
    </DSSection>
  );
}
