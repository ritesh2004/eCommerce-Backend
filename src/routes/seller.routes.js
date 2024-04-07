var { Router } = require("express");
const {
    register,
    login,
    getUser,
    logout,
    getAccessToken,
} = require("../controller/seller.controller.js");
const verifyUser = require("../middleware/auth.middleware.js");

const sellerRoute = Router();

sellerRoute.post("/seller/register", register);

sellerRoute.post("/seller/login", login);

sellerRoute.post("/seller/getuser", verifyUser, getUser);

sellerRoute.post("/seller/logout", verifyUser, logout);

sellerRoute.post("/seller/accesstoken", getAccessToken);

module.exports = sellerRoute;
