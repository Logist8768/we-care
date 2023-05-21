const express = require("express");
const BusRouter = express.Router();

const {
    createBus,
    getBusById,
    allBuss,
    deleteBusById,
    updateBusById

} = require("../controllers/bus_controller");

const { createBusValidator, updateBusValidator } = require("../utils/validators/busValidator");

const { requireSignIn, allowedTo } = require("../middlewares/authMiddlewares");

BusRouter.post(
    "/",
    requireSignIn,
    allowedTo("admin"),
    createBusValidator,
    createBus
);


BusRouter.delete(
    "/:id",
    requireSignIn,
    allowedTo("admin"),
    deleteBusById,
);

BusRouter.get("/",
    requireSignIn,
    allowedTo("admin"),
    allBuss
);

BusRouter.get("/:id",
    requireSignIn,
    getBusById,
);


BusRouter.put("/:id",
    requireSignIn,
    allowedTo("admin"),
    updateBusValidator,
    updateBusById,
);



module.exports = BusRouter;
