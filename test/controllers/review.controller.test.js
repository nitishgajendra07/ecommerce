const { addReviewController, deleteReviewController } = require('../../src/controllers/review.controller');
const { addReview, deleteReview } = require('../../src/services/review.service');
const { mockReview, mockReviewResponse, mockDeleteReview } = require('../testData/controllersData/review.controller.testData');
const { responseMessage } = require('../../src/constants');

jest.mock('../../src/services/review.service');

describe('Review Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addReviewController', () => {
        test('should add review successfully', async () => {
            const req = { body: mockReview };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            addReview.mockResolvedValue(mockReviewResponse);

            await addReviewController(req, res, next);

            expect(addReview).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, review: mockReviewResponse });
        });

        test('should handle validation error', async () => {
            const req = { body: mockReview };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            const error = new Error('Validation error');
            error.name = responseMessage.validationError;
            addReview.mockRejectedValue(error);

            await addReviewController(req, res, next);

            expect(addReview).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: error.message });
        });

        test('should handle internal server error', async () => {
            const req = { body: mockReview };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            const error = new Error('Internal Server Error');
            addReview.mockRejectedValue(error);

            await addReviewController(req, res, next);

            expect(addReview).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith({ statusCode: 500, message: responseMessage.internalServerError });
        });
    });

    describe('deleteReviewController', () => {
        test('should delete review successfully', async () => {
            const req = { body: mockDeleteReview };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            deleteReview.mockResolvedValue(mockDeleteReview.review);

            await deleteReviewController(req, res, next);

            expect(deleteReview).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, message: mockDeleteReview.review });
        });

        test('should handle internal server error', async () => {
            const req = { body: mockDeleteReview };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            const error = new Error('Internal Server Error');
            deleteReview.mockRejectedValue(error);

            await deleteReviewController(req, res, next);

            expect(deleteReview).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith({ statusCode: 500, message: responseMessage.internalServerError });
        });
    });
});
