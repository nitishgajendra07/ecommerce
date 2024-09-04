const { responseMessage } = require("../constants");
const { Product } = require("../models/product.model");
const { addProduct, getAllProducts, deleteProduct, addToProductVariationCollection, deleteFromProductVariationCollection } = require("../services/product.service");

async function addProductController(req, res, next) {
    try {
        const product = await addProduct(req.body);
        addToProductVariationCollection(product);
        res.status(200).json({ success: true, product });

    } catch (error) {

        if (error.message === responseMessage.invalidCategoryName || error.message === responseMessage.oneVariantAtATimeError) {
            return next({ statusCode: 400, message: error.message });
        }
        else {
            console.log(error);
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }

    }
}

async function getAllProductsController(req, res, next) {
    try {
        const products = await getAllProducts();
        res.status(200).json({ products });
    } catch (error) {
        if (error.message === responseMessage.pageNotFound) {
            return next({ statusCode: 400, message: error.message });
        }
        else {
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }
    }
}

async function deleteProductController(req, res, next) {
    try {
        const product = await deleteProduct(req.body.productName);
        res.status(200).json({ message: responseMessage.deletionSuccess });
    } catch (error) {
        if (error.message === responseMessage.productNotFound) {
            return next({ statusCode: 400, message: error.message });
        }
        else {
            console.log(error);
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }
    }
}


module.exports = { addProductController, getAllProductsController, deleteProductController }