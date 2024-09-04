const mockCategory = {
    _id: 'category123',
    name: 'Electronics'
};

const mockProductData = {
    name: 'Laptop',
    description: 'High performance laptop',
    categoryName: 'Electronics',
    variation: JSON.stringify([{ attributes: [{ attributeOption: 'color', attributeValue: 'black' }], variantImage: 'image-url', price: 1000 }]),
    variantImage: 'image-url'
};

const mockProduct = {
    _id: 'product123',
    name: 'Laptop',
    description: 'High performance laptop',
    categoryId: 'category123',
    slug: 'laptop',
    productImage: 'image-url',
    rating: 4,
    numberOfReviews: 10,
    variations: [{ attributes: [{ attributeOption: 'color', attributeValue: 'black' }], variationSlug: 'laptop-black', variantImage: 'image-url', price: 1000, stockQuantity: 10 }]
};

const mockProductVariation = {
    _id: 'variation123',
    productId: 'product123',
    variation: { attributes: [{ attributeOption: 'color', attributeValue: 'black' }], variantImage: 'image-url', price: 1000 }
};

module.exports = { mockCategory, mockProductData, mockProduct, mockProductVariation };
