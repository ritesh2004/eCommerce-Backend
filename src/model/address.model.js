var mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zipcode: {
            type: Number,
            required: true,
        },
        landmark: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = { Address: mongoose.model("Address", addressSchema) };
