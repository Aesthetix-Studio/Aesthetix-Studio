import React from "react";
import { cn } from "../../../utils";

interface FeatureItemProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
  className?: string;
}

export function FeatureItem({
  icon,
  title,
  description,
  tag,
  className,
}: FeatureItemProps) {
  return (
    <div className={cn("group", className)}>
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center mb-4 text-[var(--brand)] group-hover:bg-[var(--brand)] group-hover:text-white transition-colors duration-200">
          {icon}
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-base font-semibold text-[var(--neutral-950)] dark:text-white">
          {title}
        </h3>
        {tag && (
          <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--brand)]/10 text-[var(--brand)]">
            {tag}
          </span>
        )}
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
