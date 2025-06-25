const db = require('../db')

const syncDatabase = async () => {
  try {
    await db.connection.sync({ alter: true }) // força recriação
    console.log('Modelos recriados com sucesso!')
  } catch (error) {
    console.error('Erro ao sincronizar modelos:', error)
  }
}

module.exports = {
  syncDatabase
}
