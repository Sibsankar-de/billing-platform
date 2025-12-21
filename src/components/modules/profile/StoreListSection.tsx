"use client";

import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { StoreCreateModal } from "./StoreCreateModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreList, selectStoreState } from "@/store/features/storeSlice";
import { StoreCard } from "./StoreCard";

export const StoreListSection = () => {
  const dispatch = useDispatch();
  const storeState = useSelector(selectStoreState);
  const storeStatus = storeState.status;
  const { storeList } = storeState.data;

  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  // fetch store list
  useEffect(() => {
    if (storeStatus === "idle") dispatch(fetchStoreList());
  }, [dispatch, storeList]);

  return (
    <section id="stores">
      <div className="flex items-center gap-3 justify-between mb-6">
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
      <div className="grid grid-cols-1 gap-4">
        {storeList.map((store, index) => (
          <StoreCard store={store} key={index} />
        ))}
      </div>

      <StoreCreateModal
        openState={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
      />
    </section>
  );
};
