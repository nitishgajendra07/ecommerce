const fs = require('fs');
const { responseMessage } = require('../constants');

function imageErrorHandler(error, req, res, next) {
    console.log("entered err handling middleware");
    if (req.file) {
        console.log("req.file", req.file);
        const filePath = req.file.destination + '/' + req.file.filename;
        fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error(responseMessage.fileDeletionFailure, unlinkErr);
            } else {
                console.log(responseMessage.fileDeletionSuccess);
            }
        });
    }

    res.status(500).json({ error: error.message });
}


module.exports = { imageErrorHandler }