const { makeNewAdminController, removeAdminController, getAllNormalUsersController } = require('../../src/controllers/admin.controller');
const { makeNewAdmin, removeAdmin, getAllNormalUsers } = require('../../src/services/admin.service');
const { responseMessage } = require('../../src/constants');
const { reqBody, mockUserAdmin, mockUserNormal, mockUsersList } = require('../testData/controllersData/admin.controller.testData');

jest.mock('../../src/services/admin.service');

describe('Admin Controller Tests', () => {
    let req, res;

    beforeEach(() => {
        req = { body: reqBody };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('makeNewAdminController', () => {
        test('should return 200 and new admin when user is made admin successfully', async () => {
            makeNewAdmin.mockResolvedValue(mockUserAdmin);

            
            await makeNewAdminController(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: responseMessage.newAdminSuccess, newAdmin: mockUserAdmin });
        });

        test('should return 400 and user not found error when user is not found', async () => {

            makeNewAdmin.mockRejectedValue(new Error(responseMessage.userNotFound));

            await makeNewAdminController(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: responseMessage.userNotFound });
        });

        test('should return 500 and internal server error for other errors', async () => {

            makeNewAdmin.mockRejectedValue(new Error('Some other error'));

            await makeNewAdminController(req, res);


            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: responseMessage.internalServerError });
        });
    });

    describe('removeAdminController', () => {
        test('should return 200 and success message when admin is removed successfully', async () => {
            removeAdmin.mockResolvedValue(mockUserNormal);

            await removeAdminController(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: responseMessage.removeAdminSuccess });
        });

        test('should return 400 and user not found error when user is not found', async () => {
            removeAdmin.mockRejectedValue(new Error(responseMessage.userNotFound));

            await removeAdminController(req, res);


            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: responseMessage.userNotFound });
        });

        test('should return 500 and internal server error for other errors', async () => {
            removeAdmin.mockRejectedValue(new Error('Some other error'));


            await removeAdminController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: responseMessage.internalServerError });
        });
    });

    describe('getAllNormalUsersController', () => {

        test('should return 200 and list of normal users', async () => {
            getAllNormalUsers.mockResolvedValue(mockUsersList);


            await getAllNormalUsersController(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ users: mockUsersList });
        });

        test('should return 500 and internal server error for other errors', async () => {


            getAllNormalUsers.mockRejectedValue(new Error('Some other error'));



            await getAllNormalUsersController(req, res);



            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: responseMessage.internalServerError });
        });
    });
});
