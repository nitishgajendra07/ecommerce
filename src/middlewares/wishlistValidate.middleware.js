const { responseMessage } = require("../constants");
const { Product } = require("../models/product.model");
const { ProductVariation } = require("../models/productVariation.model");

async function addToWishlistValidate(req, res, next) {
    try {
        const { productVariationId, } = req.body;
        if (!productVariationId) {
            return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
        }
        const productVariation = await ProductVariation.findById(productVariationId);
        if (!productVariation) {
            next({ statusCode: 400, message: responseMessage.invalidProductVariationId });
        }
        next();
    } catch (error) {
        return next({ statusCode: 400, message: responseMessage.internalServerError });
    }
}

module.exports = { addToWishlistValidate }