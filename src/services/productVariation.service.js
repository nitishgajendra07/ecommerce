const { responseMessage } = require("../constants");
const { Product } = require("../models/product.model");
const { ProductVariation } = require("../models/productVariation.model");
const { deletePhoto } = require("../utils/utils");

async function addProductVariation(body) {
    try {
        const { mainProduct, newVariation } = body;
        const parsedNewVariation = JSON.parse(newVariation);
        parsedNewVariation.variantImage = body.variantImage;

        const existingProductVariation = await ProductVariation.findOne({
            productId: mainProduct._id,
            'variation.price': parsedNewVariation.price,
            'variation.attributes': {
                $all: parsedNewVariation.attributes.map(attr => ({
                    attributeOption: attr.attributeOption,
                    attributeValue: attr.attributeValue
                }))
            }
        })

        if (existingProductVariation) {
            mainProduct.variations.forEach((variation) => {
                if (JSON.stringify(variation) === JSON.stringify(existingProductVariation.variation)) {
                    variation.stockQuantity += parsedNewVariation.stockQuantity;
                }
            })
            existingProductVariation.variation.stockQuantity += parsedNewVariation.stockQuantity;
            console.log("exists");

            await existingProductVariation.save();
            await mainProduct.save();

            deletePhoto(`./public/uploads/productPictures/${mainProduct.name}/${existingProductVariation.variation.variantImage}`);

            return existingProductVariation;
        }
        else {
            console.log("doesnot exist");
            const newProductVariation = await ProductVariation.create({
                productId: mainProduct._id,
                variation: parsedNewVariation
            });

            mainProduct.variations.push(parsedNewVariation);
            await mainProduct.save();
            return newProductVariation;
        }
    } catch (error) {
        throw error;
    }
}

async function deleteProductVariation(body) {
    try {
        const { productVariation, mainProduct } = body;

        mainProduct.variations = mainProduct.variations.filter((variation) => {
            return JSON.stringify(variation.attributes) !== JSON.stringify(productVariation.variation.attributes) || variation.price !== productVariation.variation.price;
        });

        await mainProduct.save();
        const imageFilePath = `./public/uploads/productPictures/${mainProduct.name}/${productVariation.variation.variantImage}`;
        await productVariation.deleteOne();
        await deletePhoto(imageFilePath);
    } catch (error) {
        throw error;
    }
}

async function updateProductVariation(req) {
    try {
        const { productVariationId, attributes: newAttributes, price: newPrice, stockQuantity: newStockQuantity, variantImage: newVariantImage } = req.body;
        if (!productVariationId || !(newAttributes || newPrice || newStockQuantity || newVariantImage)) {
            return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
        }

        const newAttributesParsed = JSON.parse(newAttributes)

        const productVariation = await ProductVariation.findById(productVariationId);

        if (!productVariation) {
            throw new Error(responseMessage.invalidProductVariationId);
        }

        const mainProduct = await Product.findById(productVariation.productId);
        if (!mainProduct) {
            return next({ statusCode: 400, message: responseMessage.invalidProductId });
        }

        const variationIndex = mainProduct.variations.findIndex(variation => {
            return variation.attributes.every((attr, index) => {
                return attr.attributeOption === productVariation.variation.attributes[index].attributeOption &&
                    attr.attributeValue === productVariation.variation.attributes[index].attributeValue;
            });
        });

        if (variationIndex === -1) {
            return next({ statusCode: 400, message: responseMessage.invalidProductVariation });
        }

        const updateFields = {};
        if (newAttributes) {
            updateFields['variation.attributes'] = newAttributesParsed;
            mainProduct.variations[variationIndex].attributes = newAttributesParsed;
        }
        if (newPrice) {
            updateFields['variation.price'] = newPrice;
            mainProduct.variations[variationIndex].price = newPrice;
        }
        if (newStockQuantity) {
            updateFields['variation.stockQuantity'] = newStockQuantity;
            mainProduct.variations[variationIndex].stockQuantity = newStockQuantity;
        }
        if (newVariantImage) {
            updateFields['variation.variantImage'] = newVariantImage;
            mainProduct.variations[variationIndex].variantImage = newVariantImage;
        }

        const updatedProductVariation = await ProductVariation.findByIdAndUpdate(
            productVariationId, 
            { $set: updateFields },
            { new: true }
        );
        await mainProduct.save();
        return updatedProductVariation;

    } catch (error) {
        throw error;
    }
}



module.exports = { addProductVariation, deleteProductVariation, updateProductVariation }