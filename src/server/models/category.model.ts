import mongoose, { models, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    storeId: {
      type: mongoose.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV === "development" && models.Category) {
  delete models.Category;
}

export const Category =
  models.Category || mongoose.model("Category", categorySchema);
