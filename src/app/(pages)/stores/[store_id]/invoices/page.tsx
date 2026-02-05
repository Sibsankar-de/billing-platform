import { InvoiceListTable } from "@/components/modules/invoices/InvoiceListTable";
import { InvoiceSummarySection } from "@/components/modules/invoices/InvoiceSummarySection";
import { PageContainer } from "@/components/sections/PageContainer";

export default function InvoicesPage() {
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Invoices</h1>
        <p className="text-gray-600">View and manage all your invoices</p>
      </div>

      <InvoiceSummarySection />

      <InvoiceListTable />
    </PageContainer>
  );
}
