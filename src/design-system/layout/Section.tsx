import React from "react";
import { cn } from "../utils";

export type SectionDensity = "compact" | "standard" | "spacious" | "monumental";
export type SectionBackground = "default" | "sunken" | "elevated" | "muted" | "brand" | "dark";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  density?: SectionDensity;
  background?: SectionBackground;
  as?: "section" | "div" | "article" | "main";
  contained?: boolean;
  overflow?: "visible" | "hidden" | "clip";
}

const densityMap: Record<SectionDensity, string> = {
  compact: "py-12 md:py-16",
  standard: "py-16 md:py-24",
  spacious: "py-24 md:py-32",
  monumental: "pt-24 pb-16 md:pt-32 md:pb-20",
};

const backgroundMap: Record<SectionBackground, string> = {
  default: "",
  sunken: "bg-zinc-100 dark:bg-zinc-900",
  elevated: "bg-white dark:bg-zinc-800 shadow-sm",
  muted: "bg-zinc-50 dark:bg-zinc-900/50",
  brand: "bg-[var(--brand)] text-white",
  dark: "bg-[var(--neutral-950)] text-white",
};

export function Section({
  density = "standard",
  background = "default",
  as: Tag = "section",
  contained = false,
  overflow = "visible",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "w-full",
        densityMap[density],
        backgroundMap[background],
        overflow === "hidden" && "overflow-hidden",
        overflow === "clip" && "overflow-clip",
        className
      )}
      {...props}
    >
      {contained ? (
        <div className="mx-auto max-w-7xl px-5 md:px-8">{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}
