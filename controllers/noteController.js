const Note = require("../models/noteModel");
const Code = require("../models/codeModel");

const getSingleNote = async(req, res) => {
    try {
        const noteId = req.params.id;

        const note = await Note.findById(noteId);
        if(!note) {
            return res.status(404).json({
                message : 'Note not found'
            })
        }

        return res.status(200).json({
            message : 'Note found successfully',
            note
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message : 'Note fetching failed',
            error : error.message
        })
    }
}

const getAllNotes = async(req, res) => {
    try {
        const codeId = req.params.codeId;

        const notes = await Note.find({code : codeId});
        
        return res.status(200).json({
            message : 'Notes found successfully',
            notes
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message : 'Note fetching failed',
            error : error.message
        })
    }
}

const createNote = async(req, res) => {
    try {
        const codeId = req.params.codeId;

        const existingCode = await Code.findById(codeId);
        if (!existingCode) {
            return res.status(404).json({
                message : 'Code not found',
            })
        }

        const { title, content, images } = req.body;
        const newNote = new Note({title, content, images, code: codeId});
        await newNote.save();

        return res.status(201).json({
            message : 'Note created successfully',
            newNote
        })

    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message : 'Note creation failed',
            error : error.message
        })
    }
}

const updateNote = async(req, res) => {
    try {
        const noteId = req.params.id;
        const updates = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { $set : updates },
            { new : true},
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: 'Note not found',
            });
        }
    
        return res.status(200).json({
            message: 'Note updated successfully',
            updatedNote,
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message : 'Note updation failed',
            error : error.message
        })
    }
}

const deleteNote = async(req, res) => {
    try {
        const noteId = req.params.id;

        const noteDoc = await Note.findById(noteId);
        if (!noteDoc) {
        
        return res.status(404).json({
            message: 'Note not found',
        });
        }

        await Note.deleteOne({ _id: noteDoc._id });

        return res.status(200).json({
            message: 'Note deleted successfully',
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message : 'Note deletion failed',
            error : error.message
        })
    }
}

module.exports = {
    getSingleNote,
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
}