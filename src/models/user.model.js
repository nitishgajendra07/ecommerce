const mongoose = require('mongoose');
const { customErrorMessage, myModels } = require('../constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    age: {
        type: Number,
        required: true,
        min: [1, customErrorMessage.minAgeMessage],
        max: [150, customErrorMessage.maxAgeMessage],
    },
    profilePicture: {
        type: String,
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{10}$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // addresses: [
    //     {
    //         addressId: {
    //             type: mongoose.Types.ObjectId,
    //             ref: myModels.addressModel
    //         }
    //     }
    // ]


},
    {
        autoIndex: false,
        timestamps: true
    });

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// userSchema.pre('save', async function (next) {
//     if(this.isAdmin){

//     }
// });

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model(myModels.userModel, userSchema);

module.exports = { User };
