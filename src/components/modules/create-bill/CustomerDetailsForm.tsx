"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { CustomerDto } from "@/types/dto/customerDto";
import { useState } from "react";

export const CustomerDetailsForm = () => {
  const [customerData, setCustomerData] = useState<CustomerDto>({
    name: "",
    phoneNumber: "",
    address: "",
  });
  
  return (
    <div className="space-y-2">
      <Label>Bill To</Label>
      <Input placeholder="Client Name" />
      <Input placeholder="Phone number" />
      <Input placeholder="Address" />
    </div>
  );
};
