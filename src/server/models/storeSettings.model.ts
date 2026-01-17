import mongoose, { model, models, Schema } from "mongoose";

const customUnitSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const storeSettingsSchema = new Schema(
  {
    storeId: {
      type: mongoose.Types.ObjectId,
      ref: "Store",
      required: true,
      unique: true,
    },
    enableInventoryTracking: {
      type: Boolean,
      default: false,
    },
    roundupInvoiceTotal: {
      type: Boolean,
      default: false,
    },
    defaultDiscountRate: {
      type: Number,
      default: 0,
    },
    defaultTaxRate: {
      type: Number,
      default: 0,
    },
    invoiceNumberPrefix: {
      type: String,
      default: "INV",
    },
    customUnits: {
      type: [customUnitSchema],
      default: [],
    },
  },
  { timestamps: true },
);

if (process.env.NODE_ENV === "development" && models.StoreSettings) {
  delete models.StoreSettings;
}

export const StoreSettings =
  models.StoreSettings || model("StoreSettings", storeSettingsSchema);
