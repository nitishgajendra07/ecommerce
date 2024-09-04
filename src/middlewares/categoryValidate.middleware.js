const { responseMessage, customErrorMessage } = require("../constants");
const { Category } = require("../models/category.model");

async function addCategoryValidate(req, res, next) {
    console.log("req.body from addCategoryvalidate", req.body);
    const { name, description, categoryImage, parentCategory } = req.body;
    if (!name || !description) {
        return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        return next({ statusCode: 400, message: customErrorMessage.categoryAlreadyExists });
    }

    next();
}

module.exports = { addCategoryValidate }