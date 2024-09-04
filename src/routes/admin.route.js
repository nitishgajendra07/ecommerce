const express = require('express');
const { userAuthenticate } = require('../middlewares/userAuthenticate.middleware');
const { adminAuthorize } = require('../middlewares/adminAuthenticate.middleware');
const { makeNewAdminController, removeAdminController, getAllNormalUsersController } = require('../controllers/admin.controller');

const adminRouter = express.Router();

adminRouter.route('/makeAdmin')
    .post(userAuthenticate, adminAuthorize, makeNewAdminController)

adminRouter.route('/removeAdmin')
    .post(userAuthenticate, adminAuthorize, removeAdminController)

adminRouter.route('/users')
    .get(userAuthenticate, adminAuthorize, getAllNormalUsersController)

module.exports = { adminRouter }