const { responseMessage } = require("../constants");
const { User } = require("../models/user.model");
const { makeNewAdmin, removeAdmin, getAllNormalUsers } = require("../services/admin.service");

async function makeNewAdminController(req, res) {
    try {
        const newAdmin = await makeNewAdmin(req.body);
        res.status(200).json({ message: responseMessage.newAdminSuccess, newAdmin });
    } catch (error) {
        if (error.message === responseMessage.userNotFound) {
            res.status(400).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: responseMessage.internalServerError })
        }
    }
}

async function removeAdminController(req, res) {
    try {
        const user = await removeAdmin(req.body);
        res.status(200).json({ message: responseMessage.removeAdminSuccess })
    } catch (error) {
        if (error.message === responseMessage.userNotFound) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: responseMessage.internalServerError })
        }
    }
}

async function getAllNormalUsersController(req, res) {
    try {
        const users = await getAllNormalUsers();
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ error: responseMessage.internalServerError });
    }
}

module.exports = { makeNewAdminController, removeAdminController, getAllNormalUsersController }