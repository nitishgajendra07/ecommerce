const { responseMessage } = require("../constants");
const { Category } = require("../models/category.model");
const { Product } = require("../models/product.model");

async function addCategory(body) {
    try {
        const { name, description, categoryImage, parentCategory } = body;
        const newCategory = await Category.create({
            name,
            description,
            categoryImage,
            parentCategory,
        });
        return newCategory;
    } catch (error) {
        throw error;
    }
}

async function getCategories() {
    try {
        const categories = await Category.find({});
        console.log(categories);
        return categories;
    } catch (error) {
        throw error;
    }
}

async function getSubCategories(categoryName) {
    try {
        if (!categoryName) {
            throw new Error(responseMessage.missingRequiredFields);
        }
        const parentCategory = await Category.findOne({ name: categoryName });
        const subCategories = await Category.find({ parentCategory: parentCategory._id });
        return subCategories;
    } catch (error) {
        throw error;
    }
}


async function getProductsBySubCategory(categoryName) {
    try {
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            throw new Error(responseMessage.productNotFound);
        }
        const products = await Product.find({ categoryId: category._id });
        if (products.length === 0) {
            throw new Error(responseMessage.productNotFound)
        }
        return products;
    } catch (error) {
        throw error;
    }
}

module.exports = { addCategory, getCategories, getSubCategories, getProductsBySubCategory }