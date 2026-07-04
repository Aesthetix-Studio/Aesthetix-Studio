import React from "react";
import { cn } from "../utils";

export type ContainerWidth = "sm" | "md" | "lg" | "xl" | "full";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
  centered?: boolean;
}

const widthMap: Record<ContainerWidth, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[90rem]",
  full: "max-w-full",
};

export function Container({
  width = "lg",
  centered = true,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full px-5 md:px-8",
        widthMap[width],
        centered && "mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
