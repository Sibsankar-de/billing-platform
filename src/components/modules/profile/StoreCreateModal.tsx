"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Modal } from "@/components/ui/Modal";
import { Store } from "lucide-react";
import React from "react";

export const StoreCreateModal = ({
  openState,
  onClose,
}: {
  openState: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal openState={openState} onClose={onClose} className="min-w-[70vh]">
      <div className="p-3 space-y-6">
        <div>
          <h2 className="text-gray-900 mb-1 text-2xl">Create new store</h2>
          <p className="text-sm text-gray-600">
            Fill the details to create the store
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storeName" required>
              Store Name
            </Label>
            <Input
              id="storeName"
              // value={newStoreName}
              // onChange={(e) => setNewStoreName(e.target.value)}
              placeholder="Enter store name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessType" required>
              Business Type
            </Label>
            <Input
              id="businessType"
              // value={newStoreType}
              // onChange={(e) => setNewStoreType(e.target.value)}
              placeholder="e.g., Retail, Technology, Food & Beverage"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessEmail">Contact email</Label>
            <Input
              type="email"
              id="businessEmail"
              // value={newStoreType}
              // onChange={(e) => setNewStoreType(e.target.value)}
              placeholder="Enter business email or personal"
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
        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>
            <Store size={15} />
            Create store
          </Button>
        </div>
      </div>
    </Modal>
  );
};
