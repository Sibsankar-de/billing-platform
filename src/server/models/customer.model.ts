import mongoose, { model, models, Schema } from "mongoose";

const customerSchema = new Schema(
  {
    storeId: {
      type: mongoose.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      index: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      index: true,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV === "development" && models.Customer) {
  delete models.Customer;
}

export const Customer = models.Customer || model("Customer", customerSchema);
