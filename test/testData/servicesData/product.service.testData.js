// test/testData/product.service.testData.js
const mockProduct = {
    _id: 'mockProductId',
    name: 'Mock Product',
    description: 'Mock Product Description',
    categoryId: 'mockCategoryId',
    productImage: 'mockImageURL',
    variations: [
        {
            attribute: [
                {
                    attributeName: 'color',
                    attributeValue: 'black',
                },
            ],
            price: 1000,
            stockQuantity: 10,
            variantImage: 'mockImageURL',
        },
    ],
};

const mockCategory = {
    _id: 'mockCategoryId',
    name: 'Mock Category',
};

const mockProductVariation = {
    variation: {
        attribute: [
            {
                attributeName: 'color',
                attributeValue: 'black',
            },
        ],
        price: 1000,
        stockQuantity: 10,
        variantImage: 'mockImageURL',
    },
};

module.exports = {
    mockProduct,
    mockCategory,
    mockProductVariation,
};
