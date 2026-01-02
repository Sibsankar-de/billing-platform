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
  { timestamps: true }
);

customerSchema.index({ name: 1 });

if (process.env.NODE_ENV === "development" && models.Customer) {
  delete models.Customer;
}

export const Customer = models.Customer || model("Customer", customerSchema);
