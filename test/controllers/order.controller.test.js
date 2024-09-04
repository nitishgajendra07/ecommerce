const { responseMessage } = require('../../src/constants');
const { placeOrderController, getOrdersOfUserController, cancelOrderController } = require('../../src/controllers/order.controller');
const { placeOrder, getOrdersOfUser, cancelOrder } = require('../../src/services/order.service');
const { mockOrder, mockOrders } = require('../testData/controllersData/order.controller.testData');

jest.mock('../../src/services/order.service');

describe('Order Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('placeOrderController', () => {
        test('should place order successfully', async () => {
            const req = { body: { addressId: 'mockAddressId', userIdFromAuth: 'mockUserId', cartId: 'mockCartId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            placeOrder.mockResolvedValue(mockOrder);

            await placeOrderController(req, res);

            expect(placeOrder).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, order: mockOrder });
        });

        test('should handle invalid address ID error', async () => {
            const req = { body: { addressId: 'invalid', userIdFromAuth: 'mockUserId', cartId: 'mockCartId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error(responseMessage.invalidAddressId);
            placeOrder.mockRejectedValue(error);

            await placeOrderController(req, res);

            expect(placeOrder).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: responseMessage.invalidAddressId });
        });

        test('should handle internal server error', async () => {
            const req = { body: { addressId: 'mockAddressId', userIdFromAuth: 'mockUserId', cartId: 'mockCartId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Internal Server Error');
            placeOrder.mockRejectedValue(error);

            await placeOrderController(req, res);

            expect(placeOrder).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: responseMessage.internalServerError });
        });
    });

    describe('getOrdersOfUserController', () => {
        test('should get orders successfully', async () => {
            const req = { body: { userIdFromAuth: 'mockUserId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            getOrdersOfUser.mockResolvedValue(mockOrders);

            await getOrdersOfUserController(req, res);

            expect(getOrdersOfUser).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ orders: mockOrders });
        });

        test('should handle internal server error', async () => {
            const req = { body: { userIdFromAuth: 'mockUserId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Internal Server Error');
            getOrdersOfUser.mockRejectedValue(error);

            await getOrdersOfUserController(req, res);

            expect(getOrdersOfUser).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: responseMessage.internalServerError });
        });
    });

    describe('cancelOrderController', () => {
        test('should cancel order successfully', async () => {
            const req = { body: { orderId: 'mockOrderId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            cancelOrder.mockResolvedValue({ success: true });

            await cancelOrderController(req, res);

            expect(cancelOrder).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, cancelledOrder: { success: true } });
        });

        test('should handle missing required fields error', async () => {
            const req = { body: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error(responseMessage.missingRequiredFields);
            cancelOrder.mockRejectedValue(error);

            await cancelOrderController(req, res);

            expect(cancelOrder).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(responseMessage.missingRequiredFields);
        });

        test('should handle internal server error', async () => {
            const req = { body: { orderId: 'mockOrderId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Internal Server Error');
            cancelOrder.mockRejectedValue(error);

            await cancelOrderController(req, res);

            expect(cancelOrder).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: responseMessage.internalServerError });
        });
    });
});
