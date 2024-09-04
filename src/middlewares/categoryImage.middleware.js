const multer = require('multer');
const { categoryImageExtension } = require('../constants');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/uploads/categoryPictures');
    },
    filename: function (req, file, cb) {
        req.body.categoryImage = `${req.body.name}-${categoryImageExtension}`;
        return cb(null, `${req.body.name}-${categoryImageExtension}`);
    }
});


categoryImageUpload = multer({ storage })
module.exports = { categoryImageUpload }