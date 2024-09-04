const express = require('express');
const { upload } = require('../middlewares/profilePhoto.middleware');
const { signupController, signinController, updateUserController, changePasswordController, logoutUserController } = require('../controllers/user.controller');
const { signinValidate, signupValidate, changePasswordValidate } = require('../middlewares/userValidate.middleware');
const { userAuthenticate } = require('../middlewares/userAuthenticate.middleware');
const { addressRouter } = require('./address.route');
const { cartRouter } = require('./cart.route');
const { orderRouter } = require('./order.route');
const { imageErrorHandler } = require('../middlewares/imageErrorHandler.middleware');
const { wishlistRouter } = require('./wishlist.route');

const userRouter = express.Router();

userRouter.use('/address', addressRouter);
userRouter.use('/cart', cartRouter);
userRouter.use('/order', orderRouter);
userRouter.use('/wishlist', wishlistRouter);


userRouter.route('/signup')
    .post(upload.single('profilePicture'), signupValidate, signupController)

userRouter.route('/signin')
    .post(signinValidate, signinController)

userRouter.route('/update')
    .patch(userAuthenticate, updateUserController)


userRouter.route('/logout')
    .post(userAuthenticate, logoutUserController)

userRouter.route('/change-password')
    .post(changePasswordValidate, userAuthenticate, changePasswordController);

userRouter.use(imageErrorHandler)

module.exports = { userRouter }
