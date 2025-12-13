import mongoose, { model, models, Schema } from "mongoose";

const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV === "development" && models.Store) {
  delete models.Store;
}

export const Store = models.Store || model("Store", storeSchema);
