const mockNewItem = {
    userId: 'mockUserId',
    wishlistItems: ['mockProductVariationId']
};

const mockRemoveRequestBody = {
    userIdFromAuth: 'mockUserId',
    productVariationId: 'mockProductVariationId'
};

const mockAddRequestBody = {
    productVariationId: 'mockProductVariationId',
    userIdFromAuth: 'mockUserId'
};

const existingWishlistData = {
    userId: 'mockUserId',
    wishlistItems: ['mockProductVariationId']
};

const newWishlistData = {
    userId: 'mockUserId',
    wishlistItems: ['mockProductVariationId']
};

module.exports = {
    mockNewItem,
    mockRemoveRequestBody,
    mockAddRequestBody,
    existingWishlistData,
    newWishlistData
};
