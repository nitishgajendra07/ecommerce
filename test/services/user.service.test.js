const { signupUser, signinUser, updateUser, changePassword } = require('../../src/services/user.service.js');
const { User } = require('../../src/models/user.model.js');
const { responseMessage } = require('../../src/constants.js');
const { userSignupRequestBody, userSigninRequestBody, updateUserRequestBody, changePasswordRequestBody } = require('../testData/controllersData/user.controller.testData.js');

jest.mock('../../src/models/user.model.js');

describe('User Service Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('signupUser', () => {
        const body = userSignupRequestBody

        test('should create a new user if user does not exist', async () => {
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue({ id: 'user123', ...body })

            const result = await signupUser(body);
            expect(User.findOne).toHaveBeenCalledWith({ $or: [{ username: body.username }, { email: body.email }, { phoneNo: body.phoneNo }] });
            expect(User.create).toHaveBeenCalledWith(body)
            expect(result).toEqual({ id: 'user123', ...body })
        });

        test('should throw an error if user already exists', async () => {
            User.findOne.mockResolvedValue({ id: 'existingUser' })

            await expect(signupUser(body)).rejects.toThrow(responseMessage.userAlreadyExists)


            expect(User.findOne).toHaveBeenCalledWith({ $or: [{ username: body.username }, { email: body.email }, { phoneNo: body.phoneNo }] })
            expect(User.create).not.toHaveBeenCalled();
        });
    });

    describe('signinUser', () => {
        const body = userSigninRequestBody;

        test('should return access token if credentials are valid', async () => {
            const mockUser = {
                isPasswordCorrect: jest.fn().mockResolvedValue(true),
                generateAccessToken: jest.fn().mockReturnValue('mockAccessToken')
            };
            User.findOne.mockResolvedValue(mockUser);



            const result = await signinUser(body);


            expect(User.findOne).toHaveBeenCalledWith({ $or: [{ username: body.username }, { email: body.email }] });
            expect(mockUser.isPasswordCorrect).toHaveBeenCalledWith(body.password)
            expect(mockUser.generateAccessToken).toHaveBeenCalled()
            expect(result).toEqual('mockAccessToken');
        });

        test('should throw an error if user is not registered', async () => {
            User.findOne.mockResolvedValue(null);

            await expect(signinUser(body)).rejects.toThrow(responseMessage.userNotRegistered)


            expect(User.findOne).toHaveBeenCalledWith({ $or: [{ username: body.username }, { email: body.email }] });
        });

        test('should throw an error if password is incorrect', async () => {
            const mockUser = {
                isPasswordCorrect: jest.fn().mockResolvedValue(false)
            };
            User.findOne.mockResolvedValue(mockUser)

            await expect(signinUser(body)).rejects.toThrow(responseMessage.invalidCredentials)

            expect(User.findOne).toHaveBeenCalledWith({ $or: [{ username: body.username }, { email: body.email }] });
            expect(mockUser.isPasswordCorrect).toHaveBeenCalledWith(body.password);
        });
    });

    describe('updateUser', () => {

        const body = updateUserRequestBody;

        test('should update user details', async () => {
            const mockSelect = jest.fn().mockResolvedValue({ id: 'user123', fullName: 'John Doe', age: 30 })
            User.findByIdAndUpdate.mockReturnValue({ select: mockSelect })

            const result = await updateUser(body);

            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
                body.userIdFromAuth,
                { $set: { fullName: body.fullName, age: body.age } },
                { new: true }
            );
            expect(mockSelect).toHaveBeenCalledWith('-password')
            expect(result).toEqual({ id: 'user123', fullName: 'John Doe', age: 30 })
        });
    });

    describe('changePassword', () => {

        const body = changePasswordRequestBody;

        test('should change user password if old password is correct', async () => {
            const mockUser = {
                isPasswordCorrect: jest.fn().mockResolvedValue(true),
                save: jest.fn()
            };
            User.findById.mockResolvedValue(mockUser)


            await changePassword(body);

            expect(User.findById).toHaveBeenCalledWith(body.userIdFromAuth)
            expect(mockUser.isPasswordCorrect).toHaveBeenCalledWith(body.oldPassword);
            expect(mockUser.password).toBe(body.newPassword)
            expect(mockUser.save).toHaveBeenCalled();
        });

        test('should throw an error if old password is incorrect', async () => {

            const mockUser = {
                isPasswordCorrect: jest.fn().mockResolvedValue(false)
            };


            User.findById.mockResolvedValue(mockUser);

            await expect(changePassword(body)).rejects.toThrow(responseMessage.invalidCredentials)

            expect(User.findById).toHaveBeenCalledWith(body.userIdFromAuth)
            expect(mockUser.isPasswordCorrect).toHaveBeenCalledWith(body.oldPassword)
        });
    });
});
