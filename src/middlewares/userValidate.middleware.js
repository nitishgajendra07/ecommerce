const { responseMessage, customErrorMessage } = require("../constants");

const signupValidate = (req, res, next) => {
    const { fullName, username, age, phoneNo, email, password, profilePicture } = req.body;
    console.log(req.body);
    if (!fullName || !username || !age || !phoneNo || !email || !password) {
        console.log(req.body);
        return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
    }

    const phoneNoRegEx = /^\d{10}$/
    const emailRegEx = /^\S+@\S+\.\S+$/

    if (password.length < 4) {
        return next({ statusCode: 400, message: customErrorMessage.invalidPassword });
    }

    if (age < 1 || age > 150) {
        return next({ statusCode: 400, message: customErrorMessage.invalidAge });
    }

    if (!phoneNoRegEx.test(phoneNo)) {
        return next({ statusCode: 400, message: customErrorMessage.invalidPhoneNo });
    }

    if (!emailRegEx.test(email)) {
        return next({ statusCode: 400, message: customErrorMessage.invalidEmail });
    }

    next();

}

const signinValidate = (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!(password) || !(username || email)) {
        return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
    }
    next();
}

const updateValidate = (req, res, next) => {
    const { fullName, age, phoneNo } = req.body;
    if (!(fullName || age || phoneNo)) {
        return next({ statusCode: 400, message: responseMessage.missingUpdationField })
    }
    if (age) {
        if (age < 1 || age > 150) {
            return next({ statusCode: 400, message: customErrorMessage.invalidAge });
        }
    }
    const phoneNoRegEx = /^\d{10}$/
    if (phoneNo) {
        if (!phoneNoRegEx.test(phoneNo)) {
            return next({ statusCode: 400, message: customErrorMessage.invalidPhoneNo });
        }
    }

    next();
}

const changePasswordValidate = (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    console.log("validate", req.body);
    if (!oldPassword || !newPassword) {
        return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
    }
    if (oldPassword.length < 4 || newPassword.length < 4) {
        return next({ statusCode: 400, message: customErrorMessage.invalidPassword });
    }
    next();
}

module.exports = { signupValidate, signinValidate, updateValidate, changePasswordValidate }