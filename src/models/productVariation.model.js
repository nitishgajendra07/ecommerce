const mongoose = require('mongoose')
const { myModels } = require('../constants')

const productVariationSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: myModels.productModel
    },
    variation: {
        attributes: [{
            _id: false,
            attributeOption: {
                type: String,
                required: true
            },
            attributeValue: {
                type: String,
                required: true
            }
        }],
        variantImage: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stockQuantity: {
            type: Number,
            required: true
        }
    }
}, {
    timestamps: true,
    autoIndex: false
})


const ProductVariation = mongoose.model(myModels.productVariationModel, productVariationSchema);

module.exports = { ProductVariation }
