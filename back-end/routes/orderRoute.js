import express from "express";
import Order from "../models/orderModel.js";
import { isAuth, isAdmin } from "../util.js";

const orderRouter = express.Router();

orderRouter.get("/orders", async (req, res) => {
  console.log("hello");
  const orders = await Order.find({}).populate("user");
  res.send(orders);
});

orderRouter.get("/orders/mine", async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

orderRouter.get("/orders/:id", async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (!order) {
    res.status(404).send("Order Not Found.");
  }
  if (order.deletedAt) {
    return res.status(202).send({
      message: "This category has been deleted already",
      error: "already_deleted",
    });
  }
  res.send(order);
});

orderRouter.delete("/orders/:id", async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (!order) {
    return res
      .status(404)
      .send({ message: "Order not found", error: "not_found" });
  }
  if (order.deletedAt) {
    return res.status(202).send({
      message: "This category has been deleted already",
      error: "already_deleted",
    });
  }
  order.deletedAt = new Date();
  const deleteOrder = await order.save();
  return res.status(200).send(deleteOrder);
});

orderRouter.post("/orders", async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.cartItems,
    shipping: req.body.shipping,
    payment: req.body.payment,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({ message: "New Order Created", data: newOrderCreated });
});

orderRouter.put("/orders/:id/pay", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).send({ message: "Order not found." });
  }
  order.isPaid = true;
  order.paidAt = new Date();
  order.payment = {
    paymentMethod: "paypal",
    paymentResult: {
      payerID: req.body.payerID,
      orderID: req.body.orderID,
      paymentID: req.body.paymentID,
    },
  };
  // order.payment.paymentResult = "ok";
  const updatedOrder = await order.save();
  console.log(req.body);
  console.log(order);
  console.log(order.isPaid);
  // console.log("req.body.payerID: " + req.body.payerID);
  // console.log("order.payment" + order.payment);
  // console.log(
  //   "order.payment.paymentResult.payerID" + order.payment.paymentResult.payerID
  // );
  return res.send({ message: "Order Paid.", order: updatedOrder });
});

export default orderRouter;
