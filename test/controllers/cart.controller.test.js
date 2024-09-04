const { addToCartController, getCartController, removeFromCartController } = require('../../src/controllers/cart.controller');
const { addToCart, getCart, removeFromCart } = require('../../src/services/cart.service');
const { responseMessage } = require('../../src/constants');
const { 
    mockProduct, 
    mockProductVariation, 
    mockCart
} = require('../testData/controllersData/cart.controller.testData');

jest.mock('../../src/services/cart.service');

describe('Cart Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addToCartController', () => {
        test('should add product variation to cart successfully', async () => {
            const req = { body: { productName: mockProduct.name, chosenVariation: mockProductVariation.variation, userIdFromAuth: 'mockUserId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            addToCart.mockResolvedValue(mockCart);

            await addToCartController(req, res, next);

            expect(addToCart).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, cart: mockCart });
        });

        test('should handle invalid product name error', async () => {
            const req = { body: { productName: 'invalid', chosenVariation: mockProductVariation.variation, userIdFromAuth: 'mockUserId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            const error = new Error(responseMessage.invalidProductName);
            addToCart.mockRejectedValue(error);

            await addToCartController(req, res, next);

            expect(addToCart).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: responseMessage.invalidProductName });
        });

        test('should handle internal server error', async () => {
            const req = { body: { productName: mockProduct.name, chosenVariation: mockProductVariation.variation, userIdFromAuth: 'mockUserId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            const error = new Error('Internal Server Error');
            addToCart.mockRejectedValue(error);

            await addToCartController(req, res, next);

            expect(addToCart).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith({ statusCode: 500, message: responseMessage.internalServerError });
        });
    });

    describe('getCartController', () => {
        test('should get cart successfully', async () => {
            const req = { body: { userIdFromAuth: 'mockUserId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            getCart.mockResolvedValue(mockCart);

            await getCartController(req, res, next);

            expect(getCart).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ cart: mockCart });
        });

        test('should handle internal server error', async () => {
            const req = { body: { userIdFromAuth: 'mockUserId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            const error = new Error('Internal Server Error');
            getCart.mockRejectedValue(error);

            await getCartController(req, res, next);

            expect(getCart).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: responseMessage.internalServerError });
        });
    });

    describe('removeFromCartController', () => {
        test('should remove product variation from cart successfully', async () => {
            const req = { body: { productName: mockProduct.name, chosenVariation: mockProductVariation.variation, userIdFromAuth: 'mockUserId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            removeFromCart.mockResolvedValue(mockCart);

            await removeFromCartController(req, res, next);

            expect(removeFromCart).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true });
        });

        test('should handle invalid product name error', async () => {
            const req = { body: { productName: 'invalid', chosenVariation: mockProductVariation.variation, userIdFromAuth: 'mockUserId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            const error = new Error(responseMessage.invalidProductName);
            removeFromCart.mockRejectedValue(error);

            await removeFromCartController(req, res, next);

            expect(removeFromCart).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: responseMessage.invalidProductName });
        });

        test('should handle internal server error', async () => {
            const req = { body: { productName: mockProduct.name, chosenVariation: mockProductVariation.variation, userIdFromAuth: 'mockUserId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            const error = new Error('Internal Server Error');
            removeFromCart.mockRejectedValue(error);

            await removeFromCartController(req, res, next);

            expect(removeFromCart).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith({ statusCode: 500, message: responseMessage.internalServerError });
        });
    });
});
