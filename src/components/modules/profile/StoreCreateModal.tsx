import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Modal } from "@/components/ui/Modal";
import React from "react";

export const StoreCreateModal = ({
  openState,
  onClose,
}: {
  openState: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal openState={true}>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="storeName">Store Name</Label>
          <Input
            id="storeName"
            // value={newStoreName}
            // onChange={(e) => setNewStoreName(e.target.value)}
            placeholder="Enter store name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type</Label>
          <Input
            id="businessType"
            // value={newStoreType}
            // onChange={(e) => setNewStoreType(e.target.value)}
            placeholder="e.g., Retail, Technology, Food & Beverage"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="storeLocation">Address</Label>
          <Input
            id="storeLocation"
            // value={newStoreLocation}
            // onChange={(e) => setNewStoreLocation(e.target.value)}
            placeholder="e.g., Jalpaiguri, WB-735102, India"
          />
        </div>
      </div>
    </Modal>
  );
};
