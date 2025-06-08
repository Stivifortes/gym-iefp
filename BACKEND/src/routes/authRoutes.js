const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const { userIdValidation, updateUserValidation } = require('../middleware/userValidations');
const { register, login, getProfile } = require('../controllers/authController')
const { authenticateToken } = require('../middleware/auth')


/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticação de usuários
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrar um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado
 */
router.post('/register', register)

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Fazer login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 */
router.post('/login', login)

/**
 * @swagger
 * /profile:
 *   get:
 *     tags: [Auth]
 *     summary: Obter perfil do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil retornado
 *       401:
 *         description: Não autorizado
 */
router.get('/profile', authenticateToken, getProfile)

// Rotas para Utilizadores
router.get('/:id', userIdValidation, userController.findOne);
router.put('/:id', userIdValidation, updateUserValidation, userController.update);
router.delete('/:id', userIdValidation, userController.delete);

module.exports = router;

