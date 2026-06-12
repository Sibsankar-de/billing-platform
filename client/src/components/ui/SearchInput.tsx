import { Search } from "lucide-react";
import React from "react";
import { Input, InputType } from "./Input";
import { cn } from "../utils";

export const SearchInput = ({ ...props }: InputType) => {
  return (
    <Input
      type="search"
      className={cn("w-full", props.className)}
      icon={<SearchIcon />}
      {...props}
    />
  );
};

export const SearchIcon = () => (
  <Search
    size={19}
    strokeWidth={2.5}
    className={cn(
      "text-gray-400 transition-colors duration-200",
      "group-focus-within:text-primary",
    )}
  />
);
