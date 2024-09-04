const { customErrorMessage, responseMessage } = require("../constants");
const { addCategory, getCategories, getProductsBySubCategory, getSubCategories } = require("../services/category.service");
const { getFieldFromError, createDuplicateKeyErrorMessage } = require("../utils/utils");

async function addCategoryController(req, res, next) {
    try {
        console.log("entered addCategory controller");
        console.log(req.body);
        const newCategory = await addCategory(req.body);
        res.status(201).json({ success: true, newCategory });
    } catch (error) {
        if (error.name === responseMessage.validationError) {
            return next({ statusCode: 400, message: error.message });
        }
        else if (error.code === 11000) {
            const field = getFieldFromError(error);
            const errorMessageToBeSent = createDuplicateKeyErrorMessage(field);
            return next({ statusCode: 400, message: errorMessageToBeSent });
        }
        else {
            console.log(error.code);
            return next({ statusCode: 400, message: responseMessage.internalServerError });
        }
    }
}

async function getCategoriesController(req, res, next) {
    try {
        const categories = await getCategories();
        res.status(200).json(categories);
    } catch (error) {
        return next({ statusCode: 400, message: responseMessage.internalServerError });
    }
}

async function getSubCategoriesController(req, res, next) {
    try {
        const subCategories = await getSubCategories(req.params);
        res.status(200).json(subCategories);
    } catch (error) {
        return next({ statusCode: 400, message: responseMessage.internalServerError });
    }
}

async function getProductsBySubCategoryController(req, res, next) {
    try {
        const products = await getProductsBySubCategory(req.params.subcategory);
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        return next({ statusCode: 400, message: responseMessage.internalServerError });
    }
}


module.exports = { addCategoryController, getCategoriesController, getSubCategoriesController, getProductsBySubCategoryController }