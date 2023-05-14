const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const User = require("../models/user");

// @Desc Make sure the user is logged in
exports.requireSignIn = asyncHandler(async (req, res, next) => {
  // 1) Get token from header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {

    return res.status(403).send({ "message": "You are not login, Please login to get access this route" })

  }

  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          next(new apiError(err.message));
        }
      } else {
        return decoded;
      }
    }
  );

  if (decoded) {
    // 3) Check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).send({ "message": "The user that belong to this token does no longer exist" })


    }

    // 4) Save the user into req object
    req.user = user;

    next();
  }
});

// @Desc
exports.allowedTo =
  (...roles) =>
    (req, res, next) => {
      // 1) access roles
      // 2) access registered user (req.user.role)

      if (!roles.includes(req.user.role)) {
        return res.status(403).send({ "message": "You are not allowed to access this route" })
      }
      next();
    };

// @desc Make sure the user is logged in the same own url
exports.isAuth = (req, res, next) => { };

// @desc isBlocked
exports.isBlocked = (req, res, next) => {
  if (req.user.isBlocked) {
    return res.status(403).send({ "message": "Account blocked..it looks like your account has been blocked" })


  }

  next();
};
