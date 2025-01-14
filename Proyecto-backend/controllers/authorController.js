const Author = require("../models/Author");

// Crear autor
const createAuthor = async (req, res) => {
  try {
    const { name, biography } = req.body;

    // Verificar si existe un autor con el mismo nombre
    const existingAuthor = await Author.findOne({ name });
    if (existingAuthor) {
      return res
        .status(400)
        .json({ message: "Ya existe un autor con ese nombre." });
    }

    const newAuthor = new Author({ name, biography });
    const savedAuthor = await newAuthor.save();

    return res.status(201).json({ message: "Autor creado exitosamente.", savedAuthor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear autor.", error: error.message });
  }
};

// Obtener todos los autores
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find({});
    return res.status(200).json(authors);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener autores.", error: error.message });
  }
};

// Obtener autor por ID
const getAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: "Autor no encontrado." });
    }
    return res.status(200).json(author);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el autor.", error: error.message });
  }
};

// Actualizar autor
const updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const { name, biography } = req.body;

    const updatedAuthor = await Author.findByIdAndUpdate(
      authorId,
      { name, biography },
      { new: true, runValidators: true }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ message: "Autor no encontrado." });
    }

    return res.status(200).json({ message: "Autor actualizado.", updatedAuthor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar autor.", error: error.message });
  }
};

// Eliminar autor
const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const deletedAuthor = await Author.findByIdAndDelete(authorId);

    if (!deletedAuthor) {
      return res.status(404).json({ message: "Autor no encontrado." });
    }

    return res.status(200).json({ message: "Autor eliminado.", deletedAuthor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar autor.", error: error.message });
  }
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
};
