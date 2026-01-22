import { Button } from "@/components/ui/Button";
import { InvoiceDto } from "@/types/dto/invoiceDto";
import { formatDateStr } from "@/utils/formatDate";
import { Download, Eye, Pen } from "lucide-react";
import { InvoiceDueEditModal } from "./InvoiceDueEditModal";
import { useState } from "react";

export const InvoiceListItem = ({ invoice }: { invoice: InvoiceDto }) => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
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
          <span
            className={invoice.dueAmount ? "text-red-400" : "text-green-600"}
          >
            &#8377;{invoice.dueAmount}
          </span>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center justify-end gap-1">
            <Button
              variant="outline"
              className="p-2 text-primary"
              tooltip="Update due"
              onClick={() => setEditOpen(true)}
            >
              <Pen className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="p-2" tooltip="View or print">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="p-2" tooltip="Download">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </td>
      </tr>

      <InvoiceDueEditModal
        openState={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
};
