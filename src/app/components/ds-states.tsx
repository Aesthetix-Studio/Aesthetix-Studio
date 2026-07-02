import { motion } from "motion/react";
import { FolderOpen, Search, Wifi, FileX, Inbox, Plus, RefreshCw, ArrowLeft, Sparkles } from "lucide-react";
import { DSSection, DSSubSection, DSPreview } from "./ds-section";
import { cn } from "./ui/utils";
import { AXButton } from "./ds-buttons";

/* ─── Skeleton ──────────────────────────────────────────────── */
export function AXSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("rounded-md bg-secondary animate-pulse", className)}
      aria-hidden="true"
    />
  );
}

/* ─── Spinner ───────────────────────────────────────────────── */
interface AXSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "brand";
}

export function AXSpinner({ size = "md", variant = "default" }: AXSpinnerProps) {
  const sizeMap = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };
  return (
    <div
      className={cn(
        "rounded-full border-2 animate-spin",
        variant === "brand" ? "border-brand border-t-brand/20" : "border-foreground/30 border-t-foreground",
        sizeMap[size]
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

/* ─── Card Skeleton ─────────────────────────────────────────── */
export function AXCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-4">
      <div className="flex items-center gap-3">
        <AXSkeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-1.5 flex-1">
          <AXSkeleton className="h-3.5 w-32" />
          <AXSkeleton className="h-3 w-20" />
        </div>
      </div>
      <AXSkeleton className="h-3 w-full" />
      <AXSkeleton className="h-3 w-5/6" />
      <AXSkeleton className="h-3 w-3/4" />
      <div className="flex gap-2 pt-1">
        <AXSkeleton className="h-6 w-16 rounded-full" />
        <AXSkeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function AXListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-5 py-3.5 border-b border-border/40 last:border-0">
          <AXSkeleton className="w-8 h-8 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5">
            <AXSkeleton className="h-3 w-40" />
            <AXSkeleton className="h-2.5 w-24" />
          </div>
          <AXSkeleton className="h-6 w-14 rounded-full" />
          <AXSkeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
}

/* ─── Empty States ──────────────────────────────────────────── */
interface AXEmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void; icon?: React.ReactNode };
  secondaryAction?: { label: string; onClick: () => void };
}

export function AXEmptyState({ icon: Icon, title, description, action, secondaryAction }: AXEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="text-foreground mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>{title}</h3>
      <p className="text-muted-foreground max-w-xs mb-6" style={{ fontSize: '13px', lineHeight: '1.6' }}>{description}</p>
      {(action || secondaryAction) && (
        <div className="flex items-center gap-2">
          {action && <AXButton variant="primary" size="sm" icon={action.icon}>{action.label}</AXButton>}
          {secondaryAction && <AXButton variant="ghost" size="sm" onClick={secondaryAction.onClick}>{secondaryAction.label}</AXButton>}
        </div>
      )}
    </div>
  );
}

/* ─── Loading Page Skeleton ─────────────────────────────────── */
export function AXPageSkeleton() {
  return (
    <div className="space-y-6 p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <AXSkeleton className="h-6 w-48" />
          <AXSkeleton className="h-4 w-72" />
        </div>
        <AXSkeleton className="h-9 w-32 rounded-lg" />
      </div>
      {/* Stat row */}
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4 space-y-3">
            <AXSkeleton className="h-8 w-8 rounded-lg" />
            <AXSkeleton className="h-7 w-16" />
            <AXSkeleton className="h-3 w-24" />
          </div>
        ))}
      </div>
      {/* Table */}
      <AXListSkeleton rows={6} />
    </div>
  );
}

/* ─── Error State ───────────────────────────────────────────── */
export function AXErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-destructive/10 flex items-center justify-center mb-4">
        <Wifi className="w-6 h-6 text-destructive" />
      </div>
      <h3 className="text-foreground mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>Something went wrong</h3>
      <p className="text-muted-foreground max-w-xs mb-6" style={{ fontSize: '13px', lineHeight: '1.6' }}>
        We couldn't load this content. Please check your connection and try again.
      </p>
      <div className="flex items-center gap-2">
        {onRetry && (
          <AXButton variant="primary" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />} onClick={onRetry}>
            Try again
          </AXButton>
        )}
        <AXButton variant="ghost" size="sm" icon={<ArrowLeft className="w-3.5 h-3.5" />}>
          Go back
        </AXButton>
      </div>
    </div>
  );
}

/* ─── Success State ─────────────────────────────────────────── */
export function AXSuccessState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-12 h-12 rounded-2xl bg-success-muted flex items-center justify-center mb-4"
      >
        <Sparkles className="w-6 h-6 text-success" />
      </motion.div>
      <h3 className="text-foreground mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>{title}</h3>
      <p className="text-muted-foreground max-w-xs" style={{ fontSize: '13px', lineHeight: '1.6' }}>{description}</p>
    </div>
  );
}

export function DSStatesSection() {
  return (
    <DSSection
      id="states"
      title="States"
      description="Loading skeletons, spinners, empty states, error states, and success confirmations. Every surface has a state for every scenario."
      badge="Components"
    >
      <DSSubSection title="Spinners">
        <DSPreview centered>
          <div className="flex items-center gap-8">
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <AXSpinner size={size} />
                <span className="text-[11px] text-muted-foreground">{size}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2">
              <AXSpinner size="md" variant="brand" />
              <span className="text-[11px] text-muted-foreground">brand</span>
            </div>
          </div>
        </DSPreview>
      </DSSubSection>

      <DSSubSection title="Card Skeleton">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AXCardSkeleton />
          <AXCardSkeleton />
          <AXCardSkeleton />
        </div>
      </DSSubSection>

      <DSSubSection title="List / Table Skeleton">
        <AXListSkeleton rows={5} />
      </DSSubSection>

      <DSSubSection title="Page Loading Skeleton">
        <div className="rounded-xl border border-border overflow-hidden bg-background max-h-72 overflow-y-hidden relative">
          <AXPageSkeleton />
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </div>
      </DSSubSection>

      <DSSubSection title="Empty States">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border">
            <AXEmptyState
              icon={FolderOpen}
              title="No projects yet"
              description="Create your first project to start organizing your work."
              action={{ label: "New Project", onClick: () => {}, icon: <Plus className="w-3.5 h-3.5" /> }}
            />
          </div>
          <div className="bg-card rounded-xl border border-border">
            <AXEmptyState
              icon={Search}
              title="No results found"
              description="Try adjusting your search term or removing active filters."
              secondaryAction={{ label: "Clear filters", onClick: () => {} }}
            />
          </div>
          <div className="bg-card rounded-xl border border-border">
            <AXEmptyState
              icon={Inbox}
              title="Inbox is empty"
              description="You're all caught up. New notifications will appear here."
            />
          </div>
        </div>
      </DSSubSection>

      <DSSubSection title="Error & Success States">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl border border-border">
            <AXErrorState onRetry={() => {}} />
          </div>
          <div className="bg-card rounded-xl border border-border">
            <AXSuccessState
              title="Project published!"
              description="Your work is now live at aesthetix.studio/work. Share it with clients."
            />
          </div>
        </div>
      </DSSubSection>
    </DSSection>
  );
}
