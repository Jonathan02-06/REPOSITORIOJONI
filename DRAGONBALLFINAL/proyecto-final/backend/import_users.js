const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado a MongoDB");
    importUsers();
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
    process.exit(1);
  });

async function importUsers() {
  try {
    const users = [
      { username: "alice", password: "password123", email: "alice@example.com" },
      { username: "bob", password: "password123", email: "bob@example.com" },
      { username: "charlie", password: "password123", email: "charlie@example.com" }
    ];

    for (const userData of users) {
      // Normalizar el username a minúsculas
      userData.username = userData.username.toLowerCase();
      const exists = await User.findOne({ $or: [{ username: userData.username }, { email: userData.email }] });
      if (!exists) {
        const newUser = new User(userData);
        await newUser.save();
        console.log(`Usuario importado: ${userData.username}`);
      } else {
        console.log(`El usuario ${userData.username} ya existe`);
      }
    }
    console.log("Importación de usuarios completada");
    process.exit(0);
  } catch (error) {
    console.error("Error durante la importación de usuarios:", error);
    process.exit(1);
  }
}
