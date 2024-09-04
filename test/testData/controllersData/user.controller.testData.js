const userSignupRequestBody = {
    fullName: 'User',
    username: 'user',
    age: '22',
    phoneNo: '7777777777',
    email: 'user@gmail.com',
    password: 'user@123',
    isAdmin: 'false',
    profilePicture: 'user@gmail.com-profilePicture.png',
}

const userSigninRequestBody = {
    username: 'tejas',
    email: 'tejas@example.com',
    password: 'password123'
}

const updateUserRequestBody = {
    userIdFromAuth: 'user123',
    fullName: 'Tejas Kumar',
    age: 30
}

const mockUpdatedUser = { id: 'user123', fullName: 'Tejas Kumar', age: 30 };

const changePasswordRequestBody =  {
    oldPassword: 'oldPassword123',
    newPassword: 'newPassword123',
    userIdFromAuth: 'user123',
}


module.exports = { userSignupRequestBody, userSigninRequestBody, updateUserRequestBody, mockUpdatedUser, changePasswordRequestBody }