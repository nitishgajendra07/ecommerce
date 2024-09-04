const { responseMessage } = require("../constants");
const { Product } = require("../models/product.model");
const { ProductVariation } = require("../models/productVariation.model");

async function addProductVariationValidate(req, res, next) {
    try {
        console.log("Entered addProductVariationValidate");

        const { productName, newVariation, variantImage } = req.body;
        console.log("productName", productName);
        console.log("newVariation", newVariation);
        console.log("variantImage", variantImage);
        if (!productName || !newVariation || !variantImage) {
            return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
        }
        // const parsedVariation = JSON.parse(variation);

        console.log("entered addProductVariationValidate");
        const product = await Product.findOne({ name: productName });
        if (!product) {
            return next({ statusCode: 400, message: responseMessage.invalidProductName });
        }
        const productId = product._id;
        const parsedNewVariation = JSON.parse(newVariation);
        parsedNewVariation.variantImage = req.body.variantImage;
        const productVariation = new ProductVariation({
            productId,
            variation: parsedNewVariation
        });
        try {
            await productVariation.validate();
        } catch (error) {
            console.log("error in productVariationValidate", error.message);
            return next({ statusCode: 400, message: error.message });
        }

        req.body.mainProduct = product;
        console.log("exiting addProductVariationValidate");
        next();
    } catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: responseMessage.internalServerError });
    }
}

async function deleteProductVariationValidate(req, res, next) {
    try {
        const { productVariationId } = req.body;
        if (!productVariationId) {
            return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
        }

        const productVariation = await ProductVariation.findById(productVariationId);
        if (!productVariation) {
            return next({ statusCode: 400, message: responseMessage.invalidProductVariationId });
        }
        const product = await Product.findById(productVariation.productId);
        if (!product) {
            return next({ statusCode: 400, message: responseMessage.invalidProductVariation });
        }
        req.body.productVariation = productVariation;
        req.body.mainProduct = product;

        next();
    } catch (error) {
        console.log(error);
    }
}

async function updateProductVariationValidate(req, res, next) {
    try {
        const { productVariationId, newVariationObject } = req.body;
        if (!productVariationId || !newVariationObject) {
            return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
        }


        next();
    } catch (error) {
        return next({ statusCode: 500, message: responseMessage.internalServerError });
    }
}

module.exports = { addProductVariationValidate, deleteProductVariationValidate, updateProductVariationValidate }