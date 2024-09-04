const express = require('express');
const { addToCartController, getCartController, removeFromCartController } = require('../controllers/cart.controller');
const { userAuthenticate } = require('../middlewares/userAuthenticate.middleware');
const { imageErrorHandler } = require('../middlewares/imageErrorHandler.middleware');

const cartRouter = express.Router();

cartRouter.route('/')
    .post(userAuthenticate, addToCartController)
    .get(userAuthenticate, getCartController)
    .delete(userAuthenticate, removeFromCartController)



cartRouter.use(imageErrorHandler);
module.exports = { cartRouter }