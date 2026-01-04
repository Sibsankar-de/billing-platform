"use client";

import { PrimaryBox } from "@/components/sections/PrimaryBox";
import { Label } from "@/components/ui/Label";
import { ToggleButton } from "@/components/ui/ToggleButton";
import { Package } from "lucide-react";
import { useState } from "react";

export const InventorySettingsComponent = () => {
  const [formData, setFormData] = useState({
    enableInventoryTracking: false,
  });

  function handleFormDataChange(key: keyof typeof formData, value: any) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }
  return (
    <PrimaryBox>
      <div className="flex justify-between gap-3">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-gray-900">Inventory Settings</h2>
            <p className="text-sm text-gray-600">
              Configure stock tracking and others
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="">
          <div className="flex justify-between items-center gap-6">
            <Label htmlFor="stock-tracking">
              <p>Enable Stock tracking</p>
              <p className="text-sm text-gray-600">It will track your stock.</p>
            </Label>
            <ToggleButton
              id="stock-tracking"
              isActive={formData.enableInventoryTracking}
              onChange={(e) =>
                handleFormDataChange("enableInventoryTracking", e)
              }
            />
          </div>
        </div>
      </div>
    </PrimaryBox>
  );
};
