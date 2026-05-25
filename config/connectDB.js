const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const url = process.env.MONGO_URI;

// Only apply the DNS fix on your local machine
if (process.env.NODE_ENV !== 'production') {
    const dns = require('node:dns');
    dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const connectDB = async() => {
    try {
        await mongoose.connect(url);
        console.log("Successfully connected to database");
    } catch(error) {
        console.log(`Error Occurred : ${error}`);
    }
}

module.exports = connectDB;