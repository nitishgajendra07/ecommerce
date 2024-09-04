const express = require('express');
const { userAuthenticate } = require('../middlewares/userAuthenticate.middleware');
const { addToWishlistValidate } = require('../middlewares/wishlistValidate.middleware');
const { addToWishlistController, removeFromWishListController } = require('../controllers/wishlist.controller');

const wishlistRouter = express.Router();

wishlistRouter.route('/')
    .post(addToWishlistValidate, userAuthenticate, addToWishlistController)
    .delete(userAuthenticate, removeFromWishListController)


module.exports = { wishlistRouter }