import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  FolderOpen, Search, Inbox, Loader2, CheckCircle, Wifi, ArrowLeft,
} from "lucide-react";

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="px-4 py-2.5 border-b" style={{ background: "var(--secondary)", borderColor: "var(--border)" }}>
        <span className="text-muted-foreground" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "var(--secondary)" }}>
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-foreground mb-1" style={{ fontSize: "14px", fontWeight: 600 }}>{title}</p>
      <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{desc}</p>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-8 h-8 rounded-full animate-pulse" style={{ background: "var(--secondary)" }} />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 rounded animate-pulse" style={{ background: "var(--secondary)", width: "60%" }} />
        <div className="h-2.5 rounded animate-pulse" style={{ background: "var(--secondary)", width: "40%" }} />
      </div>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-5 rounded animate-pulse" style={{ background: "var(--secondary)", width: "45%" }} />
      <div className="h-3 rounded animate-pulse" style={{ background: "var(--secondary)", width: "70%" }} />
      <div className="h-3 rounded animate-pulse" style={{ background: "var(--secondary)", width: "55%" }} />
      <div className="grid grid-cols-3 gap-2 mt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: "var(--secondary)" }} />
        ))}
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="flex flex-col items-center text-center py-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
        style={{ background: "#16A34A18" }}
      >
        <CheckCircle className="w-7 h-7" style={{ color: "#16A34A" }} />
      </motion.div>
      <p className="text-foreground" style={{ fontSize: "14px", fontWeight: 600 }}>Changes saved!</p>
      <p className="text-muted-foreground" style={{ fontSize: "12px" }}>Your project has been updated.</p>
    </motion.div>
  );
}

function SuccessBar() {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
      style={{ background: "#16A34A18", border: "1px solid #16A34A30" }}
    >
      <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#16A34A" }} />
      <p style={{ fontSize: "13px", color: "#16A34A", fontWeight: 500 }}>Invoice sent successfully to sarah@luminary.io</p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "#EF444418" }}>
        <Wifi className="w-5 h-5" style={{ color: "#EF4444" }} />
      </div>
      <p className="text-foreground mb-1" style={{ fontSize: "14px", fontWeight: 600 }}>Connection error</p>
      <p className="text-muted-foreground mb-3" style={{ fontSize: "12px" }}>Couldn't load data. Check your connection.</p>
      <button
        onClick={onRetry}
        className="px-4 py-1.5 rounded-lg border border-border text-foreground hover:bg-secondary transition-all"
        style={{ fontSize: "12px", fontWeight: 500 }}
      >
        Retry
      </button>
    </div>
  );
}

export default function SystemStates() {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => setRetrying(false), 1500);
  };

  return (
    <div className="min-h-screen px-6 py-10" style={{ background: "var(--background)", maxWidth: 900, margin: "0 auto" }}>
      {/* Back */}
      <Link
        to="/"
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors no-underline mb-8"
        style={{ fontSize: "13px" }}
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <h1 className="text-foreground mb-2" style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>System States</h1>
      <p className="text-muted-foreground mb-8" style={{ fontSize: "14px" }}>Empty, loading, success, and error state patterns.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Empty: No Data */}
        <DemoCard title="Empty — No Data">
          <EmptyState
            icon={FolderOpen}
            title="No projects yet"
            desc="Your projects will appear here once created."
          />
        </DemoCard>

        {/* Empty: No Results */}
        <DemoCard title="Empty — No Results">
          <EmptyState
            icon={Search}
            title="No results found"
            desc="Try adjusting your search or filters."
          />
        </DemoCard>

        {/* Empty: All Caught Up */}
        <DemoCard title="Empty — All Caught Up">
          <EmptyState
            icon={Inbox}
            title="All caught up!"
            desc="No notifications to review right now."
          />
        </DemoCard>

        {/* Loading: Spinner */}
        <DemoCard title="Loading — Spinner">
          <div className="flex flex-col items-center py-6">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mb-3" />
            <p className="text-muted-foreground" style={{ fontSize: "13px" }}>Loading projects…</p>
          </div>
        </DemoCard>

        {/* Loading: Skeleton Rows */}
        <DemoCard title="Loading — Skeleton Rows">
          <div className="space-y-1">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        </DemoCard>

        {/* Loading: Page Skeleton */}
        <DemoCard title="Loading — Page Skeleton">
          <PageSkeleton />
        </DemoCard>

        {/* Success State */}
        <DemoCard title="Success — Animated">
          <SuccessState />
        </DemoCard>

        {/* Success Bar */}
        <DemoCard title="Success — Alert Bar">
          <div className="py-2">
            <SuccessBar />
          </div>
        </DemoCard>

        {/* Error State */}
        <DemoCard title="Error — With Retry">
          {retrying ? (
            <div className="flex flex-col items-center py-4">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mb-3" />
              <p className="text-muted-foreground" style={{ fontSize: "13px" }}>Retrying…</p>
            </div>
          ) : (
            <ErrorState onRetry={handleRetry} />
          )}
        </DemoCard>
      </div>
    </div>
  );
}
