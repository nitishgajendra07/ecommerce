const { responseMessage, customErrorMessage } = require("../constants");

async function addAddressValidate(req, res, next) {
    const { addressLine1, city, state, pinCode, country, isDefaultAddress } = req.body;
    if (!addressLine1 || !city || !state || !pinCode || !country) {
        return res.status(400).json({ error: responseMessage.missingRequiredFields });
    }

    const pinCodeRegEx = /^\d{6}$/
    if (!pinCodeRegEx.test(pinCode)) {
        return res.status(400).json({ error: customErrorMessage.invalidPinCode });
    }

    next();
}

async function getAddressValidate(req, res, next) {
    
}

async function setDefaultAddressValidate(req, res, next) {
    const {addressId} = req.body;
    if(!addressId){
        return res.status(400).json({error:responseMessage.missingRequiredFields});
    }
    
}

module.exports = { addAddressValidate }