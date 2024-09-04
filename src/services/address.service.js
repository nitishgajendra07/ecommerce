const { Address } = require("../models/address.model");

async function addAddress(body) {
    try {
        const { addressLine1, addressLine2, landmark, city, state, pinCode, country, isDefault } = body;
        const newAddress = await Address.create({
            userId: body.userIdFromAuth,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            pinCode,
            country,
            isDefault
        });
        return newAddress;


    } catch (error) {
        throw error;
    }

}

async function getAddressesOfUser(body) {
    try {
        console.log("body.userIdFromAuth", body.userIdFromAuth);
        const addresses = await Address.find({ userId: body.userIdFromAuth });
        return addresses;

    } catch (error) {
        throw error;
    }
}

async function setDefaultAddress(body) {
    try {
        let addresesses = await Address.find({ userId: body.userIdFromAuth, isDefaultAddress: true });
        for (let i = 0; i < addresesses.length; i++) {
            addresesses[i].isDefaultAddress = false;
            await addresesses[i].save();
        }
        const newDefaultAddress = await Address.findByIdAndUpdate(body.addressId, {
            $set: { isDefaultAddress: true }
        },
            { new: true }
        )
        return newDefaultAddress;

    } catch (error) {
        throw error;
    }
}

module.exports = { addAddress, getAddressesOfUser, setDefaultAddress }