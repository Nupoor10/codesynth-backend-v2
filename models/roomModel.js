const mongoose = require('mongoose');
const User = require('./userModel');
const Code = require('./codeModel');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomId: {
        type: String,
        required: [true, "Please provide a Room ID"]
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: User,
        required: [true, "Please provide a Room Admin"]
    },
    code: {
        type: mongoose.Types.ObjectId,
        ref: Code,
        required: [true, "Please provide a Code ID"],
    },
    participants: [{
        type: mongoose.Types.ObjectId,
        ref: User,
    }]
}, {timestamps: true});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
