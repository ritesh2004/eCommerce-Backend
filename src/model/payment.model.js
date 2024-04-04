var mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        transactionID: {
            type: String,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        purchaser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller",
        },
        amount: {
            type: Number,
            required: true,
        },
        payment_method: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

module.exports = { Payment: mongoose.model("Payment", paymentSchema) };
