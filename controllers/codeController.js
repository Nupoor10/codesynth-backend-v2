const Code = require('../models/codeModel');

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

const getAllUserCodes = async(req, res) => {
    try {
        const userId = req.user;
        const codeDocs = await Code.find({
            $and: [{ owner: { $ne: userId }, isRoom: false }]
        }).populate('owner');

        return res.status(200).json({
            message : 'Codes found successfully',
            codeDocs
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Codes fetching failed',
            error: error.message,
        });
    }
}

const createCode = async(req, res) => {
    try {
        const userId = req.user;
        const { html, css, javascript, isRoom, title } = req.body;

        const newCode = new Code({
            title,
            html,
            css,
            javascript,
            isRoom,
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

module.exports = {
    getSingleCode,
    getAllCode,
    getAllUserCodes,
    createCode,
    updateCode,
    deleteCode
}