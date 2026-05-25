const express = require('express');
const router = express.Router();
const { 
    getSingleCode, 
    getAllCode, 
    createCode, 
    updateCode, 
    deleteCode,
    createFile,
    updateFile,
    deleteFile,
    reorderFiles
} = require("../controllers/codeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/get/:id", authMiddleware, getSingleCode);
router.get("/all", authMiddleware, getAllCode);
router.post("/create", authMiddleware, createCode);
router.put("/update/:id", authMiddleware, updateCode);
router.delete("/delete/:id", authMiddleware, deleteCode);

// File operations
router.post("/:codeId/files", authMiddleware, createFile);
router.put("/:codeId/files/:fileId", authMiddleware, updateFile);
router.delete("/:codeId/files/:fileId", authMiddleware, deleteFile);
router.patch("/:codeId/files/reorder", authMiddleware, reorderFiles);

module.exports = router;
