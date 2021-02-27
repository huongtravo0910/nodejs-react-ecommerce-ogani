import jwt from "jsonwebtoken";
import config from "./config.js";

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.header.authorization;

  if(token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res
        .status(401)
        .send({ message: "Invalid token", error: "invalid_token" });
      }
      req.user = decode;
      next();
      return;
    })
  }else {
    return res
    .status(401)
    .send({message: "Token is not supplied", error: "token_not_supplied"});
  }
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin){
    return next()
  }
  return res
  .status(401)
  .send({message: "Admin token is not valid", error: "invalid_admin_token"})
}

export {getToken, isAdmin, isAuth}
