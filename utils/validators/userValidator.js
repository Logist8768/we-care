const { body, validationResult } = require("express-validator");
const validatorResult = require("../../middlewares/validatorMiddlewares");
const User = require("../../models/user");
const apiError = require("../apiError");
const isValidObjectId = require("../validMongodbObjectid");
const bcrypt = require("bcrypt");

exports.createUserValidator = [
  body("full_name")
    .notEmpty()
    .withMessage("full_name is not allowed to be empty")
    .isLength({ max: 30 })
    .withMessage(
      "full_name length must be less than or equal to 30 characters long"
    )
    .isLength({ min: 4 })
    .withMessage("firstname length must be at least 3 characters long"),
  body("email")
    .notEmpty()
    .withMessage("email is not allowed to be empty")
    .isLength({ max: 40 })
    .withMessage(
      "email length must be less than or equal to 40 characters long"
    )
    .isEmail()
    .withMessage("Email must be a valid email")
    .custom(async (email, { req }) => {
      // Check if The Email Exist
      // console.log(email);
      const user = await User.findOne({ email: email });

      if (user) {
        throw new Error("User Already Exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is not allowed to be empty")
    .isLength({ min: 5 })
    .withMessage("password length must be at least 5 characters long"),
  body("role")
    .optional()
    .custom((role, { req }) => {
      const roles = ["user", "admin"];

      if (!roles.includes(role)) {
        throw new Error(
          `User validation failed: role: ${role} is not a valid enum value for path`
        );
      }

      return true;
    }),

  validatorResult,
];

exports.updateUserValidator = [
  // body("id").isMongoId().withMessage("Invalid user id format"),
  body("full_name")
    .notEmpty()
    .withMessage("full_name is not allowed to be empty")
    .isLength({ max: 30 })
    .withMessage(
      "full_name length must be less than or equal to 10 characters long"
    )
    .isLength({ min: 4 })
    .withMessage("firstname length must be at least 3 characters long"),
  body("email")
    .notEmpty()
    .withMessage("email is not allowed to be empty")
    .isLength({ max: 40 })
    .withMessage(
      "email length must be less than or equal to 40 characters long"
    )
    .isEmail()
    .withMessage("Email must be a valid email")
  ,
  body("password")
    .notEmpty()
    .withMessage("password is not allowed to be empty")
    .isLength({ min: 5 })
    .withMessage("password length must be at least 5 characters long"),
  body("role")
    .optional()
    .custom((role, { req }) => {
      const roles = ["user", "admin"];

      if (!roles.includes(role)) {
        throw new Error(
          `User validation failed: role: ${role} is not a valid enum value for path`
        );
      }

      return true;
    }),

  validatorResult,
];

exports.deleteUserValidator = [
  body("id").custom((value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid User id format`);
    }
    return true;
  }),

  validatorResult,
];

exports.changeUserPasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("currentPassword is not allowed to be empty")
    .custom(async (value, { req }) => {
      const isValidPassword = await bcrypt.compare(value, req.user.password);

      if (!isValidPassword) {
        throw new Error("Incorrect current password");
      }
      // req.user.password === value
    }),
  body("password")
    .notEmpty()
    .withMessage("password is not allowed to be empty"),

  validatorResult,
];

exports.getUserValidator = [
  body("id").custom((value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid User id format`);
    }
    return true;
  }),

  validatorResult,
];

exports.getAllUserValidator = [
  body("id").custom((value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid User id format`);
    }
    return true;
  }),

  validatorResult,
];

exports.whoViewMyProfileValidator = [
  body("id").custom((value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid User id format`);
    }
    return true;
  }),

  validatorResult,
];

exports.followValidator = [
  body("id").custom((value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid User id format`);
    }
    return true;
  }),

  validatorResult,
];
