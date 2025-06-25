const express = require('express')
const router = express.Router()

const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const plansRoutes = require('./plans.routes')
const userPlanSubsRoutes = require('./userPlanSubs.routes')

router.use('/auth', authRoutes)
router.use('/plans', plansRoutes)
router.use('/user', userRoutes)
router.use('/plans', userPlanSubsRoutes)

module.exports = router
