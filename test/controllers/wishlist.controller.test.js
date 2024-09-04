const { responseMessage } = require('../../src/constants');
const { addToWishlistController, removeFromWishListController } = require('../../src/controllers/wishlist.controller');
const { addToWishlist, removeFromWishlist } = require('../../src/services/wishlist.service');
const { mockNewItem, mockRemoveRequestBody, mockAddRequestBody } = require('../testData/controllersData/wishlist.controller.testData');

jest.mock('../../src/services/wishlist.service');

describe('Wishlist Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addToWishlistController', () => {
        test('should add item to wishlist successfully', async () => {
            const req = { body: mockAddRequestBody };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            addToWishlist.mockResolvedValue(mockNewItem);

            await addToWishlistController(req, res, next);

            expect(addToWishlist).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, newItem: mockNewItem });
        });

        test('should handle invalid product variation error', async () => {
            const req = { body: mockAddRequestBody };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            const error = new Error(responseMessage.invalidProductVariation);
            addToWishlist.mockRejectedValue(error);

            await addToWishlistController(req, res, next);

            expect(addToWishlist).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: responseMessage.invalidProductVariation });
        });

        test('should handle internal server error', async () => {
            const req = { body: mockAddRequestBody };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            const error = new Error('Internal Server Error');
            addToWishlist.mockRejectedValue(error);

            await addToWishlistController(req, res, next);

            expect(addToWishlist).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith({ statusCode: 500, message: responseMessage.internalServerError });
        });
    });

    describe('removeFromWishListController', () => {
        test('should remove item from wishlist successfully', async () => {
            const req = { body: mockRemoveRequestBody };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            const updatedWishlist = { wishlistItems: [] };
            removeFromWishlist.mockResolvedValue(updatedWishlist);

            await removeFromWishListController(req, res, next);

            expect(removeFromWishlist).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, updatedWishlist });
        });

        test('should handle internal server error', async () => {
            const req = { body: mockRemoveRequestBody };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            const error = new Error('Internal Server Error');
            removeFromWishlist.mockRejectedValue(error);

            await removeFromWishListController(req, res, next);

            expect(removeFromWishlist).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith({ statusCode: 500, message: responseMessage.internalServerError });
        });
    });
});
