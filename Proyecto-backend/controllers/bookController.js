const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    const newBook = new Book({ title, author, publishedYear });
    await newBook.save();
    res.status(201).json({ message: "Libro creado con éxito" });
  } catch (err) {
    res.status(500).json({ error: "Error al crear libro" });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener libros" });
  }
};
