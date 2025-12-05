import React from "react";
import { InvoiceTypes } from "@/types/InvoiceTypes";
import { PAGE_SIZE_MAP, PageSizeType } from "@/constants/pageSizeConstants";

type Props = {
    invoice: InvoiceTypes;
    pageSize?: PageSizeType;
};

export const InvoiceDocument: React.FC<Props> = ({
    invoice,
    pageSize = "A4",
}) => {
    const pageSizeClass = PAGE_SIZE_MAP[pageSize];

    const formatCurrency = (value: number) =>
        value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    const formatDate = (timestamp: number) =>
        new Date(timestamp).toLocaleDateString();

    return (
        <div
            id="print-section"
            className={`
        bg-white text-gray-900
        shadow-xl mx-auto my-6 p-8 rounded-lg
        print:shadow-none print:rounded-none print:m-0 print:p-6
        ${pageSizeClass}
      `}
        >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        INVOICE
                    </h1>
                    <p className="text-sm text-gray-500">
                        Invoice #: {invoice.invoiceNumber}
                    </p>
                </div>

                <div className="text-right text-sm">
                    <p className="font-semibold">{invoice.customer.name}</p>
                    <p>{invoice.customer.phoneNumber}</p>
                    <p>{invoice.customer.address}</p>
                </div>
            </div>

            {/* Invoice Info */}
            <div className="mt-6 grid grid-cols-2 text-sm">
                <div>
                    <p className="font-semibold">Bill To:</p>
                    <p>{invoice.customer.name}</p>
                    <p>{invoice.customer.address}</p>
                </div>

                <div className="text-right">
                    <p>
                        <span className="font-semibold">Issue Date:</span>{" "}
                        {formatDate(invoice.issueDate)}
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="mt-6">
                <table className="w-full text-left text-sm border">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="py-2 px-3">Item</th>
                            <th className="py-2 px-3">SKU</th>
                            <th className="py-2 px-3 text-center">Qty</th>
                            <th className="py-2 px-3 text-center">Unit</th>
                            <th className="py-2 px-3 text-right">Price</th>
                            <th className="py-2 px-3 text-right">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {invoice.billItems.map((item) => (
                            <tr key={item._id} className="border-b">
                                <td className="py-2 px-3">{item.product.name}</td>
                                <td className="py-2 px-3">{item.product.sku}</td>
                                <td className="py-2 px-3 text-center">{item.quantity}</td>
                                <td className="py-2 px-3 text-center">{item.unit}</td>
                                <td className="py-2 px-3 text-right">
                                    {formatCurrency(item.price)}
                                </td>
                                <td className="py-2 px-3 text-right">
                                    {formatCurrency(item.price * item.quantity)}
                                </td>
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
                        <span>{formatCurrency(invoice.subtotal)}</span>
                    </div>

                    {invoice.discountAmount && (
                        <div className="flex justify-between py-1">
                            <span>Discount:</span>
                            <span>-{formatCurrency(invoice.discountAmount)}</span>
                        </div>
                    )}

                    {invoice.taxRate && (
                        <div className="flex justify-between py-1">
                            <span>Tax ({invoice.taxRate}%):</span>
                            <span>{formatCurrency(invoice.taxAmmount || 0)}</span>
                        </div>
                    )}

                    <div className="flex justify-between font-semibold text-lg border-t mt-2 pt-2">
                        <span>Total:</span>
                        <span>{formatCurrency(invoice.total)}</span>
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
