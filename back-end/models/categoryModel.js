import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required:true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamp: true,
  }
);

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
