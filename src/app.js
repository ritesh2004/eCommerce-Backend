var express = require("express");

// Initializing App
const app = express();

// Home route
app.get("/", (req, res) => {
    res.status(200).send("Working");
});

// Exporting App
module.exports = app;
