"use client";

import { PrimaryBox } from "@/components/sections/PrimaryBox";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import { useStoreNavigation } from "@/hooks/store-navigation";
import {
  selectCurrentStoreState,
  updateStoreDetailsThunk,
} from "@/store/features/currentStoreSlice";
import { StoreDto } from "@/types/dto/storeDto";
import { Building2, Store, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const StoreInfoComponent = () => {
  const { storeId } = useStoreNavigation();

  const dispatch = useDispatch();
  const {
    data: { currentStore },
    storeUpdateStatus,
  } = useSelector(selectCurrentStoreState);

  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    contactNo: "",
    address: "",
    registrationNumber: "",
    website: "",
  });

  function handleFormDataChange(key: keyof typeof formData, value: any) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  useEffect(() => {
    let data: any = {};
    Object.keys(formData).map((key) => {
      const storeKey = key as keyof typeof currentStore;
      if (currentStore[storeKey]) {
        data[key] = currentStore[storeKey];
      }
    });

    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  }, [currentStore]);

  const handleSaveChanges = () => {
    if (storeUpdateStatus !== "loading" && storeId) {
      dispatch(updateStoreDetailsThunk({ storeId, updateData: formData }))
        .unwrap()
        .then(() => {
          toast.success("Store details saved!");
        });
    }
  };

  const isUpdating = storeUpdateStatus === "loading";

  return (
    <PrimaryBox>
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-gray-900">Store Information</h2>
            <p className="text-sm text-gray-600">
              Update your store details and contact information
            </p>
          </div>
        </div>
        <div>
          <Button
            variant="dark"
            disabled={isUpdating}
            loading={isUpdating}
            onClick={handleSaveChanges}
          >
            Save changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="storeName" required>
            Store Name
          </Label>
          <Input
            id="storeName"
            value={formData.name}
            onChange={(e) => handleFormDataChange("name", e)}
            placeholder="Enter business name"
            disabled={isUpdating}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.contactEmail}
            onChange={(e) => handleFormDataChange("contactEmail", e)}
            placeholder="contact@business.com"
            disabled={isUpdating}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.contactNo}
            onChange={(e) => handleFormDataChange("contactNo", e)}
            placeholder="+91 (555) 000-0000"
            disabled={isUpdating}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => handleFormDataChange("website", e)}
            placeholder="www.business.com"
            disabled={isUpdating}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Store Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleFormDataChange("address", e)}
            placeholder="123 Business Street"
            disabled={isUpdating}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="taxId">Tax ID / Business Registration Number</Label>
          <Input
            id="taxId"
            value={formData.registrationNumber}
            onChange={(e) => handleFormDataChange("registrationNumber", e)}
            placeholder="12-3456789"
            disabled={isUpdating}
          />
        </div>
      </div>

      <Separator className="my-6" />

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
  );
};
