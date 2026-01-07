import mongoose, { model, models, Schema } from "mongoose";
import { pricePerQuantitySchema } from "./product.model";
import { invoiceEnums } from "../enums/invoice.enum";

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
    customerId: {
      type: mongoose.Types.ObjectId,
    },
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
    status: {
      type: String,
      enum: invoiceEnums.invoiceStatus,
      default: "DRAFTED",
    },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV === "development" && models.Invoice) {
  delete models.Invoice;
}

export const Invoice = models.Invoice || model("Invoice", invoiceSchema);
