import express from "express";
import User from "../models/userModel.js";
import { validateEmail } from "../helpers/stringHelper.js";

const userRouter = express.Router();

userRouter.post("/users", async (req, res) => {
  try {
    if (!validateEmail(req.body.email)) {
      return res
        .status(400)
        .send({ message: "Email is not right format", error: "invalid_input" });
    }
    const user = new User(req.body);
    const newUser = await user.save();
    return res.status(200).send("OK");
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message, error: "server_error" });
  }
});

userRouter.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({_id: id, deletedAt: {$eq: null}}, "_id name email").exec();
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", error: "not_found" });
    }
    return res.status(200).send({ data: user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message, error: "server_error" });
  }
});

userRouter.get("/users", async (req, res) => {
  try {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const users = await User.find({deletedAt: {$eq: null}}, "name email")
      .skip(offset)
      .limit(limit)
      .exec();
    const totalItems = await User.count({deletedAt: {$eq: null}}).exec();
    if (users.length == 0) {
      return res
        .status(204)
        .send({ message: "Users not found", error: "not_found" });
    }
    return res.status(200).send({
      data: users,
      meta: { total: totalItems, skip: offset, limit: limit },
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message, error: "server_error" });
  }
});

userRouter.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updated = {};
    if (req.body.name) {
      updated.name = req.body.name;
    }
    if (req.body.email) {
      if (!validateEmail(req.body.email)) {
        return res
          .status(400)
          .send({ msg: "Email is not right format", error: "invalid_input" });
      }
      updated.email = req.body.email;
    }
    if (!Object.keys(updated).length === 0 || !updated.constructor === Object) {
      return res
        .status(403)
        .send({ message: "Not enough inputs", error: "not_enough_inputs" });
    }
    updated.updatedAt = new Date();
    const user = await User.findByIdAndUpdate(id, updated, {
      new: true,
    })
      .select("_id name email")
      .exec();
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", error: "not_found" });
    }
    return res.status(200).send({ data: user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message, error: "server_error" });
  }
});

userRouter.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", error: "not_found" });
    }
    if (user.deletedAt) {
      return res
        .status(202)
        .send({
          message: "This user has been deleted already",
          error: "already_deleted",
        });
    }
    user.deletedAt = new Date();
    await user.save();
    return res.status(200).send("Deleted successful");
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message, error: "server_error" });
  }
});

export default userRouter;
