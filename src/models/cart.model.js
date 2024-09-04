const mongoose = require('mongoose');
const { myModels } = require('../constants');
const { Timestamp } = require('firebase-admin/firestore');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    activeCartItems: [{
        _id: false,
        productVariationId: {
            type: mongoose.Types.ObjectId,
            ref: myModels.productVariationModel,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        addedAt: {
            type:String,
            default: Date.now()
        }

    }],
    savedForLaterCartItems: [{
        _id: false,
        productVariationId: {
            type: mongoose.Types.ObjectId,
            ref: myModels.productVariationModel,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }

    }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: myModels.userModel,
        required: true
    }
});

const Cart = mongoose.model(myModels.cartModel, cartSchema);

module.exports = { Cart };
