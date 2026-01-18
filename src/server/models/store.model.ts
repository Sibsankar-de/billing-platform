import mongoose, { model, models, Schema, InferSchemaType } from "mongoose";
import { storeEnums } from "../enums/store.enum";
import mongoosePaginate from "mongoose-paginate-v2";

const accessListUserSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: storeEnums.USER_ROLES,
    },
  },
  { _id: false },
);

const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    businessType: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    contactNo: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
    registrationNumber: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    logoUrl: {
      type: String,
    },
    lastInvoiceNumber: {
      type: String,
    },
    accessList: {
      type: [accessListUserSchema],
      required: true,
    },
    settingsId: {
      type: mongoose.Types.ObjectId,
      ref: "StoreSettings",
    },
  },
  { timestamps: true },
);

storeSchema.plugin(mongoosePaginate);

export type StoreModelType = InferSchemaType<typeof storeSchema>;

if (process.env.NODE_ENV === "development" && models.Store) {
  delete models.Store;
}

export const Store =
  models.Store || model<StoreModelType>("Store", storeSchema);
