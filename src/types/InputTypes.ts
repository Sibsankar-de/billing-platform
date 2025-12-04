import React from "react";

export type InputType = {
  type?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onChange?: (e: string) => void;
  value?: string;
};
