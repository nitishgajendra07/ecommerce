const multer = require('multer');
const { productImageExtension, responseMessage } = require('../constants');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { ProductVariation } = require('../models/productVariation.model');
const { deletePhoto } = require('../utils/utils');
const { Product } = require('../models/product.model');


const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        console.log("entered productVariationImageUpload");
        let productName = req.body.name || req.body.productName;
        if (req.originalUrl.includes('/product-variation') && req.method === 'PATCH' && file) {
            const { productVariationId } = req.body;
            console.log("productVariationId in multer", productVariationId);

            if (!productVariationId) {
                const error = new Error(responseMessage.missingRequiredFields);
                error.statusCode = 400;
                return cb(error);
            }
            const productVariation = await ProductVariation.findById(req.body.productVariationId);
            if (!productVariation) {
                const error = new Error(responseMessage.invalidProductVariationId);
                error.statusCode = 400;
                return cb(error);
            }
            productName = productVariation.variation.variantImage.split('-')[0];
        }
        const dir = `./public/uploads/productPictures/${productName}`;

        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                return cb(err);
            }
            cb(null, dir);
        });
    },
    filename: async function (req, file, cb) {
        let productName = req.body.name || req.body.productName;
        const uniqueSuffix = `${uuidv4()}.${productImageExtension}`;
        console.log("req.method", req.method);
        console.log("req.originalUrl", req.originalUrl);
        console.log("req.file", file);

        if (req.originalUrl.includes('/product-variation') && req.method === 'PATCH' && file) {
            const { productVariationId } = req.body;
            console.log("productVariationId in multer", productVariationId);

            if (!productVariationId) {
                const error = new Error(responseMessage.missingRequiredFields);
                error.statusCode = 400;
                return cb(error);
            }
            const productVariation = await ProductVariation.findById(req.body.productVariationId);
            if (!productVariation) {
                const error = new Error(responseMessage.invalidProductVariationId);
                error.statusCode = 400;
                return cb(error);
            }
            productName = productVariation.variation.variantImage.split('-')[0];
            console.log("productName inside if", productName);

            await deletePhoto(`./public/uploads/productPictures/${productName}/${productVariation.variation.variantImage}`);

        }
        console.log("productName outside if", productName);

        req.body.variantImage = `${productName}-${uniqueSuffix}`;
        console.log(req.body.variantImage);
        cb(null, `${productName}-${uniqueSuffix}`);
    }
});

productVariationImageUpload = multer({ storage });
module.exports = { productVariationImageUpload };