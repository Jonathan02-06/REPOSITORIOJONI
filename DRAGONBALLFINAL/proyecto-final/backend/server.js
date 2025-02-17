// server.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || "mi_clave_secreta";

app.use(express.json());
app.use(cors());

// Base de datos simulada en memoria
const users = [
  { id: 1, username: "Jonathan", password: "1234" }
];

const products = [
  {
    id: "pikachu",
    name: "Pikachu",
    price: 50,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  },
  {
    id: "bulbasaur",
    name: "Bulbasaur",
    price: 60,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  },
  {
    id: "charmander",
    name: "Charmander",
    price: 55,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
  },
  {
    id: "squirtle",
    name: "Squirtle",
    price: 58,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
  }
];

let orders = [];

// Ruta raíz para verificar que el backend está en ejecución
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Endpoint de autenticación: login
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token, username: user.username });
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
});

// Middleware para verificar el token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Endpoint para obtener productos
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Endpoint para obtener órdenes del usuario autenticado
app.get("/api/orders", authenticateToken, (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.id);
  res.json(userOrders);
});

// Endpoint para crear una nueva orden
app.post("/api/orders", authenticateToken, (req, res) => {
  const { items, total } = req.body;
  if (!items || !total) {
    return res.status(400).json({ error: "Faltan datos en la orden" });
  }
  const newOrder = {
    id: orders.length + 1,
    userId: req.user.id,
    items,
    total,
    createdAt: new Date()
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
