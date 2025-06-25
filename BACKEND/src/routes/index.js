const express = require('express')
const router = express.Router()

const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const userPlanSubsRoutes = require('./userPlanSubs.routes')

// Rotas principais
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/subscriptions', userPlanSubsRoutes)

module.exports = router
