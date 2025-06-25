const express = require('express')
const router = express.Router()

const statisticsController = require('../controllers/statisticController')

const { authenticateToken } = require('../middleware/auth')

router.get(
  '/dashboard',
  authenticateToken,
  statisticsController.getDashboardStatistics
)

module.exports = router
