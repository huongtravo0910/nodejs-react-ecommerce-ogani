import express from "express";
import Category from "../models/categoryModel.js";
import { isAuth, isAdmin } from "../util.js";

const categoryRouter = express.Router();

categoryRouter.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({ deletedAt: { $eq: null } });
    if (categories.length == 0) {
      return res
        .status(404)
        .send({ message: "Categories not found", error: "not_found" });
    }
    return res.status(200).send({
      categories,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message, error: "server_error" });
  }
});

categoryRouter.get("/categories/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOne({
      _id: id,
      deletedAt: { $eq: null },
    });
    if (!category) {
      return res
        .status(404)
        .send({ message: "Categories not found", error: "not_found" });
    }
    return res.status(200).send({
      category,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message, error: "server_error" });
  }
});

categoryRouter.post("/categories", async (req, res) => {
  try {
    const category = new Category(req.body);
    const newCategory = await category.save();
    return res.status(200).send(newCategory);
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message, error: "server_error" });
  }
});

categoryRouter.patch("/categories/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (category) {
      if (!category.deletedAt) {
        category.name = req.body.name;
        category.updatedAt = new Date();
        const newCategory = await Category.findByIdAndUpdate(
          id,
          category,
          {
            new: true,
          }
        )
          .select("_id name updateAt")
          .exec();
        return res.status(200).send(newCategory);
      }
      return res.status(202).send({
        message: "This category has been deleted already",
        error: "already_deleted",
      });
    }
    return res
      .status(404)
      .send({ message: "Category not found", error: "not_found" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message, error: "server_error" });
  }
});

categoryRouter.delete("/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      if (!category.deletedAt) {
        category.deletedAt = new Date();
        const newCategory = category.save();
        return res.status(200).send(newCategory);
      }
      return res.status(202).send({
        message: "This category has been deleted already",
        error: "already_deleted",
      });
    }
    return res
      .status(404)
      .send({ message: "Category not found", error: "not_found" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message, error: "server_error" });
  }
});

export default categoryRouter;
