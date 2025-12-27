export type CustomerDetailsType = {
    name?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
};

export type BillItemType = {
    id: number;
    product: {
        name: string;
        sku: string;
    };
    netQuantity: number;
    totalPrice: number;
    stockUnit: string;
};

export type InvoiceDto = {
    _id: string;
    storeId?: string;
    customerDetails?: CustomerDetailsType;
    invoiceNumber: string;
    issueDate: Date;
    billItems: BillItemType[];
    subTotal: number;
    total:number;
    discountAmount?: number;
    taxAmount?: number;
    taxRate?: number;
    createdAt?: Date;
    updatedAt?: Date;
};
