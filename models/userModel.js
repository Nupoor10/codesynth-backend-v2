const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: [true, "Please provide a user name"],
    },
    email: {
        type: String,
        required: [true, "Please provide a user email"],
        unique: [true, "User already exists"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;