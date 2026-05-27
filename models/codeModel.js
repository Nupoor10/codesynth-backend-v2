const mongoose = require('mongoose');
const User = require("./userModel");
const { v4: uuidv4 } = require('uuid');

const fileSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    name: {
        type: String,
        required: [true, "Please provide a file name"]
    },
    extension: {
        type: String,
        enum: ['html', 'css', 'js'],
        required: [true, "Please provide a file extension"]
    },
    content: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        required: true
    }
}, { _id: false });


const codeSchema = new mongoose.Schema ({
    title : {
        type: String,
        required: [true, "Please provide a code title"]
    },
    files: [fileSchema],
    isRoom: {
        type: Boolean,
        required: [true, "Please provide whether a Room"]
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: User,
        required: [true, "Please provide a Code Owner"]
    },
    whiteboardData: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});



const Code = mongoose.model('Code', codeSchema);

module.exports = Code;