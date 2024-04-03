var app = require("./src/app.js");
var dotenv = require("dotenv");

//Configuring .env file
dotenv.config("./env");

// Starting server
app.listen(process.env.PORT, () => {
    console.log(`Server is started at port: ${process.env.PORT}`);
});
