import React from "react";
import { InvoiceDto } from "@/types/dto/invoiceDto";
import { ConditionalDiv } from "../ui/ConditionalDiv";
import { formatDateStr } from "@/utils/formatDate";
import { cn } from "../utils";

interface Props extends React.ComponentProps<"div"> {
  invoice: InvoiceDto;
  pageSize?: string;
}

export const InvoiceDocument: React.FC<Props> = ({
  invoice,
  pageSize = "80mm",
  ...props
}) => {
  const customerDetails = invoice.customerDetails;

  return (
    <div
      id="print-section"
      className={cn(
        `bg-white text-gray-900 shadow-xl mx-auto my-6 p-8 rounded-lg print:shadow-none print:rounded-none print:m-0 print:p-6 border`
      )}
      style={{ width: pageSize }}
      {...props}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">INVOICE</h1>
          <p className="text-sm text-gray-500">
            Invoice #: {invoice.invoiceNumber}
          </p>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="mt-6 grid grid-cols-2 text-sm">
        <ConditionalDiv
          condition={customerDetails}
          className="text-right text-sm"
        >
          <p className="font-semibold">{customerDetails?.name}</p>
          <ConditionalDiv condition={customerDetails?.phoneNumber}>
            {customerDetails?.phoneNumber}
          </ConditionalDiv>
          <p>{customerDetails?.address}</p>
        </ConditionalDiv>

        <div className="text-right">
          <p>
            <span className="font-semibold">Issue Date:</span>{" "}
            {formatDateStr(invoice?.issueDate).dashedDate}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6">
        <table className="w-full text-left text-sm border">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-3">Item</th>
              <th className="py-2 px-3 text-center">Qty</th>
              <th className="py-2 px-3 text-right">Price</th>
              <th className="py-2 px-3 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {invoice.billItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-3">{item.product.name}</td>
                <td className="py-2 px-3 text-center">
                  {item.netQuantity} {item.stockUnit}
                </td>
                <td className="py-2 px-3 text-right">{item.totalPrice}</td>
                <td className="py-2 px-3 text-right">{item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 flex justify-end">
        <div className="w-64 text-sm">
          <div className="flex justify-between py-1">
            <span>Subtotal:</span>
            <span>{invoice.subTotal}</span>
          </div>

          <ConditionalDiv
            condition={invoice.discountAmount}
            className="flex justify-between py-1"
          >
            <span>Discount:</span>
            <span>-{invoice.discountAmount}</span>
          </ConditionalDiv>

          <ConditionalDiv
            condition={invoice.taxRate}
            className="flex justify-between py-1"
          >
            <span>Tax ({invoice.taxRate}%):</span>
            <span>{invoice.taxAmount || 0}</span>
          </ConditionalDiv>

          <div className="flex justify-between font-semibold text-lg border-t mt-2 pt-2">
            <span>Total:</span>
            <span>{invoice.total}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-10 text-center text-xs text-gray-500 print:mt-20">
        Thank you for your business!
      </p>
    </div>
  );
};
