const Code = require('../models/codeModel');
const { v4: uuidv4 } = require('uuid');

const getSingleCode = async(req, res) => {
    try {
        const codeId = req.params.id;
        const codeDoc = await Code.findById(codeId).populate('owner');

        if(!codeDoc) {
            return res.status(404).json({
                message : 'Code not found'
            })
        }

        return res.status(200).json({
            message : 'Code found successfully',
            codeDoc
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Code fetching failed',
            error: error.message,
        });
    }  
}

const getAllCode = async(req, res) => {
    try {
        const userId = req.user;
        const codeDocs = await Code.find({ $and: [ {owner : userId}, {isRoom : !true}]}).populate('owner');

        return res.status(200).json({
            message : 'Code found successfully',
            codeDocs
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Code fetching failed',
            error: error.message,
        });
    }
}

const createCode = async(req, res) => {
    try {
        const userId = req.user;
        const { isRoom, title } = req.body;

        // Create a new code document with a single blank index.html file as entry
        const defaultFile = {
            id: uuidv4(),
            name: 'index.html',
            extension: 'html',
            content: '',
            order: 0
        };

        const newCode = new Code({
            title,
            files: [defaultFile],
            isRoom: !!isRoom,
            owner: userId,
        });
        const codeDoc = await newCode.save();

        return res.status(201).json({
            message : 'New Code Created successfully',
            codeDoc
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Code creation failed',
            error: error.message,
        });
    }
}

const updateCode = async(req, res) => {
    try {
        const codeId = req.params.id;
        const updates = req.body;

        const updatedCode = await Code.findByIdAndUpdate(
        codeId,
        { $set: updates },
        { new: true }
        );

        if (!updatedCode) {
            return res.status(404).json({
                message: 'Code not found',
            });
        }

        return res.status(200).json({
            message: 'Code updated successfully',
            updatedCode,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Code update failed',
            error: error.message,
        });
    }
}

const updateWhiteboard = async (req, res) => {
    try {
        const codeId = req.params.id;
        const { whiteboardData } = req.body;

        if (typeof whiteboardData !== 'string') {
            return res.status(400).json({
                message: 'whiteboardData must be a string'
            });
        }

        const updatedCode = await Code.findByIdAndUpdate(
            codeId,
            { $set: { whiteboardData } },
            { new: true }
        );

        if (!updatedCode) {
            return res.status(404).json({
                message: 'Code not found',
            });
        }

        return res.status(200).json({
            message: 'Whiteboard updated successfully',
            updatedCode,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Whiteboard update failed',
            error: error.message,
        });
    }
}

const deleteCode = async(req, res) => {
    try {
        const codeId = req.params.id;
        const userId = req.user;

        const codeDoc = await Code.findOne({ _id: codeId, owner: userId });

        if (!codeDoc) {
            return res.status(404).json({
                message: 'Code not found',
            });
        }

        await Code.deleteOne({ _id: codeDoc._id });

        return res.status(200).json({
            message: 'Code deleted successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Code deletion failed',
            error: error.message,
        });
    }
}

// FILE OPERATIONS
const createFile = async(req, res) => {
    try {
        const codeId = req.params.codeId;
        const { name, extension, content } = req.body;

        if (!['html', 'css', 'js'].includes(extension)) {
            return res.status(400).json({
                message: 'Invalid file extension. Supported: html, css, js'
            });
        }

        const codeDoc = await Code.findById(codeId);
        if (!codeDoc) {
            return res.status(404).json({
                message: 'Code not found'
            });
        }

        // Check for duplicate filename
        const duplicateExists = codeDoc.files.some(f => f.name === name);
        if (duplicateExists) {
            return res.status(400).json({
                message: 'File with this name already exists'
            });
        }

        const newFile = {
            id: uuidv4(),
            name,
            extension,
            content: content || '',
            order: codeDoc.files.length
        };

        codeDoc.files.push(newFile);
        const updatedCode = await codeDoc.save();

        return res.status(201).json({
            message: 'File created successfully',
            file: newFile,
            files: updatedCode.files
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'File creation failed',
            error: error.message
        });
    }
}

const updateFile = async(req, res) => {
    try {
        const { codeId, fileId } = req.params;
        const { name, content } = req.body;

        const codeDoc = await Code.findById(codeId);
        if (!codeDoc) {
            return res.status(404).json({
                message: 'Code not found'
            });
        }

        const fileIndex = codeDoc.files.findIndex(f => f.id === fileId);
        if (fileIndex === -1) {
            return res.status(404).json({
                message: 'File not found'
            });
        }

        // If renaming, check for duplicates
        if (name && name !== codeDoc.files[fileIndex].name) {
            const duplicateExists = codeDoc.files.some((f, idx) => f.name === name && idx !== fileIndex);
            if (duplicateExists) {
                return res.status(400).json({
                    message: 'File with this name already exists'
                });
            }
            codeDoc.files[fileIndex].name = name;
        }

        if (content !== undefined) {
            codeDoc.files[fileIndex].content = content;
        }

        const updatedCode = await codeDoc.save();

        return res.status(200).json({
            message: 'File updated successfully',
            file: codeDoc.files[fileIndex],
            files: updatedCode.files
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'File update failed',
            error: error.message
        });
    }
}

const deleteFile = async(req, res) => {
    try {
        const { codeId, fileId } = req.params;

        const codeDoc = await Code.findById(codeId);
        if (!codeDoc) {
            return res.status(404).json({
                message: 'Code not found'
            });
        }

        const fileIndex = codeDoc.files.findIndex(f => f.id === fileId);
        if (fileIndex === -1) {
            return res.status(404).json({
                message: 'File not found'
            });
        }

        // Prevent deleting all files
        if (codeDoc.files.length === 1) {
            return res.status(400).json({
                message: 'Cannot delete the last file in a code project'
            });
        }

        codeDoc.files.splice(fileIndex, 1);
        const updatedCode = await codeDoc.save();

        return res.status(200).json({
            message: 'File deleted successfully',
            files: updatedCode.files
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'File deletion failed',
            error: error.message
        });
    }
}

module.exports = {
    getSingleCode,
    getAllCode,
    createCode,
    updateCode,
    updateWhiteboard,
    deleteCode,
    createFile,
    updateFile,
    deleteFile
}