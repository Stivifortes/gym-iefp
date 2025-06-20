const express = require('express')
const router = express.Router()

const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const plansRoutes = require('./plans.routes')

router.use('/auth', authRoutes)
router.use('/plans', plansRoutes)
router.use('/user', userRoutes)

module.exports = router
