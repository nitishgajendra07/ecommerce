const mongoose = require('mongoose');
const { myModels, allowedOrderStatuses } = require('../constants');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: myModels.userModel,
        required: true
    },
    productsOrdered: [{
        productVariationId:{
            type: mongoose.Types.ObjectId,
            ref: myModels.productVariationModel,
            required: true
        },
        quantity:{
            type:Number,
            required:true,
            default:1
        }

    }],
    addressId: {
        type: mongoose.Types.ObjectId,
        ref: myModels.addressModel,
        required: true
    },
    totalPrice: {
        type: Number
    },
    status: {
        type: String,
        enum: allowedOrderStatuses,
        default: allowedOrderStatuses[0]
    }
})

const Order = mongoose.model(myModels.orderModel, orderSchema);

module.exports = { Order }