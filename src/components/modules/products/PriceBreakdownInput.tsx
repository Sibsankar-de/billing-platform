"use client";

import { useEffect, useState } from "react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { PricePerQuantityType } from "@/types/dto/productDto";
import { numToStr } from "@/utils/conversion";
import { StockInput } from "../../ui/StockInput";
import { calculateProfit } from "@/utils/price-calculator";
import { cn } from "@/components/utils";

export const PriceBreakdownInput = ({
  value,
  onChange,
  unit,
  buyingPricePerItem,
}: {
  value?: PricePerQuantityType[];
  onChange?: (e: PricePerQuantityType[]) => void;
  unit?: string;
  buyingPricePerItem?: number;
}) => {
  const [priceBreakdowns, setPriceBreakdowns] = useState<
    PricePerQuantityType[]
  >([{ id: 1, price: 0, quantity: 0 }]);

  useEffect(() => {
    if (value && value.length > 0) {
      setPriceBreakdowns(value);
    }
  }, [value]);

  function handleAddNewBreakdown() {
    const lastBreakdown = priceBreakdowns[priceBreakdowns.length - 1];
    if (
      priceBreakdowns.length === 0 ||
      !lastBreakdown.price ||
      !lastBreakdown.quantity
    ) {
      toast.warn("Fill the current breakdown first.");
      return;
    }

    const newBreakdown: PricePerQuantityType = {
      id: (lastBreakdown.id || 0) + 1,
      price: 0,
      quantity: 0,
    };

    setPriceBreakdowns((prev) => [...prev, newBreakdown]);
  }

  function handleUpdateBreakdown(breakdown: PricePerQuantityType) {
    const { id, price, quantity } = breakdown;

    // Always clone
    const breakdownlist = [...priceBreakdowns];

    const editIndex = breakdownlist.findIndex((e) => e.id === id);

    if (editIndex === -1) return;

    // update item
    breakdownlist[editIndex] = {
      ...breakdownlist[editIndex],
      price,
      quantity,
    };

    // calculate profit using UPDATED values
    if (price > 0 && quantity > 0 && buyingPricePerItem) {
      const costPerItem = price / quantity;

      const profitMargin = calculateProfit(buyingPricePerItem, costPerItem);

      breakdownlist[editIndex] = {
        ...breakdownlist[editIndex],
        profitMargin,
      };
    }

    setPriceBreakdowns(breakdownlist);
    onChange?.(breakdownlist);
  }

  // update profit margins on stock change
  useEffect(() => {
    if (!buyingPricePerItem) return;
    setPriceBreakdowns((prev) =>
      prev.map((item) => {
        const costPerItem = item.price / item.quantity;
        const profitMargin = calculateProfit(buyingPricePerItem, costPerItem);
        return {
          ...item,
          profitMargin,
        };
      })
    );
  }, [buyingPricePerItem]);

  return (
    <div>
      {priceBreakdowns.map((item, index) => {
        return (
          <div key={item.id} className="flex gap-3 items-center max-w-2xl mb-2">
            <BreakdownItem
              item={item}
              id={item.id}
              onInputChange={handleUpdateBreakdown}
              unit={unit}
            />
            {index === priceBreakdowns.length - 1 ? (
              <Button className="py-2" onClick={handleAddNewBreakdown}>
                <Plus />
              </Button>
            ) : (
              <Button
                variant="none"
                className="py-2 bg-red-200/50 text-red-400"
                onClick={() =>
                  setPriceBreakdowns(
                    priceBreakdowns.filter((bd) => bd.id !== item.id)
                  )
                }
              >
                <Trash2 />
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

function BreakdownItem({
  id,
  item,
  onInputChange,
  unit,
}: {
  id: number;
  onInputChange: (i: PricePerQuantityType) => void;
  item: PricePerQuantityType;
  unit?: string;
}) {
  const [inputData, setInputData] = useState<PricePerQuantityType>(item);

  useEffect(() => {
    if (item !== inputData) setInputData(item);
  }, [item]);

  const handleInputChange = (key: keyof PricePerQuantityType, input: any) => {
    setInputData({
      ...inputData,
      [key]: Number(input),
    });
    onInputChange({
      ...inputData,
      id: id,
      [key]: Number(input),
    });
  };

  function getColor(profit: number) {
    if (profit > 0) return "text-green-700";
    else if (profit < 0) return "text-red-400";
    else return "text-gray-700";
  }

  return (
    <div className="flex items-center gap-3">
      <Input
        type="number"
        placeholder="Enter price"
        id={"price-" + id}
        className="flex-1"
        onChange={(e) => handleInputChange("price", e)}
        value={numToStr(inputData.price)}
      />
      <p className="text-gray-500">/</p>
      <StockInput
        id={"stock-" + id}
        placeholder="Enter quantity"
        onChange={(e) => handleInputChange("quantity", e)}
        value={numToStr(inputData.quantity)}
        unit={unit}
      />
      {inputData.profitMargin !== undefined && (
        <div
          className={cn(
            "flex flex-col text-[0.8em] text-center px-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
          )}
        >
          <span>Margin</span>
          <span className={cn(getColor(inputData.profitMargin))}>
            {inputData.profitMargin}%
          </span>
        </div>
      )}
    </div>
  );
}
