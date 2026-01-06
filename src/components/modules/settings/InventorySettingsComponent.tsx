"use client";

import { PrimaryBox } from "@/components/sections/PrimaryBox";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { ToggleButton } from "@/components/ui/ToggleButton";
import { useStoreNavigation } from "@/hooks/store-navigation";
import {
  selectCurrentStoreState,
  updateStoreSettingsThunk,
} from "@/store/features/currentStoreSlice";
import { Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const InventorySettingsComponent = () => {
  const { storeId } = useStoreNavigation();

  const dispatch = useDispatch();
  const {
    data: {
      currentStore: { storeSettings },
    },
    settingsUpdateStatus,
  } = useSelector(selectCurrentStoreState);

  const [formData, setFormData] = useState({
    enableInventoryTracking: false,
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
        <div>
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

      <div className="space-y-6">
        <div className="">
          <div className="flex justify-between items-center gap-6">
            <Label htmlFor="stock-tracking" className="mb-0">
              <p>Enable Stock tracking</p>
              <p className="text-sm text-gray-600">It will track your stock.</p>
            </Label>
            <ToggleButton
              id="stock-tracking"
              isActive={formData.enableInventoryTracking}
              disabled={isUpdating}
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
