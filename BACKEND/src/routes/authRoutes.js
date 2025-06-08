const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const { userIdValidation, updateUserValidation } = require('../validations/userValidations');
const { register, login, getProfile } = require('../controllers/authController')
const { authenticateToken } = require('../middleware/auth')


// Rota de registro
router.post('/register', register)

// Rota de login
router.post('/login', login)

// Rota protegida - obter perfil do usuário
router.get('/profile', authenticateToken, getProfile)

// Rotas para Utilizadores
router.get('/:id', authenticateToken, userIdValidation, userController.findOne);
router.put('/:id', authenticateToken, userIdValidation, updateUserValidation, userController.update);
router.delete('/:id', authenticateToken, userIdValidation, userController.delete);

module.exports = router;
