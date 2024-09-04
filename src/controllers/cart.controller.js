const { responseMessage } = require("../constants");
const { getCart, removeFromCart, addToCart } = require("../services/cart.service");

async function addToCartController(req, res, next) {
    try {
        const cart = await addToCart(req.body);
        res.status(200).json({ success: true, cart });
    } catch (error) {
        if (error.message === responseMessage.invalidProductName || error.message === responseMessage.invalidProductVariation) {
            return next({ statusCode: 400, message: error.message });
        }
        else {
            console.log(error);
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }
    }
}

async function getCartController(req, res, next) {
    try {
        const cart = await getCart(req.body);
        res.status(200).json({ cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: responseMessage.internalServerError })
    }
}

async function removeFromCartController(req, res, next) {
    try {
        const cart = await removeFromCart(req.body);
        res.status(200).json({ success: true });
    } catch (error) {
        if (error.message === responseMessage.invalidProductName || error.message === responseMessage.invalidProductVariation) {
            return next({ statusCode: 400, message: error.message });
        }
        else {
            console.log(error);
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }
    }
}

module.exports = { addToCartController, getCartController, removeFromCartController }