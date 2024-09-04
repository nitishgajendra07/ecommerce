const { responseMessage } = require("../constants");
const { User } = require("../models/user.model");

async function adminAuthorize(req, res, next) {
    try {
        console.log("entered adminAuth");
        
        const admin = await User.findById(req.body.userIdFromAuth);
        if (!admin.isAdmin) {
            return next({ statusCode: 400, message: responseMessage.notAnAdmin });
        }
        console.log("exiting adminAuth");
        next();
    } catch (error) {
        return next({ statusCode: 500, message: responseMessage.internalServerError })
    }
}

module.exports = { adminAuthorize }