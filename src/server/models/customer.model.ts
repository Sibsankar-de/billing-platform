import mongoose, { InferSchemaType, model, models, Schema } from "mongoose";
import { customerEnums } from "../enums/customer.enum";
import mongoosePaginate from "mongoose-paginate-v2";

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
      required: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
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
  { timestamps: true },
);

customerSchema.index({ name: 1 }, { collation: { locale: "en", strength: 2 } });

customerSchema.plugin(mongoosePaginate);

export type CustomerModelType = InferSchemaType<typeof customerSchema>;

if (process.env.NODE_ENV === "development" && models.Customer) {
  delete models.Customer;
}

export const Customer =
  models.Customer || model<CustomerModelType>("Customer", customerSchema);
