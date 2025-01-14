const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Obtener el token del header Authorization: 'Bearer <token>'
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No se proporcionó un token." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Formato de token inválido." });
  }

  try {
    // Verificamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Añadimos el userId decodificado al objeto req para usarlo más adelante
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};

module.exports = authMiddleware;
