const { responseMessage } = require("../constants");
const { User } = require("../models/user.model");

async function signupUser(body) {
    try {
        const { fullName, username, age, phoneNo, email, password } = body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }, { phoneNo }] });
        if (existingUser) {
            throw new Error(responseMessage.userAlreadyExists);
        }
        const user = await User.create(body);
        return user;
    } catch (error) {
        throw error;
    }
}

async function signinUser(body) {
    try {
        const { username, email, password } = body;
        const user = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (!user) {
            throw new Error(responseMessage.userNotRegistered);
        }
        const isValidPassword = await user.isPasswordCorrect(password);
        if (!isValidPassword) {
            throw new Error(responseMessage.invalidCredentials);
        }
        const accessToken = user.generateAccessToken();
        return accessToken;
    } catch (error) {
        throw error;
    }
}

async function updateUser(body) {
    try {
        const { fullName, age } = body;
        const filedsToBeUpdated = {}
        if (fullName) {
            filedsToBeUpdated.fullName = fullName;
        }
        if (age) {
            filedsToBeUpdated.age = age;
        }

        console.log(body);
        const user = await User.findByIdAndUpdate(body.userIdFromAuth,
            {
                $set: filedsToBeUpdated
            },
            { new: true }
        ).select("-password");
        console.log("user", user);
        return user;
    } catch (error) {
        throw error;
    }
}

async function changePassword(body) {
    try {
        const { oldPassword, newPassword, userIdFromAuth } = body;
        console.log("body", body);
        const user = await User.findById(userIdFromAuth);
        console.log("user", user);

        const isCorrectPassword = await user.isPasswordCorrect(oldPassword);

        if (!isCorrectPassword) {
            throw new Error(responseMessage.invalidCredentials);
        }

        user.password = newPassword;
        await user.save();

        // await user.updateOne({ $set: { password: newPassword } }, { runValidators: true })

    } catch (error) {
        throw error;
    }
}

module.exports = { signupUser, signinUser, updateUser, changePassword }
