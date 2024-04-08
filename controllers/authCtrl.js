const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/error/asyncErrorHandler");
const User = require("../models/User");
const AppError = require("../utils/error/appError");

const verifyToken = asyncErrorHandler(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token === null || token === undefined)
    return res.status(401).json({ msg: "plz provide token" });
  const decode = await jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  if (!decode) {
    next(new AppError("Invalid token", 401));
  }
  const user = await User.findById(decode.userId);
  if (!user) {
    next(new AppError("Invalid token", 403));
  }

  req.userId = decode.userId;

  next();
});

module.exports = {
  verifyToken,
};
