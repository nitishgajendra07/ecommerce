const { responseMessage } = require("../constants");
const { Address } = require("../models/address.model");
const Cart = require("../models/cart.model");
const { Order } = require("../models/order.model");
const { Product } = require("../models/product.model");
const { ProductVariation } = require("../models/productVariation.model");

async function placeOrder(body) {
    try {
        const { addressId, userIdFromAuth: userId, cartId, productVariationId, quantity } = body;
        const validAddress = await Address.findOne({ userId });
        if (!validAddress) {
            throw new Error(responseMessage.invalidAddressId);
        }
        let order;
        if (cartId) {
            const cart = await Cart.findOne({ _id: cartId });
            if (!cart) {
                throw new Error(responseMessage.invalidCartId);
            }
            order = await Order.create({
                userId,
                productsOrdered: cart.cartItems,
                addressId
            });
            await cart.deleteOne();
        }
        else if (productVariationId) {
            const productVariation = await ProductVariation.findById(productVariationId);
            if (!productVariation) {
                throw new Error(responseMessage.invalidProductVariation);
            }

            order = await Order.create({
                userId,
                productsOrdered: [{ productVariationId: productVariation._id, quantity }],
                addressId
            })
        };
        return order;
    } catch (error) {
        throw error;
    }
}

async function getOrdersOfUser(body) {
    try {
        const { userIdFromAuth } = body;
        const orders = Order.find({ userId: userIdFromAuth });
        return orders;
    } catch (error) {
        throw error;
    }
}

async function cancelOrder(body) {
    try {
        const { orderId } = body;
        if (!orderId) {
            throw new Error(responseMessage.missingRequiredFields);
        }
        const order = await Order.deleteOne({ _id: orderId });
    } catch (error) {
        throw error;
    }
}

module.exports = { placeOrder, getOrdersOfUser, cancelOrder }