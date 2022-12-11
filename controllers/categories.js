const Category = require("../models/category");
const { formatMongooseResponse } = require("../utils");

const getCategories = async (req, res) => {
    const categories = await Category.find({});
    res.status(200).json(formatMongooseResponse(categories));
}

const postCategory = async (req, res) => {
    const { categoryName } = req.body;
    let category = new Category({
        categoryName
    });
    category = await category.save();
    res.status(200).json({
        _id: category._id,
        categoryName: category.categoryName,
    });
}

const putCategory = async (req, res) => {
    const { categoryId } = req.params;
    const newData = req.body;
    await Category.updateOne({
        _id: categoryId
    }, {
        $set: {
            ...newData
        }
    });
    const category = await Category.findById(categoryId);
    res.status(200).json(formatMongooseResponse(category));
}

const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    await Category.deleteOne({
        _id: categoryId
    });
    return res.status(200).json("deleted");
}


module.exports = {
    getCategories,
    postCategory,
    deleteCategory,
    putCategory
}