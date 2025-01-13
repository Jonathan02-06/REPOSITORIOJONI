const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Ruta para crear un autor
router.post('/', authorController.createAuthor);

// Ruta para obtener todos los autores
router.get('/', authorController.getAllAuthors);

module.exports = router;
