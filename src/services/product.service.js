const { responseMessage } = require("../constants");
const { Category } = require("../models/category.model");
const { Product } = require("../models/product.model");
const { ProductVariation } = require("../models/productVariation.model");
const { createSlug } = require("../utils/utils");

async function addProduct(body) {
    try {
        console.log("body", body);
        const { name, description, categoryName, variation, variantImage } = body;
        console.log("variation", variation);

        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            throw new Error(responseMessage.invalidCategoryName)
        }

        const categoryId = category._id;

        let parsedVariation = JSON.parse(variation);
        if (Array.isArray(parsedVariation) && parsedVariation.length > 1) {
            throw new Error(responseMessage.oneVariantAtATimeError);
        }
        parsedVariation.variantImage = variantImage;
        const newProduct = await Product.create({
            name,
            description,
            categoryId,
            productImage: variantImage,
            variations: [parsedVariation]
        });

        return newProduct;

    } catch (error) {
        throw error;
    }
}

async function addToProductVariationCollection(product) {
    try {
        const { _id: productId, variations } = product;
        variations.forEach(async (variation) => {
            const productVariation = await ProductVariation.create({
                productId,
                variation
            });
        });
    } catch (error) {
        console.log(error);
    }
}

async function getAllProducts() {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            throw new Error(responseMessage.productNotFound)
        }
        return products;
    } catch (error) {
        throw error;
    }
}

async function deleteProduct(productName) {
    try {

        let product = await Product.findOne({ name: productName })
        if (!product) {
            throw new Error(responseMessage.productNotFound)
        }
        console.log("product", product);
        console.log("here", product instanceof Product);
        product = await product.deleteOne();
        return product;
    } catch (error) {
        throw error;
    }
}


module.exports = { addProduct, getAllProducts, deleteProduct, addToProductVariationCollection };