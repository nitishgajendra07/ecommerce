const { response } = require("express");
const { responseMessage } = require("../constants");
const { Product } = require("../models/product.model");

async function addVariationValidate(req, res, next) {
    try {
        const { productName, attributes, price, stockQuantity } = req.body;

        if (!productName || !attributes || !price) {
            return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
        }
        const product = await Product.findOne({ name: productName });
        if (!product) {
            return next({ statusCode: 400, message: responseMessage.invalidProductName });
        }
        req.body.product = product;


        next()
    } catch (error) {
        return next({ statusCode: 400, message: responseMessage.internalServerError });
    }
}

module.exports = { addVariationValidate }