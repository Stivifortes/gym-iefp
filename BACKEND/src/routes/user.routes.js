const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Rotas para Utilizadores
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;

// JuniorDelgado
// Este código define as rotas para a gestão de utilizadores, permitindo operações CRUD.
// As rotas incluem obter todos os utilizadores, obter um utilizador por ID, atualizar um utilizador e eliminar um utilizador.
// As funções correspondentes são importadas do controlador de utilizadores.
// As rotas são definidas usando o Express Router e exportadas para serem utilizadas na aplicação principal.
// JuniorDelgado	