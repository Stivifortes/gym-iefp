const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {
  userIdValidation,
  updateUserValidation
} = require('../validations/userValidations')
const { getProfile } = require('../controllers/authController')
const { authenticateToken } = require('../middleware/auth')

// Rotas para Utilizadores
router.post('/', userController.create)
router.get('/profile', authenticateToken, getProfile)
router.get('/', authenticateToken, userController.findAll)
// Rotas para Utilizadores
router.get('/:id', authenticateToken, userIdValidation, userController.findOne)
router.put(
  '/:id',
  authenticateToken,
  userIdValidation,
  updateUserValidation,
  userController.update
)
router.delete(
  '/:id',
  authenticateToken,
  userIdValidation,
  userController.delete
)

module.exports = router

// JuniorDelgado
// Este código define as rotas para a gestão de utilizadores, permitindo operações CRUD.
// As rotas incluem obter todos os utilizadores, obter um utilizador por ID, atualizar um utilizador e eliminar um utilizador.
// As funções correspondentes são importadas do controlador de utilizadores.
// As rotas são definidas usando o Express Router e exportadas para serem utilizadas na aplicação principal.
// JuniorDelgado
