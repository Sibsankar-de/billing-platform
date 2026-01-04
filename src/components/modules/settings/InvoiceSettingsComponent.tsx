"use client";

import { PrimaryBox } from "@/components/sections/PrimaryBox";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ToggleButton } from "@/components/ui/ToggleButton";
import { FileText } from "lucide-react";
import { useState } from "react";

export const InvoiceSettingsComponent = () => {
  const [formData, setFormData] = useState({
    invoiceNumberPrefix: "",
    roundupInvoiceTotal: false,
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
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-gray-900">Invoice Settings</h2>
            <p className="text-sm text-gray-600">
              Configure invoice numbering and default content
            </p>
          </div>
        </div>
        <div>
          <Button variant="dark">Save Changes</Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="invoicePrefix">Invoice Number Prefix</Label>
          <Input
            id="invoicePrefix"
            value={formData.invoiceNumberPrefix}
            onChange={(e) => handleFormDataChange("invoiceNumberPrefix", e)}
            placeholder="INV"
          />
          <p className="text-xs text-gray-500">Example: INV-1001, INV-1002</p>
        </div>
        <div className="flex justify-between items-center gap-6">
          <Label htmlFor="roundup-total">
            <p>Roundup Total</p>
            <p className="text-sm text-gray-600">eg: 4.5 = 5</p>
          </Label>
          <ToggleButton
            id="roundup-total"
            isActive={formData.roundupInvoiceTotal}
            onChange={(e) => handleFormDataChange("roundupInvoiceTotal", e)}
          />
        </div>
      </div>
    </PrimaryBox>
  );
};
