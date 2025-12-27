"use client";

import {
  CloudCheck,
  Plus,
  PrinterCheck,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { ProductSearchInput } from "../ui/ProductSearchInput";
import { Modal } from "../ui/Modal";
import { StockInput } from "../ui/StockInput";
import { ProductDto } from "@/types/dto/productDto";
import { BillItemType } from "@/types/dto/invoiceDto";
import { calculatePrice } from "@/utils/price-calculator";
import { useSelector } from "react-redux";
import { selectStoreState } from "@/store/features/storeSlice";

export const BillingForm = () => {
  const {
    data: { currentStore },
  } = useSelector(selectStoreState);
  const [items, setItems] = useState<BillItemType[]>([
    {
      id: Date.now(),
      product: { name: "", sku: "" },
      netQuantity: 0,
      totalPrice: 0,
      stockUnit: "",
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        product: {
          name: "",
          sku: "",
        },
        netQuantity: 0,
        totalPrice: 0,
        stockUnit: "",
      },
    ]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (item: BillItemType) => {
    setItems((prev) => {
      const list = [...prev];
      const index = list.findIndex((e) => e.id === item.id);

      if (index !== -1) {
        list[index] = { ...item };
      }

      return list;
    });
  };

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  return (
    <div>
      {/* Invoice Header */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <div className="space-y-2">
          <Label>Bill To</Label>
          <Input placeholder="Client Name" />
          <Input placeholder="Phone number" />
          <Input placeholder="Address" />
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <Label>Invoice Number</Label>
          <Input type="text" placeholder="INV-001" />
        </div>
        <div>
          <Label>Invoice Date</Label>
          <Input
            type="date"
            // value="2025-12-04"
          />
        </div>
      </div>

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
                  Price (&#8377;)
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
          <div className="mb-2">
            <Input type="number" placeholder="Discount percent (%)" />
          </div>
          <div>
            <Input type="number" placeholder="Discount amount (₹)" />
          </div>
        </div>
        <div className="w-80">
          <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">&#8377;{subtotal}</span>
            </div>
            {currentStore?.taxRate && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  Tax ({currentStore.taxRate}%)
                </span>
                <span className="text-gray-900">&#8377;0</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">&#8377;0</span>
          </div>
        </div>
      </div>

      <div className="mt-12 flex gap-2">
        <Button className="w-full justify-center flex-1">
          <PrinterCheck size={18} />
          Save & print bill
        </Button>
        <Button variant="outline" className="text-green-700 bg-gray-100">
          <CloudCheck size={18} />
          Save as Draft
        </Button>
        <Button variant="outline" className="text-red-400 bg-gray-100">
          <RotateCcw size={18} />
          Reset
        </Button>
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
  id: number;
  item: BillItemType;
  onFieldUpdate: (doc: BillItemType) => void;
  onRemoveItem: (id: number) => void;
}) {
  const [selectedItem, setSelectedItem] = useState<ProductDto | null>(null);
  const [productFields, setProductFields] = useState<BillItemType>(item);

  useEffect(() => {
    if (item !== productFields) {
      setProductFields(item);
    }
  }, [item]);

  useEffect(() => {
    if (selectedItem) {
      const newItem: BillItemType = {
        ...item,
        id: id,
        product: {
          name: selectedItem?.name,
          sku: selectedItem?.sku,
        },
        netQuantity: 1,
        totalPrice: calculatePrice(1, selectedItem.pricePerQuantity),
        stockUnit: selectedItem.stockUnit,
      };
      setProductFields(newItem);
    }
  }, [selectedItem]);

  const handleInputChange = (key: keyof BillItemType, value: any) => {
    if (["netQuantity", "totalPrice"].includes(key)) {
      value = parseInt(value) || 0;
    }

    const updated = {
      ...productFields,
      id,
      [key]: value,
    };

    // update local row state
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
    <tr key={item.id} className="border-t border-gray-200">
      <td className="px-2 py-3">
        <ProductSearchInput
          // type="text"
          // value={item.product}
          // onChange={(e) => updateItem(item.id, 'product', e)}
          // placeholder="Product name"
          onSelect={(e) => setSelectedItem(e)}
        />
      </td>
      <td className="px-2 py-3">
        <StockInput
          id={"bill-quantity-" + item.id}
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

const InvoicePrintModal = () => {
  return <Modal>{/* <InvoiceDocument invoice={}/> */}</Modal>;
};
