import React from "react";
import { cn } from "../../../utils";

interface CaseStudyProps {
  title: string;
  category: string;
  description: string;
  image?: string;
  metrics?: { label: string; value: string }[];
  href?: string;
  className?: string;
}

export function CaseStudy({
  title,
  category,
  description,
  image,
  metrics,
  href,
  className,
}: CaseStudyProps) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      className={cn(
        "group block rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[var(--brand)]/30 transition-all duration-300",
        href && "cursor-pointer hover:shadow-lg hover:shadow-[var(--brand)]/5",
        className
      )}
      {...(wrapperProps as any)}
    >
      {image && (
        <div className="aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand)] mb-2">
          {category}
        </p>
        <h3 className="text-xl font-semibold text-[var(--neutral-950)] dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
          {description}
        </p>
        {metrics && metrics.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            {metrics.map((m, i) => (
              <div key={i}>
                <p className="text-lg font-semibold text-[var(--neutral-950)] dark:text-white">
                  {m.value}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
