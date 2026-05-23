const express = require('express');
const router = express.Router();
const { generateFromPrompt } = require("../controllers/cohereController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/generate", authMiddleware, generateFromPrompt);

module.exports = router;