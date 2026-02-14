"use client";

import { PrimaryBox } from "@/components/sections/PrimaryBox";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ToggleButton } from "@/components/ui/ToggleButton";
import { useStoreNavigation } from "@/hooks/store-navigation";
import {
  selectCurrentStoreState,
  updateStoreSettingsThunk,
} from "@/store/features/currentStoreSlice";
import { Building2, Palette, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const InvoiceSettingsComponent = () => {
  const { storeId } = useStoreNavigation();

  const dispatch = useDispatch();
  const {
    data: { storeSettings },
    settingsUpdateStatus,
  } = useSelector(selectCurrentStoreState);

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

  useEffect(() => {
    if (!storeSettings) return;
    let data: any = {};
    Object.keys(formData).map((key) => {
      const storeKey = key as keyof typeof storeSettings;
      if (storeSettings[storeKey]) {
        data[key] = storeSettings[storeKey];
      }
    });

    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  }, [storeSettings]);

  const handleSaveChanges = () => {
    if (settingsUpdateStatus !== "loading" && storeId) {
      dispatch(updateStoreSettingsThunk({ storeId, updateData: formData }))
        .unwrap()
        .then(() => {
          toast.success("Store settings saved!");
        });
    }
  };

  const isUpdating = settingsUpdateStatus === "loading";

  return (
    <div className="space-y-6">
      <PrimaryBox className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="invoicePrefix">Invoice Number Prefix</Label>
          <Input
            id="invoicePrefix"
            value={formData.invoiceNumberPrefix}
            placeholder="INV"
            disabled={isUpdating}
            onChange={(e) => handleFormDataChange("invoiceNumberPrefix", e)}
          />
          <p className="text-xs text-gray-500">Example: INV-1001, INV-1002</p>
        </div>
        <div className="flex justify-between items-center gap-6">
          <Label htmlFor="roundup-total" className="mb-0">
            <p>Roundup Total</p>
            <p className="text-sm text-gray-600">eg: 4.5 = 5</p>
          </Label>
          <ToggleButton
            id="roundup-total"
            isActive={formData.roundupInvoiceTotal}
            disabled={isUpdating}
            onChange={(e) => handleFormDataChange("roundupInvoiceTotal", e)}
          />
        </div>
      </PrimaryBox>

      <PrimaryBox className="space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-gray-900">Branding</h2>
            <p className="text-sm text-gray-600">Configure invoice branding</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoiceStoreName">Store name in Invoice</Label>
          <Input id="invoiceStoreName" placeholder="Write the name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoiceFooter">Invoice Footer</Label>
          <Input
            id="invoiceFooter"
            placeholder="Write the footer line. eg, Thank you!"
          />
        </div>

        <div className="space-y-4">
          <Label>Store Logo</Label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
            <div className="flex-1">
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" />
                Upload Logo
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Recommended size: 200x200px. Max file size: 2MB
              </p>
            </div>
          </div>
        </div>
      </PrimaryBox>

      <div className="flex justify-end">
        <Button
          variant="dark"
          onClick={handleSaveChanges}
          disabled={isUpdating}
          loading={isUpdating}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};
