import { unitMap } from "@/constants/UnitMaps";

export function numToStr(num: number | undefined) {
  const str = String(num || "");
  return str === "0" ? "" : str;
}

export function convertUnit(unit: string) {
  const found = unitMap.find((u) => u.value === unit);
  return found ? found.label : unit;
}
