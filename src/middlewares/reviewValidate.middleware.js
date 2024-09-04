const { responseMessage } = require("../constants");
const { Review } = require("../models/Review.model");
const { Order } = require("../models/order.model");
const { ProductVariation } = require("../models/productVariation.model");

async function addReviewValidate(req, res, next) {
    try {
        const { rating, content, productId, user } = req.body;

        if (!rating || !content || !productId) {
            return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
        }

        const userOrders = await Order.find({ userId: user._id });

        if (userOrders.length === 0) {
            return next({ statusCode: 400, message: responseMessage.productNotOrdered });
        }

        const productVariationIds = userOrders.reduce((acc, order) => {
            order.productsOrdered.forEach(product => {
                acc.push(product.productVariationId);
            });
            return acc;
        }, []);

        console.log("Product Variation IDs ordered:", productVariationIds);

        const productVariations = await ProductVariation.find({ _id: { $in: productVariationIds } });
        const productIds = productVariations.map(variation => variation.productId.toString());

        console.log("Product IDs ordered:", productIds);

        if (!productIds.includes(productId)) {
            return next({
                statusCode: 400, message: responseMessage.productNotOrdered
            });
        }

        req.body.productId = productId;
        next();
    } catch (error) {
        return next({ statusCode: 500, message: responseMessage.internalServerError });
    }
}

async function deleteReviewValidate(req, res, next) {
    try {
        const { reviewId, userIdFromAuth } = req.body;
        if (!reviewId) {
            return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
        }
        const review = await Review.findById(reviewId);
        if (!review) {
            return next({ statusCode: 400, message: responseMessage.invalidReviewId });
        }
        console.log("review.userId", review.userId);
        console.log("userIdFromAuth", userIdFromAuth);
        if (review.userId.toString() !== userIdFromAuth) {
            return next({ statusCode: 400, message: responseMessage.unauthorizedReviewDelete });
        }

        req.body.review = review;

        next();
    } catch (error) {
        return next({ statusCode: 500, message: responseMessage.internalServerError });
    }
}

module.exports = { addReviewValidate, deleteReviewValidate }