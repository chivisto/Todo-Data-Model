let { categories, currentCategoryId } = require("../db");

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const getCategories = (req, res) => {
    res.status(200).json(categories);
}


/**
 * @param {Request} req 
 * @param {Response} res 
 */
const postCategory = (req, res) => {
    const { categoryName } = req.body;
    currentCategoryId++;
    const newCategory = { categoryID: currentCategoryId, categoryName };
    categories.push(newCategory);
    res.status(200).json(newCategory);
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const putCategory = (req, res) => {
    const { categoryId } = req.params;
    const newData = req.body;

    const selectedCategoryIndex = categories.findIndex((category) => category.categoryID === +categoryId); 
    categories.splice(selectedCategoryIndex, 1, {
        ...categories[selectedCategoryIndex],
        ...newData
    });
    return res.status(200).json(categories[selectedCategoryIndex]);
}


/**
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteCategory = (req, res) => {
    const { categoryId } = req.params;
    const selectedCategoryIndex = categories.findIndex((category) => category.categoryID === +categoryId); 
    categories.splice(selectedCategoryIndex, 1);
    return res.status(200).json("deleted");
}


module.exports = {
    getCategories,
    postCategory,
    deleteCategory,
    putCategory
}