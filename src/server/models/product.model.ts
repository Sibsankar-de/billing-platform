import mongoose, { model, models, Schema } from "mongoose";

export const pricePerQuantitySchema = new Schema(
  {
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      enum: storeEnums.STOCK_UNIT,
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
    },
    sku: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    categories: {
      type: [String],
      default: [],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalStock: {
      type: Number,
      required: true,
    },
    stockUnit: {
      type: String,
      required: true,
      enum: storeEnums.STOCK_UNIT,
    },
    pricePerQuantity: {
      type: pricePerQuantitySchema,
      default: {},
    },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV === "development" && models.Product) {
  delete models.Product;
}

export const Product = models.Product || model("Product", productSchema);
