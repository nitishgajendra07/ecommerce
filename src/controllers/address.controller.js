const { responseMessage } = require("../constants");
const { addAddress, getAddressesOfUser, setDefaultAddress } = require("../services/address.service");

async function addAddressController(req, res, next) {
    try {
        const newAddress = await addAddress(req.body);
        return res.status(201).json({ success: true, newAddress });
    } catch (error) {
        if (error.name === responseMessage.validationError) {
            return next({ statusCode: 400, message: error.name });
        }
        else {
            console.log(error);
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }
    }
}

async function getAddressController(req, res, next) {
    try {
        const addresses = await getAddressesOfUser(req.body);
        res.status(200).json(addresses);
    } catch (error) {
        if (error.name === responseMessage.validationError) {
            return res.status(400).json({ error: error.name });
        }
        else {
            console.log(error);
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }
    }
}

async function setDefaultAddressController(req, res, next) {
    try {
        const newDefaultAddress = await setDefaultAddress(req.body);
        res.status(200).json({success:true, newDefaultAddress})
    } catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: responseMessage.internalServerError });
    }
}

module.exports = { addAddressController, getAddressController, setDefaultAddressController }