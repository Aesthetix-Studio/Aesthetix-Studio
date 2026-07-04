import React from "react";
import { cn } from "../utils";

export type FeatureLayout = "split" | "centered" | "offset" | "editorial";

interface FeatureProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: FeatureLayout;
  overline?: string;
  headline?: string;
  subline?: string;
}

export function Feature({
  layout = "split",
  overline,
  headline,
  subline,
  className,
  children,
  ...props
}: FeatureProps) {
  if (layout === "centered") {
    return (
      <div className={cn("text-center max-w-3xl mx-auto", className)} {...props}>
        {overline && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)] mb-4">
            {overline}
          </p>
        )}
        {headline && (
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.1] mb-4">
            {headline}
          </h2>
        )}
        {subline && (
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {subline}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    );
  }

  if (layout === "editorial") {
    return (
      <div className={cn("max-w-2xl", className)} {...props}>
        {overline && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)] mb-4">
            {overline}
          </p>
        )}
        {headline && (
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.1] mb-4">
            {headline}
          </h2>
        )}
        {subline && (
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {subline}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    );
  }

  if (layout === "offset") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start", className)} {...props}>
        <div>
          {overline && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)] mb-4">
              {overline}
            </p>
          )}
          {headline && (
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-normal tracking-tight leading-[1.1] mb-4">
              {headline}
            </h2>
          )}
        </div>
        <div>
          {subline && (
            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
              {subline}
            </p>
          )}
          {children}
        </div>
      </div>
    );
  }

  // split (default)
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start", className)} {...props}>
      <div>
        {overline && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)] mb-4">
            {overline}
          </p>
        )}
        {headline && (
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.1] mb-4">
            {headline}
          </h2>
        )}
        {subline && (
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {subline}
          </p>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
