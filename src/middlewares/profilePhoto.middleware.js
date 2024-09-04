const multer = require('multer');
const { profilePictureExtension } = require('../constants');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/uploads/profilePictures');
    },
    filename: function (req, file, cb) {
        req.body.profilePicture = `${req.body.email}-${profilePictureExtension}`;
        return cb(null, `${req.body.email}-${profilePictureExtension}`);
    }
});

const upload = multer({ storage });

module.exports = { upload };