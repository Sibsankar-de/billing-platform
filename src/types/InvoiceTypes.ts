export type InvoiceTypes = {
  _id?: string;
  customer: CustomerTypes;
  invoiceNumber: string;
  issueDate: number;
  billItems: BillItemTypes[];
  subtotal: number;
  total: number;
  discountAmount?: number;
  taxAmmount?: number;
  taxRate?: number;
};

export type CustomerTypes = {
  name: string;
  phoneNumber: string;
  address: string;
};

export type BillItemTypes = {
  _id?: string;
  product: {
    name: string;
    sku: string;
  };
  quantity: number;
  unit: string;
  price: number;
};
