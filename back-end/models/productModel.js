import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    productId: { type: mongoose.Types.ObjectId, ref: "Product", require: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
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

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  categoryId: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0},
  numReviews: { type: Number, default: 0 },
  review: [{type: mongoose.Types.ObjectId, ref: "Product" }],
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
});




const productModel = mongoose.model("Product", productSchema);

export const reviewModel = mongoose.model("Review", reviewSchema);

export default productModel;
