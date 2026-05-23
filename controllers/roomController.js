const Room = require('../models/roomModel');
const Code = require('../models/codeModel');

const createRoom = async(req, res) => {
    try {
        const userID = req.user;
        const { roomId, codeId } = req.body;
        const newRoom = new Room({roomId, admin: userID, code: codeId});
        await newRoom.save();

        return res.status(201).json({
            message: "Room created successfully",
            newRoom
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Error in creating room",
            error: error?.message
        })
    }
}

const getAllParticipants = async(req, res) => {
    try {
        const roomId = req.params.id;
        const userRoom = await Room.findOne({roomId: roomId}).populate('participants').populate('admin');
        if(!userRoom) {
            return res.status(404).json({
                message: "Room not found" 
            })
        }

        userRoom.participants.push(userRoom.admin);
        return res.status(200).json({
            message: "Participants fetched successfully",
            allUsers: userRoom.participants
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Error in fetching participant",
            error: error?.message
        })
    }
}

const addParticipant = async(req, res) => {
    try {
        const { roomID } = req.body;
        const participantID = req.user;
        const exisitingRoom = await Room.findOne({roomId: roomID});
        if(!exisitingRoom) {
            return res.status(404).json({
                message: "Room not found"
            })
        }

        exisitingRoom.participants.push(participantID);
        await exisitingRoom.save();

        return res.status(200).json({
            message: "Participant added successfully"
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Error in adding participant",
            error: error?.message
        })
    }
}
const removeParticipant = async(req, res) => {
    try {
        const { roomId } = req.body;
        const participantID = req.user;
        const exisitingRoom = await Room.findOne({roomId: roomId});
        if(!exisitingRoom) {
            return res.status(404).json({
                message: "Room not found"
            })
        }

        exisitingRoom.participants.pull(participantID);
        await exisitingRoom.save();

        return res.status(200).json({
            message: "Participant removed successfully"
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Error in removing participant",
            error: error?.message
        })
    }
}
const getAllUserRooms = async(req, res) => {
    try {
        const userID = req.user;
        const allRooms = await Room.find({ $or: [{admin: userID}, {participants: userID}]}).populate('admin');

        return res.status(200).json({
            message: "Rooms fetched successfully",
            allRooms
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Error in fetching Rooms",
            error: error?.message
        })
    }
}
const getUserRoomById = async(req, res) => {
    try {
        const roomId = req.params.id;
        const userRoom = await Room.findOne({roomId: roomId}).populate('participants');
        if(!userRoom) {
            return res.status(404).json({
                message: "Room not found"
            })
        }

        return res.status(200).json({
            message: "Rooms fetched successfully",
            userRoom
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Error in fetching Room",
            error: error?.message
        })
    }
}
const deleteRoom = async(req, res) => {
    try {
        const roomId = req.params.id;
        const userRoom = await Room.findOne({roomId: roomId});
        const roomCode = userRoom.code;
        if(!userRoom || !roomCode) {
            return res.status(404).json({
                message: "Room not found"
            })
        }

        await Code.deleteOne({_id: roomCode});
        await Room.deleteOne({_id: userRoom._id})

        return res.status(200).json({
            message: "Rooms deleted successfully",
            userRoom
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Error in deleting Room",
            error: error?.message
        })
    }
}

module.exports = {
    createRoom,
    getAllParticipants,
    addParticipant,
    removeParticipant,
    getAllUserRooms,
    getUserRoomById,
    deleteRoom
}
