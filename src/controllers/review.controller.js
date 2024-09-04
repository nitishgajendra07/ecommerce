const { responseMessage } = require("../constants");
const { addReview, deleteReview } = require("../services/review.service");

async function addReviewController(req, res, next) {
    try {
        console.log("enetered addReviewControllerController");
        const review = await addReview(req.body);
        res.status(200).json({ success: true, review });
    } catch (error) {
        if (error.name === responseMessage.validationError) {
            return next({ statusCode: 400, message: error.message });
        }
        else {
            console.log(error);
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }
    }
}

async function deleteReviewController(req, res, next) {
    try {
        const deletedReview = await deleteReview(req.body);
        res.status(200).json({ success: true, message: deletedReview });
    } catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: responseMessage.internalServerError });
    }
}

module.exports = { addReviewController, deleteReviewController }