import mongoose, { model, models, Schema, InferSchemaType } from "mongoose";
import { pricePerQuantitySchema } from "./product.model";
import { invoiceEnums } from "../enums/invoice.enum";
import mongoosePaginate from "mongoose-paginate-v2";

const billItemSchema = new Schema(
  {
    id: {
      type: Number,
      default: 1,
    },
    product: {
      id: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
      name: {
        type: String,
      },
      sku: {
        type: String,
      },
    },
    pricePerQuantity: {
      type: pricePerQuantitySchema,
    },
    netQuantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    stockUnit: {
      type: String,
    },
    totalProfit: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

const invoiceSchema = new Schema(
  {
    creatorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeId: {
      type: mongoose.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    customerId: {
      type: mongoose.Types.ObjectId,
    },
    invoiceNumber: {
      type: String,
      required: true,
      index: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    billItems: {
      type: [billItemSchema],
      default: [],
    },
    subTotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    discountAmmount: {
      type: Number,
      default: 0,
    },
    dueAmount: {
      type: Number,
      default: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    taxAmmount: {
      type: Number,
      default: 0,
    },
    taxRate: {
      type: Number,
      default: 0,
    },
    totalProfit: {
      type: String,
      default: 0,
    },
    roundupTotal: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      enum: invoiceEnums.invoiceStatus,
      default: "DRAFTED",
    },
  },
  { timestamps: true },
);

invoiceSchema.plugin(mongoosePaginate);

export type InvoiceModelType = InferSchemaType<typeof invoiceSchema>;

if (process.env.NODE_ENV === "development" && models.Invoice) {
  delete models.Invoice;
}

export const Invoice =
  models.Invoice || model<InvoiceModelType>("Invoice", invoiceSchema);
