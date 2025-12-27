export type StoreDto = {
    _id: string;
    name: string;
    owner?: string;
    address?: string;
    contactNo?: string;
    contactEmail?: string;
    businessType?: string;
    taxRate?: number;
    createdAt?: Date;
    updatedAt?: Date;
}