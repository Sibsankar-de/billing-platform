"use client";

import { useEffect, useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { PricePerQuantityType } from "@/types/dto/productDto";
import { numToStr } from "@/utils/conversion";
import { StockInput } from "./StockInput";

export const PriceBreakdownInput = ({
  value,
  onChange,
  unit,
}: {
  value?: PricePerQuantityType[];
  onChange?: (e: PricePerQuantityType[]) => void;
  unit?: string;
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

    let breakdownlist = priceBreakdowns;
    const editIndex = breakdownlist.findIndex((e) => e.id === id);
    const editItem = breakdownlist[editIndex];
    breakdownlist[editIndex] = {
      ...editItem,
      price,
      quantity,
    };

    onChange?.(breakdownlist);

    setPriceBreakdowns(breakdownlist);
  }

  return (
    <div>
      {priceBreakdowns.map((item, index) => (
        <div key={item.id} className="flex gap-3 items-center max-w-2xl mb-2">
          <BreakdownItem
            item={item}
            id={item.id!}
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
      ))}
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
    setInputData(item);
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
    </div>
  );
}
