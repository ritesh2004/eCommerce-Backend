var mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        short_desc: {
            type: String,
            required: true,
        },
        long_desc: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        price: {
            type: Number,
            required: false,
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "address",
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller",
            required: true,
        },
        productColor: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = { Product: mongoose.model("Product", productSchema) };
