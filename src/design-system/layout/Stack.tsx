import React from "react";
import { cn } from "../utils";

export type StackGap = "xs" | "sm" | "md" | "lg" | "xl";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
  divider?: boolean;
  align?: "start" | "center" | "end" | "stretch";
}

const gapMap: Record<StackGap, string> = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

export function Stack({
  gap = "md",
  divider = false,
  align = "stretch",
  className,
  children,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        gapMap[gap],
        align === "start" && "items-start",
        align === "center" && "items-center",
        align === "end" && "items-end",
        divider && "divide-y divide-zinc-200 dark:divide-zinc-800",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
