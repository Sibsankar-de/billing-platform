export type CustomerDetailsType = {
  name?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
};

export type BillItemType = {
  id: number;
  product: {
    id: string;
    name: string;
    sku: string;
  };
  netQuantity: number;
  totalPrice: number;
  stockUnit: string;
  totalProfit: number;
};

export type InvoiceDto = {
  _id: string;
  storeId?: string;
  customerId?: string;
  customerDetails?: CustomerDetailsType;
  invoiceNumber: string;
  issueDate: Date;
  billItems: BillItemType[];
  subTotal: number;
  total: number;
  totalProfit: number;
  discountAmount?: number;
  taxAmount?: number;
  taxRate?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
