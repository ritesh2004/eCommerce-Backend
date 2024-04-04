var mongoose = require("mongoose");

const orderedSchema = new mongoose.Schema({
    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    COD: {
        type: Boolean,
        default: true,
    },
    carrier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carrier",
    },
    trackingID: {
        type: String,
    },
    orderDate: {
        type: Date,
        default: Date.now(),
    },
    expectedDate: {
        type: Date,
    },
    deliveryDate: {
        type: Date,
    },
});

module.exports = { Ordered: mongoose.model("Ordered", orderedSchema) };
