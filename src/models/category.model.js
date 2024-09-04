const mongoose = require('mongoose');
const { myModels } = require('../constants');
const { createSlug } = require('../utils/utils');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
    slug: {
        type: String,
        unique: true
    },
    categoryImage: {
        type: String,
        required: true
    },
    parentCategory: {
        type: mongoose.Types.ObjectId,
        ref: myModels.categoryModel
    }
},
    {
        autoIndex: false,
        timestamps: true
    })

categorySchema.pre('save', async function (next) {
    if (!this.isModified("name")) {
        return next();
    }

    this.slug = createSlug(this.name);

    // const existingCategory = await Category.findOne({ slug: this.slug }, { _id: 0, slug: 1 });


})


const Category = mongoose.model(myModels.categoryModel, categorySchema);

module.exports = { Category }