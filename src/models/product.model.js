const mongoose = require('mongoose');
const { myModels } = require('../constants');
const { createSlug } = require('../utils/utils');
const { ProductVariation } = require('./productVariation.model');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: myModels.categoryModel,
        required: true
    },
    slug: {
        type: String
    },
    productImage: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 1,
        max:5
    },
    numberOfReviews: {
        type:Number
    },
    variations: [
        {
            _id: false,
            attributes: [
                {
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
            variationSlug: {
                type: String
            },
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
                default: 10
            }
        }

    ]
}, {
    autoIndex: false,
    timestamps: true
})

productSchema.pre('save', async function (next) {

    if (!this.isModified("name")) {
        return next();
    }

    this.slug = createSlug(this.name);

    next();

})


productSchema.post('deleteOne', { document: true, query: false }, async function (doc, next) {
    const productVariations = await ProductVariation.deleteMany({ productId: this._id });
    next();
})

const Product = mongoose.model(myModels.productModel, productSchema);

module.exports = { Product }