const express = require('express')
const router = express.Router()

const userPlanController = require('../controllers/userPlanSubs.controller')

const { authenticateToken } = require('../middleware/auth')

router.post('/subscribe', authenticateToken, userPlanController.subscribe)

module.exports = router
