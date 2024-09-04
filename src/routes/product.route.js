const express = require('express');
const { userAuthenticate } = require('../middlewares/userAuthenticate.middleware');
const { getAllProductsController, addProductController, deleteProductController } = require('../controllers/product.controller');
const { adminAuthorize } = require('../middlewares/adminAuthenticate.middleware');
const { addProductValidate } = require('../middlewares/productValidate.middleware');
const { productVariationImageUpload } = require('../middlewares/productImage.middleware');
const { productVariationRouter } = require('./productVariation.route');
const { imageErrorHandler } = require('../middlewares/imageErrorHandler.middleware');
const { reviewRouter } = require('./review.route');

const productRouter = express.Router();

productRouter.use('/product-variation', productVariationRouter);
productRouter.use('/review', reviewRouter);

productRouter.route('/')
    .get(userAuthenticate, getAllProductsController)
    .post(productVariationImageUpload.single('variantImage'), addProductValidate, userAuthenticate, adminAuthorize, addProductController)
    .delete(userAuthenticate, adminAuthorize, deleteProductController)




productRouter.use(imageErrorHandler)

module.exports = { productRouter }