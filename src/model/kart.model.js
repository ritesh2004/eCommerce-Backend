var mongoose = require("mongoose");

const kartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        isOrdered: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = { Kart: mongoose.model("Kart", kartSchema) };
