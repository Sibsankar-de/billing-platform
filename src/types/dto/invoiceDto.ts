import react from "react";

type PricePerQuantityType = {
    price?: number;
    quantity?: number;
    unit?: string;
}

type CustomerDetailsType = {
    name?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
};

type BillItemType = {
    product?: {
        name?: string;
        sku?: string;
    };
    pricePerQuantity?: PricePerQuantityType;
    netQuantity?: number;
    totalPrice?: number;
    stockUnit?: string;
};

export type InvoiceDto = {
    _id?: string;
    storeId?: string;
    customerDetails?: CustomerDetailsType;
    invoiceNumber?: string;
    issueDate?: Date;
    billItems?: BillItemType[];
    subTotal?: number;
    total?:number;
    discountAmount?: number;
    taxAmount?: number;
    taxRate?: number;
};
