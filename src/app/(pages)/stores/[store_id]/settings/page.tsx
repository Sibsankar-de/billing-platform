import { InventorySettingsComponent } from "@/components/modules/settings/InventorySettingsComponent";
import { InvoiceSettingsComponent } from "@/components/modules/settings/InvoiceSettingsComponent";
import { StoreInfoComponent } from "@/components/modules/settings/StoreInfoComponent";
import { PageContainer } from "@/components/sections/PageContainer";

export default function page() {
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Store Settings</h1>
        <p className="text-gray-600">
          Manage your business information, invoice settings, and preferences
        </p>
      </div>
      <div className="space-y-8">
        <StoreInfoComponent />

        <InvoiceSettingsComponent />

        <InventorySettingsComponent />
      </div>
    </PageContainer>
  );
}
