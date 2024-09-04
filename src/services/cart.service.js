const { default: mongoose } = require("mongoose");
const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");
const { ProductVariation } = require("../models/productVariation.model");
const { responseMessage } = require("../constants");

async function addToCart(body) {
    try {
        const { productName, chosenVariation, userIdFromAuth } = body;
        const productId = await Product.findOne({ name: productName }, {});
        if (!productId) {
            throw new Error(responseMessage.invalidProductName);
        }
        const productVariation = await ProductVariation.findOne({ productId, variation: chosenVariation });
        if (!productVariation) {
            throw new Error(responseMessage.invalidProductVariation)
        }
        const productVariationId = productVariation._id;
        let cart = await Cart.findOne({ userId: userIdFromAuth });
        if (cart) {
            let existingProductVariationInCart = false
            cart.activeCartItems.forEach((cartItem) => {
                if (JSON.stringify(cartItem.productVariationId) === JSON.stringify(productVariationId)) {
                    existingProductVariationInCart = true;
                    cartItem.quantity += 1;
                }
            })
            if (!existingProductVariationInCart) {
                cart.activeCartItems.push({ productVariationId });
            }
            cart = await cart.save();
        }
        else {
            cart = await Cart.create({
                userId: userIdFromAuth,
                activeCartItems: [
                    { productVariationId }
                ]
            })
        }
        return cart;
    } catch (error) {
        throw error;
    }
}

async function getCart(body) {
    try {
        const { userIdFromAuth: userId } = body;
        const cart = await Cart.findOne({ userId }).populate({ path: "activeCartItems.productVariationId" });
        return cart;
    } catch (error) {
        throw error;
    }
}

async function removeFromCart(body) {
    try {
        const { productName, chosenVariation, userIdFromAuth } = body;
        const productId = await Product.findOne({ name: productName }, {});
        if (!productId) {
            throw new Error(responseMessage.invalidProductName)
        }
        const productVariation = await ProductVariation.findOne({ productId, variation: chosenVariation });
        if (!productVariation) {
            throw new Error(responseMessage.invalidProductVariation)
        }
        const productVariationId = productVariation._id;
        const cart = await Cart.findOne({ userId: userIdFromAuth });
        const index = cart.activeCartItems.findIndex(activeCartItem => {
            return activeCartItem.productVariationId.toString() === productVariationId.toString()
        });
        if (index !== -1) {
            cart.activeCartItems.splice(index, 1);
            await cart.save();
        }
        return cart;
    } catch (error) {
        throw error;
    }
}

module.exports = { addToCart, getCart, removeFromCart }