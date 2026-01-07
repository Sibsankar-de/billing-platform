"use client";

import { Plus, Trash2 } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";
import { ProductSearchInput } from "./ProductSearchInput";
import { StockInput } from "../../ui/StockInput";
import { ProductDto } from "@/types/dto/productDto";
import { BillItemType } from "@/types/dto/invoiceDto";
import { calculatePrice } from "@/utils/price-calculator";
import { useSelector } from "react-redux";
import { SecondaryInput } from "../../ui/SecondaryInput";
import { selectCurrentStoreState } from "@/store/features/currentStoreSlice";
import { ConditionalDiv } from "@/components/ui/ConditionalDiv";

const generateRandomId = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const BillingForm = ({
  data,
  onBillChange,
}: {
  data?: Record<string, any>;
  onBillChange: (e: Record<string, any>) => void;
}) => {
  const {
    data: { currentStore },
  } = useSelector(selectCurrentStoreState);
  const storeSettings = currentStore?.storeSettings;

  const [items, setItems] = useState<BillItemType[]>([
    {
      id: generateRandomId(),
      product: { id: generateRandomId(), name: "", sku: "" },
      netQuantity: 0,
      totalPrice: 0,
      totalProfit: 0,
      stockUnit: "",
    },
  ]);

  const [calculations, setCalculations] = useState({
    subtotal: 0,
    taxAmount: 0,
    discountAmount: 0,
    total: 0,
    paidAmount: 0,
    dueAmount: 0,
    totalProfit: 0,
    roundupTotal: storeSettings?.roundupInvoiceTotal || false,
  });

  const [discountRate, setDiscountRate] = useState("");

  useEffect(() => {
    if (data?.items) setItems(data.items);
    if (data?.calculations) setCalculations(data.calculations);
  }, [data]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: generateRandomId(),
        product: {
          id: generateRandomId(),
          name: "",
          sku: "",
        },
        netQuantity: 0,
        totalPrice: 0,
        totalProfit: 0,
        stockUnit: "",
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (item: BillItemType) => {
    setItems((prev) => {
      const list = [...prev];
      const index = list.findIndex((e) => e.id === item.id);
      if (index !== -1) list[index] = { ...item };
      return list;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "i") {
        e.preventDefault();
        addItem();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = 0;
    const discountAmount = (Number(discountRate) * subtotal) / 100;
    const total = Number((subtotal + tax - Number(discountAmount)).toFixed(2));

    setCalculations((p) => ({
      ...p,
      subtotal,
      taxAmount: tax,
      total,
      discountAmount,
      paidAmount: total,
      dueAmount: 0,
    }));
  }, [items, discountRate]);

  useEffect(() => {
    onBillChange({
      items,
      calculations,
    });
  }, [items, calculations]);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Label className="text-gray-900">Items</Label>
          <Button
            onClick={addItem}
            variant="outline"
            className="flex items-center gap-2 px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>

        <div className="border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-gray-700 px-2 py-3">
                  Product name
                </th>
                <th className="text-center text-gray-700 px-2 py-3 w-24">
                  Quantity
                </th>
                <th className="text-center text-gray-700 px-2 py-3 w-32">
                  Price (₹)
                </th>
                <th className="w-12"></th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <BillingSectionRow
                  id={item.id}
                  key={item.id}
                  item={item}
                  onFieldUpdate={updateItem}
                  onRemoveItem={removeItem}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-between">
        <div>
          <Label>Discounts</Label>
          <SecondaryInput
            type="number"
            placeholder="Discount percent (%)"
            field="%"
            onChange={(e) => setDiscountRate(e)}
            value={discountRate}
          />
        </div>

        <div className="w-80">
          <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">₹{calculations.subtotal}</span>
            </div>

            <ConditionalDiv
              condition={storeSettings?.defaultTaxRate}
              className="flex items-center justify-between"
            >
              <span className="text-gray-600">
                Tax ({storeSettings?.defaultTaxRate}%)
              </span>
              <span className="text-gray-900">₹0</span>
            </ConditionalDiv>

            <ConditionalDiv
              condition={calculations.discountAmount}
              className="flex items-center justify-between"
            >
              <span className="text-gray-600">
                Discount (
                <span className="text-green-600">{discountRate}%</span>)
              </span>
              <span className="text-green-600">
                - ₹{calculations.discountAmount}
              </span>
            </ConditionalDiv>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">₹{calculations.total}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Paid Amount</span>
              <Input
                type="number"
                placeholder="0.00"
                className="w-32 text-right"
                value={calculations.paidAmount}
                onChange={(e) =>
                  setCalculations((p) => ({
                    ...p,
                    paidAmount: Number(e),
                    dueAmount: p.total - Number(e),
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-900">Due Amount</span>
              <span className="text-gray-900">₹{calculations.dueAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function BillingSectionRow({
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
        totalPrice: calculatePrice(1, selectedItem.pricePerQuantity),
        stockUnit: selectedItem.stockUnit,
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
        totalPrice: calculatePrice(value, selectedItem.pricePerQuantity),
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
