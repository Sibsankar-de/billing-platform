import mongoose, { model, models, Schema } from "mongoose";
import { storeEnums } from "../enums/store.enum";

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
  { _id: false }
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
    taxRate: {
      type: Number,
      default: 0,
    },
    accessList: {
      type: [accessListUserSchema],
      required: true,
    },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV === "development" && models.Store) {
  delete models.Store;
}

export const Store = models.Store || model("Store", storeSchema);
