var app = require("./src/app.js");
var dotenv = require("dotenv");
var connectDB = require("./src/db/index.js");

//Configuring .env file
dotenv.config("./env");

//Connecting with Database
connectDB();

// Starting server
app.listen(process.env.PORT, () => {
    console.log(`Server is started at port: ${process.env.PORT}`);
});
