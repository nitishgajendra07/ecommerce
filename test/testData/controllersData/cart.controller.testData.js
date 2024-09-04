const mockProduct = {
    _id: 'mockProductId',
    name: 'mockProductName',
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

const mockCart = {
    _id: 'mockCartId',
    userId: 'mockUserId',
    activeCartItems: [
        {
            productVariationId: 'mockProductVariationId',
            quantity: 1
        }
    ]
};


module.exports = {
    mockProduct,
    mockProductVariation,
    mockCart
};
