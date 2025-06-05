const express = require('express')
const { register, login, getProfile } = require('../controllers/authController')
const { authenticateToken } = require('../middleware/auth')

const router = express.Router()

// Rota de registro
router.post('/register', register)

// Rota de login
router.post('/login', login)

// Rota protegida - obter perfil do usuário
router.get('/profile', authenticateToken, getProfile)

module.exports = router