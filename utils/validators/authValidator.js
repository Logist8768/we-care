const { body } = require("express-validator");
const validatorResult = require("../../middlewares/validatorMiddlewares");


exports.loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is not allowed to be empty")
    .isEmail()
    .withMessage("Email must be a valid email"),

  body("password")
    .notEmpty()
    .withMessage("password is not allowed to be empty"),
  validatorResult,
];
