import React from "react";
import { cn } from "../../../utils";

interface MetricProps {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  description?: string;
  className?: string;
}

export function Metric({
  value,
  label,
  prefix,
  suffix,
  description,
  className,
}: MetricProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="flex items-baseline justify-center gap-1">
        {prefix && (
          <span className="text-2xl md:text-3xl font-[family-name:var(--font-display)] text-zinc-400 dark:text-zinc-500">
            {prefix}
          </span>
        )}
        <span className="text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-display)] font-normal tracking-tight text-[var(--neutral-950)] dark:text-white">
          {value}
        </span>
        {suffix && (
          <span className="text-2xl md:text-3xl font-[family-name:var(--font-display)] text-[var(--brand)]">
            {suffix}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm font-medium uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {description && (
        <p className="mt-2 text-sm text-zinc-400 dark:text-zinc-500 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
