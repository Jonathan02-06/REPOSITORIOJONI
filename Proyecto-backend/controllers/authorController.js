const Author = require("../models/Author");

exports.createAuthor = async (req, res) => {
  try {
    const { name, biography } = req.body;
    const newAuthor = new Author({ name, biography });
    await newAuthor.save();
    res.status(201).json({ message: "Autor creado con éxito" });
  } catch (err) {
    res.status(500).json({ error: "Error al crear autor" });
  }
};

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener autores" });
  }
};
