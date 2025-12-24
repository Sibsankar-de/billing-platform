export function numToStr(num: number | undefined) {
  const str = String(num || "");
  return str === "0" ? "" : str;
}
