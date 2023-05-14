const express = require("express");
const userRouter = express.Router();

const {
    createUser,
    getUserById,
    allUsers,
    blocUserById,
    unBlocUserById,
    deleteUserById,
    updateUserById,

} = require("../controllers/user_controller");

const {
    createUserValidator,
    updateUserValidator
} = require("../utils/validators/userValidator");

const { requireSignIn, allowedTo } = require("../middlewares/authMiddlewares");

userRouter.post(
    "/",
    requireSignIn,
    allowedTo("admin"),
    createUserValidator,
    createUser
);



userRouter.post(
    "/block/:id",
    requireSignIn,
    allowedTo("admin"),
    blocUserById
);


userRouter.post(
    "/un_block/:id",
    requireSignIn,
    allowedTo("admin"),
    unBlocUserById
);



userRouter.delete(
    "/:id",
    requireSignIn,
    allowedTo("admin"),
    deleteUserById,
);

// @desc Get All Users
userRouter.get("/",
    requireSignIn,
    allowedTo("admin"),
    allUsers
);

userRouter.get("/:id",
    requireSignIn,
    allowedTo("admin", "user"),
    getUserById);


userRouter.put("/:id",
    requireSignIn,
    allowedTo("admin", "user"),
    updateUserValidator,
    updateUserById);

;

module.exports = userRouter;
