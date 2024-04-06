var { Router } = require("express");
const verifyUser = require("../middleware/auth.middleware.js");
const {
    newAddress,
    updateAddress,
} = require("../controller/address.controller.js");

const addressRouter = Router();

addressRouter.post("/new/address", verifyUser, newAddress);

addressRouter.put("/update/address", verifyUser, updateAddress);

module.exports = addressRouter;
