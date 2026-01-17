export type CustomUnitType = {
  key: string;
  value: string;
};

export type StoreSettingsDto = {
  enableInventoryTracking: boolean;
  roundupInvoiceTotal: boolean;
  defaultDiscountRate?: number;
  defaultTaxRate?: number;
  invoiceNumberPrefix: string;
  customUnits: CustomUnitType[];
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
  storeSettingsId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
