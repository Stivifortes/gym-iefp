const express = require('express')
const db = require('./src/db/db') // Caminho corrigido para o db.js

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Exemplo opcional para testar a conexão

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})

module.exports = app
