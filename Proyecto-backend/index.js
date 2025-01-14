require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Importamos rutas
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");

// Middleware para parsear datos en formato JSON
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

// Puerto desde el .env
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex y useFindAndModify están deprecados en Mongoose 6+, 
    // no es necesario declararlos en versiones recientes
  })
  .then(() => {
    console.log("Conectado a MongoDB exitosamente.");
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });
