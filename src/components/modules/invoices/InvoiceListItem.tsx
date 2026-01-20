import { Button } from "@/components/ui/Button";
import { InvoiceDto } from "@/types/dto/invoiceDto";
import { formatDateStr } from "@/utils/formatDate";
import { Download, Eye } from "lucide-react";

export const InvoiceListItem = ({ invoice }: { invoice: InvoiceDto }) => {
  return (
    <tr
      key={invoice._id}
      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <td className="px-6 py-4">
        <span className="text-indigo-600">{invoice.invoiceNumber}</span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="text-gray-900">{invoice.customerDetails?.name}</span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="text-gray-900">
          {formatDateStr(invoice.issueDate).dashedDate}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="text-gray-900">&#8377;{invoice.total}</span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className={invoice.dueAmount ? "text-red-400" : "text-gray-900"}>
          &#8377;{invoice.dueAmount}
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
