"use client";

import { Button } from "@/components/ui/Button";
import { StoreDto } from "@/types/dto/storeDto";
import { formatDateStr } from "@/utils/formatDate";
import { MapPin, Settings, Store } from "lucide-react";
import { useRouter } from "next/navigation";

export const StoreCard = ({ store }: { store: StoreDto }) => {
  const router = useRouter();
  return (
    <div
      className={`bg-white rounded-lg border p-6 transition-all hover:shadow-md border-gray-200 flex justify-between items-baseline`}
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
            <span>Since {formatDateStr(store?.createdAt || "").dateStr}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => router.push(`/stores/${store?._id}`)}>
          <Store size={15} />
          Goto store
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push(`/stores/${store?._id}/settings`)}
        >
          <Settings size={20} />
        </Button>
      </div>
    </div>
  );
};
