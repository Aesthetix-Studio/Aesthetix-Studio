import React from "react";
import { cn } from "../utils";

export type GridColumns = 2 | 3 | 4 | 6;
export type GridGap = "sm" | "md" | "lg" | "xl";
export type GridMinItemWidth = "xs" | "sm" | "md" | "lg" | "xl";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: GridColumns;
  gap?: GridGap;
  minItemWidth?: GridMinItemWidth;
  dense?: boolean;
}

const gapMap: Record<GridGap, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

const minWidthMap: Record<GridMinItemWidth, string> = {
  xs: "min-w-[160px]",
  sm: "min-w-[200px]",
  md: "min-w-[280px]",
  lg: "min-w-[360px]",
  xl: "min-w-[440px]",
};

export function Grid({
  columns,
  gap = "md",
  minItemWidth,
  dense = false,
  className,
  children,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        "grid",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        columns === 6 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
        !columns && minItemWidth && minWidthMap[minItemWidth],
        !columns && !minItemWidth && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        gapMap[gap],
        dense && "grid-flow-dense",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
