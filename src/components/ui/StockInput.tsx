"use client";

import { unitMap } from "@/constants/UnitMaps";
import { cn } from "../utils";
import { Input, InputType } from "./Input";
import { SecondaryInput } from "./SecondaryInput";

interface StockInputType extends InputType {
  unit?: string;
}

export const StockInput = ({
  unit,
  ...props
}: StockInputType) => {
  const unitLabel = unitMap.find((e) => e.value === unit)?.label;
  return <SecondaryInput field={unitLabel || unit} {...props} />;
};
