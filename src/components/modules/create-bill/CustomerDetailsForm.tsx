"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { SearchableInput } from "@/components/ui/SearchableInputDropdown";
import { SelectableItem } from "@/components/ui/SelectableInputDropdown";
import { selectCurrentStoreState } from "@/store/features/currentStoreSlice";
import { CustomerDto } from "@/types/dto/customerDto";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const CustomerDetailsForm = ({
  onChange,
}: {
  onChange: (e: CustomerDto) => void;
}) => {
  const {
    data: { customerList },
  } = useSelector(selectCurrentStoreState);

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

  useEffect(() => {
    onChange(customerData);
  }, [customerData]);

  const searchRule: any = [
    { field: "name", priority: 1000, mode: "prefix" },
    { field: "phoneNumber", priority: 800, mode: "prefix" },
    { field: "address", priority: 700, mode: "prefix" },
    { field: "name", priority: 500, mode: "substring" },
  ];

  return (
    <div className="space-y-2">
      <Label>Bill To</Label>
      <SearchableInput
        items={customerList}
        rules={searchRule}
        placeholder="Enter name"
        closeOnEmpty
        value={customerData.name}
        getLabel={(p) => p.name!}
        onSelect={(data) => {
          setCustomerData(data);
        }}
        onChange={(e) => handleFormChange("name", e)}
      >
        {(p, i) => (
          <SelectableItem key={i} item={p} index={i}>
            <p>{p.name}</p>
            {p.phoneNumber && <p>{p.phoneNumber}</p>}
          </SelectableItem>
        )}
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
