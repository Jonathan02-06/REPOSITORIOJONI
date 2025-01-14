const Book = require("../models/Book");
const Author = require("../models/Author");

// Crear libro
const createBook = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    // Verificar si el autor existe
    const existingAuthor = await Author.findById(author);
    if (!existingAuthor) {
      return res
        .status(400)
        .json({ message: "El autor proporcionado no existe." });
    }

    const newBook = new Book({ title, description, author });
    const savedBook = await newBook.save();

    return res.status(201).json({ message: "Libro creado exitosamente.", savedBook });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear libro.", error: error.message });
  }
};

// Obtener todos los libros
const getAllBooks = async (req, res) => {
  try {
    // Populate para traer info del autor
    const books = await Book.find({}).populate("author", "name biography");
    return res.status(200).json(books);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener libros.", error: error.message });
  }
};

// Obtener libro por ID
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    // Populate para traer info del autor
    const book = await Book.findById(bookId).populate("author", "name biography");
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el libro.", error: error.message });
  }
};

// Actualizar libro
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, description, author } = req.body;

    // Verificar si el autor existe (si se proporciona nuevo autor)
    if (author) {
      const existingAuthor = await Author.findById(author);
      if (!existingAuthor) {
        return res
          .status(400)
          .json({ message: "El autor proporcionado no existe." });
      }
    }

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, description, author },
      { new: true, runValidators: true }
    ).populate("author", "name biography");

    if (!updatedBook) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }

    return res.status(200).json({ message: "Libro actualizado.", updatedBook });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar libro.", error: error.message });
  }
};

// Eliminar libro
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }

    return res.status(200).json({ message: "Libro eliminado.", deletedBook });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar libro.", error: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
