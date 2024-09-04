const { Category } = require('../../src/models/category.model');
const { Product } = require('../../src/models/product.model');
const { addCategory, getCategories, getSubCategories, getProductsBySubCategory } = require('../../src/services/category.service');
const { responseMessage } = require('../../src/constants');
const { mockCategory,mockCategoryData, mockProduct } = require('../testData/controllersData/category.controller.testData');

jest.mock('../../src/models/category.model');
jest.mock('../../src/models/product.model');

describe('Category Service Tests', () => {
    describe('addCategory', () => {
        test('should add a category successfully', async () => {
            Category.create.mockResolvedValue(mockCategory);

            const result = await addCategory(mockCategoryData);

            expect(result).toEqual(mockCategory);
            expect(Category.create).toHaveBeenCalledWith(mockCategoryData);
        });

        test('should throw an error if there is an issue', async () => {
            const error = new Error('Some error');
            Category.create.mockRejectedValue(error);

            await expect(addCategory(mockCategoryData)).rejects.toThrow('Some error');
        });
    });

    describe('getCategories', () => {
        test('should get categories successfully', async () => {
            Category.find.mockResolvedValue([mockCategory]);

            const result = await getCategories();

            expect(result).toEqual([mockCategory]);
            expect(Category.find).toHaveBeenCalledWith({});
        });

        test('should throw an error if there is an issue', async () => {
            const error = new Error('Some error');
            Category.find.mockRejectedValue(error);

            await expect(getCategories()).rejects.toThrow('Some error');
        });
    });

    describe('getProductsBySubCategory', () => {
        test('should get products by subcategory successfully', async () => {
            Category.findOne.mockResolvedValue(mockCategory);
            Product.find.mockResolvedValue([mockProduct]);

            const result = await getProductsBySubCategory('Electronics');

            expect(result).toEqual([mockProduct]);
            expect(Category.findOne).toHaveBeenCalledWith({ name: 'Electronics' });
            expect(Product.find).toHaveBeenCalledWith({ categoryId: mockCategory._id });
        });

        test('should throw an error if no products are found', async () => {
            Category.findOne.mockResolvedValue(mockCategory);
            Product.find.mockResolvedValue([]);

            await expect(getProductsBySubCategory('Electronics')).rejects.toThrow(responseMessage.productNotFound);
        });

        test('should throw an error if there is an issue', async () => {
            const error = new Error('Some error');
            Category.findOne.mockRejectedValue(error);

            await expect(getProductsBySubCategory('Electronics')).rejects.toThrow('Some error');
        });
    });
    
    describe('Category Service Tests', () => {
        describe('getProductsBySubCategory', () => {
            test('should get products by subcategory successfully', async () => {
                Category.findOne.mockResolvedValue(mockCategory);
                Product.find.mockResolvedValue([mockProduct]);
    
                const result = await getProductsBySubCategory('Electronics');
    
                expect(result).toEqual([mockProduct]);
                expect(Category.findOne).toHaveBeenCalledWith({ name: 'Electronics' });
                expect(Product.find).toHaveBeenCalledWith({ categoryId: mockCategory._id });
            });
    
            test('should throw an error if no category is found', async () => {
                Category.findOne.mockResolvedValue(null);
    
                await expect(getProductsBySubCategory('Electronics')).rejects.toThrow(responseMessage.productNotFound);
            });
    
            test('should throw an error if no products are found', async () => {
                Category.findOne.mockResolvedValue(mockCategory);
                Product.find.mockResolvedValue([]);
    
                await expect(getProductsBySubCategory('Electronics')).rejects.toThrow(responseMessage.productNotFound);
            });
    
            test('should throw an error if there is an issue', async () => {
                const error = new Error('Some error');
                Category.findOne.mockRejectedValue(error);
    
                await expect(getProductsBySubCategory('Electronics')).rejects.toThrow('Some error');
            });
        });
    });
    
});
