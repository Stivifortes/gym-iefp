const express = require('express')
const router = express.Router()

const userPlanController = require('../controllers/userPlanSubs.controller')

const { authenticateToken } = require('../middleware/auth')

// Subscrições
router.post('/subscribe', authenticateToken, userPlanController.subscribe)
router.put(
  '/activate/:subscriptionId',
  authenticateToken,
  userPlanController.activateSubscription
)
router.put(
  '/cancel/:subscriptionId',
  authenticateToken,
  userPlanController.cancelSubscription
)

// Consultas
router.get(
  '/my-subscriptions',
  authenticateToken,
  userPlanController.getUserSubscriptions
)
router.get(
  '/active',
  authenticateToken,
  userPlanController.getActiveSubscription
)
router.get(
  '/status',
  authenticateToken,
  userPlanController.checkSubscriptionStatus
)

module.exports = router
