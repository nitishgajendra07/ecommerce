const { responseMessage } = require("../constants");
const { addProductVariation, deleteProductVariation, updateProductVariation } = require("../services/productVariation.service");

async function addProductVariationController(req, res) {
    try {
        console.log("Entrered addProductVariationController");
        const productVariation = await addProductVariation(req.body)
        res.status(200).json({ success: true, productVariation })

    } catch (error) {
        console.log(error);
    }
}

async function deleteProductVariationController(req, res) {
    try {
        await deleteProductVariation(req.body);
        res.status(200).json({ message: responseMessage.deletionSuccess });
    } catch (error) {
        if (error.message === responseMessage.invalidProductName) {
            res.status(400).json({ error: error.message });
        }
        else {
            console.log(error);
            res.status(500).json({ error: responseMessage.internalServerError })
        }

    }
}

async function updateProductVariationController(req, res, next) {
    try {
        console.log("Entered updateProductVariationController");
        const updatedProduct = await updateProductVariation(req);
        return res.status(200).json({ success: true, updatedProduct });
    } catch (error) {
        if (error.message === responseMessage.invalidProductVariationId) {
            return next({ statusCode: 400, message: error.message });
        }
        else {
            console.log(error);
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }
    }
}

module.exports = { addProductVariationController, deleteProductVariationController, updateProductVariationController }