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
    // Legacy fields for backward compatibility (will be phased out)
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

// Pre-save middleware to convert legacy format to new format if needed
codeSchema.pre('save', function(next) {
    // If files array is empty but legacy fields exist, convert them
    if ((!this.files || this.files.length === 0) && (this.html !== undefined || this.css !== undefined || this.javascript !== undefined)) {
        // Always create three default files; populate content from legacy fields when available
        const files = [
            {
                id: uuidv4(),
                name: 'index.html',
                extension: 'html',
                content: this.html || '',
                order: 0
            },
            {
                id: uuidv4(),
                name: 'styles.css',
                extension: 'css',
                content: this.css || '',
                order: 1
            },
            {
                id: uuidv4(),
                name: 'script.js',
                extension: 'js',
                content: this.javascript || '',
                order: 2
            }
        ];
        this.files = files;
    }
    // Initialize default files if none exist
    if (!this.files || this.files.length === 0) {
        this.files = [
            { id: uuidv4(), name: 'index.html', extension: 'html', content: '', order: 0 },
            { id: uuidv4(), name: 'styles.css', extension: 'css', content: '', order: 1 },
            { id: uuidv4(), name: 'script.js', extension: 'js', content: '', order: 2 }
        ];
    }
    next();
});

const Code = mongoose.model('Code', codeSchema);

module.exports = Code;