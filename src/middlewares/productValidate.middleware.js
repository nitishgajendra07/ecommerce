const { responseMessage, customErrorMessage } = require("../constants");
const { Product } = require("../models/product.model");

async function addProductValidate(req, res, next) {
    console.log("req.body", req.body);
    const { name, description, variation, categoryName, variantImage } = req.body;
    console.log(categoryName, name);

    if (!name || !description || !variation || !categoryName || !variantImage) {
        return next(responseMessage.missingRequiredFields);
    }

    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
        return next({ statusCode: 400, message: customErrorMessage.productAlreadyExists });
    }

    next();
}

module.exports = { addProductValidate }