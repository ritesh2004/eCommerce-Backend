var express = require("express");
var userRouter = require("./routes/user.routes.js");
var cookieParser = require("cookie-parser");
const addressRouter = require("./routes/address.routes.js");

// Initializing App
const app = express();

// Home route
app.get("/", (req, res) => {
    res.status(200).send("Working");
});

// Middlewares
app.use(express.json());
app.use(cookieParser());

//Router
app.use("/api/v1", userRouter);
app.use("/api/v1", addressRouter);
// Exporting App
module.exports = app;
