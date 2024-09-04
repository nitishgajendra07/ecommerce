const { responseMessage } = require("../constants");
const { addToWishlist, removeFromWishlist } = require("../services/wishlist.service");

async function addToWishlistController(req, res, next) {
    try {
        const newItem = await addToWishlist(req.body);
        res.status(200).json({ success: true, newItem });
    } catch (error) {
        if (error.message === responseMessage.invalidProductVariation) {
            next({ statusCode: 400, message: error.message });
        }
        console.log(error);
        next({ statusCode: 500, message: responseMessage.internalServerError });
    }
}

async function removeFromWishListController(req, res, next) {
    try {
        const updatedWishlist = await removeFromWishlist(req.body);
        res.status(200).json({ success: true, updatedWishlist });
    } catch (error) {
        next({ statusCode: 500, message: responseMessage.internalServerError });
    }
}

module.exports = { addToWishlistController, removeFromWishListController }