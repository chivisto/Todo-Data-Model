const express = require("express");
const { getCategories, postCategory, deleteCategory, putCategory } = require("../controllers/categories");

const router = express.Router();

router.get("/", getCategories);

router.post("/create", postCategory);

router.put("/update/:categoryId", putCategory);

router.delete("/delete/:categoryId", deleteCategory);

module.exports = router;