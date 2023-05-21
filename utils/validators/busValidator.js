const { body, validationResult } = require("express-validator");
const validatorResult = require("../../middlewares/validatorMiddlewares");
const User = require("../../models/user");
const apiError = require("../apiError");
const isValidObjectId = require("../validMongodbObjectid");
const bcrypt = require("bcrypt");
const Bus = require("../../models/bus");

exports.createBusValidator = [
  body("school")
    .notEmpty()
    .withMessage("school is not allowed to be empty")
    .isLength({ max: 30 })
    .withMessage(
      "school length must be less than or equal to 30 characters long"
    )
    .isLength({ min: 4 })
    .withMessage("school length must be at least 3 characters long"),

  body("bus_number")
    .notEmpty()
    .withMessage("bus_number is not allowed to be empty")
    .isLength({ max: 40 })
    .withMessage(
      "bus_number length must be less than or equal to 40 characters long"
    )
    .custom(async (bus_number, { req }) => {

      const bus = await Bus.findOne({ bus_number: bus_number });

      if (bus) {
        throw new Error(`Bus with this bus_number:${bus_number} Already Exists`);
      }
    }),

  body("camera_url")
    .notEmpty()
    .withMessage("password is not allowed to be empty"),

  body("destination")
    .notEmpty()
    .withMessage("destination is not allowed to be empty")
    .custom((destination, { req }) => {
      console.log(destination);
      if (!destination.lat || !destination.long) {
        throw new Error(
          `invalid destination: ${JSON.stringify(destination)}, lat or long doesn't exist`
        );
      }

      return true;
    }),

  body("current_location")
    .notEmpty()
    .withMessage("current_location is not allowed to be empty")
    .custom((current_location, { req }) => {

      if (!current_location.lat || !current_location.long) {
        throw new Error(
          `invalid current_location: ${JSON.stringify(current_location)}, lat or long doesn't exist`
        );
      }

      return true;
    }),

  validatorResult,
];

exports.updateBusValidator = [
  body("school")
    .optional()
    .isLength({ max: 30 })
    .withMessage(
      "school length must be less than or equal to 30 characters long"
    )
    .isLength({ min: 4 })
    .withMessage("school length must be at least 3 characters long"),

  body("bus_number")
    .optional()
    .isLength({ max: 40 })
    .withMessage(
      "bus_number length must be less than or equal to 40 characters long"
    ),


  body("camera_url")
    .optional(),


  body("destination")
    .optional()
    .custom((destination, { req }) => {
      console.log(destination);
      if (!destination.lat || !destination.long) {
        throw new Error(
          `invalid destination: ${JSON.stringify(destination)}, lat or long doesn't exist`
        );
      }

      return true;
    }),

  body("current_location")
    .optional()
    .custom((current_location, { req }) => {

      if (!current_location.lat || !current_location.long) {
        throw new Error(
          `invalid current_location: ${JSON.stringify(current_location)}, lat or long doesn't exist`
        );
      }

      return true;
    }),

  validatorResult,
];
