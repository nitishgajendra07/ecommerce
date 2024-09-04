const { signupUser, signinUser, updateUser, changePassword } = require("../services/user.service");
const { responseMessage, tokens } = require("../constants");


async function signupController(req, res, next) {
    try {
        const user = await signupUser(req.body);
        res.status(201).json({ success: true, message: responseMessage.registrationSuccess });
    } catch (error) {
        console.log(error);
        if (error.message === responseMessage.userAlreadyExists) {
            return next({ statusCode: 400, message: error.message });
        }
        else {
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }
    }
}

async function signinController(req, res, next) {
    try {
        const accessToken = await signinUser(req.body);
        res.status(200)
            .cookie(tokens.accessToken, accessToken, { httpOnly: true })
            .json({ success: true, accessToken });
    } catch (error) {
        console.log(error);
        if (error.message === responseMessage.missingRequiredFields || error.message === responseMessage.userNotRegistered || error.message === responseMessage.invalidCredentials) {
            return next({ statusCode: 400, message: error.message });
        }
        else {
            res.status(500).json({ error: responseMessage.internalServerError });
        }

    }
}

async function logoutUserController(req, res) {
    res.status(200)
        .clearCookie(tokens.accessToken, { httpOnly: true })
        .json({ message: responseMessage.logoutSuccess });
}

async function updateUserController(req, res, next) {
    try {
        const updatedUser = await updateUser(req.body);
        res.status(200).json({ success: true, updatedUser })
    } catch (error) {
        if (error.message === responseMessage.validationError) {
            return next({ statusCode: 400, message: responseMessage.validationError });
        }
        else {
            console.log("updateController", error);
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }
    }
}

async function changePasswordController(req, res, next) {
    try {
        await changePassword(req.body)
        res.status(200).json({ message: responseMessage.passwordChangeSuccess })
    } catch (error) {
        if (error.message === responseMessage.invalidCredentials) {
            return next({ statusCode: 400, message: responseMessage.invalidCredentials });
        }
        else {
            console.log(error);
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }
    }
}

module.exports = { signupController, signinController, updateUserController, logoutUserController, changePasswordController }