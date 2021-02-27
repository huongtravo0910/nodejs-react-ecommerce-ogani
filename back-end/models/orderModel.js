import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentMethod: { type: String, required: true },
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

const shippingSchema = new mongoose.Schema({
  receivedUser: {
    firstName: { type: String },
    lastName: { type: String },
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  orderNote: {
    type: String,
  },
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

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  qty: {
    type: Number,
  },
  image: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
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

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderItems: [orderItemSchema],
    payment: paymentSchema,
    shipping: shippingSchema,
    shippingPrice: { type: Number },
    taxPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean },
    paidAt: { type: Date },
    isDelivered: { type: Boolean },
    deliverAt: { type: Date },
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
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
