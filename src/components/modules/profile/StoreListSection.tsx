"use client";

import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { StoreCreateModal } from "./StoreCreateModal";

export const StoreListSection = () => {
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-3 justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">My Stores</h2>
          <p className="text-sm text-gray-600">
            Manage and switch between your business stores
          </p>
        </div>
        <Button onClick={() => setIsStoreModalOpen((p) => !p)}>
          <Plus size={15} />
          Create Store
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4"></div>

      <StoreCreateModal
        openState={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
      />
    </div>
  );
};
