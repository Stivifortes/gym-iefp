const express = require('express')
const { syncDatabase } = require('./src/db/models')

const app = express()

// Middleware para parsing JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rotas

app.get('/', (req, res) => {
  res.send('Hello World - Gym IEFP API')
})

// Inicializar banco de dados e servidor
const startServer = async () => {
  try {
    // Sincronizar banco de dados
    await syncDatabase()

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error)
  }
}

startServer()

module.exports = app
