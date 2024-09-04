const express = require('express');
const { userAuthenticate } = require('../middlewares/userAuthenticate.middleware');
const { addAddressValidate } = require('../middlewares/addressValidate.middleware');
const { addAddressController, getAddressController, setDefaultAddressController } = require('../controllers/address.controller');

const addressRouter = express.Router();

addressRouter.route('/')
    .post(addAddressValidate, userAuthenticate, addAddressController)
    .get(userAuthenticate, getAddressController)

addressRouter.route('/set-default')
    .patch(userAuthenticate, setDefaultAddressController );

module.exports = { addressRouter }