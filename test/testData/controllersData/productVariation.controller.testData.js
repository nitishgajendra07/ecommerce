const mockProduct = {
    _id: 'mockProductId',
    name: 'mockProductName',
    variations: []
};

const mockProductVariation = {
    _id: 'mockProductVariationId',
    productId: 'mockProductId',
    variation: {
        attributes: [{ attributeOption: 'color', attributeValue: 'black' }],
        price: 1000,
        stockQuantity: 10,
        variantImage: 'image-url'
    }
};

const mockProductData = {
    mainProduct: mockProduct,
    newVariation: JSON.stringify(mockProductVariation.variation),
    variantImage: 'new-image-url'
};

const mockRequest = {
    body: mockProductData
};

const mockNewVariation = JSON.stringify({
    attributes: [{ attributeOption: 'color', attributeValue: 'black' }],
    price: 1000,
    stockQuantity: 5,
    variantImage: 'new-image-url'
});


const mockNewAttributes = JSON.stringify([{ attributeOption: 'color', attributeValue: 'blue' }]);



module.exports = {
    mockProduct,
    mockProductVariation,
    mockProductData,
    mockRequest,
    mockNewVariation,
    mockNewAttributes
};
