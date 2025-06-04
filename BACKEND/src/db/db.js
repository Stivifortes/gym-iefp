const sequelize = require('sequelize')

const connection = new sequelize({
  dialect: 'sqlite',
  storage: './gym.sqlite'
})

const db = {}

db.connection = connection
db.sequelize = sequelize
db.models = {}
db.models.User = require('./models/User')(connection, sequelize)

module.exports = db
