const express = require('express');
const router = express.Router();
const { 
    getSingleCode, 
    getAllCode, 
    createCode, 
    updateCode, 
    updateWhiteboard,
    deleteCode,
    createFile,
    updateFile,
    deleteFile,
} = require("../controllers/codeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/get/:id", authMiddleware, getSingleCode);
router.get("/all", authMiddleware, getAllCode);
router.post("/create", authMiddleware, createCode);
router.put("/update/:id", authMiddleware, updateCode);
router.put("/:id/whiteboard", authMiddleware, updateWhiteboard);
router.delete("/delete/:id", authMiddleware, deleteCode);

// File operations
router.post("/:codeId/files", authMiddleware, createFile);
router.put("/:codeId/files/:fileId", authMiddleware, updateFile);
router.delete("/:codeId/files/:fileId", authMiddleware, deleteFile);
module.exports = router;
