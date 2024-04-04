var mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        category: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = { Category: mongoose.model("Category", categorySchema) };
