const express = require('express');
const { addProductVariationController, deleteProductVariationController, updateProductVariationController } = require('../controllers/productVariation.controller');
const { addProductVariationValidate, deleteProductVariationValidate } = require('../middlewares/productVariationValidate.middleware');
const { userAuthenticate } = require('../middlewares/userAuthenticate.middleware');
const { adminAuthorize } = require('../middlewares/adminAuthenticate.middleware');
const { imageErrorHandler } = require('../middlewares/imageErrorHandler.middleware');
const { productVariationImageUpload } = require('../middlewares/productImage.middleware');
const productVariationRouter = express.Router();

productVariationRouter.route('/')
    .post(
        productVariationImageUpload.single('variantImage'),
        userAuthenticate,
        adminAuthorize,
        addProductVariationValidate,
        addProductVariationController
    )
    .delete(userAuthenticate, adminAuthorize, deleteProductVariationValidate, deleteProductVariationController)
    .patch(productVariationImageUpload.single('variantImage'), updateProductVariationController)

productVariationRouter.use(imageErrorHandler);

module.exports = { productVariationRouter }