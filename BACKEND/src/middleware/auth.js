const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; //  JWT_SECRET no teu .env

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1]; // Espera formato: Bearer TOKEN

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // salva o payload no req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};
