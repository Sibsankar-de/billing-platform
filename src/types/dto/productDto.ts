import react from 'react';

type pricePerQuantityType = {
    price?:number;
    quantity?:number;
    unit?:string;
}

export type ProductDto = {
    _id?: string;
    storeId?: string;
    name?: string;
    sku?: string;
    description?: string;
    categories?: string[];
    totalPrice?: number;
    totalStock?: number;
    stockUnit?: string;
    pricePerQuantity?: pricePerQuantityType;
}
