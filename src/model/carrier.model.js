var mongoose = require("mongoose");

const carrierSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: [true, "Email ID must be unique"],
        },
        password: {
            type: String,
            select: false,
        },
        provider: {
            type: String,
            enum: ["email/password", "google"],
            required: true,
        },
        contact_main: {
            type: Number,
            unique: [true, "Contact no must be unique"],
            required: true,
        },
        contact_second: {
            type: Number,
            unique: [true, "Contact no must be unique"],
            required: true,
        },
        profileURL: {
            type: String,
            required: false,
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = { Carrier: mongoose.model("Carrier", carrierSchema) };
