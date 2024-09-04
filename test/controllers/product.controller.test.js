const { addProductController, getAllProductsController, deleteProductController } = require('../../src/controllers/product.controller');
const { addProduct, getAllProducts, deleteProduct, addToProductVariationCollection } = require('../../src/services/product.service');
const { responseMessage } = require('../../src/constants');
const { mockProduct, mockProductData } = require('../testData/controllersData/product.controller.testData');

jest.mock('../../src/services/product.service');

describe('Product Controller Tests', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    describe('addProductController', () => {
        test('should add a product successfully', async () => {
            req.body = mockProductData;
            addProduct.mockResolvedValue(mockProduct);
            addToProductVariationCollection.mockResolvedValue();

            await addProductController(req, res, next);

            expect(addProduct).toHaveBeenCalledWith(mockProductData);
            expect(addToProductVariationCollection).toHaveBeenCalledWith(mockProduct);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, product: mockProduct });
        });

        test('should handle validation errors', async () => {
            req.body = mockProductData;
            const error = new Error(responseMessage.invalidCategoryName);
            addProduct.mockRejectedValue(error);

            await addProductController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: error.message });
        });

        test('should handle other errors', async () => {
            req.body = mockProductData;
            const error = new Error(responseMessage.internalServerError);
            addProduct.mockRejectedValue(error);

            await addProductController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 500, message: responseMessage.internalServerError });

        });
    });

    describe('getAllProductsController', () => {
        test('should get all products successfully', async () => {
            const mockProducts = [mockProduct];
            getAllProducts.mockResolvedValue(mockProducts);

            await getAllProductsController(req, res, next);

            expect(getAllProducts).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ products: mockProducts });
        });

        test('should handle errors', async () => {
            const error = new Error('Database error');
            getAllProducts.mockRejectedValue(error);

            await getAllProductsController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 500, message: responseMessage.internalServerError });
        });
    });

    describe('deleteProductController', () => {
        test('should delete a product successfully', async () => {
            req.body.productName = mockProduct.name;
            deleteProduct.mockResolvedValue(mockProduct);

            await deleteProductController(req, res, next);

            expect(deleteProduct).toHaveBeenCalledWith(mockProduct.name);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: responseMessage.deletionSuccess });
        });

        test('should handle product not found errors', async () => {
            req.body.productName = mockProduct.name;
            const error = new Error(responseMessage.productNotFound);
            deleteProduct.mockRejectedValue(error);

            await deleteProductController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: error.message });
        });

        test('should handle other errors', async () => {
            req.body.productName = mockProduct.name;
            const error = new Error(responseMessage.internalServerError);
            deleteProduct.mockRejectedValue(error);

            await deleteProductController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 500, message: responseMessage.internalServerError });
        });
    });
});
