const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || "mi_clave_secreta";

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

app.use(express.json());
app.use(cors());

// Importar el modelo de usuario
const User = require("./models/User");

// Ruta raíz para comprobar que el backend está funcionando
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Endpoint de registro de usuario (normalizando el username)
app.post("/api/auth/register", async (req, res) => {
  let { username, password, email } = req.body;
  username = username.toLowerCase();
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario o correo ya existen" });
    }
    const newUser = new User({ username, password, email });
    await newUser.save();
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
});

// Endpoint de login (normalizando el username)
app.post("/api/auth/login", async (req, res) => {
  let { username, password } = req.body;
  username = username.toLowerCase();
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
      res.json({ token, username: user.username });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Endpoint para obtener la lista de usuarios (excluyendo contraseñas)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Endpoint DELETE para eliminar un usuario por ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.json({ message: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
