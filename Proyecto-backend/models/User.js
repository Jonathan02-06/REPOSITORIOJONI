const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Definición del esquema de usuario
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Middleware de mongoose para encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  try {
    // Solo encriptar si el password ha sido modificado o es nuevo
    if (!this.isModified("password")) {
      return next();
    }
    // Generamos el salt para bcrypt
    const salt = await bcrypt.genSalt(10);
    // Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Asignamos la contraseña encriptada al campo password
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Exportamos el modelo
const User = mongoose.model("User", userSchema);
module.exports = User;
