const { Category } = require("../model/category.model.js");
const Apierror = require("../utils/ApiError.js");
const Apiresp = require("../utils/Apiresp.js");

const addCategory = async (req, res) => {
    const { category } = req.body;

    if (!category) {
        return res.status(401).json(new Apierror(401, "Insufficient data"));
    }

    try {
        const resp = await Category({ category, product: req.product });
        return res
            .status(200)
            .json(new Apiresp(200, resp, "Category added successfully"));
    } catch (error) {
        return res.status(500).json(new Apierror(500, "Something went wrong"));
    }
};

const deleteCategory = async (req, res) => {
    const id = req.params.id;

    try {
        const resp = await Category.deleteOne({ _id: id });
        return res
            .status(200)
            .json(new Apiresp(200, resp, "Category deleted successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(new Apierror(500, "Something went wrong deleting category"));
    }
};

const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find({});
        return res
            .status(200)
            .json(
                new Apiresp(200, categories, "Categories fetched successfully")
            );
    } catch (error) {
        return res
            .status(500)
            .json(
                new Apierror(500, "Something went error fetching categories")
            );
    }
};

const getCategoryById = async (req, res) => {
    const id = req.params.id;

    try {
        const category = await Category.findById(id);
        return res
            .status(200)
            .json(new Apiresp(200, category, "Category fetched successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(new Apierror(500, "Something went error fetching category"));
    }
};

module.exports = {
    addCategory,
    deleteCategory,
    getAllCategory,
    getCategoryById,
};
