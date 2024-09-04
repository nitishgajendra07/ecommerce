


const wishlistSchema = new mongoose.schema({
    wishlistItems: [{
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
})