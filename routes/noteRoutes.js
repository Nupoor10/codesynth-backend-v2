const express = require('express');
const router = express.Router();
const { getSingleNote, getAllNotes, createNote, updateNote, deleteNote } = require("../controllers/noteController");

router.get("/get/:id", getSingleNote);
router.get("/fetch/all/:codeId", getAllNotes);
router.post("/add/:codeId", createNote);
router.put("/update/:id", updateNote);
router.delete("/delete/:id", deleteNote);

module.exports = router; 