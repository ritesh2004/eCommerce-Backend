var mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "eCommerceDB",
        });
        console.log(`Database connected at ${res.connection.host}`);
    } catch (error) {
        console.log(error);
    }
};

// Exporting connectDB function
module.exports = connectDB;
