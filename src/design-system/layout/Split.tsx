import React from "react";
import { cn } from "../utils";

export type SplitRatio = "equal" | "narrow-left" | "wide-left" | "narrow-right" | "wide-right";
export type SplitGap = "sm" | "md" | "lg" | "xl";
export type SplitAlign = "start" | "center" | "end" | "stretch";

interface SplitProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: SplitRatio;
  gap?: SplitGap;
  align?: SplitAlign;
  reverseOnMobile?: boolean;
}

const ratioMap: Record<SplitRatio, string> = {
  equal: "md:grid-cols-2",
  "narrow-left": "md:grid-cols-[1fr_2fr]",
  "wide-left": "md:grid-cols-[2fr_1fr]",
  "narrow-right": "md:grid-cols-[2fr_1fr]",
  "wide-right": "md:grid-cols-[1fr_2fr]",
};

const gapMap: Record<SplitGap, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

export function Split({
  ratio = "equal",
  gap = "md",
  align = "start",
  reverseOnMobile = false,
  className,
  children,
  ...props
}: SplitProps) {
  const childArray = React.Children.toArray(children);
  const left = childArray[0];
  const right = childArray[1];

  return (
    <div
      className={cn(
        "grid grid-cols-1",
        ratioMap[ratio],
        gapMap[gap],
        align === "start" && "items-start",
        align === "center" && "items-center",
        align === "end" && "items-end",
        align === "stretch" && "items-stretch",
        className
      )}
      {...props}
    >
      <div className={cn(reverseOnMobile && "md:order-1 order-2")}>{left}</div>
      <div className={cn(reverseOnMobile && "md:order-2 order-1")}>{right}</div>
    </div>
  );
}
