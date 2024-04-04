var mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
        contact: {
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

module.exports = { User: mongoose.model("User", userSchema) };
