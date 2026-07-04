import React from "react";
import { cn } from "../utils";

export type ClusterGap = "xs" | "sm" | "md" | "lg" | "xl";

interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: ClusterGap;
  align?: "start" | "center" | "end";
  wrap?: boolean;
}

const gapMap: Record<ClusterGap, string> = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

export function Cluster({
  gap = "md",
  align = "start",
  wrap = true,
  className,
  children,
  ...props
}: ClusterProps) {
  return (
    <div
      className={cn(
        "flex flex-row",
        gapMap[gap],
        wrap && "flex-wrap",
        align === "start" && "items-start",
        align === "center" && "items-center",
        align === "end" && "items-end",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
