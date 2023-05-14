const express = require("express");
const authRouter = express.Router();

const { login } = require("../controllers/auth_controller");
const { loginValidator } = require("../utils/validators/authValidator");

authRouter.post(
    "/login",
    loginValidator,
    login
);


module.exports = authRouter;
