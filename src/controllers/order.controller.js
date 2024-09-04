const { responseMessage } = require("../constants");
const { placeOrder, getOrdersOfUser, cancelOrder } = require("../services/order.service");

async function placeOrderController(req, res) {
    try {
        const order = await placeOrder(req.body)
        res.status(200).json({ success: true, order });
    } catch (error) {
        if (error.message === responseMessage.invalidAddressId || error.message === responseMessage.invalidProductName || error.message === responseMessage.invalidProductVariation || error.message === responseMessage.invalidCartId) {
            res.status(400).json({ error: error.message });
        }
        else {
            console.log(error);
            res.status(500).json({ error: responseMessage.internalServerError });
        }
    }
}

async function getOrdersOfUserController(req, res) {
    try {
        const orders = await getOrdersOfUser(req.body);
        res.status(200).json({ orders })
    } catch (error) {
        res.status(500).json({ error: responseMessage.internalServerError });
    }
}

async function cancelOrderController(req, res) {
    try {
        const cancelledOrder = await cancelOrder(req.body);
        res.status(200).json({ success: true, cancelledOrder });
    } catch (error) {
        if (error.message === responseMessage.missingRequiredFields) {
            res.status(400).json(error.message)
        }
        else {
            res.status(500).json({ error: responseMessage.internalServerError });
        }
    }
}

module.exports = { placeOrderController, getOrdersOfUserController, cancelOrderController }