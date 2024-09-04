const express = require('express');
const { userAuthenticate } = require('../middlewares/userAuthenticate.middleware');
const { addCategoryValidate } = require('../middlewares/categoryValidate.middleware');
const { getCategoriesController, addCategoryController, getProductsBySubCategoryController } = require('../controllers/category.controller');
const { adminAuthorize } = require('../middlewares/adminAuthenticate.middleware');
const { categoryImageUpload } = require('../middlewares/categoryImage.middleware');
const { imageErrorHandler } = require('../middlewares/imageErrorHandler.middleware');

const categoryRouter = express.Router();

categoryRouter.route('/')
    .get(userAuthenticate, getCategoriesController)
    .post(categoryImageUpload.single('categoryImage'), addCategoryValidate, userAuthenticate, adminAuthorize, addCategoryController)


categoryRouter.use(imageErrorHandler)

categoryRouter.route('/subcategory/:subcategory')
    .get(userAuthenticate, getProductsBySubCategoryController)

module.exports = { categoryRouter }