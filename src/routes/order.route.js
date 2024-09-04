const express = require('express');
const { placeOrderController, cancelOrderController, getOrdersOfUserController } = require('../controllers/order.controller');
const { userAuthenticate } = require('../middlewares/userAuthenticate.middleware');

const orderRouter = express.Router();

orderRouter.route('/')
    .post(userAuthenticate, placeOrderController)
    .get(userAuthenticate, getOrdersOfUserController)
    .delete(userAuthenticate, cancelOrderController)

module.exports = { orderRouter }
