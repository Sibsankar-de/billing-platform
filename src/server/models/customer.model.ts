import mongoose, { model, models, Schema } from "mongoose";

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
  { timestamps: true }
);

if (process.env.NODE_ENV === "development" && models.Customer) {
  delete models.Customer;
}

export const Customer = models.Customer || model("Customer", customerSchema);
