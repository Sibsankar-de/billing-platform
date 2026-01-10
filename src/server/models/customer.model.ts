import mongoose, { model, models, Schema } from "mongoose";
import { customerEnums } from "../enums/customer.enum";

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
    totalDue: {
      type: Number,
      default: 0,
    },
    advance: {
      type: Number,
      default: 0,
    },
    paymentBehaviour: {
      type: String,
      enum: customerEnums.paymentBehaviours,
    },
    mark: {
      type: String,
      enum: customerEnums.marks,
    },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV === "development" && models.Customer) {
  delete models.Customer;
}

export const Customer = models.Customer || model("Customer", customerSchema);
