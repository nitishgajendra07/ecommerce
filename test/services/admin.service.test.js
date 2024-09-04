const { makeNewAdmin, removeAdmin, getAllNormalUsers } = require('../../src/services/admin.service');
const { User } = require('../../src/models/user.model');
const { responseMessage } = require('../../src/constants');
const { reqBody, mockUserAdmin, mockUserNormal, mockUsersList } = require('../testData/controllersData/admin.controller.testData');

jest.mock('../../src/models/user.model');

describe('Admin Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('makeNewAdmin', () => {
        test('should make a user an admin successfully', async () => {
            User.findOne.mockResolvedValue(mockUserNormal)

            const result = await makeNewAdmin({ username: 'punithraj' })

            expect(User.findOne).toHaveBeenCalledWith({ $or: [{ email: undefined }, { username: 'punithraj' }] })
            expect(mockUserNormal.isAdmin).toBe(true)
            expect(mockUserNormal.save).toHaveBeenCalled()
            expect(result).toBe(mockUserNormal)
        });

        test('should throw an error if no username or email is provided', async () => {
            await expect(makeNewAdmin({})).rejects.toThrow(responseMessage.missingRequiredFields);
        });

        test('should throw an error if the user is not found', async () => {
            User.findOne.mockResolvedValue(null);

            await expect(makeNewAdmin({ username: 'punithraj' })).rejects.toThrow(responseMessage.userNotFound);
        });
    });

    describe('removeAdmin', () => {
        test('should remove admin role from a user successfully', async () => {
            User.findOne.mockResolvedValue(mockUserAdmin);
            const result = await removeAdmin({ username: 'punithraj' })

            expect(User.findOne).toHaveBeenCalledWith({ $or: [{ email: undefined }, { username: 'punithraj' }] })
            expect(mockUserAdmin.isAdmin).toBe(false);
            expect(mockUserAdmin.save).toHaveBeenCalled()
            expect(result).toBe(mockUserAdmin)
        });

        test('should throw an error if no username or email is provided', async () => {
            await expect(removeAdmin({})).rejects.toThrow(responseMessage.missingRequiredFields)
        });

        test('should throw an error if the user is not found', async () => {
            User.findOne.mockResolvedValue(null);

            await expect(removeAdmin({ username: 'punithraj' })).rejects.toThrow(responseMessage.userNotFound)
        });
    });

    describe('getAllNormalUsers', () => {
        test('should return all normal users successfully', async () => {
            User.find.mockResolvedValue(mockUsersList);

            const result = await getAllNormalUsers();

            expect(User.find).toHaveBeenCalledWith({ isAdmin: false });
            expect(result).toBe(mockUsersList);
        });

        test('should throw an error if something goes wrong', async () => {
            User.find.mockRejectedValue(new Error('Some error'));

            await expect(getAllNormalUsers()).rejects.toThrow('Some error');
        });
    });
});
