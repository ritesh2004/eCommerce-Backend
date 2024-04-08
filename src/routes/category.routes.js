var { Router } = require("express");
const verifyUser = require("../middleware/auth.middleware.js");
const {
    addCategory,
    deleteCategory,
    getAllCategory,
    getCategoryById,
} = require("../controller/category.controller.js");

const categoryRouter = Router();

categoryRouter.post("/addcategory", verifyUser, addCategory);

categoryRouter.post("/delete/category/:id", verifyUser, deleteCategory);

categoryRouter.get("/all/categories", getAllCategory);

categoryRouter.get("/category/:id", verifyUser, getCategoryById);

module.exports = categoryRouter;
