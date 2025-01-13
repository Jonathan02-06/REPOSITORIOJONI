const express = require("express");
const { getBooks } = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getBooks);

module.exports = router;
