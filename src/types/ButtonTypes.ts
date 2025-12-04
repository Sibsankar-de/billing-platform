import React, { MouseEventHandler } from "react";

export type ButtonType = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: "nav" | "primary" | "none" | "secondary" | "outline" | "dark";
  disabled?: boolean;
};
