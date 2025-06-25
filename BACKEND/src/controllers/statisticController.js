const db = require('../db/db')
const User = db.models.User
const Plan = db.models.Plans

async function getDashboardStatistics(req, res) {
  const totalUsers = await User.count()
  const plans = await Plan.findAll()

  const statsObj = {
    totalUsersAndPending: {
      totalUsers,
      pending: 0
    },
    plansUsersCount: plans.map((plan) => ({
      name: plan.name,
      count: 0,
      percentage: 0
    }))
  }
  res.json(statsObj)
}

module.exports = {
  getDashboardStatistics
}
