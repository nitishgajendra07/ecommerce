const { responseMessage } = require('../../src/constants');
const { addProductVariationController, deleteProductVariationController, updateProductVariationController } = require('../../src/controllers/productVariation.controller');
const { addProductVariation, deleteProductVariation, updateProductVariation } = require('../../src/services/productVariation.service');
const { mockRequest, mockProductVariation, mockProductData } = require('../testData/controllersData/productVariation.controller.testData');

jest.mock('../../src/services/productVariation.service');

describe('Product Variation Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addProductVariationController', () => {
        test('should add a product variation successfully', async () => {
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const req = mockRequest;
            addProductVariation.mockResolvedValue(mockProductVariation);

            await addProductVariationController(req, res);

            expect(addProductVariation).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, productVariation: mockProductVariation });
        });

        test('should handle errors', async () => {
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const req = mockRequest;
            const error = new Error(responseMessage.internalServerError);
            addProductVariation.mockRejectedValue(error);
            console.log = jest.fn();

            await addProductVariationController(req, res);

            expect(console.log).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteProductVariationController', () => {
        test('should delete a product variation successfully', async () => {
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const req = { body: { productVariation: mockProductVariation, mainProduct: mockProductData.mainProduct } };
            deleteProductVariation.mockResolvedValue();

            await deleteProductVariationController(req, res);

            expect(deleteProductVariation).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: responseMessage.deletionSuccess });
        });

        test('should handle invalid product name error', async () => {
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const req = { body: { productVariation: mockProductVariation, mainProduct: mockProductData.mainProduct } };
            const error = new Error(responseMessage.invalidProductName);
            deleteProductVariation.mockRejectedValue(error);

            await deleteProductVariationController(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: responseMessage.invalidProductName });
        });

        test('should handle other errors', async () => {
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const req = { body: { productVariation: mockProductVariation, mainProduct: mockProductData.mainProduct } };
            const error = new Error(responseMessage.internalServerError);
            deleteProductVariation.mockRejectedValue(error);
            console.log = jest.fn();

            await deleteProductVariationController(req, res);

            expect(console.log).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: responseMessage.internalServerError });
        });
    });

    describe('updateProductVariationController', () => {
        test('should update a product variation successfully', async () => {
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();
            const req = { body: { productVariationId: 'mockId', attributes: JSON.stringify([{ attributeOption: 'color', attributeValue: 'blue' }]), price: 1200, stockQuantity: 15, variantImage: 'new-image-url' } };
            const updatedProduct = { ...mockProductVariation, variation: { ...mockProductVariation.variation, attributes: [{ attributeOption: 'color', attributeValue: 'blue' }], price: 1200, stockQuantity: 15, variantImage: 'new-image-url' } };
            updateProductVariation.mockResolvedValue(updatedProduct);

            await updateProductVariationController(req, res, next);

            expect(updateProductVariation).toHaveBeenCalledWith(req);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, updatedProduct });
        });

        test('should handle invalid product variation ID error', async () => {
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();
            const req = { body: { productVariationId: 'mockId', attributes: JSON.stringify([{ attributeOption: 'color', attributeValue: 'blue' }]), price: 1200, stockQuantity: 15, variantImage: 'new-image-url' } };
            const error = new Error(responseMessage.invalidProductVariationId);
            updateProductVariation.mockRejectedValue(error);

            await updateProductVariationController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: responseMessage.invalidProductVariationId });
        });

        test('should handle other errors', async () => {
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();
            const req = { body: { productVariationId: 'mockId', attributes: JSON.stringify([{ attributeOption: 'color', attributeValue: 'blue' }]), price: 1200, stockQuantity: 15, variantImage: 'new-image-url' } };
            const error = new Error(responseMessage.internalServerError);
            updateProductVariation.mockRejectedValue(error);
            console.log = jest.fn();

            await updateProductVariationController(req, res, next);

            expect(console.log).toHaveBeenCalledWith(error);
            expect(next).toHaveBeenCalledWith({ statusCode: 500, message: responseMessage.internalServerError });
        });
    });
});
