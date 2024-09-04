const mongoose = require('mongoose');
const { responseMessage, myModels } = require('../constants');
const { Product } = require('./product.model');
const { User } = require('./user.model');


const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: myModels.userModel
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: myModels.productModel,
        required: true
    }
}, { timestamps: true });

reviewSchema.pre('save', async function () {
    const product = await Product.find({ _id: this.productId });
    if (!product) {
        throw new Error(responseMessage.invalidProductId);
    }
    const user = await User.findById(this.userId);
    if (!user) {
        throw new Error(responseMessage.invalidUserId);
    }
})

reviewSchema.post('save', async function () {
    try {
        const newRating = this.rating;
        const product = await Product.findById(this.productId);
        const newNumberOfReviews = (product.numberOfReviews || 0) + 1;
        const calculatedRating = ((product.rating || 0 * (newNumberOfReviews - 1)) + newRating) / (newNumberOfReviews);
        await product.updateOne(
            {
                $set: {
                    numberOfReviews: newNumberOfReviews,
                    rating: calculatedRating
                }
            }
        )
    } catch (error) {
        console.log(error);
        throw error;
    }
});

reviewSchema.pre('deleteOne', async function () {
    try {
        const product = await Product.findById(this.productId);
        const newNumberOfReviews = product.numberOfReviews - 1;
        const calculatedRating = (product.rating * product.numberOfReviews - this.rating) / newNumberOfReviews;
        await product.updateOne(
            {
                $set: {
                    numberOfReviews: newNumberOfReviews,
                    rating: calculatedRating
                }
            }
        )
    } catch (err) {
        console.log(error);
        throw err;
    }
})


const Review = mongoose.model(myModels.reviewModel, reviewSchema);

module.exports = { Review };