
// verifyTokenAndRole ajuda posteriormente quando for atribuir rotas por permissoes

/* exemplo: router.get("/dashboard", verifyTokenAndRole("admin"), (req, res) => {
  res.json({ message: "Bem-vindo ao painel de admin!" });
});
*/

const jwt = require("jsonwebtoken");
secret = process.env.JWT_SECRET
const verifyTokenAndRole = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, secret);

      // Verifica se a role do token bate com a exigida
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Acesso negado. Permissão insuficiente." });
      }

      req.user = decoded; // opcional: colocar dados do usuário na request
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido ou expirado." });
    }
  };
};

module.exports = verifyTokenAndRole;

/*

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


*/

