const Room = require('../models/roomModel');
const Code = require('../models/codeModel');
const mongoose = require('mongoose');

const createRoom = async(req, res) => {
    try {
        // Adjust fallback to match your auth middleware schema attachment
        const userID = req.user?._id || req.user || req.userId;
        const { roomId, codeId } = req.body;
        
        const newRoom = new Room({ roomId, admin: userID, code: codeId });
        await newRoom.save();

        return res.status(201).json({
            message: "Room created successfully",
            newRoom
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Error in creating room",
            error: error?.message
        });
    }
};

const getAllParticipants = async (req, res) => {
    try {
        const identifier = req.params.id;
        let userRoom = null;

        // 1. If it's a valid 24-character hexadecimal MongoDB ObjectId
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            const objectId = new mongoose.Types.ObjectId(identifier);
            userRoom = await Room.findOne({
                $or: [
                    { _id: objectId }, // Matches the true database record _id
                    { code: objectId } // Matches the linked code document reference field
                ]
            }).populate('participants').populate('admin');
        }

        // 2. Fallback: If it's a custom room string token (like a UUID)
        if (!userRoom) {
            userRoom = await Room.findOne({ roomId: identifier })
                .populate('participants')
                .populate('admin');
        }

        // 3. Fail-safe exit if both search paths come up completely empty
        if (!userRoom) {
            return res.status(404).json({
                message: "Room not found while attempting to fetch participant lists.",
                receivedIdentifier: identifier
            });
        }

        // 4. Safely compile full active rosters non-destructively
        const allUsers = [...userRoom.participants];
        if (userRoom.admin) {
            const isAdminAlreadyPresent = allUsers.some(
                u => String(u._id) === String(userRoom.admin._id)
            );
            if (!isAdminAlreadyPresent) {
                allUsers.push(userRoom.admin);
            }
        }

        return res.status(200).json({
            message: "Participants fetched successfully",
            allUsers: allUsers
        });

    } catch (error) {
        console.error("Error inside getAllParticipants controller:", error);
        return res.status(500).json({
            message: "Error in fetching participant profile records",
            error: error?.message
        });
    }
};

const addParticipant = async (req, res) => {
    try {
        // FIX: Extract both roomID and roomId to support mismatched frontend frameworks safely
        const { roomId, roomID } = req.body;
        const targetRoomIdentifier = roomId || roomID; // Falls back to whatever is populated
        
        const participantID = req.user?._id || req.user || req.userId;
        
        if (!targetRoomIdentifier) {
            return res.status(400).json({ 
                message: "Bad Request: Missing room identifier property (roomId/roomID) in body payload." 
            });
        }

        let existingRoom = null;

        // 1. Check if it's a valid 24-character hexadecimal ObjectId
        if (mongoose.Types.ObjectId.isValid(targetRoomIdentifier)) {
            const objectId = new mongoose.Types.ObjectId(targetRoomIdentifier);
            existingRoom = await Room.findOne({
                $or: [
                    { _id: objectId },
                    { code: objectId }
                ]
            });
        }

        // 2. Fallback to standard string property comparison matching (UUIDs)
        if (!existingRoom) {
            existingRoom = await Room.findOne({ roomId: targetRoomIdentifier });
        }

        if (!existingRoom) {
            return res.status(404).json({ 
                message: "Room session not found. Check your Room ID string accuracy.",
                receivedIdentifier: targetRoomIdentifier
            });
        }

        if (!existingRoom.participants.includes(participantID)) {
            existingRoom.participants.push(participantID);
            await existingRoom.save();
        }

        return res.status(200).json({
            message: "Participant added successfully",
            room: existingRoom
        });
    } catch (error) {
        console.error("Error inside addParticipant:", error);
        return res.status(500).json({
            message: "Error in adding participant",
            error: error?.message
        });
    }
};

const removeParticipant = async (req, res) => {
    try {
        const { roomId } = req.body;
        const participantID = req.user?._id || req.user || req.userId;
        
        let existingRoom = null;

        if (mongoose.Types.ObjectId.isValid(roomId)) {
            const objectId = new mongoose.Types.ObjectId(roomId);
            existingRoom = await Room.findOne({
                $or: [
                    { _id: objectId },
                    { code: objectId }
                ]
            });
        }

        if (!existingRoom) {
            existingRoom = await Room.findOne({ roomId: roomId });
        }

        if (!existingRoom) {
            return res.status(404).json({ message: "Room session not found" });
        }

        existingRoom.participants.pull(participantID);
        await existingRoom.save();

        return res.status(200).json({
            message: "Participant removed successfully"
        });
    } catch (error) {
        console.error("Error inside removeParticipant:", error);
        return res.status(500).json({
            message: "Error in removing participant",
            error: error?.message
        });
    }
};

const getAllUserRooms = async(req, res) => {
    try {
        const userID = req.user?._id || req.user || req.userId;
        const allRooms = await Room.find({ 
            $or: [{ admin: userID }, { participants: userID }]
        }).populate('admin');

        return res.status(200).json({
            message: "Rooms fetched successfully",
            allRooms
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Error in fetching Rooms",
            error: error?.message
        });
    }
};

const getUserRoomById = async (req, res) => {
    try {
        const identifier = req.params.id;
        let userRoom = null;

        // 1. If it's a valid 24-character hex string, prioritize a direct ID search
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            const objectId = new mongoose.Types.ObjectId(identifier);
            
            userRoom = await Room.findOne({
                $or: [
                    { _id: objectId },   // Matches your document's true _id field
                    { code: objectId }   // Matches your document's code field reference
                ]
            }).populate('participants').populate('admin');
        }

        // 2. Fallback: If nothing was found via ObjectId (or if it's a UUID string slug), query via roomId
        if (!userRoom) {
            userRoom = await Room.findOne({ roomId: identifier })
                .populate('participants')
                .populate('admin');
        }

        // 3. Throw a clean error if both query tracking vectors miss entirely
        if (!userRoom) {
            return res.status(404).json({
                message: "Room session not found in database.",
                receivedIdentifier: identifier
            });
        }

        // Return the clean populated document structure
        return res.status(200).json({
            message: "Room fetched successfully",
            userRoom
        });
        
    } catch (error) {
        console.error("Error inside getUserRoomById:", error);
        return res.status(500).json({
            message: "Error in fetching Room",
            error: error?.message
        });
    }
};

const deleteRoom = async(req, res) => {
    try {
        const identifier = req.params.id;
        let query = { roomId: identifier };
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            query = { $or: [{ _id: identifier }, { roomId: identifier }] };
        }

        const userRoom = await Room.findOne(query);
        if(!userRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        const roomCode = userRoom.code;
        if(roomCode) {
            await Code.deleteOne({ _id: roomCode });
        }
        await Room.deleteOne({ _id: userRoom._id });

        return res.status(200).json({
            message: "Rooms deleted successfully",
            userRoom
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Error in deleting Room",
            error: error?.message
        });
    }
};

module.exports = {
    createRoom,
    getAllParticipants,
    addParticipant,
    removeParticipant,
    getAllUserRooms,
    getUserRoomById,
    deleteRoom
};