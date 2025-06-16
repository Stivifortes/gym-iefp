const express = require('express')
const router = express.Router()

const authRoutes = require('./authRoutes')
router.use('/auth', authRoutes)
const plansRoutes = require('./plans.routes')
router.use('/plans', plansRoutes)

module.exports = router
