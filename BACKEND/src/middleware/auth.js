require('dotenv').config()
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production'

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' })
    }
    req.user = user
    next()
  })
}

module.exports = {
  authenticateToken,
  JWT_SECRET
}