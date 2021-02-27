import express from "express";
import Product from "../models/productModel.js";
import { isAuth, isAdmin } from "../util.js";

const productRouter = express.Router();

productRouter.get("/products", async (req, res) => {
  const categoryId = req.query.categoryId
    ? { categoryId: req.query.categoryId }
    : {}; //condition
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: "i",
        },
      }
    : {}; //condition
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === "lowest"
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  const products = await Product.find({
    ...categoryId,
    ...searchKeyword,
    deletedAt: { $eq: null },
  }).sort(sortOrder);
  res.send(products);
});

productRouter.get("/products/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(400).send({ message: "Product not found." });
  }
});

productRouter.patch("/products/:id", async (req, res) => {
  //isAuth, isAdmin,
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    product.updatedAt = new Date();
    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: "Product Updated", data: updatedProduct });
    }
  }
  return res.status(500).send({ message: "Error in updating Product" });
});

productRouter.delete("/products/:id", async (req, res) => {
  //isAuth, isAdmin,
  try {
    const deleteProduct = await Product.findById(req.params.id);
    if (deleteProduct) {
      if (!deleteProduct.deletedAt) {
        deleteProduct.deletedAt = new Date();
        const newCategory = await deleteProduct.save();
        return res.status(200).send(newCategory);
      }
      return res.status(202).send({
        message: "This category has been deleted already",
        error: "already_deleted",
      });
    }
    return res
      .status(404)
      .send({ message: "Product not found", error: "not_found" });
  } catch (error) {
    return res.status(500).send({ message: "Error in deletion" });
  }
});

productRouter.post("/products", async (req, res) => {
  //isAdmin, isAuth,
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    categoryId: req.body.categoryId,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: "New Product Created", data: newProduct });
  }
  return res.status(500).send({ message: "Error in creating product." });
});

export default productRouter;
