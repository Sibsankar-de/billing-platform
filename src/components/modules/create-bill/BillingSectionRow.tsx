"use client";

import { BillItemType } from "@/types/dto/invoiceDto";
import { calculatePrice } from "@/utils/price-calculator";
import { useEffect, useId, useState } from "react";
import { ProductSearchInput } from "./ProductSearchInput";
import { StockInput } from "@/components/ui/StockInput";
import { Input } from "@/components/ui/Input";
import { Trash2 } from "lucide-react";
import { ProductDto } from "@/types/dto/productDto";

export function BillingSectionRow({
  id,
  item,
  onFieldUpdate,
  onRemoveItem,
}: {
  id: string;
  item: BillItemType;
  onFieldUpdate: (doc: BillItemType) => void;
  onRemoveItem: (id: string) => void;
}) {
  const baseId = useId();
  const [selectedItem, setSelectedItem] = useState<ProductDto | null>(null);
  const [productFields, setProductFields] = useState<BillItemType>(item);

  useEffect(() => {
    if (item !== productFields) setProductFields(item);
  }, [item]);

  useEffect(() => {
    if (selectedItem) {
      const newItem: BillItemType = {
        ...item,
        id,
        product: {
          id: selectedItem._id,
          name: selectedItem.name,
          sku: selectedItem.sku,
        },
        netQuantity: 1,
        totalPrice: calculatePrice(1, selectedItem.pricePerQuantity).price,
        stockUnit: selectedItem.stockUnit,
        totalProfit: calculatePrice(1, selectedItem.pricePerQuantity).profit,
      };

      setProductFields(newItem);
      onFieldUpdate(newItem);
    }
  }, [selectedItem]);

  const handleInputChange = (key: keyof BillItemType, value: any) => {
    if (["netQuantity", "totalPrice"].includes(key)) {
      value = parseInt(value) || 0;
    }

    const updated = { ...productFields, id, [key]: value };
    setProductFields(updated);
    onFieldUpdate(updated);

    if (key === "netQuantity" && selectedItem) {
      const withTotal = {
        ...updated,
        totalPrice: calculatePrice(value, selectedItem.pricePerQuantity).price,
        totalProfit: calculatePrice(value, selectedItem.pricePerQuantity)
          .profit,
      };

      setProductFields(withTotal);
      onFieldUpdate(withTotal);
    }
  };

  return (
    <tr className="border-t border-gray-200">
      <td className="px-2 py-3">
        <ProductSearchInput onSelect={(e) => setSelectedItem(e)} />
      </td>

      <td className="px-2 py-3">
        <StockInput
          id={`${baseId}-quantity`}
          value={String(productFields.netQuantity)}
          onChange={(e) => handleInputChange("netQuantity", e)}
          unit={selectedItem?.stockUnit}
          className="w-30"
        />
      </td>

      <td className="px-2 py-3">
        <Input
          type="number"
          value={String(productFields.totalPrice)}
          onChange={(e) => handleInputChange("totalPrice", e)}
          placeholder="0.00"
        />
      </td>

      <td className="px-2 py-3">
        <button
          onClick={() => onRemoveItem(item.id)}
          className="p-2 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
