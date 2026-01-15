export type StoreSettingsDto = {
  enableInventoryTracking?: boolean;
  roundupInvoiceTotal?: boolean;
  defaultDiscountRate?: number;
  defaultTaxRate?: number;
  invoiceNumberPrefix?: string;
};

export type StoreDto = {
  _id: string;
  name: string;
  owner?: string;
  address?: string;
  contactNo?: string;
  contactEmail?: string;
  businessType?: string;
  registrationNumber?: string;
  website?: string;
  taxRate?: number;
  lastInvoiceNumber?: string;
  storeSettings?: StoreSettingsDto;
  createdAt?: Date;
  updatedAt?: Date;
};
