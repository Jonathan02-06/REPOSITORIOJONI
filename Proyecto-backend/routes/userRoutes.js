const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/userController");

// Importamos el middleware de autenticación
const authMiddleware = require("../middleware/authMiddleware");

// Rutas públicas
router.post("/register", registerUser);
router.post("/login", loginUser);

// Rutas protegidas
router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
