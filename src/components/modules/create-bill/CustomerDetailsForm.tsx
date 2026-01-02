"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export const CustomerDetailsForm = () => {
  return (
    <div className="space-y-2">
      <Label>Bill To</Label>
      <Input placeholder="Client Name" />
      <Input placeholder="Phone number" />
      <Input placeholder="Address" />
    </div>
  );
};
