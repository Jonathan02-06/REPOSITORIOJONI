const express = require("express");
const { register, login } = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);  // Ruta para registrar usuario
router.post("/login", login);        // Ruta para login

module.exports = router;
