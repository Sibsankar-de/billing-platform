import { PricePerQuantityType } from "@/types/dto/productDto";

export function calculatePrice(
  quantity: number,
  tiers: PricePerQuantityType[]
): number {
  if (tiers.length === 0) return 0;

  // sort tiers by quantity ascending
  const sorted = [...tiers].sort((a, b) => a.quantity - b.quantity);

  // find the tier with the largest quantity <= requested quantity
  let chosen = sorted[0];

  for (const tier of sorted) {
    if (tier.quantity <= quantity) {
      chosen = tier;
    } else {
      break;
    }
  }

  const unitPrice = chosen.price / chosen.quantity;
  return Number((quantity * unitPrice).toFixed(2));
}
