import React, { KeyboardEvent, KeyboardEventHandler } from "react";

export type InputType = {
  type?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onChange?: (e: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
};
