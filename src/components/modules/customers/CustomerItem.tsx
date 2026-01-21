import { Button } from "@/components/ui/Button";
import { CustomerDto } from "@/types/dto/customerDto";
import { Download, Eye } from "lucide-react";
import React from "react";

export const CustomerItem = ({
  sno,
  customer,
}: {
  sno: number;
  customer: CustomerDto;
}) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <span className="text-primary">{sno}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-gray-900">{customer.name}</span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="text-gray-900">{customer.address}</span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="text-gray-900">{customer.phoneNumber}</span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="text-gray-900">
          &#8377;{customer.totalInvoices || 0}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className={customer.totalDue ? "text-red-400" : "text-gray-900"}>
          &#8377;{customer.totalDue || 0}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="none"
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="none"
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};
