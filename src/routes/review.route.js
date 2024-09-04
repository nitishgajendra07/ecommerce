const express = require('express');
const { userAuthenticate } = require('../middlewares/userAuthenticate.middleware');
const { addReviewValidate, deleteReviewValidate } = require('../middlewares/reviewValidate.middleware');
const { addReviewController, deleteReviewController } = require('../controllers/review.controller');

const reviewRouter = express.Router();

reviewRouter.route('/')
    .post(userAuthenticate, addReviewValidate, addReviewController)
    .delete(userAuthenticate,deleteReviewValidate, deleteReviewController)

module.exports = { reviewRouter };