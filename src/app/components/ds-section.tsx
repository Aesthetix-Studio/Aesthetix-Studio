import { cn } from "./ui/utils";

interface DSSectionProps {
  id: string;
  title: string;
  description?: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

export function DSSection({ id, title, description, badge, children, className }: DSSectionProps) {
  return (
    <section id={id} className={cn("py-12 border-b border-border/50 last:border-b-0", className)}>
      <div className="mb-8">
        {badge && (
          <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-500 bg-brand-muted text-brand-muted-foreground mb-3" style={{ fontWeight: 500 }}>
            {badge}
          </span>
        )}
        <h2 className="tracking-tight text-foreground mb-2">{title}</h2>
        {description && (
          <p className="text-muted-foreground max-w-2xl" style={{ fontSize: '14px', lineHeight: '1.6' }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

interface DSSubSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function DSSubSection({ title, children, className }: DSSubSectionProps) {
  return (
    <div className={cn("mb-10", className)}>
      <h3 className="text-foreground mb-4" style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted-foreground)' }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

interface DSPreviewProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  centered?: boolean;
}

export function DSPreview({ children, className, dark = false, centered = false }: DSPreviewProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border overflow-hidden",
        dark ? "bg-[#0D0D0C]" : "bg-background",
        className
      )}
    >
      <div
        className={cn(
          "p-8",
          centered && "flex items-center justify-center flex-wrap gap-4"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DSLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 text-center text-[11px] text-muted-foreground">{children}</div>
  );
}
