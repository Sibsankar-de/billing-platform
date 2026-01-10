type DebounceContext = {
  lastInputAt?: number;
  lastValueLength?: number;
};

export function getSearchDebounceTime(
  currentValue: string,
  ctx: DebounceContext
): number {
  const now = performance.now();
  const lastTime = ctx.lastInputAt ?? now;
  const delta = now - lastTime;

  const lastLen = ctx.lastValueLength ?? 0;
  const lenDiff = currentValue.length - lastLen;

  // Update context
  ctx.lastInputAt = now;
  ctx.lastValueLength = currentValue.length;

  /**
   * BARCODE DETECTION
   * Fast multiple characters within very short time
   */
  if (lenDiff >= 4 && delta < 40) {
    return 30; // Low debounce
  }

  /**
   * FAST TYPING
   */
  if (delta < 80) {
    return 250;
  }

  /**
   * NORMAL TYPING
   */
  if (delta < 150) {
    return 200;
  }

  /**
   * SLOW / DELIBERATE INPUT
   */
  return 150;
}
