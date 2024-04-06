var { Router } = require("express");
const {
    register,
    login,
    getUser,
    logout,
    getAccessToken,
} = require("../controller/user.controller.js");
const verifyUser = require("../middleware/auth.middleware.js");

const userRouter = Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/getuser", verifyUser, getUser);

userRouter.post("/logout", verifyUser, logout);

userRouter.post("/accesstoken", getAccessToken);

module.exports = userRouter;
