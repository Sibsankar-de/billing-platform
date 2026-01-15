"use client";

import { CustomerDetailsForm } from "./CustomerDetailsForm";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CloudCheck, PrinterCheck, RotateCcw } from "lucide-react";
import { BillingForm } from "./BillingForm";
import { useEffect, useState } from "react";
import { InvoiceDto } from "@/types/dto/invoiceDto";
import { formatDateStr } from "@/utils/formatDate";
import { useSelector } from "react-redux";
import { selectCurrentStoreState } from "@/store/features/currentStoreSlice";
import { getNextInvoiceNumber } from "@/utils/invoicenumber-generator";
import { PrintModal } from "./PrintModal";

export const CreateBillPage = () => {
  const {
    data: { currentStore },
  } = useSelector(selectCurrentStoreState);

  const [formData, setFormData] = useState<InvoiceDto>({
    _id: "",
    invoiceNumber: "",
    billItems: [],
    issueDate: new Date(),
    subTotal: 0,
    total: 0,
    totalProfit: 0,
    discountAmount: 0,
    paidAmount: 0,
    dueAmount: 0,
    taxAmount: 0,
    customerDetails: {},
  });

  const handleFormChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBillchange = (data: Record<string, any>) => {
    const {
      subTotal,
      total,
      taxAmount,
      discountAmount,
      totalProfit,
      paidAmount,
      dueAmount,
      roundupTotal,
    } = data.calculations;
    setFormData((prev) => ({
      ...prev,
      billItems: data.items,
      subTotal,
      total,
      taxAmount,
      discountAmount,
      totalProfit,
      paidAmount,
      dueAmount,
      roundupTotal,
    }));
  };

  // update invoice number
  useEffect(() => {
    const prefix = currentStore.storeSettings?.invoiceNumberPrefix;
    handleFormChange(
      "invoiceNumber",
      getNextInvoiceNumber({
        prefix: prefix || "",
        lastInvoiceNumber: currentStore?.lastInvoiceNumber,
      })
    );
  }, [currentStore]);

  // handle print modal
  const [openPrintModal, setOpenPrintModal] = useState(false);

  return (
    <>
      <div>
        {/* Invoice Header */}
        <div className="mb-8">
          <CustomerDetailsForm
            onChange={(e) => handleFormChange("customerDetails", e)}
          />
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <Label>Invoice Number</Label>
            <Input
              type="text"
              placeholder="INV-001"
              value={formData.invoiceNumber}
              onChange={(e) => handleFormChange("invoiceNumber", e)}
            />
          </div>
          <div>
            <Label>Invoice Date</Label>
            <Input
              type="date"
              value={formatDateStr(formData.issueDate).dashedDate}
              onChange={(e) => handleFormChange("issueDate", e)}
            />
          </div>
        </div>

        <BillingForm onBillChange={handleBillchange} />

        <div className="mt-12 flex gap-2">
          <Button
            className="w-full justify-center flex-1"
            onClick={() => setOpenPrintModal(true)}
          >
            <PrinterCheck size={18} />
            Save & print bill
          </Button>
          <Button variant="outline" className="text-green-700 bg-gray-100">
            <CloudCheck size={18} />
            Save as Draft
          </Button>
          <Button variant="outline" className="text-red-400 bg-gray-100">
            <RotateCcw size={18} />
            Reset
          </Button>
        </div>
      </div>

      <PrintModal
        openState={openPrintModal}
        invoiceData={formData}
        onClose={() => setOpenPrintModal(false)}
      />
    </>
  );
};
