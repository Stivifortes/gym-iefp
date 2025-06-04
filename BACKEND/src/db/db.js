const sqlite3 = require('sqlite3').verbose()
const path = require('path')

// Caminho absoluto para o arquivo gym.db
const dbPath = path.resolve(__dirname, 'gym.db')

// Criação/conexão com o banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message)
  } else {
    console.log('Conexão realizada com sucesso ao banco de dados')
  }
})

module.exports = db
