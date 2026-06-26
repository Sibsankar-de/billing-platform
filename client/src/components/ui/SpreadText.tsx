import React from "react";
import { cn } from "../utils";

interface SpreadTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "label";
  tracking?: "wide" | "wider" | "widest";
}

export function SpreadText({
  children,
  className,
  as: Component = "span",
  tracking = "wider",
  ...props
}: SpreadTextProps) {
  const trackingClass = {
    wide: "tracking-wide",
    wider: "tracking-wider",
    widest: "tracking-widest",
  }[tracking];

  return (
    <Component
      className={cn(
        "uppercase font-bold text-xs select-none",
        trackingClass,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
