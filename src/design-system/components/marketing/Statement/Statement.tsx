import React from "react";
import { cn } from "../../../utils";

export type StatementAlign = "left" | "center";

interface StatementProps {
  overline?: string;
  headline: string;
  subline?: string;
  align?: StatementAlign;
  className?: string;
}

export function Statement({
  overline,
  headline,
  subline,
  align = "left",
  className,
}: StatementProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center max-w-4xl mx-auto",
        align === "left" && "max-w-3xl",
        className
      )}
    >
      {overline && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)] mb-4">
          {overline}
        </p>
      )}
      <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight leading-[1.08]">
        {headline}
      </h2>
      {subline && (
        <p className="mt-6 text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          {subline}
        </p>
      )}
    </div>
  );
}
