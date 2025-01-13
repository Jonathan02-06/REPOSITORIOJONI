const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Ruta para crear un libro
router.post('/', bookController.createBook);

// Ruta para obtener todos los libros
router.get('/', bookController.getAllBooks);

module.exports = router;
