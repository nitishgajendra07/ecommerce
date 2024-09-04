const { addProductVariation } = require('../../src/services/productVariation.service');
const { Product } = require('../../src/models/product.model');
const { ProductVariation } = require('../../src/models/productVariation.model');
const { deletePhoto } = require('../../src/utils/utils');
const { mockProduct, mockNewVariation, mockProductVariation } = require('../testData/servicesData/productVariation.service.testData');

jest.mock('../../src/models/product.model');
jest.mock('../../src/models/productVariation.model');
jest.mock('../../src/utils/utils');

describe('ProductVariation Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should add a new product variation when no existing variation found', async () => {
        mockProduct.save = jest.fn();

        const body = {
            mainProduct: mockProduct,
            newVariation: JSON.stringify(mockNewVariation),
            variantImage: mockNewVariation.variantImage,
        };

        const parsedNewVariation = {
            price: 10,
            stockQuantity: 100,
            attributes: [{ attributeOption: 'Color', attributeValue: 'Red' }],
            variantImage: 'variationImage.jpg'
        };

        ProductVariation.findOne.mockResolvedValue(null);
        ProductVariation.create.mockResolvedValue({ _id: 'mockVariationId', variation: parsedNewVariation });
        Product.findById.mockResolvedValue(mockProduct);

        const result = await addProductVariation(body);

        expect(ProductVariation.findOne).toHaveBeenCalledWith({
            productId: mockProduct._id,
            'variation.price': 10,
            'variation.attributes': { $all: [{ attributeOption: 'Color', attributeValue: 'Red' }] }
        });
        expect(ProductVariation.create).toHaveBeenCalledWith({
            productId: mockProduct._id,
            variation: parsedNewVariation
        });
        // expect(Product.findById).toHaveBeenCalledWith(mockProduct._id);
        // expect(deletePhoto).not.toHaveBeenCalled();
        // expect(result).toEqual({ _id: 'mockVariationId', variation: parsedNewVariation });
        // expect(mockProduct.save).toHaveBeenCalled(); 
    });
});
