
const { Review } = require("../models/Review.model");
const { User } = require("../models/user.model");

async function addReview(body) {
    try {
        const { user, rating, content, productId } = body;
        console.log(rating, typeof rating, isNaN(rating));
        console.log(user);
        console.log({
            username: user.username,
            userId: user._id,
            productId,
            rating,
            content
        });
        const review = await Review.create({
            username: user.username,
            userId: user._id,
            productId,
            rating: Number(rating),
            content
        })
        return review;
    } catch (error) {
        throw error;
    }
}

async function deleteReview(body) {
    try {
        const { review } = body;
        const deletedReview = await review.deleteOne();
        return deleteReview;
    } catch (error) {
        throw error;
    }
}

module.exports = { addReview, deleteReview }