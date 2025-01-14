const express = require("express");
const router = express.Router();

const {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} = require("../controllers/authorController");

// Middleware de autenticación
const authMiddleware = require("../middleware/authMiddleware");

// Rutas protegidas para CRUD de autores
router.post("/", authMiddleware, createAuthor);
router.get("/", authMiddleware, getAllAuthors);
router.get("/:id", authMiddleware, getAuthorById);
router.put("/:id", authMiddleware, updateAuthor);
router.delete("/:id", authMiddleware, deleteAuthor);

module.exports = router;
