const mongoose = require("mongoose");
require('dotenv').config()
const DB_NAME = process.env.DB_NAME

const connectToDB = async () => {
    try {
        const database = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`connected to ${database.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = { connectToDB };