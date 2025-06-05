require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { syncDatabase } = require('./src/db/models')
const authRoutes = require('./src/routes/authRoutes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rotas
app.get('/', (req, res) => {
  res.send('Hello World - Gym IEFP API')
})

// Rotas de autenticação
app.use('/api/auth', authRoutes)

// Inicializar banco de dados e servidor
const startServer = async () => {
  try {
    // Sincronizar banco de dados
    await syncDatabase()

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
      console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error)
  }
}

startServer()

module.exports = app
