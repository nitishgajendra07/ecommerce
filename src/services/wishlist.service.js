const { ProductVariation } = require("../models/productVariation.model");
const { db } = require('../db/firebase.config');
const { myCollections, responseMessage } = require("../constants");
const { User } = require("../models/user.model");
const firebaseAdmin = require('firebase-admin');

async function addToWishlist(body) {
    try {
        const { productVariationId, userIdFromAuth } = body;

        const wishlistDocRef = db.collection(myCollections.wishlistCollection).doc(userIdFromAuth);
        const wishlistDoc = await wishlistDocRef.get();
        if (wishlistDoc.exists) {
            const wishlistData = wishlistDoc.data();
            if (!wishlistData.wishlistItems.includes(productVariationId.toString())) {
                await wishlistDocRef.update({
                    wishlistItems: firebaseAdmin.firestore.FieldValue.arrayUnion(productVariationId.toString())
                });
            }
        }
        else {
            wishlistDocRef.set({
                userId: userIdFromAuth,
                wishlistItems: [productVariationId.toString()]
            })
        }
        return (await wishlistDocRef.get()).data();
    } catch (error) {
        throw error;
    }
}

async function removeFromWishlist(body) {
    try {
        console.log("enrtered removeFromWishlist");
        const { userIdFromAuth, productVariationId } = body;

        const wishlistDocRef = db.collection(myCollections.wishlistCollection).doc(userIdFromAuth);
        const wishlistDoc = await wishlistDocRef.get();
        const wishlistData = wishlistDoc.data();
        const updatedWishlistItems = wishlistData.wishlistItems.filter(item => item !== productVariationId);

        const updatedWishlist = await wishlistDocRef.update({
            wishlistItems: updatedWishlistItems
        });
        return updatedWishlist;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { addToWishlist, removeFromWishlist }