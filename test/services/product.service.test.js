// test/services/product.service.test.js
const { addProduct, getAllProducts, deleteProduct } = require('../../src/services/product.service');
const { Product } = require('../../src/models/product.model');
const { Category } = require('../../src/models/category.model');
const { ProductVariation } = require('../../src/models/productVariation.model');
const { mockProduct, mockCategory, mockProductVariation } = require('../testData/servicesData/product.service.testData');

jest.mock('../../src/models/product.model');
jest.mock('../../src/models/category.model');
jest.mock('../../src/models/productVariation.model');

describe("Product Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("addProduct", () => {
        test("should add a new product", async () => {
            Product.create.mockResolvedValue(mockProduct);
            Category.findOne.mockResolvedValue(mockCategory);

            const body = {
                name: mockProduct.name,
                description: mockProduct.description,
                categoryName: mockCategory.name,
                variation: JSON.stringify(mockProductVariation.variation),
                variantImage: mockProduct.productImage
            };

            // Increase the timeout value for this test case to 10 seconds (10000 ms)
            jest.setTimeout(10000);

            await expect(addProduct(body)).resolves.not.toThrowError();

            expect(Product.create).toHaveBeenCalledWith({
                name: mockProduct.name,
                description: mockProduct.description,
                categoryId: mockCategory._id,
                productImage: mockProduct.productImage,
                variations: [mockProductVariation.variation]
            });
        }, 10000); // Set timeout for this specific test case
    });

    describe("getAllProducts", () => {
        test("should return all products", async () => {
            Product.find.mockResolvedValue([mockProduct]);

            await expect(getAllProducts()).resolves.toEqual([mockProduct]);

            expect(Product.find).toHaveBeenCalled();
        });
    });

    describe("deleteProduct", () => {
        test("should delete a product", async () => {
            const mockProductInstance = {
                ...mockProduct,
                deleteOne: jest.fn().mockResolvedValue({})
            };

            Product.findOne.mockResolvedValue(mockProductInstance);

            await expect(deleteProduct(mockProduct.name)).resolves.toEqual({});

            expect(Product.findOne).toHaveBeenCalledWith({ name: mockProduct.name });
            expect(mockProductInstance.deleteOne).toHaveBeenCalled();
        });
    });
});
