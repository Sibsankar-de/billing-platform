import { Button } from "@/components/ui/Button";
import { StoreDto } from "@/types/dto/storeDto";
import { LayoutDashboard, MapPin, Store } from "lucide-react";
import React from "react";

export const StoreCard = ({ store }: { store: StoreDto }) => {
  return (
    <div
      className={`bg-white rounded-lg border-2 p-6 transition-all hover:shadow-md border-gray-200`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center bg-indigo-100`}
        >
          <Store className={`w-6 h-6 text-indigo-600`} />
        </div>
        <div>
          <div className="mb-1">
            <h3 className="text-gray-900">{store.name}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-1">{store.businessType}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {store.address}
            </span>
            <span>Since 19 jan 2024</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button>
          <LayoutDashboard size={15} />
          Goto store
        </Button>
      </div>
    </div>
  );
};
