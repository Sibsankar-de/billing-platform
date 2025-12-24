"use client";

import { ClassValue } from "clsx";
import { cn } from "../utils";
import { Loader } from "./loader";

export type ButtonType = {
  children?: React.ReactNode;
  type?: "button" | "reset" | "submit";
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: "nav" | "primary" | "none" | "secondary" | "outline" | "dark";
  disabled?: boolean;
  loading?: boolean;
  props?: React.ComponentProps<"button">;
};

export const Button = ({
  children,
  className,
  id,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  loading = false,
  ...props
}: ButtonType) => {
  const variants: Record<string, ClassValue> = {
    nav: "",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    dark: "bg-black text-white hover:bg-gray-800",
    none: "hover:brightness-95",
  };
  return (
    <button
      type={type}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 border border-transparent rounded-lg cursor-pointer disabled:brightness-75 disabled:cursor-not-allowed select-none relative",
        "transition-all duration-150 active:translate-y-0.5 active:brightness-90",
        variants[variant],
        className
      )}
      id={id}
      onClick={(e) => onClick?.(e)}
      disabled={disabled}
      {...props}
    >
      {children}
      {/* Spinner for loading */}
      {loading && (
        <div
          aria-disabled={true}
          className={cn(
            "absolute w-full h-full inset-0 flex justify-center items-center",
            variants[variant],
            "border-none! rounded-2xl! transition-none! pointer-events-none!"
          )}
        >
          <Loader className="" />
        </div>
      )}
    </button>
  );
};
