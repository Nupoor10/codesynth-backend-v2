const express = require('express');
const router = express.Router();
const { getSingleCode, getAllCode, getAllUserCodes, createCode, updateCode, deleteCode } = require("../controllers/codeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/get/:id", authMiddleware, getSingleCode);
router.get("/all", authMiddleware, getAllCode);
router.get("/users/all", authMiddleware, getAllUserCodes);
router.post("/create", authMiddleware, createCode);
router.put("/update/:id", authMiddleware, updateCode);
router.delete("/delete/:id", authMiddleware, deleteCode);

module.exports = router;
