const mongoose = require('mongoose');
const User = require("./userModel");

const codeSchema = new mongoose.Schema ({
    title : {
        type: String,
        required: [true, "Please provide a code title"]
    },
    html: {
        type: String,
    },
    css: {
        type: String,
    },
    javascript: {
        type: String,
    },
    isRoom: {
        type: Boolean,
        required: [true, "Please provide whether a Room"]
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: User,
        required: [true, "Please provide a Code Owner"]
    }
}, {
    timestamps: true
});

const Code = mongoose.model('Code', codeSchema);

module.exports = Code;