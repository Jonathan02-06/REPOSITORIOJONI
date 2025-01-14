const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Registro de usuarios
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si ya existe el usuario
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    // Crear nuevo usuario
    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al registrar usuario.", error: error.message });
  }
};

// Login de usuarios
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Credenciales inválidas (usuario no encontrado)." });
    }

    // Verificar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Credenciales inválidas (contraseña incorrecta)." });
    }

    // Generar token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    return res.status(200).json({
      message: "Usuario logueado exitosamente.",
      token
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al iniciar sesión.", error: error.message });
  }
};

// Obtener todos los usuarios (restringido a usuarios autenticados, ejemplo)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // excluimos el password
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener usuarios.", error: error.message });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el usuario.", error: error.message });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    // Se podría volver a encriptar el password en el hook pre-save 
    // si detecta que ha sido modificado
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    return res.status(200).json({ message: "Usuario actualizado.", updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar usuario.", error: error.message });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    return res.status(200).json({ message: "Usuario eliminado.", deletedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar usuario.", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
