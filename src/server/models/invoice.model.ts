import mongoose, { model, models, Schema } from "mongoose";
import { pricePerQuantitySchema } from "./product.model";

const customerSchema = new Schema(
  {
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { _id: false }
);

const billItemSchema = new Schema(
  {
    product: {
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
      required: true,
    },
  },
  { _id: false }
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
    customerDetails: customerSchema,
    invoiceNumber: {
      type: String,
      required: true,
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
    taxAmmount: {
      type: Number,
      default: 0,
    },
    taxRate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV === "development" && models.Invoice) {
  delete models.Invoice;
}

export const Invoice = models.Invoice || model("Invoice", invoiceSchema);
