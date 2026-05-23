const mongoose = require('mongoose');
const Code = require('./codeModel');

const noteSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, "Please provide a note title"]
    },
    content : {
        type : String,
    },
    images : {
        type : String
    },
    code : {
        type : mongoose.Types.ObjectId,
        ref : Code,
        required : [true, "Please provide a Code ID"]
    }
}, {timestamps: true})

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
