const mockProduct = {
    _id: "mockProductId",
    name: "Mock Product",
    variations: [],
  };
  
  const mockNewVariation = {
    attributes: [{ attributeOption: "Color", attributeValue: "Red" }],
    variantImage: "variantImage.jpg",
    price: 10,
    stockQuantity: 100,
  };
  
  const mockProductVariation = {
    _id: "mockProductVariationId",
    productId: "mockProductId",
    variation: {
      attributes: [{ attributeOption: "Color", attributeValue: "Red" }],
      variantImage: "varianiontImage.jpg",
      price: 10,
      stockQuantity: 100,
    },
  };
  
  module.exports = {
    mockProduct,
    mockNewVariation,
    mockProductVariation,
  };
  