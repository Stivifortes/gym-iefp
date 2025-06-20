const express = require('express')
const router = express.Router()

const planController = require('../controllers/plans.controller')

const { authenticateToken } = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')

router.post('/', authenticateToken, isAdmin, planController.create)
router.get('/', authenticateToken, isAdmin, planController.getAll)
router.get('/:id', authenticateToken, isAdmin, planController.getById)
router.put('/:id', authenticateToken, isAdmin, planController.update)
router.delete('/:id', authenticateToken, isAdmin, planController.remove)

module.exports = router
