import React from "react";
import { cn } from "../utils";

export type SidebarWidth = "sm" | "md" | "lg";
export type SidebarGap = "sm" | "md" | "lg";
export type SidebarAlign = "start" | "center";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: SidebarWidth;
  gap?: SidebarGap;
  align?: SidebarAlign;
  side?: "left" | "right";
  collapsible?: boolean;
}

const widthMap: Record<SidebarWidth, string> = {
  sm: "w-48",
  md: "w-64",
  lg: "w-80",
};

const gapMap: Record<SidebarGap, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export function Sidebar({
  width = "md",
  gap = "md",
  align = "start",
  side = "left",
  collapsible = false,
  className,
  children,
  ...props
}: SidebarProps) {
  const childArray = React.Children.toArray(children);
  const sidebar = childArray[0];
  const main = childArray[1];

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row",
        gapMap[gap],
        align === "center" && "items-center",
        className
      )}
      {...props}
    >
      {side === "right" && <div className="flex-1 min-w-0">{main}</div>}
      <aside
        className={cn(
          widthMap[width],
          "shrink-0",
          collapsible && "md:block"
        )}
      >
        {sidebar}
      </aside>
      {side === "left" && <div className="flex-1 min-w-0">{main}</div>}
    </div>
  );
}
