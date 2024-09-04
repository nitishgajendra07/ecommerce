const { 
    mockCategory,
    mockCategoryData,
    mockProduct,
    mockCategoryService,
    customErrorMessage,
    responseMessage
} = require('../testData/controllersData/category.controller.testData');

const {
    addCategoryController,
    getCategoriesController,
    getSubCategoriesController,
    getProductsBySubCategoryController
} = require('../../src/controllers/category.controller');

const { getFieldFromError, createDuplicateKeyErrorMessage } = require('../../src/utils/utils');

jest.mock('../../src/services/category.service', () => mockCategoryService);
jest.mock('../../src/utils/utils');

describe('Category Controller Tests', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    describe('addCategoryController', () => {
        test('should add a category successfully', async () => {
            mockCategoryService.addCategory.mockResolvedValue(mockCategory);

            await addCategoryController(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ success: true, newCategory: mockCategory });
        });

        test('should handle validation errors', async () => {
            const error = new Error('ValidationError');
            error.name = customErrorMessage.validationError;
            mockCategoryService.addCategory.mockRejectedValue(error);

            await addCategoryController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: error.message });
        });

        test('should handle duplicate key errors', async () => {
            const error = new Error();
            error.code = 11000;
            const field = 'name';
            getFieldFromError.mockReturnValue(field);
            createDuplicateKeyErrorMessage.mockReturnValue('Duplicate key error');
            mockCategoryService.addCategory.mockRejectedValue(error);

            await addCategoryController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: 'Duplicate key error' });
        });

        test('should handle other errors', async () => {
            const error = new Error();
            mockCategoryService.addCategory.mockRejectedValue(error);

            await addCategoryController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: responseMessage.internalServerError });
        });
    });

    describe('getCategoriesController', () => {
        test('should get categories successfully', async () => {
            mockCategoryService.getCategories.mockResolvedValue([mockCategory]);

            await getCategoriesController(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockCategory]);
        });

        test('should handle errors', async () => {
            const error = new Error();
            mockCategoryService.getCategories.mockRejectedValue(error);

            await getCategoriesController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: responseMessage.internalServerError });
        });
    });

    describe('getSubCategoriesController', () => {
        test('should get subcategories successfully', async () => {
            req.params.categoryName = 'Electronics';
            mockCategoryService.getSubCategories.mockResolvedValue([mockCategory]);

            await getSubCategoriesController(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockCategory]);
        });

        test('should handle errors', async () => {
            const error = new Error();
            mockCategoryService.getSubCategories.mockRejectedValue(error);

            await getSubCategoriesController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: responseMessage.internalServerError });
        });
    });

    describe('getProductsBySubCategoryController', () => {
        test('should get products by subcategory successfully', async () => {
            req.params.subcategory = 'Electronics';
            mockCategoryService.getProductsBySubCategory.mockResolvedValue([mockProduct]);

            await getProductsBySubCategoryController(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ products: [mockProduct] });
        });

        test('should handle errors', async () => {
            const error = new Error();
            mockCategoryService.getProductsBySubCategory.mockRejectedValue(error);

            await getProductsBySubCategoryController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: responseMessage.internalServerError });
        });
    });
});
