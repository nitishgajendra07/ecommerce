const mockCategoryData = {
    name: "Electronics",
    description: "All electronic items",
    categoryImage: "image.jpg",
    parentCategory: null
};

const mockCategory = {
    _id: "categoryId123",
    ...mockCategoryData,
    save: jest.fn()
};

const mockProduct = {
    _id: 'productId123',
    name: 'Smartphone',
    description: 'A smart phone',
    categoryId: 'categoryId123',
    save: jest.fn()
};

const mockCategoryService = {
    addCategory: jest.fn(),
    getCategories: jest.fn(),
    getSubCategories: jest.fn(),
    getProductsBySubCategory: jest.fn()
};

const customErrorMessage = {
    validationError: 'ValidationError'
};

const responseMessage = {
    internalServerError: 'internal server error',
    missingRequiredFields: 'Missing required fields',
    productNotFound: 'Product not found'
};



module.exports = {
    mockCategory,
    mockCategoryData,
    mockProduct,
    mockCategoryService,
    customErrorMessage,
    responseMessage,
};
