export type PricePerQuantityType = {
  id: number;
  price: number;
  quantity: number;
  profitMargin?: number;
};

export type ProductDto = {
  _id: string;
  storeId: string;
  name: string;
  sku: string;
  description?: string;
  categories?: string[];
  buyingPrice: number;
  totalStock: number;
  stockUnit: string;
  pricePerQuantity: PricePerQuantityType[];
  createdAt?: Date;
  updatedAt?: Date;
};
