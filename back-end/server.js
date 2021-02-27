import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import categoryRoute from "./routes/categoryRoute.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";

import config from "./config.js";

const mongodbUrl = config.MONGODB_URL;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error.reason));

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: "http://localhost:5000",
//     credentials: true,
//   })
// );

app.use("/api", categoryRoute);
app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);
app.use("/auth", authRoute);

app.listen(5000, () => {
  console.log("Server started at localhost");
});
