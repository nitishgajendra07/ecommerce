const { responseMessage } = require("../constants");
const { User } = require("../models/user.model");

async function makeNewAdmin(body) {
    try {
        const { username, email } = body;
        if (!(username || email)) {
            throw new Error(responseMessage.missingRequiredFields)
        }
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            throw new Error(responseMessage.userNotFound);
        }
        user.isAdmin = true;
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }

}

async function removeAdmin(body) {
    try {
        const { username, email } = body;
        if (!(username || email)) {
            throw new Error(responseMessage.missingRequiredFields)
        }
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            throw new Error(responseMessage.userNotFound);
        }
        user.isAdmin = false;
        await user.save();
        return user;

    } catch (error) {
        throw error;
    }
}

async function getAllNormalUsers() {
    try {
        const users = await User.find({ isAdmin: false });

        return users;
    } catch (error) {
        throw error;
    }
}

module.exports = { makeNewAdmin, removeAdmin, getAllNormalUsers }