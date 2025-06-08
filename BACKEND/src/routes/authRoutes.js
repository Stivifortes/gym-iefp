const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const { userIdValidation, updateUserValidation } = require('../middleware/userValidations');
const { register, login, getProfile } = require('../controllers/authController')
const { authenticateToken } = require('../middleware/auth')


// Rota de registro
router.post('/register', register)

// Rota de login
router.post('/login', login)

// Rota protegida - obter perfil do usuário
router.get('/profile', authenticateToken, getProfile)

// Rotas para Utilizadores
router.get('/:id', userIdValidation, userController.findOne);
router.put('/:id', userIdValidation, updateUserValidation, userController.update);
router.delete('/:id', userIdValidation, userController.delete);

module.exports = router;
