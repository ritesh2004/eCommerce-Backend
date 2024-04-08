var express = require("express");
var userRouter = require("./routes/user.routes.js");
var cookieParser = require("cookie-parser");
const addressRouter = require("./routes/address.routes.js");
const sellerRoute = require("./routes/seller.routes.js");
const categoryRouter = require("./routes/category.routes.js");

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
app.use("/api/v1", sellerRoute);
app.use("/api/v1", categoryRouter);
// Exporting App
module.exports = app;
