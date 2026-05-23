const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGO_URI;

const connectDB = async() => {
    try {
        await mongoose.connect(url);
        console.log("Sucessfully connected to database");
    } catch(error) {
        console.log(`Error Occurred : ${error}`)
    }
}

module.exports = connectDB;