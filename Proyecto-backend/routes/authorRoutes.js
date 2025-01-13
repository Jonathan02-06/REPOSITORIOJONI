const express = require("express");
const { getAuthors } = require("../controllers/authorController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getAuthors);

module.exports = router;
