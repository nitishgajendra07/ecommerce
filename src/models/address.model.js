const mongoose = require('mongoose');
const { myModels, responseMessage } = require('../constants');
const { User } = require('./user.model');


const addressSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: myModels.userModel,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
    },
    landmark: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true,
        match: /^\d{6}$/
    },
    country: {
        type: String,
        required: true
    },
    isDefaultAddress: {
        type: Boolean,
        default: false
    }
},
    {
        autoIndex: false,
        timestamps: true
    }
)

addressSchema.pre('save', async function () {
    const existingUser = await User.find({ _id: this.userId })

    if (!existingUser) {
        throw new Error(responseMessage.invalidUserId);
    }
})

addressSchema.pre('save', async function () {

})


const Address = mongoose.model(myModels.addressModel, addressSchema)

module.exports = { Address }