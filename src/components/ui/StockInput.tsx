"use client";

import { unitMap } from "@/constants/UnitMaps";
import { cn } from "../utils";
import { Input, InputType } from "./Input";

interface StockInputType extends InputType {
  unit?: string;
}

export const StockInput = ({
  id,
  className,
  unit,
  ...props
}: StockInputType) => {
  const unitLabel = unitMap.find((e) => e.value === unit)?.label;
  return (
    <div className="grid grid-cols-[1fr_auto]">
      <Input
        id={id}
        type="number"
        className={cn("flex-1 rounded-r-none", className)}
        {...props}
      />
      <label
        htmlFor={id}
        className="px-3 bg-gray-200 border border-gray-300 border-l-0 rounded-r-lg h-full 
        flex items-center justify-center text-gray-800"
      >
        {unitLabel || unit}
      </label>
    </div>
  );
};
