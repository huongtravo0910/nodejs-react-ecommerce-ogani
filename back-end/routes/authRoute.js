import express from "express";
import { hash, compare } from "bcryptjs";

import { getToken, isAuth } from "../util.js";
import { validateEmail } from "../helpers/stringHelper.js";
import User from "../models/userModel.js";

const authRouter = express.Router();

//1.Register a user
authRouter.post("/register", async (req, res) => {
  console.log("hello form register")
  try {
    if (!validateEmail(req.body.email)) {
      return res
        .status(400)
        .send({ message: "Email is not right format", error: "invalid_input" });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ message: "User already exist ", error: "existed_user" });
    }
    const hashedPassword = await hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    return res.status(200).send({ 
      _id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,  
      token: getToken(savedUser) });

  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message, error: "server_error" });
  }
});

//2.Login a user
authRouter.post("/login", async (req, res) => {
  console.log("hello from login")
  try {
    //Check whether the user exist
    const loginUser = await User.findOne({ email: req.body.email });
    console.log(loginUser);
    if (!loginUser) {
      return res
        .status(404)
        .send({ message: "User not found ", error: "user_not_found" });
    }
    //Compare pw
    console.log("Hello")
    console.log(req.body.password)
    const valid = await compare(
      req.body.password,
      loginUser.password
    );
    console.log("valid :" + valid);
    if (!valid) {
      return res
        .status(400)
        .send({ message: "Invalid password ", error: "invalid_password" });
    }
    res.send({ 
      _id: loginUser.id,
      name: loginUser.name,
      email: loginUser.email,
      isAdmin: loginUser.isAdmin,     
      token: getToken(loginUser) });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message, error: "server_error" });
  }
});

//3.Update a user
authRouter.patch("/:id", isAuth, async (req, res) => { 
  console.log("hello from update")
  try {
    const userId = req.params.id;
    const updatedUser = {};
    if (req.body.name) {
      updatedUser.name = req.body.name;
    }
    if (req.body.email) {
      if (!validateEmail(req.body.email)) {
        return res
          .status(400)
          .send({ msg: "Email is not right format", error: "invalid_input" });
      }
      updatedUser.email = req.body.email;
    }
    if (req.body.password) {
      updatedUser.password = await hash(req.body.password, 10);
    }
    if (
      !Object.keys(updatedUser).length === 0 ||
      !updatedUser.constructor === Object
    ) {
      return res
        .status(403)
        .send({ message: "Not enough inputs", error: "not_enough_inputs" });
    }
    updatedUser.updatedAt = new Date();
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updatedUser },
      {
        new: true,
      }
    )
      .select("_id name email")
      .exec();
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", error: "not_found" });
    }
    return res.status(200).send({ 
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,     
      token: getToken(user) })
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message, error: "server_error" });
  }
});



authRouter.get("/createadmin", async(req, res) => {
  try{
    const user = new User({
      name: "Huong Tra",
      email: "tra@123",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser)
  }catch(error){
    res.send({message: error.message})
  }
})

export default authRouter;