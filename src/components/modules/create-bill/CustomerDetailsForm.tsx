"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { CustomerDetailsType } from "@/types/dto/invoiceDto";
import { useState } from "react";

export const CustomerDetailsForm = () => {
  const [customerData, setCustomerData] = useState<CustomerDetailsType>({
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
