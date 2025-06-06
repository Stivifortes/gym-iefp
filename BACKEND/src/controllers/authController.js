const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../middleware/auth')
const db = require('../db/db')

const User = db.models.User

// Registrar usuário
const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone, endereco } = req.body

    // Validar campos obrigatórios
    if (!name) {
      return res.status(400).json({ error: 'O nome è obrigatório' })
    }
    if (!phone) {
      return res.status(400).json({ error: 'O telefone è obrigatório' })
    }

    if (!endereco) {
      return res.status(400).json({ error: 'O endereco è obrigatório' })
    }
    if (!email) {
      return res.status(400).json({ error: 'O email è obrigatório' })
    }
    if (!password) {
      return res.status(400).json({ error: 'A senha è obrigatória' })
    }
    if (!confirmPassword) {
      return res
        .status(400)
        .json({ error: 'A confirmação de senha è obrigatória' })
    }
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Email já está em uso' })
    }

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'As senhas não coincidem' })
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: 'A senha deve ter pelo menos 6 caracteres' })
    }
    if (password.length > 255) {
      return res
        .status(400)
        .json({ error: 'A senha deve ter no máximo 255 caracteres' })
    }

    // Hash da senha
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Criar usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      endereco
    })

    // Gerar token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Remover senha da resposta
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      endereco: user.endereco,
      created_at: user.created_at,
      updated_at: user.updated_at
    }

    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: userResponse,
      token
    })
  } catch (error) {
    console.error('Erro no registro:', error)

    // Tratar erros de validação do Sequelize
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map((err) => err.message)
      return res.status(400).json({ error: 'Dados inválidos', details: errors })
    }

    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// Login do usuário
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validar campos obrigatórios
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' })
    }

    // Buscar usuário
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Remover senha da resposta
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      endereco: user.endereco,
      created_at: user.created_at,
      updated_at: user.updated_at
    }

    res.json({
      message: 'Login realizado com sucesso',
      user: userResponse,
      token
    })
  } catch (error) {
    console.error('Erro no login:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// Obter perfil do usuário (rota protegida)
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    })

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    res.json({ user })
  } catch (error) {
    console.error('Erro ao obter perfil:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

module.exports = {
  register,
  login,
  getProfile
}
