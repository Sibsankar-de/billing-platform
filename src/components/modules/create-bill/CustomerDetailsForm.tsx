"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { LocalSearchableInput } from "@/components/ui/LocalSearchableInputDropdown";
import { SearchableInput } from "@/components/ui/SearchableInput";
import { SelectableItem } from "@/components/ui/SelectableInputDropdown";
import { pageLimits } from "@/constants/pageLimits";
import { useStoreNavigation } from "@/hooks/store-navigation";
import {
  customerSearchThunk,
  selectCustomerState,
} from "@/store/features/customerSlice";
import { transformPaginatedResponse } from "@/store/utils";
import { CustomerDto } from "@/types/dto/customerDto";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CustomerDetailsForm = ({
  onChange,
}: {
  onChange: (e: CustomerDto) => void;
}) => {
  const { storeId } = useStoreNavigation();
  const dispatch = useDispatch();
  const { searchStatus } = useSelector(selectCustomerState);

  const [customerData, setCustomerData] = useState<CustomerDto>({
    name: "",
    phoneNumber: "",
    address: "",
  });

  const handleFormChange = (key: keyof typeof customerData, value: any) => {
    setCustomerData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // handle search
  const [searchList, setSearchList] = useState<CustomerDto[]>([]);

  const handleSearch = (query: string) => {
    if (!query || !query.trim() || query.trim().length < 2) return;

    handleFormChange("name", query);

    dispatch(
      customerSearchThunk({
        storeId,
        query,
        page: 1,
        limit: pageLimits.CUSTOMER_SEARCH,
      }),
    )
      .unwrap()
      .then((res: any) => {
        const { docs } = transformPaginatedResponse<CustomerDto>(res);
        setSearchList(docs);
      });
  };

  useEffect(() => {
    onChange(customerData);
  }, [customerData]);

  const isSearching = searchStatus === "loading";

  return (
    <div className="space-y-2">
      <Label>Bill To</Label>
      <SearchableInput
        items={searchList}
        placeholder="Enter name"
        minCharsToSearch={2}
        trimQuery
        isLoading={isSearching}
        closeOnEmpty
        value={customerData.name}
        getLabel={(p) => p.name!}
        onSelect={(data) => {
          setCustomerData(data);
        }}
        onSearch={handleSearch}
      >
        {(item) =>
          item.map((p, i) => (
            <SelectableItem key={i} item={p} index={i}>
              <p>{p.name}</p>
              {p.phoneNumber && <p>{p.phoneNumber}</p>}
            </SelectableItem>
          ))
        }
      </SearchableInput>
      <Input
        placeholder="Phone number"
        value={customerData.phoneNumber}
        onChange={(e) => handleFormChange("phoneNumber", e)}
      />
      <Input
        placeholder="Address"
        value={customerData.address}
        onChange={(e) => handleFormChange("phoneNumber", e)}
      />
    </div>
  );
};
