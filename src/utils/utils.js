const fs = require('fs/promises');

function createSlug(str) {
    return str
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

function getFieldFromError(error) {
    const errorMessage = error.message;
    const match = errorMessage.match(/index: (.*?) dup key/);
    if (match) {
        const indexName = match[1].split('_')[0];
        return indexName;
    }
    return null;
}

function createDuplicateKeyErrorMessage(field) {
    return `The provided value for ${field} already exists`;
}

async function deletePhoto(filePath) {
    try {
        await fs.unlink(filePath)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createSlug, getFieldFromError, createDuplicateKeyErrorMessage, deletePhoto }