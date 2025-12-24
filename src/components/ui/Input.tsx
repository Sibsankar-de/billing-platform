"use client";

import React, { useState } from "react";
import { cn } from "../utils";
import { Eye, EyeOff } from "lucide-react";

export type InputType = {
  type?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  onChange?: (e: string) => void;
  value?: string;
  disabled?: boolean;
  props?: React.ComponentProps<"input">
};

export const Input = ({
  className,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  ...props
}: InputType) => {
  const [showPassword, setShowPassword] = useState(false);
  const isTypePassword = type === "password";
  return (
    <div>
      <input
        id={id}
        type={showPassword ? "text" : type}
        placeholder={placeholder || ""}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200",
          isTypePassword && "pr-10",
          className
        )}
        disabled={disabled}
        {...props}
      />
      {isTypePassword && (
        <button
          type="button"
          onClick={(e) => {
            setShowPassword(!showPassword);
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
};
