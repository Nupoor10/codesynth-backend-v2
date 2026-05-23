const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createRoom, getAllParticipants, addParticipant, removeParticipant, getAllUserRooms, getUserRoomById, deleteRoom } = require('../controllers/roomController');

const router = express.Router();

router.post("/create", authMiddleware, createRoom);  
router.put("/add", authMiddleware, addParticipant);
router.put("/remove", authMiddleware, removeParticipant);
router.get("/all", authMiddleware, getAllUserRooms);
router.get("/users/:id", authMiddleware, getAllParticipants);  
router.get("/get/:id", authMiddleware, getUserRoomById);
router.delete("/delete/:id", authMiddleware, deleteRoom);

module.exports = router;
