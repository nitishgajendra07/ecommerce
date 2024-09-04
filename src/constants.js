


const DUPLICATE_KEY_ERR = "E11000 duplicate key error collection"

const responseMessage = {
    internalServerError: "internal server error",
    registrationSuccess: "registered successfully. You can now login",
    userNotRegistered: "User not registered",
    missingUpdationField: "No value for updation is sent. You can update fullName, age and phoneNo",
    updationSuccess: "Profile updated successfully",
    userNotFound: "User not found",
    deletionSuccess: "Deleted successfully",
    deletionFailure: 'An error occurred while deleting',
    missingRequiredFields: "Missing required fields.",
    invalidAge: "Invalid age",
    invalidEmail: "Invalid email",
    invalidToken: "Invalid Token",
    missingUsernamePassword: "Missing username and or password",
    userAlreadyExists: "User already exists",
    invalidTitleError: "invalidTitle",
    validationError: 'ValidationError',
    pageNotFound: "Page Not Found",
    tokenNotPassed: `Token not passed`,
    tokenExpired: 'Token Expired',
    invalidCredentials: "Invalid credentials",
    passwordChangeSuccess: "Password changed successfully",
    logoutSuccess: "Logged out successfully",
    invalidUserId: "Invalid userId",
    notAnAdmin: "You must be an admin for this action",
    productNotFound: "Produnt Not Found",
    newAdminSuccess: "New admin added successfully",
    removeAdminSuccess: "Success. User is not an admin anymore",
    invalidCategoryName: "No such category exists",
    invalidProductVariation: "Invalid Product Variation Id",
    invalidAddressId: "Invalid address id",
    invalidCartId: "Invalid cart id",
    invalidProductName: "Invalid product name",
    invalidProductVariationId: "Invalid productVariation Id",
    oneVariantAtATimeError: "Can only add one variation at a time",
    fileDeletionFailure: 'Error deleting file',
    fileDeletionSuccess: 'Successfully deleted the uploaded file',
    wishlistNotFound : "User does not have a wishlist",
    invalidProductId : "invalid productId",
    productNotOrdered: "You can only add reviews afte purchasing the product",
    invalidReviewId : "Invalid review Id",
    unauthorizedReviewDelete : "You can only delete your reviews"

}

const customErrorMessage = {
    minAgeMessage: 'Must be at least 1',
    maxAgeMessage: 'Age must be less than or equal to 150',
    invalidEmail: "{VALUE} is not a valid email address!",
    invalidPassword: "Invalid password, password must be atleast 4 characters",
    invalidAge: "Age must be between 1 and 150",
    invalidPhoneNo: "Invalid phoneNo! phoneNo must be 10 digits",
    invalidPinCode: "Invalid pinCode. pinCode must be exactly 6 digits",
    valueMustBeString: '{VALUE} must be string',
    pathRequired: "path{PATH} is required!!!!",
    valueNotSupported: '{VALUE} is not supported',
    mongoDBFail: "mongodb connection failed!! ",
    productAlreadyExists: "Product Already Exists",
    categoryAlreadyExists: "Category Already Exists",


}



const myModels = {
    userModel: 'User',
    addressModel: 'Address',
    categoryModel: 'Category',
    productModel: 'Product',
    cartModel: 'Cart',
    productVariationModel: 'ProductVariation',
    orderModel: 'Order',
    reviewModel : 'Review'
}

const myCollections = {
    wishlistCollection: 'wishlist'
}

const allowedBlogCategories = ['Node.js', 'MongoDB', 'Express']
const allowedOrderStatuses = ['pending', 'cancelled', 'delivered']

// const tokenPrefix = "Bearer ";
const tokens = {
    accessToken: 'accessToken'
};

const authorizationHeader = "Authorization";

const profilePictureExtension = "profilePicture.png";
const defaultProfilePicExt = "default-user.png";

const productImageExtension = ".png"

const categoryImageExtension = '.png'

const serverListeningMessage = "Server is running at port :"
module.exports = { DUPLICATE_KEY_ERR, responseMessage, customErrorMessage, serverListeningMessage, allowedBlogCategories, allowedOrderStatuses, authorizationHeader, myModels, myCollections, profilePictureExtension, tokens, defaultProfilePicExt, productImageExtension, categoryImageExtension }