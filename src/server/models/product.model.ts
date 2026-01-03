import mongoose, { model, models, Schema } from "mongoose";
import { storeEnums } from "../enums/store.enum";

export const pricePerQuantitySchema = new Schema(
  {
    id: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    profitMargin: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const productSchema = new Schema(
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
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    categories: {
      type: [mongoose.Types.ObjectId],
      ref: "Category",
      default: [],
    },
    buyingPricePerQuantity: {
      type: Number,
      required: true,
    },
    totalStock: {
      type: Number,
      required: function () {
        return this.enabledInventoryTracking;
      },
    },
    enabledInventoryTracking: {
      type: Boolean,
      default: false,
    },
    stockUnit: {
      type: String,
      required: true,
      enum: storeEnums.STOCK_UNIT,
    },
    pricePerQuantity: {
      type: [pricePerQuantitySchema],
      default: [],
    },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV === "development" && models.Product) {
  delete models.Product;
}

export const Product = models.Product || model("Product", productSchema);
