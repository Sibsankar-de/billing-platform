"use client";

import React from "react";
import { cn } from "../utils";

export type TextareaType = {
  type?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  onChange?: (e: string) => void;
  value?: string;
  disabled?: boolean;
  props?: React.ComponentProps<"textarea">;
};

export const Textarea = ({
  className,
  id,
  value,
  onChange,
  placeholder,
  props,
}: TextareaType) => {
  return (
    <textarea
      id={id}
      placeholder={placeholder || ""}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(
        "resize-y min-h-30 w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200",
        className
      )}
      {...props}
    />
  );
};
