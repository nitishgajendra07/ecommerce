const mockReview = {
    username: 'mockUser',
    userId: 'mockUserId',
    productId: 'mockProductId',
    rating: 5,
    content: 'Great product!'
};

const mockReviewResponse = {
    _id: 'mockReviewId',
    ...mockReview,
    createdAt: new Date(),
    updatedAt: new Date()
};

const mockUser = {
    _id: 'mockUserId',
    username: 'mockUser'
};

const mockProduct = {
    _id: 'mockProductId',
    name: 'mockProduct'
};

const mockDeleteReview = {
    review: mockReviewResponse
};



module.exports = {
    mockReview,
    mockReviewResponse,
    mockUser,
    mockProduct,
    mockDeleteReview
};
