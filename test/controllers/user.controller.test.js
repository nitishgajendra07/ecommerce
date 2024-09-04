const { signupController, signinController, logoutUserController, updateUserController, changePasswordController } = require('../../src/controllers/user.controller.js');
const { signupUser, signinUser, updateUser, changePassword } = require('../../src/services/user.service.js');
const { userSignupRequestBody, userSigninRequestBody, updateUserRequestBody, mockUpdatedUser, changePasswordRequestBody } = require('../testData/controllersData/user.controller.testData.js');
const { responseMessage, tokens } = require('../../src/constants.js');

jest.mock('../../src/services/user.service.js');

describe('signupController', () => {
    let req, res, next;
    beforeEach(() => {
        req = {
            body: userSignupRequestBody
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    test('should return 201 and success message when user is created successfully', async () => {

        signupUser.mockResolvedValue({ id: 1, ...req.body });
        await signupController(req, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: responseMessage.registrationSuccess
        });
    });

    test('should call next with 400 and user already exists message if user already exists', async () => {
        signupUser.mockRejectedValue(new Error(responseMessage.userAlreadyExists));
        await signupController(req, res, next);
        expect(next).toHaveBeenCalledWith({
            statusCode: 400,
            message: responseMessage.userAlreadyExists
        });
    });

    test('should call next with 500 and internal server error message for other errors', async () => {
        signupUser.mockRejectedValue(new Error('Some other error'));
        await signupController(req, res, next);
        
        expect(next).toHaveBeenCalledWith({
            statusCode: 500,
            message: responseMessage.internalServerError
        });
    });
});


describe('signinController', () => {
    let req, res, next;
    beforeEach(() => {
        req = {
            body: userSigninRequestBody
        };
        res = {
            status: jest.fn().mockReturnThis(),
            cookie: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    test('should return 200 and access token when signin is successful', async () => {
        const mockAccessToken = 'mockAccessToken';
        signinUser.mockResolvedValue(mockAccessToken);
        await signinController(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.cookie).toHaveBeenCalledWith(tokens.accessToken, mockAccessToken, { httpOnly: true });
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            accessToken: mockAccessToken
        });
    });

    test('should call next with 400 and missing required fields message', async () => {
        const error = new Error(responseMessage.missingRequiredFields);
        signinUser.mockRejectedValue(error);
        await signinController(req, res, next);
        expect(next).toHaveBeenCalledWith({
            statusCode: 400,
            message: responseMessage.missingRequiredFields
        });
    });

    test('should call next with 400 and user not registered message', async () => {

        const error = new Error(responseMessage.userNotRegistered);
        signinUser.mockRejectedValue(error);
        await signinController(req, res, next);

        expect(next).toHaveBeenCalledWith({
            statusCode: 400,
            message: responseMessage.userNotRegistered
        });
    });

    test('should call next with 400 and invalid credentials message', async () => {
        const error = new Error(responseMessage.invalidCredentials);
        signinUser.mockRejectedValue(error);
        await signinController(req, res, next);


        expect(next).toHaveBeenCalledWith({
            statusCode: 400,
            message: responseMessage.invalidCredentials
        });
    });

    test('should return 500 and internal server error message for other errors', async () => {
        const error = new Error('Some other error');
        signinUser.mockRejectedValue(error);
        await signinController(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: responseMessage.internalServerError
        });
    });
});

describe('logoutUserController', () => {
    let req, res, next;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            clearCookie: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    test('should return 200 and success message when user is logged out successfully', async () => {
        await logoutUserController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.clearCookie).toHaveBeenCalledWith(tokens.accessToken, { httpOnly: true });
        expect(res.json).toHaveBeenCalledWith({
            message: responseMessage.logoutSuccess
        });
    });
});

describe('updateUserController', () => {
    let req, res, next;
    beforeEach(() => {
        req = {
            body: updateUserRequestBody
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    test('should return 200 and updated user when update is successful', async () => {

        updateUser.mockResolvedValue(mockUpdatedUser);
        await updateUserController(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            updatedUser: mockUpdatedUser
        });
    });

    test('should call next with 400 and validation error message if there is a validation error', async () => {
        const error = new Error(responseMessage.validationError);
        updateUser.mockRejectedValue(error);
        await updateUserController(req, res, next);
        expect(next).toHaveBeenCalledWith({
            statusCode: 400,
            message: responseMessage.validationError
        });
    });

    test('should call next with 500 and internal server error message for other errors', async () => {
        const error = new Error('Some other error');
        updateUser.mockRejectedValue(error);
        await updateUserController(req, res, next);
        expect(next).toHaveBeenCalledWith({
            statusCode: 500,
            message: responseMessage.internalServerError
        });
    });
});


describe('changePasswordController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: changePasswordRequestBody
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    test('should return 200 and success message when password is changed successfully', async () => {
        changePassword.mockResolvedValue();
        await changePasswordController(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            message: responseMessage.passwordChangeSuccess
        });
    });

    test('should call next with 400 and invalid credentials message if old password is incorrect', async () => {
        const error = new Error(responseMessage.invalidCredentials);
        changePassword.mockRejectedValue(error);
        await changePasswordController(req, res, next);

        expect(next).toHaveBeenCalledWith({
            statusCode: 400,
            message: responseMessage.invalidCredentials
        });
    });

    test('should call next with 500 and internal server error message for other errors', async () => {

        const error = new Error('Some other error');
        changePassword.mockRejectedValue(error);
        await changePasswordController(req, res, next);
        expect(next).toHaveBeenCalledWith({
            statusCode: 500,
            message: responseMessage.internalServerError
        });
    });
});
