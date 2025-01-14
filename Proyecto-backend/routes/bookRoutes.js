const express = require("express");
const router = express.Router();

const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

// Middleware de autenticación
const authMiddleware = require("../middleware/authMiddleware");

// Rutas protegidas para CRUD de libros
router.post("/", authMiddleware, createBook);
router.get("/", authMiddleware, getAllBooks);
router.get("/:id", authMiddleware, getBookById);
router.put("/:id", authMiddleware, updateBook);
router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;
